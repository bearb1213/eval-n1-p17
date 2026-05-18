import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
        react(),
        tailwindcss(),
    ],
    server :{
      proxy : {
          '/api/images': {
              target: 'http://localhost/prestashop',
              changeOrigin: true,
              configure: (proxy, options) => {
              proxy.on('proxyReq', (proxyReq, req, res) => {
                // Ajouter ws_key à toutes les requêtes d'images
                const apiKey = process.env.VITE_API_KEY;
                let path = proxyReq.path;
                const separator = path.includes('?') ? '&' : '?';
                proxyReq.path = `${path}${separator}ws_key=${apiKey}`;
                console.log(`Image proxy: ${req.url} -> ${proxyReq.path}`);
              });
            }
          },
          '/api': {
            target: env.VITE_URL_API ?? "http://localhost/prestashop",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/,''),
          //     configure: (proxy, options) => {
          // proxy.on('proxyReq', (proxyReq, req, res) => {
          //   // Ajoute l'authentification Basic au proxy depuis les variables d'env
          //   const apiKey = process.env.VITE_API_KEY;
          //   if (apiKey) {
          //     const credentials = Buffer.from(`${apiKey}:`).toString('base64');
          //     proxyReq.setHeader('Authorization', `Basic ${credentials}`);
          //   }
          // });
          // },
        },
      },
    },
  };
})

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// const WS_KEY = 'A4F2RV1ZS88ZYA6DS4QSIRFACSB8XEYB'; 

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5173,
//     proxy: {
//       '/api/images': {
//         target: 'http://localhost/prestashop',
//         changeOrigin: true,
//         secure: false,
//         configure: (proxy, options) => {
//           proxy.on('proxyReq', (proxyReq, req, res) => {
//             // Ajouter ws_key à toutes les requêtes d'images
//             let path = proxyReq.path;
//             const separator = path.includes('?') ? '&' : '?';
//             proxyReq.path = `${path}${separator}ws_key=${WS_KEY}`;
//             console.log(`Image proxy: ${req.url} -> ${proxyReq.path}`);
//           });
//         }
//       },
//       '/api': {
//         target: 'http://localhost/prestashop',
//         changeOrigin: true,
//         secure: false,
//       },
//     }
//   }
// })