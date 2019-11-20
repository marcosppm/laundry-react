import * as React from 'react';
import { Machine, Timer } from '../../model/entities';
import Card from 'react-bootstrap/Card';
import { WashingMachineImg, Strings } from '../../resources';
import Button from 'react-bootstrap/Button';
import { CardStyled, CardTextStyled, CardSubtitleStyled } from './machine-card.style';
import { getDelayToFinish, getTimer } from '../../model/calculators/dates.calculator';

export interface MachineCardProps {
  machine: Machine;
  onClick: () => void;
}

const IMG_WIDTH: number = 200;
const FINISHING_THRESHOLD_IN_SECONDS: number = 15;

export const MachineCard = (props: MachineCardProps) => {
  const getMachineName = (): string => {
    return `${Strings.Components.Machine.Machine} ${props.machine.order}`;
  };

  const showTimer = (deadline: Date): string => {
    const differenceInSeconds: number = getDelayToFinish(deadline);
    if (differenceInSeconds < 0) {
      return '00:00:00';
    } else {
      const timer = getTimer(differenceInSeconds);
      return timer.toString();
    }
  };

  const isFinishing = (): boolean => {
    const delay: number = getDelayToFinish(props.machine.deadline);
    return delay <= FINISHING_THRESHOLD_IN_SECONDS && delay > 0;
  };

  const isFinished = (): boolean => {
    return getDelayToFinish(props.machine.deadline) <= 0;
  };

  return (
    <CardStyled className={"text-center"}>
      <Card.Img style={{ width: IMG_WIDTH }} variant={'top'} src={WashingMachineImg} />
      <Card.Body>
        <Card.Title>{getMachineName()}</Card.Title>
        <CardSubtitleStyled reachedFinishingThreshold={isFinishing()}>{Strings.Components.Machine.RemainingTime}</CardSubtitleStyled>
        <CardTextStyled reachedFinishingThreshold={isFinishing()}>
          {props.machine && props.machine.deadline ? showTimer(props.machine.deadline) : '00:00:00'}
        </CardTextStyled>
        {isFinished() ?
          <Button variant="primary" onClick={props.onClick}>{Strings.Components.Machine.Button.Available}</Button>
        :
          <Button variant="danger" onClick={props.onClick} disabled={true}>{Strings.Components.Machine.Button.Busy}</Button>
        }
      </Card.Body>
    </CardStyled>
  );
};
