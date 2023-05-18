import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import Unocss from "unocss/vite";
import { join, resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import IconsResolver from "unplugin-icons/resolver";
import Pages from "vite-plugin-pages";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

const base = {
  build: {
    outDir: resolve(__dirname, "./docs"),
  },
  plugins: [
    vue(),
    Pages({
      exclude: ["**/components/*.vue"],
      routeStyle: "nuxt",
    }),
    AutoImport({
      imports: ["vue", "vue-router", "pinia"],
      eslintrc: {
        enabled: true,
      },
      dts: true,
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: "Icon",
        }),
      ],
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
    createSvgIconsPlugin({
      iconDirs: [join(__dirname, "src/assets/svg")],
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
    base: command == "serve" ? "" : "./",
  };
  return {
    ...base,
    ...config,
  };
});
