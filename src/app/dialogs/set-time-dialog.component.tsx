import * as React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Machine } from '../../model';
import { Strings } from '../../resources/strings';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export interface SetTimeDialogProps {
  show: boolean;
  machine: Machine | undefined;
  onCancelClick: () => void;
  onSetTimeClick: (minutes: number) => void;
}

export const SetTimeDialog = (props: SetTimeDialogProps) => {
  const [minutesText, setMinutesText] = React.useState('');

  const handleChange = (event: any) => {
    setMinutesText(event.target.value);
  };

  const handleCancelClick = () => {
    setMinutesText('');
    props.onCancelClick();
  };

  const handleSetTimeClick = (minutesText: string) => () => {
    let minutes: number;
    try {
      minutes = parseInt(minutesText);
      props.onSetTimeClick(minutes);
      setMinutesText('');
    } catch (err) {
      alert(Strings.Components.SetTimeDialog.TypeError);
    }
  };

  const getModalTitle = (order: number) => {
    return `${Strings.Components.SetTimeDialog.Machine} ${order}`;
  }

  return (
    <Modal show={props.show} onHide={handleCancelClick}>
      {props.machine === undefined ?
        <Modal.Header closeButton>
          <Modal.Title>{Strings.Components.SetTimeDialog.NotFound}</Modal.Title>
        </Modal.Header>
        :
        <>
          <Modal.Header closeButton>
            <Modal.Title>{getModalTitle(props.machine.order)}</Modal.Title>
          </Modal.Header>
          <Form>
            <Row>
              <Col md={1} />
              <Col md={{ span: 10 }}>
                <Form.Control type="number" value={minutesText} onChange={handleChange} />
              </Col>
              <Col md={1} />
            </Row>
          </Form>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelClick}>
              {Strings.Components.SetTimeDialog.Cancel}
            </Button>
            <Button variant="primary" onClick={handleSetTimeClick(minutesText)}>
              {Strings.Components.SetTimeDialog.SetTime}
            </Button>
          </Modal.Footer>
        </>
      }
    </Modal>
  );
};
