import React, { useRef } from "react";
import Link from 'next/link';
import Box from "@mui/material/Box";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import ImageListItem from "@mui/material/ImageListItem";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import dynamic from 'next/dynamic';

const images = [
    { key: 0, blogId: 33, thumbnail: { uri: 'https://wildalmonds.com/api/uploads/12d7fb07-5f3f-42a3-9519-baeaee476df7_Airfield.png',name:'airfield'}},
    { key: 1, blogId: 33, thumbnail: { uri: 'https://wildalmonds.com/api/uploads/a175eb24-9219-4513-a9c2-ff7bc97e21a6_425.png'  ,name:'425'}},
    { key: 2, blogId: 33, thumbnail: { uri: 'https://wildalmonds.com/api/uploads/6db0ed8e-cb75-4903-995a-2d8768887c0f_DeLille.png'  ,name:'DeLille'}},
    { key: 3, blogId: 33, thumbnail: { uri: 'https://wildalmonds.com/api/uploads/19fea62b-9a26-449e-a14d-443c3bdd4f4f_loveThatRed.png'  ,name:'loveRed'}},
    { key: 4, blogId: 33, thumbnail: { uri: 'https://wildalmonds.com/api/uploads/7d5c4c14-111a-47b0-a40d-809eb3ac25f0_loboHills.png'  ,name:'lobo'} },
    { key: 5, blogId: 33, thumbnail: { uri: 'https://wildalmonds.com/api/uploads/ae0d1c09-9de9-4a7c-a19d-f32a429e6fe2_RPW-Header-Logo.png'  ,name:'rockyPond'} },
    { key: 6, blogId: 33, thumbnail: { uri: 'https://wildalmonds.com/api/uploads/813fa15f-1273-4aab-9b3c-c9ac39f1b8dd_truthTeller.png'  ,name:'truth'} },
    { key: 7, blogId: 33, thumbnail: { uri: 'https://wildalmonds.com/api/uploads/94ba9d94-4794-41f8-99f5-46de694b760d_iconCellars.png'  ,name:'icon'} },
];

const styles = {
    root: {
        display: "flex",
        justifyContent: "left",
        flexWrap: "nowrap",
        listStyle: "none",
        padding: "theme.spacing(0.5)",
        margin: 0,
        overflow: "auto",
        maxWidth: "95%",
    },
    tab: {
        opacity: 1,
        minWidth: "0px",
        padding: 0,
        "& .MuiTabs-scroller": {
            overflowX: "auto",
        },
        "& .MuiTabs-flexContainer": {
            gridAutoFlow: "column",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr)) !important",
            gridAutoColumns: "minmax(160px, 1fr)",
        },
    },
    chip: {
        margin: "theme.spacing(0.5)",
    },
    card: {
        height: "90px", // Set a fixed height
        width: "90px", // Set a fixed width for a consistent aspect ratio
    },
};

const DynamicCard = dynamic(() => import('@mui/material/Card'), { ssr: false });


export default function ScrollNews() {
    const imageListRef = useRef(null);

    const [chipData, setChipData] = React.useState(images);

    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) =>
            chips.filter((chip) => chip.key !== chipToDelete.key)
        );
    };

    /*
                <Typography
                component="h1"
                variant="h4"
                align="center"
                color="darkblue"
                gutterBottom
            >
     */

    return (
        <Container sx={{ py: 8 }} maxWidth="xl">
            <Typography
                component="h1"
                variant="h4"
                align="center"
                color="#95232F"
                gutterBottom
            >
                Latest Blogs
            </Typography>
            <Typography
                component="h6"
                variant="h6"
                align="center"
                color="#95232F"
                fontSize="large"
                gutterBottom
            >
                Jump right to a winery to see what&#39;s new!
            </Typography>
        <Box sx={styles.root}>
            <Tabs
                variant="scrollable"
                value={0}
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
                sx={styles.tab}
            >
                {chipData.map((data) => {
                    let icon;

                    if (data.name === "lobo") {
                        icon = <TagFacesIcon />;
                    }

                    return (
                        <Tab
                            key={data.key}
                            label={
                                <DynamicCard
                                    sx={{
                                        height: '17em',
                                        width: '15em',
                                        display: 'flex',
                                        flexDirection: 'column'
                                }}
                                >
                                    <Link href={`../blogs/${data.blogId}`}>
                                        <CardMedia
                                            component="div"
                                            sx={{
                                                // 16:9
                                                pt: '56.25%',
                                                objectFit: 'contain', // This property ensures the image scales while maintaining its aspect ratio
                                            }}
                                            image={data.thumbnail.uri}
                                            alt={data.thumbnail.name}
                                            suppressHydrationWarning={true}
                                        />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography sx={{ fontSize: 'small', textTransform: 'none' }}>
                                            This is a media card. You can use this section to describe the
                                            content.
                                        </Typography>
                                    </CardContent>
                                    </Link>
                                </DynamicCard>
                            }
                            id={`simple-tab-${data.key}`}
                        />
                    );
                })}
            </Tabs>
        </Box>
        </Container>
    );
}
