import { login as loginApi } from "@/api";
import type { User } from "@/types/model/User";
import { UserGroupEnum } from "@/types/user.enum";
import type { LoginValidator } from "@/utils/validator/login";
import { ElMessage } from "element-plus";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

const pattern = /^"|"$|^\u201C|\u201D$/g; // 匹配双引号或中文引号

export const useUser = defineStore("user", () => {
  const token = ref(String(localStorage.getItem("access_token") ?? ""));
  console.log(localStorage.getItem("user"));
  const user = ref<User>(
    localStorage.getItem("user") != null
      ? JSON.parse(localStorage.getItem("user") as string)
      : ""
  );
  const isLogin = computed(() => {
    return (
      Object.keys(user.value).length > 0 &&
      token.value &&
      token.value?.length > 0
    );
  });
  const groupName = computed(() => {
    return user.value.userGroup?.groupName;
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
    token.value = "";
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
  };

  watch(token, (value) => {
    value && localStorage.setItem("access_token", value);
  });

  watch(user, (value) => {
    value && localStorage.setItem("user", JSON.stringify(value));
  });

  const verify = (roles: string[]) => {
    console.log(roles,roles.includes(groupName.value))
    return groupName.value && roles.includes(groupName.value);
  };

  return {
    login,
    out,
    isLogin,
    token,
    user,
    verify,
    groupName
  };
});
