import * as React from 'react';
import Grid from "@mui/material/Grid";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from 'react';
import {eventsHandler} from "../api";
import { getClockTime } from './lib.js';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '5em' // Adjust the height as needed
}));

export default function Countdown({ }) {
  const [parametersDefined, setParametersDefined] = useState(false);
  const [curExpired, setCurExpired] = useState(false);

  let secondsToWait = 1000;
  let checkDistanceForGrowth = (2592000000 * 12);

  const setExpired = (expireMessage) => {
    return {
      expires: `${expireMessage}`, days: '', hours: '', minutes: '', seconds: '',
    };
  }

  const checkForExpire = (distance) => {
    // Bug bug:  Had an issue with the time showing expired for a second
    // Then starting to grow rather than countdown
    // Some of the code below was required to get around that bug
    // Not a very tidy solution though, better code likely possible

    if ((distance < 1000) || (distance > checkDistanceForGrowth)) {
      checkDistanceForGrowth = 999;
      secondsToWait = 2592000000; // one month
      return {
        expires: 'EXPIRED!!!', days: '', hours: '', minutes: '', seconds: '',
      };
    }
    return getClockTime(distance);
  }

  setTimeout(() => {
    const baseExpireDate = new Date(this.props.expires);
    const baseTime = new Date(this.state.serverTime);
    const noExpire = 'No expiration';
    const didExpire = 'EXPIRED!!!';

    if (!this.props.expires) {
      this.setState(setExpired(noExpire));
    } else if ((this.props.expires) && (baseExpireDate < baseTime)) {
      this.setState(setExpired(didExpire));
    } else if ((this.props.expires) && (baseExpireDate > baseTime)) {
      this.ticking = setInterval(
          () =>
              this.setState(checkForExpire(Math.abs((baseExpireDate) -
                  baseTime.setSeconds(baseTime.getSeconds() + 1))))
          , secondsToWait,
      );
    } else {
      console.log('You should not see me');
    }
  }, 1000);

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
          <span>Item 1:</span>
          <span>Item 2:</span>
          <span>Item 3:</span>
        </Item>
      </Grid>
  );
}


/*
let secondsToWait = 1000;
let checkDistanceForGrowth = (2592000000 * 12);

const Clockstart = styled('section')({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  paddingLeft: '.5em'
});

function checkForExpire(distance) {
  // Bug bug:  Had an issue with the time showing expired for a second
  // Then starting to grow rather than countdown
  // Some of the code below was required to get around that bug
  // Not a very tidy solution though, better code likely possible

  if ((distance < 1000) || (distance > checkDistanceForGrowth)) {
    checkDistanceForGrowth = 999;
    secondsToWait = 2592000000; // one month
    return {
      expires: 'EXPIRED!!!', days: '', hours: '', minutes: '', seconds: '',
    };
  }
  return getClockTime(distance);
}

function setExpired(expireMessage) {
  return {
    expires: `${expireMessage}`, days: '', hours: '', minutes: '', seconds: '',
  };
}

class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expires: '',
      days: '',
      hours: '',
      minutes: '',
      seconds: '',
      serverTime: null,
    };
  }
  componentDidMount() {
    // this must be fixed!!!
    // else delays in loading will result in no expiration shown
    // should be a promise rather than the timeout?
    // show the Loading... until the promise returns?
    axios.get('http://localhost:4500/games/servertime')
      .then((response) => {
        this.setState({
          serverTime: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    setTimeout(() => {
      const baseExpireDate = new Date(this.props.expires);
      const baseTime = new Date(this.state.serverTime);
      const noExpire = 'No expiration';
      const didExpire = 'EXPIRED!!!';

      if (!this.props.expires) {
        this.setState(setExpired(noExpire));
      } else if ((this.props.expires) && (baseExpireDate < baseTime)) {
        this.setState(setExpired(didExpire));
      } else if ((this.props.expires) && (baseExpireDate > baseTime)) {
        this.ticking = setInterval(
          () =>
            this.setState(checkForExpire(Math.abs((baseExpireDate) -
              baseTime.setSeconds(baseTime.getSeconds() + 1))))
          , secondsToWait,
        );
      } else {
        console.log('You should not see me');
      }
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.ticking);
    console.log('Stopping Clock');
  }
  render() {
    const {
      days, hours, minutes, seconds,
    } = this.state;
    return (
      (this.state.days !== undefined) ?
        <Clockstart>
          <span><strong>Expires:<a>  </a></strong></span>
          <span>{days}</span>
          <span>{hours}</span>
          <span>{minutes}</span>
          <span>{seconds}</span>
        </Clockstart>
        :
        <Clockstart>
          <span>{days}</span>
          <span>{hours}</span>
          <span>{minutes}</span>
          <span>{seconds}</span>
        </Clockstart>
    );
  }
}

Countdown.propTypes = {
  expires: PropTypes.string,
  time: PropTypes.string,
  onFetch: PropTypes.func,
};

export default Countdown;

 */
