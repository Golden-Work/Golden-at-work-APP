import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },

  // add alias for @/ folder shortcut
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
})
