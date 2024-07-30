import { GlobalToken } from 'antd';

export interface Theme {
  antd: GlobalToken | null;
  colors: {
    accent: string;
    accentDisabled: string;
    accentHover: string;
    accentText: string;
    bg: string;
    blockBG: string;
    contrast: string;
    inputBG: string;
    invertBG: string;
    invertBlockBG: string;
    shadow: string;
    text: string;
  };
  name: string;
}

export interface ITheme {
  theme: Theme;
}
