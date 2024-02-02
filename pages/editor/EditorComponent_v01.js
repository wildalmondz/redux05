import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const EditorWithNoSSR = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), { ssr: false });

const HorizontalToolbar = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '8px', // Adjust as needed
    maxHeight: '2em', // Maximum height of the toolbar
    overflow: 'hidden',
});

const EditorComponent = () => {
    const [editorState, setEditorState] = useState();

    const handleSave = async () => {
        try {
            const content = JSON.stringify(editorState.getCurrentContent());
            await axios.post('/api/save', { content });
            console.log('Content saved successfully!');
        } catch (error) {
            console.error('Error saving content:', error);
        }
    };

    return (
        <div style={{ width: '100%' }}>
            <HorizontalToolbar sx={{ marginBottom: 2 }}>
                <EditorWithNoSSR
                    wrapperClassName="editor-wrapper"
                    editorClassName="editor-content"
                    toolbarClassName="horizontal-toolbar" // Apply custom class to the toolbar
                    onEditorStateChange={(state) => setEditorState(state)}
                    wrapperStyle={{
                        width: '100%', // Set the width to 100%
                        height: '10em'
                    }}
                    toolbarStyle={{
                        display: 'flex',
                        flexDirection: 'row',
                        maxHeight: '2em', // Maximum height of the toolbar
                        overflow: 'hidden',
                        justifyContent: 'space-evenly',
                    }}
                />
            </HorizontalToolbar>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSave}
            >
                Save
            </Button>
        </div>
    );
};

export default EditorComponent;