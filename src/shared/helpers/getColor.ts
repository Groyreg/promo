import { Theme } from '@shared/palette/interfaces';
import { GlobalToken } from 'antd';

export interface IStyles {
  theme: Theme;
}

export type TTheme = (themeData: IStyles) => string;

export const getColor =
  (color: keyof Theme['colors']): TTheme =>
  ({ theme }: IStyles): string => {
    const value = color as unknown as Theme['colors'];

    // @ts-ignore
    return theme.colors[value];
  };

export const getAntdProp =
  (prop: keyof GlobalToken): TTheme =>
  ({ theme }: IStyles): string => {
    const value = prop as unknown as Theme['colors'];

    // @ts-ignore
    return theme.antd[value];
  };
