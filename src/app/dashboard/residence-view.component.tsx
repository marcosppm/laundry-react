import * as React from 'react';
import { Residence, Machine, StoredMachine, parseValue, getJSONString } from '../../model/entities';
import { Strings } from '../../resources/strings';
import { MachineCard } from '../../components';
import { MachinesRowStyled } from './residence-view.style';
import Col from 'react-bootstrap/Col';
import { SetTimeDialog } from '../dialogs/set-time-dialog.component';
import { getDelayedDateByMinutes, tick, getDelayToFinish } from '../../model/calculators/dates.calculator';

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
  let callback;

  React.useEffect(() => {
    return () => { callback = null; };
  });

  let jsonString: string | null = localStorage.getItem(Strings.StorageKey);
  alert(jsonString);
  let storedMachines: StoredMachine[];

  const handleOpenDialog = (machine: Machine) => () => {
    setShouldShowDialog(true);
    setCurrentMachine(machine);
  };

  const handleSetTime = (minutes: number) => {
    if (currentMachine !== undefined) {
      currentMachine.deadline = getDelayedDateByMinutes(new Date(), minutes); //TODO: set to database
      storeLocally(currentMachine);
    }
    setShouldShowDialog(false);
    startTick();
  };

  const storeLocally = (machine: Machine) => {
    const machineToStore: StoredMachine = { residenceId: props.residenceId, machineOrder: machine.order };
    if (!storedMachines) {
      storedMachines = [];
    }
    storedMachines.push(machineToStore);
    jsonString = getJSONString(storedMachines);
    localStorage.setItem(Strings.StorageKey, jsonString);
  };

  const handleCancelClick = () => {
    setShouldShowDialog(false);
  };

  const decrementDeadline = (machine: Machine) => {
    machine.deadline = tick(machine.deadline);
    if (getDelayToFinish(machine.deadline) <= 0 && getStoredMachineIndex(machine) >= 0) {
      removeLocally(machine);
      alert(machine.order);
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
    const storedMachineToRemoveIndex: number = getStoredMachineIndex(machine);
    return storedMachineToRemoveIndex >= 0;
  };

  const handleCancelProgramClick = (machineToRemove: Machine) => () => {
    removeLocally(machineToRemove);
    if (machineToRemove !== undefined) {
      machineToRemove.deadline = new Date();
    }
  };

  const removeLocally = (machineToRemove: Machine) => {
    const storedMachineToRemoveIndex: number = getStoredMachineIndex(machineToRemove);
    if (storedMachineToRemoveIndex >= 0) {
      storedMachines.splice(storedMachineToRemoveIndex, 1);
    }
    jsonString = getJSONString(storedMachines);
    localStorage.setItem(Strings.StorageKey, jsonString);

    if (machineToRemove !== undefined) {
      machineToRemove.deadline = new Date();
    }
  };

  const getStoredMachineIndex = (machine: Machine) => {
    return storedMachines.findIndex((storedMachine) => {
      return (
        storedMachine.residenceId == props.residenceId &&
        storedMachine.machineOrder == machine.order
      );
    });
  };

  if (jsonString) {
    storedMachines = parseValue(jsonString);
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
                cancelable={isCancelable(storedMachines, machine)}
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
