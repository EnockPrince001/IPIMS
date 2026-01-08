import { useState, useEffect } from "react";

interface SubRight {
    title: string;
    permissions: { [key: string]: number | boolean };
}

interface RoleChild {
    subrights?: SubRight[];
}

interface Role {
    children?: RoleChild[];
}

const useSubRightPermissionsHook = () => {
    const [permissions, setPermissions] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const rights = localStorage.getItem("rights");
        if (!rights) return;

        try {
            // Similar logic to PermissionsHook for parsing
            let cleanedData: Role[] = [];
            try {
                const parsed = JSON.parse(rights);
                if (typeof parsed === 'string') {
                    cleanedData = JSON.parse(parsed.replace(/\\/g, ""));
                } else {
                    cleanedData = parsed;
                }
            } catch (e) { return; }

            if (!Array.isArray(cleanedData)) return;

            const perms: { [key: string]: boolean } = {};

            cleanedData.forEach((role) => {
                role.children?.forEach((child) => {
                    if (child.subrights) {
                        child.subrights?.forEach((subright) => {
                            const subrightPermKeyBase = subright.title.replace(/\s+/g, "");
                            const subrightPermKeys = Object.keys(subright.permissions);

                            subrightPermKeys.forEach((perm) => {
                                const subrightPermissionName = `${subrightPermKeyBase}.${perm}`;
                                perms[subrightPermissionName] = !!subright.permissions[perm];
                            });
                        });
                    }
                });
            });

            setPermissions(perms);
        } catch (error) {
            console.error("Failed to parse rights JSON:", error);
        }
    }, []);

    const hasSubRightPermission = (entity: string, action: string) => {
        if (entity && action) {
            const permKey = `${entity.replace(/\s+/g, "")}.${action}`;
            return permissions[permKey] || false;
        }
        return false;
    };

    return { permissions, hasSubRightPermission };
};

export default useSubRightPermissionsHook;
