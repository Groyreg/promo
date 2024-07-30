import { Theme } from './interfaces';

export const DARK_THEME: Theme = {
  antd: null,
  colors: {
    accent: '#7000ff',
    accentDisabled: '#9d81c1',
    accentHover: '#8d29ff',
    accentText: '#a678e2',
    bg: '#181a20',
    blockBG: '#23282E',
    contrast: '#2e2e2e',
    inputBG: '#181a20',
    invertBG: '#E8E8E8',
    invertBlockBG: '#fff',
    shadow: 'rgba(0, 0, 0, 0.2) 6px 8px 10px 1px',
    text: '#E8E8E8',
  },
  name: 'dark',
};

export const LIGHT_THEME: Theme = {
  antd: null,
  colors: {
    accent: '#7000ff',
    accentDisabled: '#9d81c1',
    accentHover: '#8d29ff',
    accentText: '#a678e2',
    bg: '#E8E8E8',
    blockBG: '#fff',
    contrast: 'black',
    inputBG: '#fff',
    invertBG: '#181a20',
    invertBlockBG: '#1E2329',
    shadow: '2px 2px 6px 1px rgba(34, 60, 80, 0.2)',
    text: '#181a20',
  },
  name: 'light',
};

export const BREAKPOINTS = {
  desktopL: '(min-width: 1920px)',
  desktopM: '(min-width: 1366px)',
  desktopS: '(min-width: 1024px)',
  desktopXL: '(min-width: 2560px)',
  desktopXS: '(min-width: 768px)',

  fromDesktop: '(min-width: 1024px)',
  fromTablet: '(min-width: 768px)',
  mobileL: '(min-width: 375px) and (max-width: 767px)',
  mobileM: '(min-width: 360px) and (max-width: 767px)',
  mobileS: '(min-width: 320px) and (max-width: 767px)',

  mobileXL: '(min-width: 414px) and (max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
};
