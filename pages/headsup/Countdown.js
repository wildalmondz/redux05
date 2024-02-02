import * as React from 'react';
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from 'react';
import { eventsHandler } from "../api";
import { getClockTime } from './lib.js';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '5em' // Adjust the height as needed
}));

const Countdown = ({ expires }) => {
  const [parametersDefined, setParametersDefined] = useState(false);
  const [curExpired, setCurExpired] = useState('');

  let secondsToWait = 1000;
  let checkDistanceForGrowth = (2592000000 * 12);

  const setExpired = (expireMessage) => ({
    expires: `${expireMessage}`, days: '', hours: '', minutes: '', seconds: '',
  });


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
    const baseExpireDate = new Date(expires);
    const baseTime = new Date(); // Assuming serverTime is not needed for this part

    const noExpire = 'No expiration';
    const didExpire = 'EXPIRED!!!';

    if (!expires) {
      setCurExpired(setExpired(noExpire));
    } else if ((expires) && (baseExpireDate < baseTime)) {
      setCurExpired(setExpired(didExpire));
    } else if ((expires) && (baseExpireDate > baseTime)) {
      const ticking = setInterval(() => {
        setCurExpired(checkForExpire(Math.abs((baseExpireDate) - baseTime.setSeconds(baseTime.getSeconds() + 1))));
      }, secondsToWait);

      return () => clearInterval(ticking); // Cleanup interval on component unmount
    } else {
      console.log('You should not see me');
    }
  }, [expires]);

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



          <span>{JSON.stringify(curExpired.expires)}</span>
          <span>Item 2:</span>
          <span>WildAlmond:</span>
        </Item>
      </Grid>
  );
};

export default Countdown;
