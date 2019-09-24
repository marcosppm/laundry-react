import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';

import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class Dashboard extends React.Component {
  render() {
    return (
      <Container>
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
<<<<<<< HEAD
  <Navbar bg="primary" variant="dark" style={{marginLeft: 20}}>
=======
  <Navbar bg="primary" variant="dark">
>>>>>>> Started title bar
    <Button variant="outline-light">
      <Image
        src='https://facebook.github.io/react-native/img/tiny_logo.png'
        width={10}
        height={30}
      />
    </Button>
    <Navbar.Brand style={{marginLeft: 20}}>Laundry CS</Navbar.Brand>
  </Navbar>
);
