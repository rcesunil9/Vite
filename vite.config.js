import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
preview:{
  port :3000
},
  server: {

//   proxy: {
  //    '/letzparty': {
    //    target: 'https://demo.sgvproject.in',
      //  changeOrigin: true,
       // configure: (proxy, options) => {
          // proxy will be an instance of 'http-proxy'
       // },
     // }
  //  }
  },
  optimizeDeps: {
    exclude: ['node_modules'],
  },
  plugins: [react()],
})
