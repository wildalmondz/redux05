import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from '@mui/material/Button';
import { eventsHandler } from "../api";
import Countdown from "./Countdown";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '5em' // Adjust the height as needed
}));

const HeadsUp = ({ expired, picksRemaining, lockedStatus, gameId, userId, curLocked, setCurLocked, wildAlmond }) => {
  const [curExpired, setCurExpired] = useState('');
  const [curWildAlmond, setWildAlmond] = useState(null);

  console.log(`\n\n\n {wildAlmond}` + wildAlmond);

  if ((wildAlmond != null) && (curWildAlmond === null)){
    setWildAlmond(wildAlmond);
  }

  const handleSubmit = () => {
    return new Promise((resolve, reject) => {
      const err = 'Error!';

      // set confirmation here
      axios.post(`http://localhost:4500/pick/setinvitelock/${gameId}/${userId}`)
          .then((response) => {
            const waRes = response;
            alert('Current WildAlmond: => ' + waRes.data);
            if (response.statusText === 'OK') {
              setWildAlmond(waRes.data);
              setCurLocked('Locked');
            }
          });

      resolve('Locked ok');
      reject(err);
    });
  };

  useEffect(() => {
    // Check if structuredUrl.post exists before accessing its properties
    if (lockedStatus !== 'unlocked') {
      setCurLocked('locked');
    }
  }, [lockedStatus, setCurLocked]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`http://localhost:4500/games/servertime`);
        const results = await eventsHandler(`http://localhost:4500/games/servertime`);

        console.log('\n\nstart 5. RESULTS?\n\n');
        if (results) {
          console.log(JSON.stringify(results));
          console.log('\n\nend\n\n');
        }

      } catch (error) {
        console.error('Error fetching invitation data:', error.message);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []); // The empty dependency array ensures that this effect runs only once, equivalent to componentDidMount

  if ((curExpired) && (curExpired.expires)) {
    setCurExpired(curExpired.expires);
    console.log('curExpired: ' + curExpired)
  }

  console.log('curExpired: ' + curExpired)

  return (
      <Grid item xs={6}>
        <Item sx={{
          color: 'white',
          backgroundImage: 'url(https://wildalmonds.com/api/uploads/725c78bb-ae08-4ed7-93cb-3fb6becd7d04_subtle-dots.png)',
          paddingTop: '0.5em',
          paddingBottom: '0.5em',
          backgroundColor: '#17355B',
          height: '100%',
          width: '100%',
          borderRadius: '0px',
          position: 'relative',
          display: 'flex',
          justifyContent: 'space-between',  // Use space-between to evenly space the items
          alignItems: 'center', // Align items to the center vertically
        }}>
          {curExpired.expires != 'No expiration' ?
              <span id={"countdown"} style={{ flex: 1 }}>
                <Countdown expires={expired} curLocked={curLocked} setCurLocked={setCurLocked} />
              </span>
              :
              <span>{' '}</span>
          }
          <span id={"picksArea"} style={{ flex: 1 }}>
          {
            ((picksRemaining >= 1)
                && (curLocked === 'unlocked')
                && (curExpired === 'No expiration')
            ) ?
                <span> Picks Remaining: {curExpired}
                  <span style={{ color: 'red' }}>
                  <strong> [ {picksRemaining} ]</strong>
                </span>
              </span>
                : ((curLocked === 'unlocked') && (curExpired !== 'EXPIRED!!!') && (picksRemaining === 0)) ?
                    <Button variant="contained" onClick={handleSubmit} disabled={curExpired === 'EXPIRED!!!'}>
                      Lock Picks
                    </Button>
                    :
                    <span>{''}</span>
          }
        </span>
          <span id={"wildAlmond"} style={{ flex: 1 }}>
          {(wildAlmond != null) ?
              <span style={{ color: 'red' }}>
              <strong>WildAlmond [ {wildAlmond} ]</strong>
            </span>
              : (curWildAlmond != null) ?
                  <span style={{ color: 'red' }}>
                <strong>WildAlmond [ {curWildAlmond} ]</strong>
              </span>
                  :
                  <span>{'              '}</span>
          }
        </span>
        </Item>
      </Grid>
  );
};

export default HeadsUp;