import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import Unocss from "unocss/vite";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Pages from "vite-plugin-pages";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

const base = {
  build: {
    outDir: resolve(__dirname, "./docs"),
  },
  plugins: [
    vue(),
    Pages({
      exclude: ["**/components/*.vue"],
    }),
    AutoImport({
      imports: ["vue", "vue-router", "pinia"],
      eslintrc: {
        enabled: true,
      },
      dts: true,
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      dts: true,
      types: [
        {
          from: "vue-router",
          names: ["RouterView", "RouterLink"],
        },
      ],
      resolvers: [ElementPlusResolver()],
    }),
    Unocss({
      configFile: resolve(__dirname, "uno.config.ts"),
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
    },
  },
};

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  let config = {
    base: command == "serve" ? "" : "/Any-Layout",
  };
  return {
    ...base,
    ...config,
  };
});
