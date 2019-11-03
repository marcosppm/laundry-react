import * as React from 'react';
import { Machine, Timer } from '../../model/entities';
import Card from 'react-bootstrap/Card';
import { WashingMachineImg, Strings } from '../../resources';
import Button from 'react-bootstrap/Button';
import { CardStyled } from './machine-card.style';
import { getDelayToFinish, getTimer } from '../../model/calculators/dates.calculator';

export interface MachineCardProps {
  machine: Machine;
  onClick: () => void;
}

const IMG_WIDTH: number = 200;

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

  return (
    <CardStyled className={"text-center"}>
      <Card.Img style={{ width: IMG_WIDTH }} variant={'top'} src={WashingMachineImg} />
      <Card.Body>
        <Card.Title>{getMachineName()}</Card.Title>
        <Card.Subtitle>{Strings.Components.Machine.RemainingTime}</Card.Subtitle>
        <Card.Text>
          {props.machine && props.machine.deadline ? showTimer(props.machine.deadline) : '00:00:00'}
        </Card.Text>
        <Button variant="primary" onClick={props.onClick}>{Strings.Components.Machine.Button.Available}</Button>
      </Card.Body>
    </CardStyled>
  );
};
