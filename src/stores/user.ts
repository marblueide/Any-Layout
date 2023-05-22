import { login as loginApi } from "@/api";
import type { LoginValidator } from "@/utils/validator/login";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUser = defineStore("user", () => {
    const token = ref(localStorage.getItem(""))
  const login = async (data: LoginValidator) => {
    const res = await loginApi(data);
  };
  return {
    login,
  };
});
