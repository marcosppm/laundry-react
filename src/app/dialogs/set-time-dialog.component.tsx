import * as React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export interface SetTimeDialogProps {
  show: boolean;
  onCancelClick: () => void;
  onSetTimeClick: (minutes: number) => void;
}

export const SetTimeDialog = (props: SetTimeDialogProps) => {
  const [show, setShow] = React.useState(props.show);
  const [minutesText, setMinutesText] = React.useState('');

  return (
    <Modal show={show} onHide={handleClose(setShow)}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Form>
        <Form.Control type="number" value={minutesText} onChange={handleChange(setMinutesText, minutesText)} />
      </Form>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onCancelClick}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSetTimeClick(props.onSetTimeClick, minutesText)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const handleChange = (setText: (text: string) => void, text: string) => () => {
  setText(text);
};

const handleSetTimeClick = (setTime: (minutes: number) => void, minutesText: string) => () => {
  let minutes: number;
  try {
    minutes = parseInt(minutesText);
    setTime(minutes);
  } catch (err) {
    alert('The value typed is not a number.');
  }
};

const handleClose = (setShow: (show: boolean) => void) => () => {
  setShow(false);
};
