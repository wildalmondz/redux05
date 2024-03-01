//htmltest.js
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import {styled} from "@mui/material/styles";
import {useAppSelector} from "@/redux/store";
import {handler} from "../../api";
import Autocomplete from "@mui/material/Autocomplete";
//import axios from 'axios';

const AdminPage = styled('div')({
    display: 'flex',
    height: '4vw',
    position: 'initial',
    paddingBottom: '3em',
})

const Collection = ({ groupName }) => {
    const [id, setId] = useState(false);
    const [name, setName] = useState(false);
    const [tournament, setTournament] = useState('');
    const [tournament_id, setTournament_id] = useState('');
    const [tournament_name, setTournament_name] = useState('');
    const [tournament_description, setTournament_description] = useState('');
    const [almond_count, setAlmond_count] = useState('');
    const [square_count, setSquare_count] = useState('');
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


    const handleInputChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let clientError = false;

        if (name === 'almond_count') {
            if ((square_count === undefined) || (value > square_count)) {
                alert(almond_count + 'Almond count [' + value + '] cannot exceed square count of [' + square_count + ']');

                this.setState({
                    [name]: almond_count,
                });
                clientError = true;
            }
        }

        if (name === 'square_count') {
            if (value < almond_count) {
                alert('Square count [' + value + '] cannot be less than Almond count of [' + almond_count + ']');
            }
        }

        if (name === 'expires') {
            // alert('Expires [' + value + ']');
        }

        if (clientError != true) {
            // alert(name + ' | ' + value);
            this.setState({
                [name]: value,
            });
        }
    };

    if (results){
        console.log('Collection! Tournament!!' +  JSON.stringify(results));
    }

    return (
        <>
            <div>Collection</div>
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
                                    label="Collection"
                                    helperText="Select a collection"
                                />
                            )}
                            onChange={(event, value) => {
                                if (value) {
                                    setTournament_name(value.name);
                                } else {
                                    setTournament_name(''); // Clear the group name if no value is selected
                                }
                            }}
                        />
                        <div className="flex-parent-element">
                            <div className="flex-child-element green">
                                <TextField
                                    style={{minWidth: '15em'}}
                                    required={true}
                                    select
                                    label="Tournament Name"
                                    name="tournament_name"
                                    value={tournament_name}
                                    onChange={handleInputChange}
                                />
                                <br />
                                <TextField
                                    style={{minWidth: '15em'}}
                                    fullWidth
                                    id="outlined-multiline-flexible"
                                    label="Description"
                                    name="tournament_description"
                                    multiline
                                    rows={4}
                                    defaultValue="Tournament Description"
                                    value={tournament_description}
                                    onChange={handleInputChange}
                                />
                                <br />
                                <br />
                                <TextField
                                    style={{minWidth: '15em'}}
                                    disabled
                                    id="outlined-number"
                                    label="Square Count"
                                    name="square_count"
                                    type="number"
                                    value={square_count}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <br />
                                <TextField
                                    style={{minWidth: '15em'}}
                                    required={true}
                                    label="Almond Count"
                                    name="almond_count"
                                    value={almond_count}
                                    onChange={handleInputChange}
                                />
                                <br />
                            </div>
                        </div>
                    </div>
                </Box>
            </AdminPage>
        </>
    );
};

export default Collection;