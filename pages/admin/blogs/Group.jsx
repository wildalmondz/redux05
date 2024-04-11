//Instructions.jsx
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";


const AdminPage = styled('div')({
    display: 'flex',
    height: '4vw',
    position: 'initial',
    paddingBottom: '3em',
})

const Group = ({setGroupName, setGroupId}) => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4500/username', {
                    credentials: 'include', // Include credentials in the request
                });
                const data = await response.json();
                setResults(data);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs once on mount

    const myTestAuth = results;

    return (
        <>
            <AdminPage>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >

                    <div>
                        {(myTestAuth.results && myTestAuth.results["0"]) ? (
                            <div>
                            <h4>{myTestAuth.results["0"]}</h4>
                                <br />
                                <br />
                            <p>This is a secure side option. Login to continue.</p>
                            </div>
                        ) : (
                            <div>
                                <h4>Select a company or group to get started</h4>
                                <br />
                                <Autocomplete
                                    style={{ minWidth: '15em' }}
                                    options={results
                                        .slice() // Create a shallow copy to avoid mutating the original array
                                        .sort((a, b) => a.name.localeCompare(b.name))
                                    }
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Company/group"
                                            helperText="Select your company"
                                        />
                                    )}
                                    onChange={(event, value) => {
                                        if (value) {
                                            setGroupName(value.name);
                                            setGroupId(value.id);
                                        } else {
                                            setGroupName(''); // Clear the group name if no value is selected
                                            setGroupId(''); // Clear the group id if no value is selected
                                        }
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </Box>
            </AdminPage>
        </>
    );
};

export default Group;