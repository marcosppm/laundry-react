import * as React from 'react';
import { Residence, Machine } from '../../model/entities';
import { Strings } from '../../resources/strings';
import { MachineCard } from '../../components';
import { MachinesRowStyled } from './residence-view.style';
import Col from 'react-bootstrap/Col';

interface ResidenceComponentProps {
  residence: Residence;
}

export const ResidenceComponent = (props: ResidenceComponentProps) => {
  return (
    <>
      <MachinesList machines={props.residence.machines} />
      {}
    </>    
  );
}

interface MachinesListProps {
  machines: Machine[];
}

const MachinesList = (props: MachinesListProps) => {
  return (
    <MachinesRowStyled>
      {props.machines.map((machine, index) => {
        const key: string = Strings.Components.Machine.Machine + index;
        return (
          <Col md={'auto'}>
            <MachineCard key={key} machine={machine} onClick={props.handleSetTime} />
          </Col>
        );
      })}
    </MachinesRowStyled>
  );
};
