
import tsconfigPaths from 'vite-tsconfig-paths';

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const cherryPickedKeys = [
  "BASE_SERVER_URL",
  "REACT_APP_SERVER_ENDPOINT",
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const processEnv = {};
  cherryPickedKeys.forEach(key => processEnv[key] = env[key]);

  return {
    define: {
      'process.env': processEnv
    },
    plugins: [react(), tsconfigPaths()]
  }
})