//Collection.jsx
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {FormControlLabel, Radio, RadioGroup} from "@mui/material";
import Button from "@mui/material/Button";
import ProductTable from "./ProductTable";

const AdminPage = styled('div')({
    display: 'flex',
    height: '4vw',
    position: 'initial',
    paddingBottom: '3em',
})

const Collection = ({ groupId, groupName, setCollectionName, setTournament_id, tournament_id }) => {
    const [expires, setExpires] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [expired_status, setExpired_status] = useState('');
    const [newCollection, setNewCollection] = useState(false);
    const [new_tournament, setNew_tournament] = useState('');
    const [tournament, setTournament] = useState('');
    const [tournament_name, setTournament_name] = useState('--New--');
    const [tournament_description, setTournament_description] = useState('');
    const [tournament_restriction, setTournament_restriction] = useState('');
    const [tournament_status, setTournament_status] = useState('');
    const [almond_count, setAlmond_count] = useState('');
    const [square_count, setSquare_count] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const response = await fetch(`http://localhost:4500/admintournaments/${groupId}`, {
                    credentials: 'include', // Include credentials in the request
                });
                const data = await response.json();
                setResults(data);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchInitialData();
    }, []); // Empty dependency array means this effect runs once on mount


    useEffect(() => {
        const fetchCollectionData = async () => {
            if (tournament_id != '') {
                try {
                    const collectionResponse = await fetch(`http://localhost:4500/admintournament/${tournament_id}`, {
                        credentials: 'include', // Include credentials in the request
                    });
                    const collectionData = await collectionResponse.json();
                    setTournament(collectionData);
                    setTournament_description(collectionData[0][0].tournament_description);
                    setAlmond_count(collectionData[0][0].almond_count);
                    setSquare_count(collectionData[0][0].square_count);
                    setTournament_status(collectionData[0][0].tournament_status);
                    setExpires(collectionData[0][0].expires);
                    setExpired_status(collectionData[0][0].expired_status);
                    setTournament_restriction(collectionData[0][0].tournament_restriction);
                } catch (error) {
                    console.error('Error fetching data:', error.message);
                }
            }
        };

        fetchCollectionData();
    }, [tournament_id]); // Empty dependency array means this effect runs once on mount

    const handleSubmit = () => {
        let existing;
        let writeExpires;

        if (expires !== '') {
            writeExpires = expires + ':00.00';
        }
        else {
            writeExpires = null;
        }

        return new Promise((resolve, reject) => {
            const err = 'Error!';


            if(tournament_id) {

                alert('Update here!');
                // set confirmation here

                return fetch(`http://localhost:4500/updatetourney/${tournament_id}/${tournament_name}/${tournament_description}/${tournament_restriction}/${almond_count}/${tournament_status}/${square_count}/${expires}/${expired_status}`, {
                    mode: 'cors',
                    method: 'put',
                    credentials: 'include',
                    headers: {Accept: 'application/json'},
                })
                    .then((response) => {
                        if (response.ok) {
                            console.log(response.json())
                            //return response.json();
                        }
                        //throw new Error('Bad HTTP stuff');
                    })
                resolve('Added Ok');
                reject(Error);
            }

            else {
                alert('New add no tournament_id found'
                + JSON.stringify(tournament)
               +  'null' + ' '
                    +  ' new_tournament ' + new_tournament
                    +  ' tournament_description ' + tournament_description
                    +  ' tournament_restriction ' + tournament_restriction
                    +  ' almond_count ' + almond_count
                    +  ' tournament_status' + tournament_status
                    +  ' square_count' + square_count
                    +  ' writeExpires ' + writeExpires
                    +  ' expired_status '  + expired_status
                    +  ' id ' + companyId + ' ');
                /*
                this.props.onCreateTourney(
                    'null',
                    this.state.tournament_name,
                    this.state.tournament_description,
                    this.state.tournament_restriction,
                    this.state.almond_count,
                    this.state.tournament_status,
                    this.state.square_count,
                    writeExpires,
                    this.state.expired_status,
                    this.state.id);
                    */

            }
        });
    };

    const handleInputChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let clientError = false;

        if (clientError != true) {

            if (name === 'almond_count') {
                if ((square_count === undefined) || (value > square_count)) {
                    alert(almond_count + 'Almond count [' + value + '] cannot exceed square count of [' + square_count + ']');
                    clientError = true;
                }
                else {
                        setAlmond_count(value);
                }
            }

            if (name === 'square_count') {
                if (value < almond_count) {
                    alert('Square count [' + value + '] cannot be less than Almond count of [' + almond_count + ']');
                }
                else {

                }
            }

            if (name === 'tournament_name') {
                setTournament_name(value);
            }

            if (name === 'new_tournament') { setNew_tournament(value); }
            if (name === 'tournament_description') { setTournament_description(value); }

            if (name === 'expires') {
                setExpires(value);
            }

            if (name === 'tournament_status') {
                setTournament_status(value);
            }
            if (name === 'expired_status') {
                setExpired_status(value);
            }
            if (name === 'tournament_restriction') {
                setTournament_restriction(value);
            }
        }
    };

    if (results){
        console.log('Collection! Tournament!!' +  JSON.stringify(results));
    }

    //            <div>Results: {JSON.stringify(tournament)}</div>
    return (
        <>
            <h2>Collection</h2>
            <h4>Group: {groupName}</h4>
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
                            options={[
                                { tournament_name: '--New--' },
                                ...results.slice().sort((a, b) => a.tournament_name.localeCompare(b.tournament_name)),
                            ]}
                            getOptionLabel={(option) => option.tournament_name}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Collection"
                                    helperText="Select a collection"
                                />
                            )}
                            isOptionEqualToValue={(option, value) => option.tournament_name === value.tournament_name}
                            value={{ tournament_name: tournament_name }}
                            onChange={(event, value) => {
                                if (value) {
                                    if (value.tournament_name === '--New--') {
                                        alert('Add a new Collection');
                                        setNewCollection(true);
                                        setTournament_id('');
                                        setTournament('');
                                        setTournament_description('');
                                        setAlmond_count('');
                                        setSquare_count('');
                                        setTournament_status('');
                                        setExpires('');
                                        setExpired_status('');
                                        setTournament_restriction('');
                                    } else {
                                        setCollectionName(value.tournament_name);
                                        setTournament_name(value.tournament_name);
                                        setTournament_id(value.tournament_id);
                                    }
                                } else {
                                    setTournament_name('');
                                    setTournament_id('');
                                    setTournament('');
                                }
                            }}
                        />
                    </div>
                    <section id="adminPage">
                        {(newCollection === true) ?
                        <TextField
                            required={true}
                            label="Tournament Name"
                            name="new_tournament"
                            value={new_tournament}
                            onChange={handleInputChange}
                        />
                            :
                        <span>{ ''}</span> }
                        {(tournament_name === '' && newCollection === false) ?
                            <div>Select a company</div>
                            :
                            <section id="companyEntities">
                                <form noValidate>
                                    <FormControl style={{width: '100%'}}>
                                        <div className="flex-parent-element">
                                            <div className="flex-child-element green">
                                                {(tournament_id) ?
                                                <TextField
                                                    label="Tournament Id"
                                                    name="tournament_id"
                                                    value={tournament_id}
                                                    disabled
                                                />
                                                    :
                                                    <span>{' '}</span>}
                                                <TextField
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
                                                {(square_count != 0) ?
                                                    <div>
                                                <TextField
                                                    disabled
                                                    id="outlined-number"
                                                    label="Square Count"
                                                    name="square_count"
                                                    type="number"
                                                    value={square_count}
                                                    onChange={handleInputChange}
                                                />
                                                        <TextField
                                                            label="Almond Count"
                                                            name="almond_count"
                                                            value={almond_count}
                                                            onChange={handleInputChange}
                                                        />
                                                        <br />
                                                    </div>
                                                    :
                                                    <span>{' '}</span>}
                                                <br />

                                            </div>
                                            <div className="flex-child-element magenta">
                                                <br />
                                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                                    <FormLabel id="demo-controlled-radio-buttons-group">Status</FormLabel>
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                                        name="tournament_status"
                                                        value={tournament_status}
                                                        onChange={handleInputChange}
                                                    >
                                                        <FormControlLabel value="active" control={<Radio />} label="active" />
                                                        <FormControlLabel value="inactive" control={<Radio />} label="inactive" />
                                                    </RadioGroup>
                                                </FormControl>
                                                <br />
                                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                                    <FormLabel id="demo-controlled-radio-buttons-group">Expired Status</FormLabel>
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                                        name="expired_status"
                                                        value={expired_status}
                                                        onChange={handleInputChange}
                                                    >
                                                        <FormControlLabel value="active" control={<Radio />} label="active" />
                                                        <FormControlLabel value="inactive" control={<Radio />} label="inactive" />
                                                    </RadioGroup>
                                                </FormControl>
                                                <br />
                                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                                    <FormLabel id="demo-controlled-radio-buttons-group">Accessibility</FormLabel>
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                                        name="tournament_restriction"
                                                        value={tournament_restriction}
                                                        onChange={handleInputChange}
                                                    >
                                                        <FormControlLabel value="private" control={<Radio />} label="private" />
                                                        <FormControlLabel value="public" control={<Radio />} label="public" />
                                                    </RadioGroup>
                                                </FormControl>
                                                <br />
                                                <p>{expires}</p>
                                                <TextField
                                                    id="datetime-local"
                                                    label="Expires"
                                                    type="datetime-local"
                                                    name="expires"
                                                    defaultValue="2023-03-24T13:16"
                                                    value={expires}
                                                    onChange={handleInputChange}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                                <br />
                                                <img id="companyimage"
                                                     src={'https://wildalmonds.com/api/uploads/2a432b2a-5862-46ca-adcf-eac67a0c20ab_wildAlmondsLogo.jpeg'}
                                                     alt="Web"
                                                     width="200"
                                                     height="200"
                                                    // onClick={() => alert('hello world')}
                                                    // onMouseOver={() => redirectMe(props.urlPath)}
                                                />
                                                <br />
                                            </div>
                                        </div>
                                    </FormControl>
                                </form>
                                <div id="companyValues">
                                    <div id="buttonGroup" >
                                        <div className="flex-parent-element">
                                            <div className="flex-child-element magenta">
                                                Id : {tournament_id}
                                            </div>
                                            <div className="flex-child-element green">
                                                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        }
                    </section>
                    <div style={{width: '100%'}}>
                        <br />


                        {(newCollection === true) ?
                            <div>
                                <h4>New form goes here</h4>
                            </div>
                            :
                            <span>{' '}</span>
                        }


                    </div>
                    <div style={{width: '100%'}}>
                        {(newCollection === false) ?
                            <div>
                                <ProductTable tournament_id={tournament_id} />
                            </div>
                            :
                            <span>{' '}</span>
                        }

                    </div>
                </Box>
            </AdminPage>
        </>
    );
};

