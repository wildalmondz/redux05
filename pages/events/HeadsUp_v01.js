import * as React from 'react';
import axios from 'axios';
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { eventsHandler } from "../api";
import { getClockTime } from './lib.js';
import Countdown from "./Countdown";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '5em' // Adjust the height as needed
}));

const HeadsUp = ({ expired, picksRemaining, lockedStatus, gameId, userId, lockedPicks}) => {
  const [parametersDefined, setParametersDefined] = useState(false);
  const [curExpired, setCurExpired] = useState('');
  const [curLocked, setCurLocked] = useState('unlocked');
  const [curWildAlmond, setWildAlmond] = useState(null);

  let wildAlmond = null;

  let secondsToWait = 1000;
  let checkDistanceForGrowth = (2592000000 * 12);

  const setExpired = (expireMessage) => ({
    expires: `${expireMessage}`, days: '', hours: '', minutes: '', seconds: '',
  });

  const handleSubmit = () => {
    return new Promise((resolve, reject) => {
      const err = 'Error!';

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

  const checkForExpire = (distance) => {
    if ((distance < 1000) || (distance > checkDistanceForGrowth)) {
      checkDistanceForGrowth = 999;
      secondsToWait = 2592000000; // one month
      return {
        expires: 'EXPIRED!!!', days: '', hours: '', minutes: '', seconds: '',
      };
    }
    return getClockTime(distance);
  };

  useEffect(() => {
    // Check if structuredUrl.post exists before accessing its properties
    if (lockedStatus !== 'unlocked') {
      setCurLocked('locked');
    }
  }, [lockedStatus]);

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

  useEffect(() => {
    const baseExpireDate = new Date(expired);
    const baseTime = new Date(); // Assuming serverTime is not needed for this part

    const noExpire = 'No expiration';
    const didExpire = 'EXPIRED!!!';


    if (!expired) {
      setCurExpired(setExpired(noExpire));
    } else if ((expired) && (baseExpireDate < baseTime)) {
      setCurExpired(setExpired(didExpire));
    } else if ((expired) && (baseExpireDate > baseTime)) {
      const ticking = setInterval(() => {
        // setCurExpired(checkForExpire(Math.abs((baseExpireDate) - baseTime.setSeconds(baseTime.getSeconds() + 1))));
        setCurExpired(noExpire);
      }, secondsToWait);

      return () => clearInterval(ticking); // Cleanup interval on component unmount
    } else {
      console.log('You should not see me');
    }
  }, [expired]);


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
              <div>
                <Countdown expires={expired} />
              </div>
              :
              <span>{' '}</span>
          }
          <span>
          {(picksRemaining >= 1 && curLocked === 'unlocked' && curExpired !== 'EXPIRED!!!') ?
                  <span> Picks Remaining: {curExpired}
                    <span style={{color: 'red', }}>
                      <strong> [ {picksRemaining} ]</strong>
                    </span>
                  </span>
                  : ((curLocked === 'unlocked') && (curExpired !== 'EXPIRED!!!') && (picksRemaining === 0)) ?
                  <Button variant="contained" onClick={handleSubmit}>
                    Lock Picks</Button>
                      :
                      <span>{''}</span>
              }
            </span>
          <span>
            CurLocked: {curLocked}
            CurExpired: {curExpired}
          </span>
          <span>
              {(wildAlmond != null) ?
                    <span style={{color: 'red', }}>
                      <strong>WildAlmond [ {wildAlmond} ]</strong>
                    </span>
                  : (curWildAlmond != null) ?
                      <span style={{color: 'red', }}>
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
