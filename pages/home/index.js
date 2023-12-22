import React, { useRef } from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

const images = [
    { thumbnail: { uri: 'https://wildalmonds.com/api/uploads/12d7fb07-5f3f-42a3-9519-baeaee476df7_Airfield.png',name:'airfield'}},
    { thumbnail: { uri: 'https://wildalmonds.com/api/uploads/a175eb24-9219-4513-a9c2-ff7bc97e21a6_425.png'  ,name:'425'}},
    { thumbnail: { uri: 'https://wildalmonds.com/api/uploads/6db0ed8e-cb75-4903-995a-2d8768887c0f_DeLille.png'  ,name:'DeLille'}},
    { thumbnail: { uri: 'https://wildalmonds.com/api/uploads/19fea62b-9a26-449e-a14d-443c3bdd4f4f_loveThatRed.png'  ,name:'loveRed'}},
    { thumbnail: { uri: 'https://wildalmonds.com/api/uploads/7d5c4c14-111a-47b0-a40d-809eb3ac25f0_loboHills.png'  ,name:'lobo'} },
    { thumbnail: { uri: 'https://wildalmonds.com/api/uploads/ae0d1c09-9de9-4a7c-a19d-f32a429e6fe2_RPW-Header-Logo.png'  ,name:'rockyPond'} },
    { thumbnail: { uri: 'https://wildalmonds.com/api/uploads/813fa15f-1273-4aab-9b3c-c9ac39f1b8dd_truthTeller.png'  ,name:'truth'} },
    { thumbnail: { uri: 'https://wildalmonds.com/api/uploads/94ba9d94-4794-41f8-99f5-46de694b760d_iconCellars.png'  ,name:'icon'} },
];

const Cats = () => {
    const imageListRef = useRef(null);

    const handleKeyDown = (event) => {
        const imageList = imageListRef.current;

        if (imageList) {
            const scrollAmount = 300; // You can adjust the scroll amount as needed

            switch (event.key) {
                case "ArrowLeft":
                    imageList.scrollLeft -= scrollAmount;
                    break;
                case "ArrowRight":
                    imageList.scrollLeft += scrollAmount;
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <>
            <header className="head">Upcoming Movies</header>
            <ImageList
                ref={imageListRef}
                sx={{
                    gridAutoFlow: "column",
                    gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr)) !important",
                    gridAutoColumns: "minmax(160px, 1fr)",
                    overflowX: "auto",
                }}
                onKeyDown={handleKeyDown}
                tabIndex="0"
            >
                {images.map((image, index) => (
                    <ImageListItem key={index}>
                        <img src={image.thumbnail.uri} alt={image.thumbnail.name} />
                        <ImageListItemBar title={image.thumbnail.name} />
                    </ImageListItem>
                ))}
            </ImageList>
        </>
    );
};

export default Cats;
