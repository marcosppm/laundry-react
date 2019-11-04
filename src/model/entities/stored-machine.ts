export interface StoredMachine {
  residenceId: string;
  machineOrder: number;
}

export const getValue = (store: StoredMachine): string => {
  return `${store.residenceId}-${store.machineOrder.toString()}`;
};

export const parseValue = (value: string | null): StoredMachine => {
  if (value) {
    const tokens: string[] = value.split(':');
    return {residenceId: tokens[0], machineOrder: parseInt(tokens[1])};
  } else {
    return {residenceId: '0', machineOrder: 0};
  }
};
