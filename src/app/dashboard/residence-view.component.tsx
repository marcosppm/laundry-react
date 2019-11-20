import * as React from 'react';
import { Residence, Machine, StoredMachine } from '../../model/entities';
import { Strings } from '../../resources/strings';
import { MachineCard } from '../../components';
import { MachinesRowStyled } from './residence-view.style';
import Col from 'react-bootstrap/Col';
import { SetTimeDialog } from '../dialogs/set-time-dialog.component';
import { getDelayedDateByMinutes, tick, getDelayToFinish } from '../../model/calculators/dates.calculator';
import { Container } from 'typedi';
import { LocalStorage } from '../services';

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
  const [currentMachine, setCurrentMachine] = React.useState<Machine>();
  const localStorage = Container.get(LocalStorage);
  let callback;

  React.useEffect(() => {
    return () => { callback = null; };
  });
  
  const handleOpenDialog = (machine: Machine) => () => {
    setShouldShowDialog(true);
    setCurrentMachine(machine);
  };

  const handleSetTime = (minutes: number) => {
    if (currentMachine !== undefined) {
      currentMachine.deadline = getDelayedDateByMinutes(new Date(), minutes); //TODO: set to database
      localStorage.storeLocally(props.residenceId, currentMachine);
    }
    setShouldShowDialog(false);
    startTick();
  };

  const handleCancelClick = () => {
    setShouldShowDialog(false);
  };

  const decrementDeadline = (machine: Machine) => {
    machine.deadline = tick(machine.deadline);
    if (getDelayToFinish(machine.deadline) <= 0 && localStorage.getStoredMachineIndex(props.residenceId, machine) >= 0) {
      localStorage.removeLocally(props.residenceId, machine);
    }
  };

  const startTick = () => {
    if (currentMachine !== undefined) {
      callback = () => decrementDeadline(currentMachine);
      setInterval(callback, 1000);
    }
  };

  const isCancelable = (storedMachines: StoredMachine[], machine: Machine): boolean => {
    if (!storedMachines || !machine)
      return false;
    const storedMachineToRemoveIndex: number = localStorage.getStoredMachineIndex(props.residenceId, machine);
    return storedMachineToRemoveIndex >= 0;
  };

  const handleCancelProgramClick = (machineToRemove: Machine) => () => {
    localStorage.removeLocally(props.residenceId, machineToRemove);
    if (machineToRemove !== undefined) {
      machineToRemove.deadline = new Date();
    }
  };
  
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
                cancelable={isCancelable(localStorage.storedMachines, machine)}
                onCancel={handleCancelProgramClick(machine)}
              />
            </Col>
          );
        })}
      </MachinesRowStyled>
      <SetTimeDialog show={shouldShowDialog} machine={currentMachine} onSetTimeClick={handleSetTime} onCancelClick={handleCancelClick} />
    </>
  );
};
