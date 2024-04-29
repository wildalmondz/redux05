import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Button from "@mui/material/Button";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';


/*
		this.setState({
			id: null,
			blogId: null,
			type: '',
			slug: '',
		});

		if (nextProps.playerId) { this.setState({ playerId: nextProps.playerId }); }

		if ((nextProps.companyDetails) && (nextProps.companyDetails[0])){
			this.setState({
				playerId: nextProps.playerId,
				id: nextProps.companyDetails[0].id,
				company_name: nextProps.companyDetails[0].name,
				type: nextProps.companyDetails[0].type,
				slug: nextProps.companyDetails[0].slug,
			});
		}


		localhost:4500/blog/userblogs
 */

export default function TinyMCE() {


    const [id, setId] = useState(0);
    const [blogTitle, setBlogtitle] = useState('');
    const [blogStatus, setBlogStatus] = useState('');
    const [blogLikes, setBlogLikes] = useState('');
    const [textFieldValue, setTextFieldValue] = useState('');
    const [results, setResults] = useState([]);

    /*
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const response = await fetch(`http://localhost:4500/blog/userblogs`, {
                    //credentials: 'include', // Include credentials in the request
                });
                const data = await response.json();
                setResults(data);
                alert(data[0][0].id);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchInitialData();
    }, []); // Empty dependency array means this effect runs once on mount

     */

    const handleChange = (content, editor) => {
        setTextFieldValue(content);
    }

    const handleSaveButtonClick = () => {
        alert(textFieldValue);
    };

    return (
        <>
            <span>https://www.tiny.cloud/my-account/integrate/#react</span>
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
            <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Publish" />
                <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
            </FormGroup>
            <Button
                type="submit"
                variant="contained"
                onClick={handleSaveButtonClick}
                style={{ height: '2em', marginLeft: '70%' }}
            >
                Save
            </Button>
        </>
    );
}


/// or19otwv480dlg4dcllv6o3lh2azsclkrpnwkfdqx2xspp86