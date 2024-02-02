// Scroll.js

import React from "react";
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Container from '@mui/material/Container';
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import dynamic from 'next/dynamic';
import { handler } from "../api"


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

const Scroll = ({ results }) => {

    console.log(JSON.stringify(results));
    const [chipData, setChipData] = React.useState(results);

    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) =>
            chips.filter((chip) => chip.key !== chipToDelete.key)
        );
    };

    return (
        <Container sx={{ py: 8 }} maxWidth="xl">
            <Typography
                component="h1"
                variant="h4"
                align="center"
                color="darkblue"
                gutterBottom
            >
                Wine Regions
            </Typography>
            <Typography
                component="h6"
                variant="h6"
                align="center"
                color="darkblue"
                fontSize="large"
                gutterBottom
            >
                Scroll to browse, click to find out more about that region
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

                        if (data.image_path == null) {
                            data.image_path = 'https://wildalmonds.com/api/uploads/2a432b2a-5862-46ca-adcf-eac67a0c20ab_wildAlmondsLogo.jpeg';
                            console.log(data.image_path);
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
                                        <NextLink href={`../blogs/${data.type}/${data.slug}`} passHref>
                                            <Link>
                                                <a>
                                                <CardMedia
                                                    component="div"
                                                    sx={{
                                                        backgroundSize: 'contain',
                                                        pt: '61.25%',
                                                        objectFit: 'contain',
                                                    }}
                                                    image={data.image_path}
                                                    alt={data.name}
                                                    suppressHydrationWarning={true}
                                                />
                                                <CardContent sx={{ flexGrow: 1 }}>
                                                    <Typography sx={{ fontSize: 'medium', textTransform: 'none', color: 'black', textDecoration: 'none'  }}>
                                                        <h4>{data.name}</h4>
                                                        {data.blog_title}
                                                    </Typography>
                                                </CardContent>
                                                </a>
                                            </Link>
                                        </NextLink>
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

export async function getStaticProps() {
    const results = await handler(`http://localhost:4500/blog/frontblogs_v2`);
    // The value of the `props` key will be
    //  passed to the component
    return {
        props: {
            results
        }
    }
}

export default Scroll;