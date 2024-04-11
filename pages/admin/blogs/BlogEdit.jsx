// BlogEdit.jsx
import React, { useState, useEffect } from 'react';
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {Radio, RadioGroup} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import {Editor} from "@tinymce/tinymce-react";
import Button from "@mui/material/Button";
import axios from "axios";

let allNew = [];
let promises = [];

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

export default function BlogEdit({ blogId }){

    const [id, setId] = useState(0);
    const [blogTitle, setBlogTitle] = useState('');
    const [blogText, setBlogText] = useState('');
    const [foundBlogDeets, setFoundBlogDeets] = useState(false);
    const [blogStatus, setBlogStatus] = useState('');
    const [blogLikes, setBlogLikes] = useState('');
    const [blogImage, setBlogImage] = useState('');
    const [textFieldValue, setTextFieldValue] = useState('');
    const [results, setResults] = useState([]);


    const foundBlog  = results[0] || [];

    /*
    if ((foundBlog[0]) && (foundBlog[0].title) && (foundBlogDeets == false)) {
        console.log('Here!' + JSON.stringify(foundBlog));
        setBlogTitle(foundBlog[0].title);
        setFoundBlogDeets(true);
    }

     */

    if  ((foundBlog[0]) && (foundBlogDeets == false)) {

        if (foundBlog[0].title) { setBlogTitle(foundBlog[0].title); }
        if (foundBlog[0].status) { setBlogStatus(foundBlog[0].status); }
        if (foundBlog[0].blog) { setBlogText(foundBlog[0].blog); }

        setFoundBlogDeets(true);
    }




    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const response = await fetch(`http://localhost:4500/blog/editblog/${blogId}`, {
                    credentials: 'include', // Include credentials in the request
                });
                const data = await response.json();
                setResults(data);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };
        fetchInitialData();
    }, []); // Empty dependency array means this effect runs once on mount


    const handleChange = (content, editor) => {
        setTextFieldValue(content);
    }

    const handleInputChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let clientError = false;

        if (clientError != true) {

            if (name === 'new_title') {
                // alert(value);
                setBlogTitle(value);
            }

            if (name === 'new_tournament') { setNew_tournament(value); }
            if (name === 'tournament_description') { setTournament_description(value); }

            if (name === 'expires') {
                setExpires(value);
            }
            if (name === 'tournament_status') {
                setTournament_status(value);
            }
            if (name === 'expired_status') {
                setExpired_status(value);
            }
            if (name === 'blog_status') {
                setBlogStatus(value);
            }
        }
    };

    /*
    const handleSaveButtonClick = (e) => {
        alert(e);
    }

     */

    /*
        useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const response = await fetch(`http://localhost:4500/blog/userblogs`, {
                    credentials: 'include', // Include credentials in the request
                });
                const data = await response.json();
                setResults(data);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };
        fetchInitialData();
    }, []); // Empty dependency array means this effect runs once on mount
     */

    const handleSaveButtonClick = () => {
        if ((blogTitle === '') ||
            (blogTitle === undefined) ||
            (blogTitle == null) ||
            (textFieldValue === '') ||
            (textFieldValue === undefined) ||
            (textFieldValue == null)) {
            alert('Blog Title and Text Required');
        }
        else {
            try {
                promises.push(urlEncode2('blogTitle', blogTitle));
                promises.push(urlEncode2('blogText', textFieldValue));
                promises.push(urlEncode2('image', blogImage));

                // router.put('/editblog/:blogId/:title/:blog/:author/:updatedAt/:status/:likes/:imagePath'

                Promise.all(promises)
                    .then(async (result) => { // Corrected line
                        await axios.put(
                            `http://localhost:4500/blog/editblog/${blogId}/${allNew[0].blogTitle}/${allNew[1].blogText}/${blogStatus}/${allNew[1].image}`,
                            null, // Set request body to null since you're not sending any data
                            {
                                withCredentials: true // Include credentials with the request
                            }
                        );

                        promises = [];

                        // Reset state variables
                        /*
                        setBlogTitle('');
                        setBlogText('');
                        setBlogStatus('');
                        setTextFieldValue('');
                        setFoundBlogDeets(false);
                        setResults([]);

                         */
                        window.location.reload(); // Reload current URL
                    });
            } catch (error) {
                console.error('Error creating new blog:', error.message);
            }
        }
    };

    return (
        <>
            <br />
            <TextField
                required={true}
                label="Blog Title"
                name="new_title"
                value={blogTitle}
                onChange={handleInputChange}
                fullWidth // Span the width of the window
                inputProps={{
                    maxLength: 128, // Limit to 255 characters
                }}
            />
            <div style={{fontSize: '12px', color: 'grey'}}></div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <FormLabel id="demo-controlled-radio-buttons-group">Accessibility</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="blog_status"
                    value={blogStatus}
                    onChange={handleInputChange}
                >
                    <FormControlLabel value="active" control={<Radio />} label="active" />
                    <FormControlLabel value="inactive" control={<Radio />} label="inactive" />
                </RadioGroup>
            </FormControl>
            <Editor
                apiKey='or19otwv480dlg4dcllv6o3lh2azsclkrpnwkfdqx2xspp86'
                init={{
                    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                    tinycomments_mode: 'embedded',
                    tinycomments_author: 'Author name',
                    mergetags_list: [
                        { value: 'First.Name', title: 'First Name' },
                        { value: 'Email', title: 'Email' },
                    ],
                    ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                }}
                initialValue={blogText}
                onEditorChange={handleChange}
            />
            <Button
                type="submit"
                variant="contained"
                onClick={handleSaveButtonClick}
                style={{ height: '2em', marginLeft: '2%', marginTop: '1%' }}
            >
                Save
            </Button>
        </>
    );
};