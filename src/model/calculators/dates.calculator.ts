import { Timer } from "../entities";

export const getDelayedDateByMinutes = (date: Date, minutes: number): Date => {
  date.setMinutes(date.getMinutes() + minutes);
  return date;
};

export const getDelayedDateBySeconds = (date: Date, seconds: number): Date => {
  date.setSeconds(date.getSeconds() + seconds);
  return date;
};

export const tick = (date: Date): Date => {
  return getDelayedDateBySeconds(date, -1);
};

export const getDelayToFinish = (deadline: Date): number => {
  const today = new Date();
  const differenceInSeconds: number = (deadline.getTime() - today.getTime()) / 1000;
  return differenceInSeconds;
};

export const getTimer = (differenceInSeconds: number): Timer => {
  const hours: number = Math.floor(differenceInSeconds / (60 * 60));
  const minutes: number = Math.floor((differenceInSeconds - hours * 60 * 60) / 60);
  const seconds: number = Math.floor(differenceInSeconds - hours * 60 * 60 - minutes * 60);
  const timer: Timer = { hours, minutes, seconds, toString: function () {
      const tokens: number[] = [timer.hours, timer.minutes, timer.seconds];
      const aux: string[] = [];
      tokens.forEach(token => {
        if (token === 0) aux.push('00');
        else if (token < 10) aux.push('0'.concat(token.toString()));
        else aux.push(token.toString());
      });
      return aux.join(':');
    } 
  };
  return timer;
};
