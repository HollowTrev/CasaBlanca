import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    port: 3535,
    host: "0.0.0.0", // This should be true or omitted to bind to all available network interfaces.
  },
  plugins: [react()],
  base: "/CasaBlanca/", // Set the base URL for your assets
});
