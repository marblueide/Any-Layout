import type { App } from "vue";
import VGroup from "./VGroup/index.vue";

export default function install(app: App) {
  app.component("VGroup", VGroup);
}
