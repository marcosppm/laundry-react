import styled from "styled-components";
import { FontSize, DefaultColor, Color } from "../resources";

export const H1 = styled.h1`
  font-size: ${FontSize.Large};
  color: ${DefaultColor.Black};
`;

export const H3 = styled.h3`
  font-size: ${FontSize.Medium};
  color: ${DefaultColor.Black};
`;

export const ErrorMessage = styled.h6`
  font-size: ${FontSize.XXSmall};
  color: ${Color.Alert};
`;
