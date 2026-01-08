import { useState, useEffect } from "react";

interface PermissionMap {
    [key: string]: boolean;
}

interface RoleChild {
    title: string;
    permissions: { [key: string]: number | boolean };
}

interface Role {
    title: string;
    children: RoleChild[];
}

const usePermissions = () => {
    const [permissions, setPermissions] = useState<PermissionMap>({});

    useEffect(() => {
        const rights = localStorage.getItem("rights");
        if (!rights) return;

        try {
            // Reference code had double parsing: JSON.parse(rights), then JSON.parse(rights.replace(/\\/g, ""))
            // Ideally we should just check if it needs double parsing or not.
            let cleanedData: Role[] = [];

            // Attempt 1: Standard parse
            try {
                const parsed = JSON.parse(rights);
                if (typeof parsed === 'string') {
                    // It was double stringified or escaped
                    cleanedData = JSON.parse(parsed.replace(/\\/g, ""));
                } else {
                    cleanedData = parsed;
                }
            } catch (e) {
                console.error("Error parsing rights", e);
                return;
            }

            if (!Array.isArray(cleanedData)) {
                // Fallback for the crazy format in reference if above failed to produce array
                const rawParsed = JSON.parse(rights);
                if (typeof rawParsed === 'string') {
                    cleanedData = JSON.parse(rawParsed.replace(/\\/g, ""));
                }
            }

            if (!cleanedData || !Array.isArray(cleanedData)) return;

            const perms: PermissionMap = {};
            cleanedData.forEach((role) => {
                if (role.children) {
                    role.children.forEach((child) => {
                        const permKeyBase = child.title.replace(/\s+/g, "");
                        const permKeys = Object.keys(child.permissions);

                        permKeys.forEach((perm) => {
                            const permissionName = `${permKeyBase}.${perm}`;
                            perms[permissionName] = !!child.permissions[perm];
                        });
                    });
                }
            });

            setPermissions(perms);
        } catch (e) {
            console.error("Critical error parsing permissions", e);
        }
    }, []);

    const hasPermission = (entity: string, action: string) => {
        if (entity && action) {
            const permKey = `${entity.replace(/\s+/g, "")}.${action}`;
            return permissions[permKey] || false;
        }
        return false;
    };

    return { permissions, hasPermission };
};

export default usePermissions;
