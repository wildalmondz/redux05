//htmltest.js
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import {styled} from "@mui/material/styles";
import {handler} from "../../api";

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
]

const AdminPage = styled('div')({
    display: 'flex',
    height: '4vw',
    position: 'initial',
    paddingBottom: '3em',
})

const Group = ({results, groupName, setGroupName}) => {

    const [id, setId] = useState(false);
    const [name, setName] = useState(false);
    const [tournament, setTournament] = useState('');
    const [tournament_id, setTournament_id] = useState('');
    const [tournament_name, setTournament_name] = useState('');
    const [tournament_description, setTournament_description] = useState('');
    const [almond_count, setAlmond_count] = useState('');
    const [square_count, setSquare_count] = useState('');
    const [tournament_status, setTournament_status] = useState('');
    const [tournament_restriction, setTournament_restriction] = useState('');
    const [expires, setExpires] = useState('');
    const [expired_status, setExpired_status] = useState('');
    const [company_image, setCompany_image] = useState('');


    const handleNameChange = (e) => {
        const selectedLabel = currencies.find(option => option.value === e.target.value)?.label;
        setGroupName(selectedLabel);
    };

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
        console.log('HERE! HERE!!' +  JSON.stringify(results));
    }

    return (
        <>
            <div>Group</div>
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
                        <TextField
                            style={{minWidth: '15em'}}
                            id="outlined-select-currency"
                            select
                            label="Group/company"
                            defaultValue=""
                            helperText="Select a group"
                            onChange={handleNameChange}
                        >
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
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

    // Define the getStaticProps function for data fetching at build time
    export async function getStaticProps() {
        try {
            // Fetch data from the API endpoint
            //let results = await handler(`http://localhost:4500/blog/frontblogs_v2`);
            console.log('In Static Props!');
           //  let results = await handler('http://localhost:4500/admin/username');

            const response = await fetch('http://localhost:4500/admin/username');
            const results = await response.json();

            // Return the data as props
            return {
                props: {
                    results,
                },
            };
        } catch (error) {
            console.error('Error fetching data:', error.message);

            // Return an empty object if there's an error
            return {
                props: {},
            };
        }
    }

export default Group;