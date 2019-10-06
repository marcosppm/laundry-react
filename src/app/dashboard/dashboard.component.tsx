import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { Strings } from '../../resources';
import { H3 } from '../../components';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Machine, Residence } from '../../model/entities';

const DashboardTabs = () => (
  <Tabs id={"residences-main-tab"}>
    {datasourceResidences.map((residence, index) => {
      const eventKey: string = `${Strings.Pages.ResidenceShort} ${residence.id}`;
      const title: string = `${Strings.Pages.Residence} ${residence.id}`;
      const key: string = eventKey + index;
      return (
        <Tab eventKey={eventKey} title={title} key={key}>
          <MachinesList residence={residence} />
        </Tab>
      )
    })}
  </Tabs>
);

interface MachinesListProps {
  residence: Residence;
}

const MachinesList = (props: MachinesListProps) => {
  const machines: Machine[] = props.residence.machines;
  return (
    <Col>
      {machines.map((machine, index) => {
        const machineTitle: string = `${Strings.Components.Machine} ${machine.order}`;
        const key: string = machineTitle + index;
        return <H3 key={key}>{machineTitle}</H3>
      })}
    </Col>
  );
};

export const Dashboard = () => (
  <Container fluid={true}>
    <DashboardTabs />
  </Container>
);

const datasourceResidences: Residence[] = [
  {
    id: '1',
    machines: [
      {
        order: 1,
        deadline: new Date(2019, 11, 6),
      },
      {
        order: 2,
        deadline: new Date(2019, 11, 7),
      },
    ],
  },
  {
    id: '4B',
    machines: [
      {
        order: 1,
        deadline: new Date(2019, 11, 8),
      },
    ],
  },
  {
    id: '4DD',
    machines: [
      {
        order: 1,
        deadline: new Date(2019, 11, 9),
      },
      {
        order: 2,
        deadline: new Date(2019, 11, 10),
      },
      {
        order: 3,
        deadline: new Date(2019, 11, 11),
      },
    ],
  },
];
