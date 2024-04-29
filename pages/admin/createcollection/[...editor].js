// admin/createproduct/[...editor].js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from "@mui/material/Button";
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {Radio, RadioGroup} from "@mui/material";
import { useDropzone } from 'react-dropzone';
import axios from "axios";
import {styled} from "@mui/material/styles";

let allNew = [];
let promises = [];

const AdminPage = styled('div')({
    height: '195vw',
    position: 'initial',
    padding: '2em',
})

const Boarder = styled('div')({
    fontSize: '14px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    padding: '10px',
    border: '1px solid lightgray',
    borderRadius: '5px'
})

function findProductUrl(arr, findUrl) {
    for (let obj of arr) {
        if (obj[findUrl]) {
            // return decodeURIComponent(obj.productUrl); // Decoding the URL to get the actual URL
            return obj[findUrl];
        }
    }
    return null; // Return null if productUrl is not found
}

function urlEncode2(name, userQuery) {
    return new Promise((resolve, reject) => {
        let res = encodeURIComponent(userQuery);
        res = res.replace(/[/]/g, '%2F')
            .replace(/[?]/g, '%3F')
            .replace(/[#]/g, '%23')
            .replace(/'/g, '%27');

        const newVal = res;
        allNew.push({ [name]: newVal });
        resolve(newVal);
        reject(err);
    });
}

function validateName(name) {
    // Define a regular expression pattern to match "https://" at the start of the string
    const pattern = /^https:\/\//;

    // Test if the first 8 characters of the name match the pattern
    const isValid = pattern.test(name.substring(0, 8));

    return isValid;
}

export default function Page() {
    const router = useRouter();
    const { editor } = router.query; // Destructure param from query
    const [imagePath, setImagePath] = useState('');
    const [mapUrl, setMapUrl] = useState('');
    const [newProduct, setNewProduct] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newDivision, setNewDivision] = useState('null');
    const [newRank, setNewRank] = useState('');
    const [productUrl, setProductUrl] = useState('');
    const [reservationUrl, setReservationUrl] = useState('');
    const [childEvent, setChildEvent] = useState('');
    const [squareStatus, setSquareStatus] = useState('active');
    const [isAd, setIsAd] = useState('0');
    const [textFieldValue, setTextFieldValue] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        alert(JSON.stringify(file));
        setUploadedFile(file);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleInputChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if (name === 'new_product') { setNewProduct(value); }
        if (name === 'child_event') { setChildEvent(value); }
        if (name === 'image_path') { setImagePath(value); }
        if (name === 'map_url') { setMapUrl(value); }
        if (name === 'product_description') { setNewDescription(value); }
        if (name === 'product_url') { setProductUrl(value); }
        if (name === 'reservation_url') { setReservationUrl(value); }
        if (name === 'video_url') { setVideoUrl(value); }
        if (name === 'square_status') { setSquareStatus(value); }
        if (name === 'is_ad') { setIsAd(value);}
    }

    const handleSaveButtonClick = () => {

        if (productUrl) {
            if (!validateName(productUrl)) { alert('URL error!'); }
        }

        if (childEvent) {
            if (!validateName(childEvent)) { alert('URL error!'); }
        }

        if (
            (newProduct === '') ||
            (newProduct === undefined) ||
            (newProduct == null)) {
            alert('Product Name required');
        }
        else {
            try {
                promises.push(urlEncode2('blogText', textFieldValue));
                promises.push(urlEncode2('productUrl', productUrl));
                promises.push(urlEncode2('reservationUrl', reservationUrl));
                promises.push(urlEncode2('mapUrl', mapUrl));
                promises.push(urlEncode2('videoUrl', videoUrl));

                const encodeProductUrl = findProductUrl(allNew, 'productUrl');
                const encodeMapUrl = findProductUrl(allNew, 'mapUrl');
                const encodeReservationUrl = findProductUrl(allNew, 'reservationUrl');
                const encodeVideoUrl = findProductUrl(allNew, 'videoUrl');

                Promise.all(promises)
                    .then(async (result) => { // Corrected line
                            await axios.post(
                            `http://localhost:4500/blog/createproduct/null/null/null/${newProduct}/${newDescription}/null/0/${encodeProductUrl}/null/${squareStatus}/null/${encodeReservationUrl}/${encodeMapUrl}/${encodeVideoUrl}/null/null/null`,
                            null, // Set request body to null since you're not sending any data
                            {
                                withCredentials: true // Include credentials with the request
                            }
                        );
                        promises = [];
                    });
            } catch (error) {
                console.error('Error creating new blog:', error.message);
            }
        }
    };

    return (
        <>
        <div>
            <p>Post: {editor ? editor[1] : ''}</p>
        </div>
            <AdminPage>
            <br />
            <TextField
                style={{ width: "200px" }}
                required={true}
                label="Product Name"
                name="new_product"
                value={newProduct}
                inputProps={{
                    maxLength: 32, // Limit to 255 characters
                }}
                onChange={handleInputChange}
            />
            <div style={{fontSize: '12px', color: 'grey'}}>{32 - newProduct.length} characters remaining</div>
            < br/>
            < br/>
            <TextField
                fullWidth
                id="outlined-multiline-flexible"
                label="Description"
                name="product_description"
                multiline
                rows={4}
                defaultValue="Product Description"
                value={newDescription}
                inputProps={{
                    maxLength: 255, // Limit to 255 characters
                }}
                onChange={handleInputChange}
            />
            <div style={{fontSize: '12px', color: 'grey'}}>{255 - newDescription.length} characters remaining</div>
            < br/>
                < br/>
                <Boarder>
                <TextField
                    style={{ width: "400px" }}
                    required={true}
                    label="Image Path"
                    name="image_path"
                    value={imagePath}
                    inputProps={{
                        maxLength: 1024, // Limit to 255 characters
                    }}
                    onChange={handleInputChange}
                />
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag & drop an image here, or click to select</p>
                        {uploadedFile && (
                            <div style={{ width: '70px', height: '70px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {uploadedFile.type.startsWith('image/') ? (
                                    <img src={URL.createObjectURL(uploadedFile)} alt="Uploaded Image Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <p>Uploaded: {uploadedFile.name}</p>
                                )}
                            </div>
                        )}
                    </div>
                </Boarder>
                < br/>
                < br/>
                <TextField
                    style={{ width: "400px" }}
                    label="Child Id"
                    name="child_event"
                    value={childEvent}
                    onChange={handleInputChange}
                />
                < br/>
                < br/>
            <Boarder>
                <div style={{fontSize: '14px', color: 'indianred'}}>https addresses required!</div>
                < br/>
                < br/>
            <TextField
                style={{ width: "400px" }}
                label="Product Url"
                name="product_url"
                value={productUrl}
                onChange={handleInputChange}
            />
                < br/>
                < br/>
            <TextField
                style={{ width: "400px" }}
                label="Reservation Url"
                name="reservation_url"
                value={reservationUrl}
                inputProps={{
                    maxLength: 1024, // Limit to 255 characters
                }}
                onChange={handleInputChange}
            />
                < br/>
                < br/>
            <TextField
                style={{ width: "400px" }}
                label="Google Map Url"
                name="map_url"
                value={mapUrl}
                inputProps={{
                    maxLength: 1024, // Limit to 255 characters
                }}
                onChange={handleInputChange}
            />
                < br/>
                < br/>
            <TextField
                style={{ width: "400px" }}
                required={true}
                label="YouTube URL"
                name="video_url"
                value={videoUrl}
                inputProps={{
                    maxLength: 1024, // Limit to 255 characters
                }}
                onChange={handleInputChange}
            />
       < br/>
                < br/>
            </Boarder>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <FormLabel id="demo-controlled-radio-buttons-group">Rankable?</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="is_ad"
                    value={isAd}
                    onChange={handleInputChange}
                >
                    <FormControlLabel value="0" control={<Radio />} label="Yes" />
                    <FormControlLabel value="1" control={<Radio />} label="No" />
                </RadioGroup>
            </FormControl>
            < br />

            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <FormLabel id="demo-controlled-radio-buttons-group">Accessibility</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="square_status"
                    value={squareStatus}
                    onChange={handleInputChange}
                >
                    <FormControlLabel value="active" control={<Radio />} label="active" />
                    <FormControlLabel value="inactive" control={<Radio />} label="inactive" />
                </RadioGroup>
            </FormControl>
            < br/>
            < br/>
                <Boarder>
                    <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                        <TextField
                            style={{ width: "140px" }}
                            label="Division"
                            name="new_division"
                            value={newDivision}
                            inputProps={{
                                maxLength: 32, // Limit to 255 characters
                            }}
                            onChange={handleInputChange}
                        />

                        < br/>
                        < br/>
                        <TextField
                            style={{ width: "140px" }}
                            label="Product Rank"
                            name="new_rank"
                            value={newRank}
                            inputProps={{
                                maxLength: 32, // Limit to 255 characters
                            }}
                            onChange={handleInputChange}
                        />
                    </div>
                </Boarder>
            <Button
                type="submit"
                variant="contained"
                onClick={handleSaveButtonClick}
                style={{ height: '2em', marginLeft: '2%', marginTop: '1%' }}
            >
                Save
            </Button>
            </AdminPage>
        </>
    );
}