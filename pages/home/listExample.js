import React from "react";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const styles = {
    root: {
        display: "flex",
        justifyContent: "left",
        flexWrap: "nowrap",
        listStyle: "none",
        padding: "theme.spacing(0.5)",
        margin: 0,
        overflow: "auto",
        maxWidth: "400px",
    },
    tab: {
        opacity: 1,
        minWidth: "0px",
        padding: 0,
    },
    chip: {
        margin: "theme.spacing(0.5)",
    },
};

export default function ChipsArray() {
    const [chipData, setChipData] = React.useState([
        { key: 0, label: "Angular" },
        { key: 1, label: "jQuery" },
        { key: 2, label: "Polymer" },
        { key: 3, label: "React" },
        { key: 4, label: "Vue" },
        { key: 5, label: "Knockout" },
        { key: 6, label: "Ember" },
        { key: 7, label: "D3" },
        { key: 8, label: "Google Charts" },
    ]);

    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) =>
            chips.filter((chip) => chip.key !== chipToDelete.key)
        );
    };

    return (
        <Box sx={styles.root}>
            <Tabs
                variant="scrollable"
                value={null}
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                {chipData.map((data) => {
                    let icon;

                    if (data.label === "React") {
                        icon = <TagFacesIcon />;
                    }

                    return (
                        <Tab
                            key={data.key}
                            sx={styles.tab}
                            label={
                                <Chip
                                    icon={icon}
                                    label={data.label}
                                    onDelete={
                                        data.label === "React" ? undefined : handleDelete(data)
                                    }
                                    sx={styles.chip}
                                />
                            }
                            id={`simple-tab-${data.key}`}
                        />
                    );
                })}
            </Tabs>
        </Box>
    );
}
