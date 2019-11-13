import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { Strings } from '../../resources';
import { H3 } from '../../components';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Residence, Machine } from '../../model/entities';
import { ResidenceComponent } from './residence-view.component';

interface DashboardTabsProps {
  fct: () => void;
  arrow: () => void;
  a: number;
}

const DashboardTabs: React.FC<DashboardTabsProps> = props => {
  props.fct(); // the call-site    a = 5  b = 3
  props.arrow(); //                a = 2
  return (
    <Tabs id={"residences-main-tab"}>
      {datasourceResidences.map((residence, index) => {
        const eventKey: string = `${Strings.Pages.ResidenceShort} ${residence.id}`;
        const title: string = `${Strings.Pages.Residence} ${residence.id}`;
        const key: string = eventKey + index;
        return (
          <Tab eventKey={eventKey} title={title} key={key}>
            <ResidenceComponent residence={residence} />
          </Tab>
        );
      })}
    </Tabs>
  );
};

export class Dashboard extends React.Component {
  private a = 2; 
  render() {
    return (
      <Container fluid={true}>
        <DashboardTabs a={5} fct={this.fct} arrow={this.arrow} />
      </Container>
    );
  }

  private fct() { // call-site matters
    var b = 3;
    console.log(this.a);
    console.log(b); // remember fct() lexical scope ==> closure
  }

  
  private arrow = () => { // enclosing scope matters
    var c = 4;
    console.log(this.a);
    console.log(c); // remember arrow() lexical scope ==> closure
  };
};

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
