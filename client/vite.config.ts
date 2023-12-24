import tsconfigPaths from 'vite-tsconfig-paths';

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const cherryPickedKeys = [
   'BASE_SERVER_URL',
   'REACT_APP_SERVER_ENDPOINT',
   'REACT_APP_SERVER_PORT',
   'REACT_APP_SERVER_HOST',
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
   const env = loadEnv(mode, process.cwd(), '');
   const processEnv: any = {};
   cherryPickedKeys.forEach((key) => (processEnv[key] = env[key]));
   return {
      define: {
         'process.env': processEnv,
      },
      plugins: [react(), tsconfigPaths()],
      server: {
         host: processEnv.REACT_APP_SERVER_HOST,
         port: processEnv.REACT_APP_SERVER_PORT,
      },
   };
});
