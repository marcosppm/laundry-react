import * as React from 'react';
import { Residence, Machine } from '../../model/entities';
import { Strings } from '../../resources/strings';
import { MachineCard } from '../../components';
import { MachinesRowStyled } from './residence-view.style';
import Col from 'react-bootstrap/Col';
import { SetTimeDialog } from '../dialogs/set-time-dialog.component';
import { getDelayedDateByMinutes, tick } from '../../model/calculators/dates.calculator';

interface ResidenceComponentProps {
  residence: Residence;
}

export const ResidenceComponent = (props: ResidenceComponentProps) => {
  return (
    <MachinesList machines={props.residence.machines} />
  );
}

interface MachinesListProps {
  machines: Machine[];
}

const MachinesList = (props: MachinesListProps) => {
  const [showDialog, setShowDialog] = React.useState(false);
  const [machine, setMachine] = React.useState<Machine>();

  const handleOpenDialog = (machine: Machine) => () => {
    setShowDialog(true);
    setMachine(machine);
  };

  const handleSetTime = (minutes: number) =>  {
    if (machine !== undefined) {
      machine.deadline = getDelayedDateByMinutes(new Date(), minutes); //TODO: set to database
    }
    setShowDialog(false);
    startTick();
  };

  const handleCancelClick = () => {
    setShowDialog(false);
  };

  const decrementDeadline = (deadline: Date) => {
    deadline = tick(deadline);
  };

  const startTick = () => {
    if (machine !== undefined) {
      setTimeout(decrementDeadline(machine.deadline), 1000);
    }
  };

  return (
    <>
      <MachinesRowStyled>
        {props.machines.map((machine, index) => {
          const key: string = Strings.Components.Machine.Machine + index;
          return (
            <Col md={'auto'}>
              <MachineCard key={key} machine={machine} onClick={handleOpenDialog(machine)} />
            </Col>
          );
        })}
      </MachinesRowStyled>
      <SetTimeDialog show={showDialog} machine={machine} onSetTimeClick={handleSetTime} onCancelClick={handleCancelClick} />
    </>
  );
};
