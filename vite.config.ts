import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: "/diary3/",

  plugins: [
    tailwindcss(),
    react(),

    // /diary3 → /diary3/ にリダイレクトしてくれるだけの簡易ミドルウェア
    {
      name: "add-trailing-slash",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // exact match で /diary3 に来たら
          if (req.url === "/diary3") {
            res.writeHead(301, { Location: "/diary3/" });
            res.end();
          } else {
            next();
          }
        });
      },
    },
  ]
});
