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

const EditorComponent = () => {
    const [editorState, setEditorState] = useState();
    const [textFieldValue, setTextFieldValue] = useState('');

    const handleSave = async () => {
        try {
            const content = JSON.stringify(editorState.getCurrentContent());
            await axios.post('/api/save', { content, textFieldValue });
            console.log('Content saved successfully!');
        } catch (error) {
            console.error('Error saving content:', error);
        }
    };

    return (
        <div style={{ width: '100%' }}>
            <HeaderContainer>
                <EditorWithNoSSR
                    wrapperClassName="editor-wrapper"
                    editorClassName="editor-content"
                    toolbarClassName="horizontal-toolbar" // Apply custom class to the toolbar
                    onEditorStateChange={(state) => setEditorState(state)}
                    wrapperStyle={{
                        width: '70%', // Set the width to 70%
                        height: '10em',
                    }}
                    toolbarStyle={{
                        display: 'flex',
                        flexDirection: 'row',
                        maxHeight: '2em', // Maximum height of the toolbar
                        overflowX: 'auto', // Allow horizontal scrolling
                        justifyContent: 'space-evenly',
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    onClick={handleSave}
                    style={{ width: '20%', marginLeft: '10%' }}
                >
                    Save
                </Button>
            </HeaderContainer>
            <TextField
                label="Square Comments"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={textFieldValue}
                onChange={(e) => setTextFieldValue(e.target.value)}
            />
        </div>
    );
};

export default EditorComponent;
