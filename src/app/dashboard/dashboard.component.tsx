import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { DashboardHeaderStyled, ButtonStyled } from './dashboard.component.style';
import { ThreeDotsIcon, Strings } from '../../resources';
import { H1 } from '../../components';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

const DashboardHeader = () => (
  <>
    <Col md={'auto'}>
      <ButtonStyled variant='outline-light'>
        <Image
          src={ThreeDotsIcon}
          width={30}
          height={30}
        />
      </ButtonStyled>
    </Col>
    <Col md={{ offset: 5 }}>
      <H1>Laundry CS</H1>
    </Col>
  </>
);

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
        const machineTitle: string = `${Strings.Components.Machine} ${machine.number}`;
        const key: string = machineTitle + index;
        return <H1 key={key}>{machineTitle}</H1>
      })}
    </Col>
  );
};

export const Dashboard = () => (
  <Container fluid={true}>
    <DashboardHeaderStyled>
      <DashboardHeader />
    </DashboardHeaderStyled>
    <DashboardTabs />
  </Container>
);

interface Residence {
  id: string;
  machines: Machine[];
}

interface Machine {
  number: number;
  deadline: Date;
}

const datasourceResidences: Residence[] = [
  {
    id: '1',
    machines: [
      {
        number: 1,
        deadline: new Date(2019, 11, 6),
      },
      {
        number: 2,
        deadline: new Date(2019, 11, 7),
      },
    ],
  },
  {
    id: '4B',
    machines: [
      {
        number: 1,
        deadline: new Date(2019, 11, 8),
      },
    ],
  },
  {
    id: '4DD',
    machines: [
      {
        number: 1,
        deadline: new Date(2019, 11, 9),
      },
      {
        number: 2,
        deadline: new Date(2019, 11, 10),
      },
      {
        number: 3,
        deadline: new Date(2019, 11, 11),
      },
    ],
  },
];
