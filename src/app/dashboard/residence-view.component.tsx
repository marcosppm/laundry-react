import * as React from 'react';
import { Residence, Machine, getValue, StoredMachine, parseValue } from '../../model/entities';
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
    <MachinesList residenceId={props.residence.id} machines={props.residence.machines} />
  );
}

interface MachinesListProps {
  residenceId: string;
  machines: Machine[];
}

const MachinesList = (props: MachinesListProps) => {
  const [shouldShowDialog, setShouldShowDialog] = React.useState(false);
  const [machine, setMachine] = React.useState<Machine>();
  let callback;

  React.useEffect(() => {
    return () => { callback = null; };
  });

  let value: string | null = localStorage.getItem(Strings.StorageKey);
  let storedMachine: StoredMachine;

  const handleOpenDialog = (machine: Machine) => () => {
    setShouldShowDialog(true);
    setMachine(machine);
  };

  const handleSetTime = (minutes: number) => {
    if (machine !== undefined) {
      machine.deadline = getDelayedDateByMinutes(new Date(), minutes); //TODO: set to database
      if (!value) {
        storeLocally(machine);
      }
    }
    setShouldShowDialog(false);
    startTick();
  };

  const storeLocally = (machine: Machine) => {
    storedMachine = { residenceId: props.residenceId, machineOrder: machine.order };
    value = getValue(storedMachine);
    localStorage.setItem(Strings.StorageKey, value);
  };

  const handleCancelClick = () => {
    setShouldShowDialog(false);
  };

  const decrementDeadline = (deadline: Date) => {
    deadline = tick(deadline);
  };

  const startTick = () => {
    if (machine !== undefined) {
      callback = () => decrementDeadline(machine.deadline);
      setInterval(callback, 1000);
    }
  };

  const isCancelable = (storedMachine: StoredMachine, machine: Machine): boolean => {
    return (
      storedMachine !== undefined &&
      storedMachine.residenceId === props.residenceId &&
      machine !== undefined &&
      storedMachine.machineOrder === machine.order
    );
  }; 
  
  const handleCancelProgramClick = () => {
    localStorage.removeItem(Strings.StorageKey);
    value = localStorage.getItem(Strings.StorageKey);
    if (machine !== undefined) {
      machine.deadline = new Date();
    }
  };

  if (value) {
    storedMachine = parseValue(value);
  }
  return (
    <>
      <MachinesRowStyled>
        {props.machines.map((machine, index) => {
          const key: string = Strings.Components.Machine.Machine + index;
          return (
            <Col md={'auto'} key={key}>
              <MachineCard
                machine={machine}
                onClick={handleOpenDialog(machine)}
                cancelable={isCancelable(storedMachine, machine)}
                onCancel={handleCancelProgramClick}
              />
            </Col>
          );
        })}
      </MachinesRowStyled>
      <SetTimeDialog show={shouldShowDialog} machine={machine} onSetTimeClick={handleSetTime} onCancelClick={handleCancelClick} />
    </>
  );
};
