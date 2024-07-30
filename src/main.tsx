import React, { ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Interceptors } from '@app/api/axios';
import AppRouter from '@app/router';
import GlobalStyle from '@app/styles';
import { FeatureToggleProvider } from '@shared/hooks';
import { getFields } from '@store/config';
import useSharedStore from '@store/shared';
import { ConfigProvider } from 'antd';
import { ThemeProvider } from 'styled-components';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

const App = (): ReactElement => {
  const { theme } = useSharedStore(getFields('theme'));

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 4,
          colorBgContainer: 'white',
          colorPrimary: '#7000ff',
        },
      }}
    >
      <ThemeProvider theme={{ ...theme }}>
        <GlobalStyle />
        <Interceptors>
          <FeatureToggleProvider>
            <BrowserRouter>
              <AppRouter />
            </BrowserRouter>
          </FeatureToggleProvider>
        </Interceptors>
      </ThemeProvider>
    </ConfigProvider>
  );
};

export default App;

root.render(<App />);
