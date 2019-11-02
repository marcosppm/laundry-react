import * as React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Machine } from '../../model';

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

  const handleSetTimeClick = (minutesText: string) => () => {
    let minutes: number;
    try {
      minutes = parseInt(minutesText);
      props.onSetTimeClick(minutes);
    } catch (err) {
      alert('The value typed is not a number.');
    }
  };

  return (
    <Modal show={props.show}>
      {props.machine === undefined ?
        <Modal.Header closeButton>
          <Modal.Title>No machine found</Modal.Title>
        </Modal.Header>
      :
        <>
          <Modal.Header closeButton>
            <Modal.Title>Set time for machine {props.machine.order}</Modal.Title>
          </Modal.Header>
          <Form>
            <Form.Control type="number" value={minutesText} onChange={handleChange} />
          </Form>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.onCancelClick}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSetTimeClick(minutesText)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </>
      }
    </Modal>
  );
};
