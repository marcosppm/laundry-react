import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';

import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { NavbarStyle } from './dashboard.component.style';

export class Dashboard extends React.Component {
  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col>
            <DashboardHeaderButtons />
          </Col>
        </Row>
      </Container>
    );
  }
}

const DashboardHeaderButtons = () => (
  <NavbarStyle>
    <Button variant="outline-light">
      <Image
        src='https://facebook.github.io/react-native/img/tiny_logo.png'
        width={15}
        height={30}
      />
    </Button>
    <Navbar.Brand style={{marginLeft: 20}}>Laundry CS</Navbar.Brand>
  </NavbarStyle>
);
