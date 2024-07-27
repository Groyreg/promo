import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';

import { compilerOptions } from './alias.json';

const { paths: alias } = compilerOptions;

const getAlias = (): Record<string, string> => {
  const transformPath = (key: string | string[]): string => {
    if (Array.isArray(key)) return key[0].replace('/*', '');

    return key.replace('/*', '');
  };

  const aliasKeys = Object.keys(alias).map(transformPath);
  const aliasPath = Object.values(alias).map(transformPath);
  const aliasMapped = Object.fromEntries(
    aliasKeys.map((key, index) => [key, path.resolve(__dirname, aliasPath[index])]),
  );

  return aliasMapped;
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, `${process.cwd()}/.env`));
  const modulePort = process.env.VITE_MODULE_PORT ? Number(process.env.VITE_MODULE_PORT) : 5173;

  return {
    build: {
      target: 'esnext',
    },
    plugins: [react(), svgr()],
    preview: {
      port: modulePort,
      strictPort: true,
    },
    resolve: {
      alias: getAlias(),
    },
    server: {
      port: modulePort,
      proxy: {
        '/api': {
          changeOrigin: true,
          secure: false,
          target: process.env.VITE_HOST,
        },
      },
      strictPort: true,
    },
  };
});
