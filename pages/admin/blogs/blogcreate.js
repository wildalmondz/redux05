import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Button from "@mui/material/Button";
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {Radio, RadioGroup} from "@mui/material";
import { useRouter } from 'next/router';
import axios from 'axios';

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

export default function TinyMCE() {

    const router = useRouter();
    const { myParam } = router.query;

    const [id, setId] = useState(0);
    const [blogTitle, setBlogTitle] = useState('');
    const [blogStatus, setBlogStatus] = useState('inactive');
    const [blogLikes, setBlogLikes] = useState('');
    const [blogImage, setBlogImage] = useState('');
    const [textFieldValue, setTextFieldValue] = useState('');
    const [results, setResults] = useState([]);

    const handleInputChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let clientError = false;

        if (clientError != true) {

            if (name === 'almond_count') {
                if ((square_count === undefined) || (value > square_count)) {
                    alert(almond_count + 'Almond count [' + value + '] cannot exceed square count of [' + square_count + ']');
                    clientError = true;
                }
                else {
                    setAlmond_count(value);
                }
            }

            if (name === 'square_count') {
                if (value < almond_count) {
                    alert('Square count [' + value + '] cannot be less than Almond count of [' + almond_count + ']');
                }
                else {

                }
            }

            if (name === 'new_title') {
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

    const handleChange = (content, editor) => {
        setTextFieldValue(content);
    }

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

                Promise.all(promises)
                    .then(async (result) => { // Corrected line
                        await axios.post(`http://localhost:4500/blog/createblog/601/${allNew[0].blogTitle}/${allNew[1].blogText}/184/active/0/${allNew[1].image}`);
                        promises = [];
                    });
            } catch (error) {
                console.error('Error creating new blog:', error.message);
            }
        }
    };

    return (
        <>
            <br />
            <h1>Route Parameter: {myParam}</h1>
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
            <div style={{fontSize: '12px', color: 'grey'}}>{128 - blogTitle.length} characters remaining</div>
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
            initialValue={JSON.stringify(results)}
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
}

/// or19otwv480dlg4dcllv6o3lh2azsclkrpnwkfdqx2xspp86