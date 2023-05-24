import axios from "axios";
import pubSub from "./tools";
import { appStore } from "@/stores";
import { storeToRefs } from "pinia";
import router from "@/router/index"

const request = axios.create({
  baseURL: "/api",
});

request.interceptors.request.use((config) => {
  const { token, user } = storeToRefs(appStore.user);
  config.headers.Authorization = `Bearer ${token.value}`;
  return config;
});

request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    if (err.response.status == 401) {
      router.push("/login");
    }
  }
);

export default request;
