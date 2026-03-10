const fs = require('fs');
const p = require('child_process');

console.log('Running tsc -b...');
const out = p.spawnSync('npx', ['tsc', '-b'], { encoding: 'utf8' }).stdout || '';
const lines = out.split('\n');

let m = 0;
const fixes = {};

lines.forEach(l => {
    const match = l.match(/^([a-zA-Z0-9_/\.\\-]+):(\d+):(\d+) - error TS1484: '([^']+)' is a type/);
    if (match) {
        const file = match[1];
        const typeName = match[4];

        if (!fixes[file]) fixes[file] = new Set();
        fixes[file].add(typeName);
    }
});

for (const [file, types] of Object.entries(fixes)) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    for (const typeName of types) {
        // Regex to match: import { ..., TypeName, ... } from 'xyz';
        // We want to transform it if it doesn't already have 'type'
        const importRegex = new RegExp(`import\\s+\\{([^}]*\\b${typeName}\\b[^}]*)\\}\\s+from\\s+(['"][^'"]+['"]);`, 'g');

        content = content.replace(importRegex, (match, importsStr, modulePath) => {
            // Is it already a type import? e.g. import type { ... }
            // This regex doesn't match 'import type', only 'import {'.
            // Parse the imports
            const parts = importsStr.split(',').map(s => s.trim()).filter(Boolean);
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
