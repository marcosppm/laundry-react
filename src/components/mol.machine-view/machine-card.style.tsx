import styled from "styled-components";
import { DefaultColor, Border, Color } from "../../resources/constants";
import Card from "react-bootstrap/Card";

export const CardStyled = styled(Card)`
  background-color: ${DefaultColor.BlueJeans};
  border-color: ${DefaultColor.DarkBlue};
  border-width: ${Border.Width};
`;

export interface CardAlertStyledProps {
  reachedFinishingThreshold: boolean;
}

export const CardTextStyled = styled(Card.Text)`
  color: ${(props: CardAlertStyledProps) => props.reachedFinishingThreshold ? Color.Alert : DefaultColor.Black};
`;

export const CardSubtitleStyled = styled(Card.Subtitle)`
  color: ${(props: CardAlertStyledProps) => props.reachedFinishingThreshold ? Color.Alert : DefaultColor.Black};
`;

