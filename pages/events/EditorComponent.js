import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const EditorWithNoSSR = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), { ssr: false });

let cleanInsert;

const EditorComponent = ({
                             foundComment,
                             userId,
                             gameId,
                             squareId,
                             isSoftSave,
                             setIsSoftSave,
                             hasChanges,
                             setHasChanges,
                             softSquare,
                             setIsSoftSquare,
                             textFieldValue,
                             setTextFieldValue   }) => {
    const [editChange, setEditChange] = useState(false);

    useEffect(() => {
        // Set initial value when foundComment changes
        setTextFieldValue(foundComment || '');
    }, [foundComment]);

    const handleSave = async () => {
        try {
            cleanInsert = encodeURIComponent(textFieldValue);
            cleanInsert = cleanInsert.replace(/[/]/g, '%2F')
                .replace(/[?]/g, '%3F')
                .replace(/[']/g, '%27')
                .replace(/["]/g, '%22')
                .replace(/[#]/g, '%23');

            await axios.post(`http://localhost:4500/pick/setsquarecomment_v2/${userId}/${gameId}/${squareId}/${isSoftSave}/${cleanInsert}`, { textFieldValue });
            console.log('Content saved successfully!' + textFieldValue);
            setHasChanges(false); // Reset changes after saving
            setEditChange(false); // Reset changes after saving
            setTextFieldValue(textFieldValue)

            cleanInsert = '';
        } catch (error) {
            console.error('Error saving content:', error);
        }
    };

    const handleSaveButtonClick = () => {
        setIsSoftSave(false); // Set isSoftSave to false before executing handleSave
        handleSave();
    };

    const handleTextFieldChange = (e) => {
        setTextFieldValue(e.target.value);
        setHasChanges(true); // Set changes when text field changes
        setIsSoftSave(true); // Set edit change
        setIsSoftSquare(squareId); // Set edit change
        console.log(softSquare)
    };

    useEffect(() => {
        const softSaveBeforeUnmount = async () => {
            if ((hasChanges) && (editChange == true)) {
                setIsSoftSave(true);
                alert('Softsave triggered in Editor Component' + editChange);
                //await handleSave();
            }
        };

        const cleanup = () => {
            softSaveBeforeUnmount();
        };

        window.addEventListener('beforeunload', softSaveBeforeUnmount);

        return cleanup;
    }, [hasChanges]);

    if (!squareId) {
        return <></>; // Return an empty fragment if squareId is not defined
    }

    return (
        <div style={{ width: '100%' }}>
            {hasChanges ? (
                <Button
                    type="submit"
                    variant="contained"
                    onClick={handleSaveButtonClick}
                    style={{ height: '2em', marginLeft: '70%' }}
                >
                    Save
                </Button>
            ) : <div style={{ height: '2em', marginLeft: '70%' }}>
                </div>}
            <TextField
                label="Square Comment"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={textFieldValue}
                onChange={handleTextFieldChange}
            />
        </div>
    );


};

export default EditorComponent;