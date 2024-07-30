import { ReactNode } from 'react';
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';

export interface IProps {
  children: ReactNode;
  icon: AntdIconProps;
  url: string;
}
