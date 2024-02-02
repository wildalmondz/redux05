import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const EditorWithNoSSR = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), { ssr: false });

const HeaderContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '8px', // Adjust as needed
    maxHeight: '2em', // Maximum height of the toolbar
    overflow: 'hidden',
    width: '100%', // Set the width to 100%
});

let setComment = false;
let commentLabel = 'Square Comment';

const EditorComponent = (foundComment) => {

    const [editorState, setEditorState] = useState();
    const [textFieldValue, setTextFieldValue] = useState(null);

    console.log('Found comment: ' + JSON.stringify(foundComment));

    if ((foundComment) && (foundComment.foundComment != null)) {
        commentLabel = '';
    }

    if ((textFieldValue == null) && (setComment === false)) {
        setTextFieldValue(foundComment.foundComment);
        setComment = true;
    }

    const handleSave = async () => {
        try {
            // const content = JSON.stringify(editorState.getCurrentContent());
            alert(textFieldValue)
            await axios.post('/api/save', { content, textFieldValue });
            console.log('Content saved successfully!');
        } catch (error) {
            console.error('Error saving content:', error);
        }
    };

    return (
        <div style={{ width: '100%' }}>
                <Button
                    type="submit"
                    variant="contained"
                    onClick={handleSave}
                    style={{height: '2em', marginLeft: '70%' }}
                >
                    Save
                </Button>
            <TextField
                label={commentLabel}
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={foundComment.foundComment}
                onChange={(e) => setTextFieldValue(e.target.value)}
            />
        </div>
    );
};

export default EditorComponent;