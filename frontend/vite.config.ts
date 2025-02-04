import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
  },
  build: {
    rollupOptions: {
      input: {
        statistics: resolve(__dirname, "pages/statistics.html"),
        vote: resolve(__dirname, "pages/vote.html"),
      },
    },
  },
})
