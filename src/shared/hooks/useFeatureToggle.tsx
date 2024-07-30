import React, { createContext, ReactElement, ReactNode, useContext } from 'react';

import featureToggles from '../../../feature-toggles.json';

export interface IProps {
  children: ReactNode;
}

const FeatureToggleContext = createContext(featureToggles);

export const FeatureToggleProvider = ({ children }: IProps): ReactElement => (
  <FeatureToggleContext.Provider value={featureToggles}>{children}</FeatureToggleContext.Provider>
);

export const useFeatureToggle = (featureName: string): boolean => {
  const features = useContext(FeatureToggleContext);

  return features[featureName as keyof typeof features] || false;
};
