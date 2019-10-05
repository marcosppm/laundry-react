import styled from 'styled-components';
import { Color } from '../../resources/constants';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export const DashboardHeaderStyled = styled(Row)`
  background-color: ${Color.Primary};
`;

export const ButtonStyled = styled(Button)`
  margin-top: 5px;
`;