export default Collection;

/*
export const updateTourney = (tournament_id, tournament_name, tournament_description, tournament_restriction, almond_count, tournament_status, square_count, expires,  expired_status) => function (dispatch) {
  dispatch(actionCreators.checkTourneySuccess());

  if (tournament_id === '') { tournament_id = null; }
  if (tournament_name === '') { tournament_name = null; }
  if (tournament_description === '') { tournament_description = null; }
  if (tournament_restriction === '') { tournament_restriction = null; }
  if (almond_count === '') { almond_count = null; }
  if (tournament_status === '') { tournament_status = null; }
  if (square_count === '') { square_count = null; }
  if (expires === '') { expires = null; }
  if (expired_status === '') { expired_status = null; }

  return fetch(`${apiPath}/blog/updatetourney/${tournament_id}/${tournament_name}/${tournament_description}/${tournament_restriction}/${almond_count}/${tournament_status}/${square_count}/${expires}/${expired_status}`, {
    mode: 'cors',
    method: 'put',
    credentials: 'include',
    headers: { Accept: 'application/json' },
  })
      .then((response) => {
        if (response.ok) {
          console.log(response.json())
          return response.json();
        }
        throw new Error('Bad HTTP stuff');
      })
      .then(tourneys =>
          dispatch(actionCreators.checkTourneySuccess(tourneys))).catch((error) => {
        console.log(tourneys);
        if (debugLevel > 1 ) { console.error(error); }
        dispatch(actionCreators.checkTourneyError(error));
      })
      .catch((err) => {
        console.log('Error', err.message);
      });
};


 */