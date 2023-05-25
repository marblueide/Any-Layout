import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import LowComponent from "./components/LowCodeCompoent/index";
import {registerStore} from "@/stores/index"
import "uno.css";
import "normalize.css";
import 'element-plus/dist/index.css'
import "./styles/global.scss";
import 'virtual:svg-icons-register'

const app = createApp(App);

app.use(createPinia());
registerStore()
app.use(router);
app.use(LowComponent);

app.mount("#app");
