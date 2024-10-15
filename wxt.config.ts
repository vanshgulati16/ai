import { defineConfig, type UserConfig } from 'wxt'

export default defineConfig({
  manifest: {
    name: "LinkedIn AI Reply",
    version: "0.0.1",
    description: "Generates AI replies for LinkedIn messages",
    permissions: ["activeTab"],
  },
  entrypointsDir: './entrypoints',
})
