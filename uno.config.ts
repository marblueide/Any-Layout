import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  // transformerVariantGroup,
  transformerDirectives,
} from "unocss";

export default defineConfig({
  rules: [
    ["hl-none", { "line-height": "initial" }],
    [/^hl-(\d+)$/, ([, d]) => ({ "line-height": `${Number(d) * 0.25}rem` })],
    [
      /^ellipsis-(\d+)$/,
      ([, d]) => ({
        overflow: "hidden",
        "text-overflow": "ellipsis",
        display: "-webkit-box",
        "-webkit-line-clamp": d,
        "-webkit-box-orient": "vertical",
      }),
    ],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetWebFonts({
      fonts: {
        serif: "DM Serif Display",
        mono: "DM Mono",
      },
    }),
  ],
  transformers: [transformerDirectives()],
});
