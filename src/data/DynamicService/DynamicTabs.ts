import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useTheme, useMediaQuery, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { tokens } from "../../theme";

// Placeholder for the component map until modules are migrated
import * as componentsMap from "../../../store/slices/customSlice"; // Temporary import to avoid build error, will replace with actual component mapping
// TODO: Replace line above with actual imports:
// import * as componentsMap from "../../AccountsAndFinanceManagement/Component/Components";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role= "tabpanel"
    hidden = { value !== index
}
id = {`vertical-tabpanel-${index}`}
aria - labelledby={ `vertical-tab-${index}` }
{...other }
style = {{ width: "100%" }}
        >
    { value === index && (
        <Box sx={ { width: "100%" } }>
            { children }
            </Box>
            )}
</div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
    };
}

interface DynamicTabsProps {
    rightId: string | number;
    componentsMapping?: any; // Optional prop to pass mapping directly
}

const DynamicTabs = ({ rightId, componentsMapping }: DynamicTabsProps) => {
    const theme = useTheme();
    // @ts-ignore
    const colors = tokens(theme.palette.mode);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
    const [value, setValue] = useState(0);
    const [subRightComponents, setSubRightComponents] = useState<{ label: string; content: React.ReactNode }[]>([]);

    // Use passed mapping or fallback to imported (which is currently mock)
    const mapToUse = componentsMapping || componentsMap;

    useEffect(() => {
        const rights = localStorage.getItem("rights");
        if (rights) {
            try {
                let cleanedData: any[] = [];
                try {
                    const parsed = JSON.parse(rights);
                    if (typeof parsed === 'string') {
                        cleanedData = JSON.parse(parsed.replace(/\\/g, ""));
                    } else {
                        cleanedData = parsed;
                    }
                } catch (e) { }

                if (!Array.isArray(cleanedData)) return;

                const importedComponents = cleanedData
                    .filter((child: any) =>
                        child.children?.some(
                            (subChild: any) => subChild.id === parseInt(rightId.toString(), 10)
                        )
                    )
                    .flatMap(
                        (child: any) =>
                            child.children
                                .find((subChild: any) => subChild.id === parseInt(rightId.toString(), 10))
                                ?.subrights?.map((subRight: any) => {
                                    const componentKey = Object.keys(mapToUse).find((key) =>
                                        key
                                            .toLowerCase()
                                            .includes(subRight.title.toLowerCase().replace(/\s/g, ""))
                                    );
                                    const Component = mapToUse[componentKey as keyof typeof mapToUse];
                                    // @ts-ignore - Valid React Component check or fallback
                                    return {
                                        label: subRight.title,
                                        content: Component ? <Component /> : <Box p={2}>Component {subRight.title} ({componentKey}) Not Found</Box >,
                                    };
                                }) || []
                    );

                setSubRightComponents(importedComponents);
            } catch (error) {
                console.error("Failed to parse rights JSON:", error);
            }
        }
    }, [rightId, mapToUse]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleSelectChange = (event: SelectChangeEvent<number>) => {
        setValue(Number(event.target.value));
    };

    const getTabStyle = (isSelected: boolean) => ({
        borderRadius: "0.75rem",
        border:
            theme.palette.mode === "dark" ? "1px solid #70d8bd" : "1px solid #1F2A40",
        margin: 0.3,
        color: isSelected
            ? colors.greenAccent?.[400] || theme.palette.secondary.main
            : "inherit",
        backgroundColor: isSelected
            ? colors.greenAccent?.[400] || theme.palette.secondary.main
            : "inherit",
        "&.Mui-selected": {
            color:
                theme.palette.mode === "dark"
                    ? colors.primary?.[400]
                    : colors.primary?.[900],
        },
    });

    return (
        <Box
            sx= {{
        bgcolor: colors.primary?.[400] || theme.palette.background.paper,
            display: "grid",
                gridTemplateColumns:
        isSmallScreen || isMediumScreen ? "1fr" : "auto 1fr",
            height: "max-content",
                m: 2,
                    p: 2,
                        width: "100%",
                            gap: 2
    }
}
        >
    { isSmallScreen || isMediumScreen ? (
        <Select
                    value= { value }
                    onChange = { handleSelectChange }
fullWidth
displayEmpty
inputProps = {{ "aria-label": "Without label" }}
sx = {{ backgroundColor: colors.primary?.[400], width: "100%", mb: 2 }}
                >
{
    subRightComponents.map((tab, index) => (
        <MenuItem
                            key= { index }
                            value = { index }
                            sx = {{ backgroundColor: colors.primary?.[400] }}
    >
    { tab.label }
    </MenuItem>
                    ))}
</Select>
            ) : (
    <Tabs
                    orientation= "vertical"
variant = "scrollable"
value = { value }
onChange = { handleChange }
sx = {{
    borderRight: 2,
        borderColor: 'divider',
            backgroundColor: colors.primary?.[400],
                minWidth: 200,
                    }}
                >
    {
        subRightComponents.map((tab, index) => (
            <Tab
                            key= { index }
                            label = { tab.label }
                            { ...a11yProps(index) }
                            sx = { getTabStyle(value === index)
    }
    />
                    ))}
</Tabs>
            )}
<Box sx={ { width: '100%', overflowX: 'auto' } }>
{
    subRightComponents.map((tab, index) => (
        <TabPanel key= { index } value = { value } index = { index } >
        { tab.content }
        </TabPanel>
    ))
}
    </Box>
    </Box>
    );
};

export default DynamicTabs;
