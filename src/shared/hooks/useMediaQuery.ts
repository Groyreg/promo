import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string): boolean => {
  const mediaMatch = window.matchMedia(query);
  const [matches, setMatches] = useState<boolean>(mediaMatch.matches);

  const onInit = (): (() => void) => {
    const handler = (event: MediaQueryListEvent): void => setMatches(event.matches);

    mediaMatch.addListener(handler);

    return () => mediaMatch.removeListener(handler);
  };

  useEffect(onInit, []);

  return matches;
};
