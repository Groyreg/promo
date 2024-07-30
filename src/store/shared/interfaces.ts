import { Theme } from '@shared/palette/interfaces';
import { IDefaultStore } from '@store/config';

export interface ISharedStore extends IDefaultStore {
  theme: Theme;
  toggleTheme: () => void;
}
