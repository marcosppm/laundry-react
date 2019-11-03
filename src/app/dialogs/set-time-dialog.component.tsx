import * as React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Machine } from '../../model';
import { Strings } from '../../resources/strings';

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

  const getModalTitle = (order: number) => {
    return `${Strings.Components.SetTimeDialog.Machine} ${order}`;
  }

  return (
    <Modal show={props.show}>
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
            <Form.Control type="number" value={minutesText} onChange={handleChange} />
          </Form>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.onCancelClick}>
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
