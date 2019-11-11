export interface StoredMachine {
  residenceId: string;
  machineOrder: number;
}

export const getJSONString = (store: StoredMachine[]): string => {
  return JSON.stringify(store);
};

export const parseValue = (value: string): StoredMachine[] => {
  return JSON.parse(value);
};
