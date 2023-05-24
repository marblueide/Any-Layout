import { login as loginApi } from "@/api";
import type { User } from "@/types/model/User";
import type { LoginValidator } from "@/utils/validator/login";
import { ElMessage } from "element-plus";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

export const useUser = defineStore("user", () => {
  const token = ref(JSON.parse(localStorage.getItem("access_token") ?? ""));
  const user = ref<User>(
    JSON.parse(localStorage.getItem("user") ?? "{}") as User
  );
  console.log(token.value)
  const isLogin = computed(() => {
    return (
      Object.keys(user.value).length > 0 &&
      token.value &&
      token.value?.length > 0
    );
  });
  const login = async (data: LoginValidator) => {
    const res = await loginApi(data);

    token.value = res.access_token;
    user.value = res.data;
    ElMessage({
      type: "success",
      message: res.message,
    });
  };

  const out = () => {
    user.value = {} as User;
    token.value = ""
    localStorage.removeItem("access_token")
    localStorage.removeItem("user")
  }

  watch(token, (value) => {
    value && localStorage.setItem("access_token", JSON.stringify(value));
  });

  watch(user, (value) => {
    value && localStorage.setItem("user", JSON.stringify(value));
  });

  return {
    login,
    out,
    isLogin,
    token,
    user,
  };
});
