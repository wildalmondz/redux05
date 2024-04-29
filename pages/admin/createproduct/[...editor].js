import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Radio, RadioGroup } from "@mui/material";
import { useDropzone } from 'react-dropzone';
import axios from "axios";
import { styled } from "@mui/material/styles";

let allNew = [];
let promises = [];

const AdminPage = styled('div')({
    height: '100%',
    position: 'initial',
    padding: '2em',
});

const Boarder = styled('div')({
    fontSize: '14px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    padding: '10px',
    border: '1px solid lightgray',
    borderRadius: '5px'
});

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
    const { editor } = router.query;
    const [imagePath, setImagePath] = useState('https://wildalmonds.com/api/uploads/');
    const [imageName, setImageName] = useState('');
    const [showImageNameInput, setShowImageNameInput] = useState(false);
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

    useEffect(() => {
        if (uploadedFile) {
            setImagePath('');
            setImageName(uploadedFile.name);
            setShowImageNameInput(true);
        }
    }, [uploadedFile]);

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setUploadedFile(file);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'image_path') {
            setImagePath(value);
            setImageName('');
            setShowImageNameInput(false);
            setUploadedFile(null);
        }

        if (name === 'new_product') { setNewProduct(value); }
        if (name === 'child_event') { setChildEvent(value); }
        if (name === 'image_name') { setImageName(value); }
        if (name === 'map_url') { setMapUrl(value); }
        if (name === 'product_description') { setNewDescription(value); }
        if (name === 'product_url') { setProductUrl(value); }
        if (name === 'reservation_url') { setReservationUrl(value); }
        if (name === 'video_url') { setVideoUrl(value); }
        if (name === 'square_status') { setSquareStatus(value); }
        if (name === 'is_ad') { setIsAd(value);}
    };

    const handleSaveButtonClick = async () => {
        const imageUrl = uploadedFile ? URL.createObjectURL(uploadedFile) : imagePath;

        alert(imageName);
        if (imageName) {
            setImagePath(`https://wildalmonds.com/api/uploads/${imageName}`)
        }
        // alert(imagePath);
        // alert(imageName);

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
        } else {
            try {
                let newImage = '';

                if (imageName) {
                    const formData = new FormData();
                    formData.append('imagefile', uploadedFile);



                    alert('https://wildalmonds.com/api/uploads/' + imageName);
                    // Upload the image file
                    //const response = await axios.post(`https://wildalmonds.com/api/ads/setimage/${imagePath}`);

                    await axios.post(
                        `https://wildalmonds.com/api/ads/setimage/${imagePath}`,
                        null,
                        {
                            withCredentials: true
                        }
                    );

                    // Get the new image path from the response
                    newImage = 'https://wildalmonds.com/api/uploads/' + response.data.imageFile;
                }

                // Set the image path to the new image URL if an image was uploaded
                const updatedImagePath = uploadedFile ? newImage : imagePath;

                // Proceed with the remaining Axios route
                promises.push(urlEncode2('blogText', textFieldValue));
                promises.push(urlEncode2('productUrl', productUrl));
                promises.push(urlEncode2('reservationUrl', reservationUrl));
                promises.push(urlEncode2('mapUrl', mapUrl));
                promises.push(urlEncode2('videoUrl', videoUrl));

                const encodeProductUrl = findProductUrl(allNew, 'productUrl');
                const encodeMapUrl = findProductUrl(allNew, 'mapUrl');
                const encodeReservationUrl = findProductUrl(allNew, 'reservationUrl');
                const encodeVideoUrl = findProductUrl(allNew, 'videoUrl');

                await Promise.all(promises);

                await axios.post(
                    `http://localhost:4500/blog/createproduct/null/null/null/${newProduct}/${newDescription}/null/0/${encodeProductUrl}/null/${squareStatus}/null/${encodeReservationUrl}/${encodeMapUrl}/${encodeVideoUrl}/null/null/null`,
                    null,
                    {
                        withCredentials: true
                    }
                );

                setImagePath(updatedImagePath); // Update the image path
                promises = [];
            } catch (error) {
                console.error('Error creating new blog:', error.message);
            }
        }
    };


    const handleSaveButtonClick_v01 = () => {
        const imageUrl = uploadedFile ? URL.createObjectURL(uploadedFile) : imagePath;


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
                /*
                // if an image file is defined, run the following axios command to upload the image file
                // then use the new path in the preceding post

                const formData = new FormData();
                let newImage = '';
                let writeImage = '';

                formData.append(
                    'imagefile',

                );
                axios.post('https://wildalmonds.com/api/ads/setimage', formData)
                const newImage = 'https://wildalmonds.com/api/uploads/' +


                 */

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
                    .then(async (result) => {



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

        // Handle save logic
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
                        label="Image Path"
                        name="image_path"
                        value={imagePath}
                        onChange={handleInputChange}
                        disabled={showImageNameInput}
                    />
                    {showImageNameInput && (
                        <TextField
                            style={{ width: "400px" }}
                            label="Image Name"
                            name="image_name"
                            value={imageName}
                            onChange={handleInputChange}
                        />
                    )}
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag & drop an image here, or click to select</p>
                        {uploadedFile && (
                            <div style={{ width: '70px', height: '70px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img src={URL.createObjectURL(uploadedFile)} alt="Uploaded Image Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
