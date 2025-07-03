import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'  // ✅ ADD THIS

export default defineConfig({
  plugins: [react(), tsconfigPaths()], // ✅ ADD PLUGIN HERE
})
