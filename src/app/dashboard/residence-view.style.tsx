import styled from 'styled-components';
import { ScreenUnit, GUTTER } from '../../resources/constants';
import Row from 'react-bootstrap/Row';

export const MachinesRowStyled = styled(Row)`
  margin-top: ${GUTTER + ScreenUnit.Pixels};
`;
