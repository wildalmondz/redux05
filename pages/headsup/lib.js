// const getCurrentTime = () => new Date();

// export const getDistance = (expireDate, serverDate) => Math.abs(expireDate - serverDate);
// export const getDistance = expireDate => Math.abs(new Date(expireDate) - servertime.setSeconds(servertime.getSeconds() + 1));

// if (distance < 0) {
//  clearInterval(x);
//  document.getElementById("timer").innerHTML = "EXPIRED";
// }

export const expiredHours = checkDistance =>
  (checkDistance > 1000) ? {
    checkDistance,
  } : {
    distance: 'EXPIRED',
  }

export const abstractClockTime = distance =>
  (
    (distance > 1000) ? {
      expires: `${distance}`,
      days: `${Math.floor(distance / (1000 * 60 * 60 * 24))}d`,
      hours: `:${Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))}h`,
      minutes: `:${Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))}m`,
      seconds: `:${Math.floor((distance % (1000 * 60)) / 1000)}s`,
    } : {
      // or if the distance is growing
      expires: true,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

export const civilianHours = clockTime =>
  ({
    ...clockTime,
    hours: (clockTime.hours > 12) ?
      clockTime.hours - 12 :
      clockTime.hours,
  });

export const prependZero = key => clockTime =>
  ({
    ...clockTime,
    [key]: (clockTime[key] < 10) ?
      `0${clockTime[key]}` :
      clockTime[key],
  });

export const compose = (...fns) =>
  arg =>
    fns.reduce(
      (composed, f) => f(composed),
      arg,
    );

export const convertToCivilianTime = clockTime =>
  compose(civilianHours)(clockTime);

export const doubleDigits = civilianTime =>
  compose(
    prependZero('days'),
    prependZero('hours'),
    prependZero('minutes'),
    prependZero('seconds'),
  )(civilianTime);

export const getClockTime = compose(
  abstractClockTime,
  convertToCivilianTime,
  doubleDigits,
);
