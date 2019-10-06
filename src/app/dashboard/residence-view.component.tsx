import * as React from 'react';
import { Residence, Machine } from '../../model/entities';
import Col from 'react-bootstrap/Col';
import { Strings } from '../../resources/strings';
import { H1 } from '../../components/headers.style';

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
  return (
    <Col>
      {props.machines.map((machine, index) => {
        const machineTitle: string = `${Strings.Components.Machine} ${machine.order}`;
        const key: string = machineTitle + index;
        return <H1 key={key}>{machineTitle}</H1>
      })}
    </Col>
  );
};
