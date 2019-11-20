import { Machine, StoredMachine } from '../../model';
import { Service } from 'typedi';

export const STORAGE_KEY: string = 'STORED_MACHINE';

@Service(STORAGE_KEY)
export class LocalStorage {
  storedMachines: StoredMachine[];

  constructor() {
    this.storedMachines = [];
  }

  storeLocally = (residenceId: string, machine: Machine) => {
    const machineToStore: StoredMachine = { residenceId, machineOrder: machine.order };
    if (!this.storedMachines) {
      this.storedMachines = [];
    }
    this.storedMachines.push(machineToStore);
    const jsonString = this.getJSONString(this.storedMachines);
    localStorage.setItem(STORAGE_KEY, jsonString);
  };

  removeLocally = (residenceId: string, machine: Machine) => {
    const storedMachineToRemoveIndex: number = this.getStoredMachineIndex(residenceId, machine);
    if (storedMachineToRemoveIndex >= 0) {
      this.storedMachines.splice(storedMachineToRemoveIndex, 1);
    }
    const jsonString = this.getJSONString(this.storedMachines);
    localStorage.setItem(STORAGE_KEY, jsonString);

    if (machine !== undefined) {
      machine.deadline = new Date();
    }
  };

  getStoredMachineIndex = (residenceId: string, machine: Machine) => {
    return this.storedMachines.findIndex((storedMachine) => {
      return (
        storedMachine.residenceId == residenceId &&
        storedMachine.machineOrder == machine.order
      );
    });
  };

  getJSONString = (store: StoredMachine[]): string => {
    return JSON.stringify(store);
  };

  parseValue = (value: string): StoredMachine[] => {
    return JSON.parse(value);
  };
}
