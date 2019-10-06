import styled from "styled-components";
import { DefaultColor, Border } from "../../resources/constants";
import Card from "react-bootstrap/Card";

export const CardStyled = styled(Card)`
  background-color: ${DefaultColor.BlueJeans};
  border-color: ${DefaultColor.DarkBlue};
  border-width: ${Border.Width};
`;
