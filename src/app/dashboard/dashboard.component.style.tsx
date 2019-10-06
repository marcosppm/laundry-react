import styled from 'styled-components';
import { Color, HALF_GUTTER, ScreenUnit } from '../../resources/constants';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export const DashboardHeaderStyled = styled(Row)`
  background-color: ${Color.Primary};
  margin-bottom: ${HALF_GUTTER + ScreenUnit.Pixels};
`;

export const ButtonStyled = styled(Button)`
  margin-top: ${HALF_GUTTER + ScreenUnit.Pixels};
`;
