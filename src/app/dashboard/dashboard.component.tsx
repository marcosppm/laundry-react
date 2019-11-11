import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { Strings } from '../../resources';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Residence } from '../../model/entities';
import { ResidenceComponent } from './residence-view.component';

const DashboardTabs = () => {
  localStorage.setItem(Strings.StorageKey, '');
  return (
    <Tabs id={"residences-main-tab"}>
      {datasourceResidences.map((residence, index) => {
        const eventKey: string = `${Strings.Pages.ResidenceShort} ${residence.id}`;
        const title: string = `${Strings.Pages.Residence} ${residence.id}`;
        const key: string = eventKey + index;
        return (
          <Tab eventKey={eventKey} title={title} key={key}>
            <ResidenceComponent residence={residence}  />
          </Tab>
        );
      })}
    </Tabs>
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
        deadline: new Date(),
      },
      {
        order: 2,
        deadline: new Date(),
      },
    ],
  },
  {
    id: '4B',
    machines: [
      {
        order: 1,
        deadline: new Date(),
      },
    ],
  },
  {
    id: '4DD',
    machines: [
      {
        order: 1,
        deadline: new Date(),
      },
      {
        order: 2,
        deadline: new Date(),
      },
      {
        order: 3,
        deadline: new Date(),
      },
    ],
  },
];
