import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const EditorWithNoSSR = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), { ssr: false });

let cleanInsert;

const EditorComponent = ({ foundComment, userId, gameId, squareId }) => {
    const [editorState, setEditorState] = useState();
    const [textFieldValue, setTextFieldValue] = useState('');
    const [foundUserId, setUserId] = useState('');

    /*
const cleanInsert = (item) => {
    let res = encodeURIComponent(gameName);
    res = res.replace(/[/]/g, '%2F').replace(/[?]/g, '%3F').replace(/[#]/g, '%23').replace(/'/g, '%27');
    const newVal = res;
}

//         this.props.onSetComment(this.props.game_id, this.props.userId, res);
 */

    useEffect(() => {
        // Set initial value when foundComment changes
        setTextFieldValue(foundComment || '');
    }, [foundComment]);

    useEffect(() => {
        // Set initial value when foundComment changes
        setUserId(userId || '');
    }, [userId]);

    const handleSave = async () => {
        try {
            // alert(foundUserId);

            cleanInsert = encodeURIComponent(textFieldValue);
            cleanInsert = cleanInsert.replace(/[/]/g, '%2F')
                .replace(/[?]/g, '%3F')
                .replace(/[']/g, '%27')
                .replace(/["]/g, '%22')
                .replace(/[#]/g, '%23');


            await axios.post(`http://localhost:4500/pick/setsquarecomment_v2/${userId}/${gameId}/${squareId}/false/${cleanInsert}`, { textFieldValue });
            console.log('Content saved successfully!');
            cleanInsert = '';
        } catch (error) {
            console.error('Error saving content:', error);
        }
    };

    if (!squareId) {
        return <></>; // Return empty fragment if squareId is not defined
    }

    return (
        <div style={{ width: '100%' }}>
            <Button
                type="submit"
                variant="contained"
                onClick={handleSave}
                style={{ height: '2em', marginLeft: '70%' }}
            >
                Save
            </Button>
            <TextField
                label="Square Comment"
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
