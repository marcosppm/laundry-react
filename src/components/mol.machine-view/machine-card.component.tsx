import * as React from 'react';
import { Machine } from '../../model/entities';
import Card from 'react-bootstrap/Card';
import { WashingMachineImg, Strings } from '../../resources';
import Button from 'react-bootstrap/Button';
import { CardStyled } from './machine-card.style';

export interface MachineCardProps {
  machine: Machine;
  onClick: () => void;
}

const IMG_WIDTH: number = 200;

export const MachineCard = (props: MachineCardProps) => {
  return (
    <CardStyled className={"text-center"}>
      <Card.Img style={{width: IMG_WIDTH}} variant={'top'} src={WashingMachineImg}  />
      <Card.Body>
        <Card.Title>{machineName(props.machine.order)}</Card.Title>
        <Card.Subtitle>{Strings.Components.Machine.RemainingTime}</Card.Subtitle>
        <Card.Text>
          00:00:00
        </Card.Text>
        <Button variant="primary" onClick={props.onClick}>{Strings.Components.Machine.Button.Available}</Button>
      </Card.Body>
    </CardStyled>
  );
};

const machineName = (order: number): string => {
  return `${Strings.Components.Machine.Machine} ${order}`;
}
