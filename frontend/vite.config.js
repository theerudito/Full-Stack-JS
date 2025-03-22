import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["react.between-bytes.tech", "localhost"],
    host: "0.0.0.0", // Esto expone el servidor en todas las interfaces de red
    port: 300, // O el puerto que desees usar
  },
});
