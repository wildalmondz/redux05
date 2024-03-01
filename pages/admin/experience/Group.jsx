//htmltest.js
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import {styled} from "@mui/material/styles";
import {useAppSelector} from "@/redux/store";

const AdminPage = styled('div')({
    display: 'flex',
    height: '4vw',
    position: 'initial',
    paddingBottom: '3em',
})

const Group = ({setGroupName, setGroupId}) => {
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
    const [results, setResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedResult, setSelectedResult] = useState(null);

    const username = useAppSelector((state) => state.authReducer.value.username);

    useEffect(() => {
        const fetchData = async () => {
            try {
                //const response = await fetch('http://localhost:4500/username');
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


    const handleNameChange = (e) => {
        // const selectedLabel = currencies.find(option => option.value === e.target.value)?.label;
        const selectedLabel = results.find(result => result.id === e.target.value)?.name;
        const foundGroupId = results.find(result => result.id === e.target.value)?.id;
        setGroupName(selectedLabel);

    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleResultClick = (result) => {
        setSelectedResult(result);
        setGroupName(result.name);
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

    const myTestAuth = results;


    /*
    if ((myTestAuth.results) && (myTestAuth.results["0"])){
        console.log('Not Authenticated!!  ' +  myTestAuth.results["0"]);
    }
    else {
        console.log('HERE! HERE!!' +  JSON.stringify(results));
    }

     */

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
                                            label="Group/company"
                                            helperText="Select a group"
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