import * as React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Machine } from '../../model';
import { Strings } from '../../resources/strings';
import Row from 'react-bootstrap/Row';
import { ErrorMessage } from '../../components';
import { ColDialogSetTimeStyled } from './set-time-dialog.component.style';

export interface SetTimeDialogProps {
  show: boolean;
  machine: Machine | undefined;
  onCancelClick: () => void;
  onSetTimeClick: (minutes: number) => void;
}

export const SetTimeDialog = (props: SetTimeDialogProps) => {
  const [minutesText, setMinutesText] = React.useState('');
  const [error, setError] = React.useState(false);

  const handleChange = (event: any) => {
    setError(false);
    setMinutesText(event.target.value);
  };

  const handleCancelClick = () => {
    resetForm();
    props.onCancelClick();
  };

  const handleSetTimeClick = () => {
    let minutes: number;
    if (minutesText.length === 0 || isNaN(+minutesText)) {
      setError(true);
    } else {
      minutes = parseInt(minutesText);
      props.onSetTimeClick(minutes);
      resetForm();
    }
  };

  const getModalTitle = (order: number) => {
    return `${Strings.Components.SetTimeDialog.Machine} ${order}`;
  };

  const resetForm = () => {
    setError(false);
    setMinutesText('');
  };

  return (
    <Modal show={props.show} onHide={handleCancelClick}>
      {props.machine === undefined ?
        <Modal.Header closeButton>
          <Modal.Title>{Strings.Components.SetTimeDialog.NotFound}</Modal.Title>
        </Modal.Header>
        :
        <>
          <Modal.Header closeButton >
            <Modal.Title>{getModalTitle(props.machine.order)}</Modal.Title>
          </Modal.Header>
          <Form>
            <Row>
              <ColDialogSetTimeStyled>
                <Form.Control type="number" value={minutesText} onChange={handleChange} />
                {error && minutesText.length === 0 &&
                  <ErrorMessage>{Strings.Components.SetTimeDialog.TypeError}</ErrorMessage>
                }
              </ColDialogSetTimeStyled>
            </Row>
          </Form>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelClick}>
              {Strings.Components.SetTimeDialog.Cancel}
            </Button>
            <Button variant="primary" onClick={handleSetTimeClick}>
              {Strings.Components.SetTimeDialog.SetTime}
            </Button>
          </Modal.Footer>
        </>
      }
    </Modal>
  );
};
