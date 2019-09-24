import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { DashboardHeaderStyled, ButtonStyled } from './dashboard.component.style';
import { ThreeDotsIcon } from '../../resources';
import { H1 } from '../../components';
import Row from 'react-bootstrap/Row';

export class Dashboard extends React.Component {
  render() {
    return (
      <Container fluid={true}>
        <DashboardHeaderStyled className='align-middle'>
          <DashboardHeader />
        </DashboardHeaderStyled>
        <Row>
          <Col>
            <DashboardTabs />
          </Col>
        </Row>
      </Container>
    );
  }
}

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
  <>
    <Col>
      <H1>Tabs</H1>
    </Col>
  </>
);
