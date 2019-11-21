import * as React from 'react';
import { Machine } from '../../model/entities';
import Card from 'react-bootstrap/Card';
import { WashingMachineImg, Strings } from '../../resources';
import Button from 'react-bootstrap/Button';
import { CardStyled, CardTextStyled, CardSubtitleStyled } from './machine-card.style';
import { getDelayToFinish, getTimer, tick } from '../../model/calculators/dates.calculator';
import { Container } from 'typedi';
import { LocalStorage } from '../../app/services';

export interface MachineCardProps {
  machine: Machine;
  residenceId: string;
  cancelable: boolean;
  onClick: () => void;
  onCancel: () => void;
}

const IMG_WIDTH: number = 200;
const FINISHING_THRESHOLD_IN_SECONDS: number = 15;

export const MachineCard = (props: MachineCardProps) => {
  const [timer, setTimer] = React.useState();
  const localStorage = Container.get(LocalStorage);

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

  
  const startTick = () => {
    const callback = () => decrementDeadline(props.machine);
    const timer = setInterval(callback, 1000);
    setTimer(timer);
  };

  const decrementDeadline = (machine: Machine) => {
    machine.deadline = tick(machine.deadline);
    if (getDelayToFinish(machine.deadline) <= 0 && localStorage.getStoredMachineIndex(props.residenceId, machine) >= 0) {
      localStorage.removeLocally(props.residenceId, machine);
    }
  };

  const handleClick = () => {
    startTick();
    props.onClick();
  };

  const handleCancel = () => {
    clearInterval(timer);
    setTimer(0);
    props.onCancel();
  };

  const SetTimeButton = (): JSX.Element => {
    if (isFinished()) {
      return <Button variant="primary" onClick={handleClick}>{Strings.Components.Machine.Button.Available}</Button>;
    } else if (props.cancelable) {
      return <Button variant="danger" onClick={handleCancel}>{Strings.Components.Machine.Button.Cancel}</Button>;
    } else {
      return <Button variant="danger" disabled={true}>{Strings.Components.Machine.Button.Busy}</Button>;
    }
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
        <SetTimeButton /> 
      </Card.Body>
    </CardStyled>
  );
};
