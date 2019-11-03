export enum DefaultColor {
  PaleCyan = '#99d5f9',
  BlueJeans = '#5cbcf6 ',
  DodgerBlue = '#20a4f3',
  GreenBlue = '#1878b1',
  DarkBlue = '#0f4b6f',
  Black = '#000000',
  White = '#ffffff',
  Red = '#ff0000',
  Green = '#00ff00',
};

export class Color {
  public static readonly Primary = DefaultColor.DodgerBlue;
  public static readonly Secondary = DefaultColor.BlueJeans;
  public static readonly Alert = DefaultColor.Red;
}

export enum FontSize {
  XXSmall = 11,
  XSmall = 12,
  Small = 14,
  Medium = 20,
  Large = 24,
  XLarge = 42,
}

export enum Spacing {
  Gutter = 8,
  HalfGutter = 4,
}

export const GUTTER: number = 8;
export const HALF_GUTTER: number = 4;

export enum ScreenUnit {
  Pixels = 'px',
}

export const Border = {
  Radius: 4,
  Width: 2,
  Color: DefaultColor.DarkBlue,
};
