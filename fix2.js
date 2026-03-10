import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

console.log('Running tsc -b...');
let out = '';
try {
    out = execSync('npx tsc -b', { encoding: 'utf8', stdio: 'pipe' });
} catch (e) {
    out = e.stdout || '';
}

const lines = out.split('\n');
let m = 0;
const fixes = {};

// Regex matches error format, example:
// src/components/Sidebar.tsx(10,15): error TS1484: 'ReactNode' is a type and must be imported using a type-only import...
const errRegex = /^([a-zA-Z0-9_\-\\/\.]+)\(\d+,\d+\):.*error TS1484: '([^']+)' is a type/;

lines.forEach(l => {
    const match = l.match(errRegex);
    if (match) {
        const file = match[1];
        const typeName = match[2];
        if (!fixes[file]) fixes[file] = new Set();
        fixes[file].add(typeName);
    }
});

console.log('Found errors in ' + Object.keys(fixes).length + ' files.');

for (const [file, types] of Object.entries(fixes)) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    for (const typeName of types) {
        // Look for: import { ..., TypeName, ... } from 'xyz';
        // We split into two imports.
        // E.g., import { A, TypeName, B } from 'xyz';
        const importRegex = new RegExp(`^import\\s+\\{([^}]*\\b${typeName}\\b[^}]*)\\}\\s+from\\s+(['"][^'"]+['"]);$`, 'gm');

        content = content.replace(importRegex, (match, importsStr, modulePath) => {
            const parts = importsStr.split(',').map(s => s.trim()).filter(Boolean);
            // Remove the type being imported
            const otherParts = parts.filter(p => p !== typeName && !p.startsWith(`type ${typeName}`));

            changed = true;
            if (otherParts.length === 0) {
                return `import type { ${typeName} } from ${modulePath};`;
            } else {
                return `import type { ${typeName} } from ${modulePath};\nimport { ${otherParts.join(', ')} } from ${modulePath};`;
            }
        });
    }

    if (changed) {
        fs.writeFileSync(file, content);
        m++;
    }
}

console.log('Fixed TS1484 errors in ' + m + ' files');
