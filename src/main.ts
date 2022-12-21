import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import LowComponent from "./components/LowCodeCompoent/index";
import "uno.css";
import "normalize.css";
import "./styles/global.scss";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(LowComponent);

app.mount("#app");
