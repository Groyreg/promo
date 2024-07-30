import { useMemo } from 'react';
import {
  BulbOutlined,
  ClockCircleOutlined,
  RocketOutlined,
  SnippetsOutlined,
  SolutionOutlined,
  StarOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { useMediaQuery } from '@shared/hooks';
import { BREAKPOINTS } from '@shared/palette';

import { INavItem } from './interfaces';

export const useNavData = (): INavItem[] => {
  const isMobile = useMediaQuery(BREAKPOINTS.mobileS);

  const desktopNav = [
    {
      icon: ClockCircleOutlined,
      id: 1,
      isActive: false,
      title: 'test',
      url: '/news',
    },
    {
      icon: SnippetsOutlined,
      id: 2,
      isActive: false,
      title: 'test',
      url: '/signals',
    },
    {
      icon: StarOutlined,
      id: 3,
      isActive: false,
      title: 'test',
      url: '/favorite',
    },
    {
      icon: TeamOutlined,
      id: 4,
      isActive: false,
      title: 'test',
      url: '/subscribes',
    },
    {
      icon: BulbOutlined,
      id: 5,
      isActive: false,
      title: 'test',
      url: '/faq',
    },
    {
      icon: RocketOutlined,
      id: 6,
      isActive: false,
      title: 'test',
      url: '/about',
    },
  ];
  const mobilepNav = [
    {
      icon: ClockCircleOutlined,
      id: 1,
      isActive: false,
      title: 'test',
      url: '/news',
    },
    {
      icon: SnippetsOutlined,
      id: 2,
      isActive: false,
      title: 'test',
      url: '/signals',
    },
    {
      icon: StarOutlined,
      id: 3,
      isActive: false,
      title: 'test',
      url: '/favorite',
    },
    {
      icon: SolutionOutlined,
      id: 4,
      isActive: false,
      title: 'test',
      url: '/profile',
    },
  ];

  const setNavData = (): INavItem[] => (isMobile ? mobilepNav : desktopNav);

  return useMemo(setNavData, [isMobile]);
};
