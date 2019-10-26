import React from 'react';
import { Image, Row, Button } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { H1 } from '../../components';
import { Strings } from '../../resources/strings';
import { ThreeDotsIcon } from '../../resources/images';
import { MainNavigatorStyled } from './main-navigator.style';

export class MainNavigator extends React.Component {
	render() {
		return (
			<MainNavigatorStyled>
        <Row>
          <Col md={'auto'}>
            <Button variant='outline-light'>
              <Image
                src={ThreeDotsIcon}
                width={30}
                height={30}
              />
            </Button>
          </Col>
          <Col md={{ offset: 5 }}>
            <H1>{Strings.AppName}</H1>
          </Col>
        </Row>
			</MainNavigatorStyled>
		);
	}
}