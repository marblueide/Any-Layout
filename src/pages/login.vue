<template>
  <div class="login-register">
    <div class="contain">
      <div class="big-box" :class="{ active: isLogin }">
        <div class="big-contain" key="bigContainLogin" v-if="isLogin">
          <div class="btitle">账户登录</div>
          <div class="bform">
            <input type="email" placeholder="用户名" v-model="form.username" />
            <span class="errTips" v-if="passwordError">* 用户名密码错误 *</span>
            <input type="password" placeholder="密码" v-model="form.password" />
            <span class="errTips" v-if="passwordError">* 用户名密码错误 *</span>
          </div>
          <button class="bbutton" @click="hadnleLogin">登录</button>
        </div>
        <div class="big-contain" key="bigContainRegister" v-else>
          <div class="btitle">创建账户</div>
          <div class="bform">
            <input type="text" placeholder="用户名" v-model="form.username" />
            <span class="errTips" v-if="existed">* 用户名已经存在！ *</span>
            <input type="password" placeholder="密码" v-model="form.password" />
          </div>
          <button class="bbutton" @click="handleRegister">注册</button>
        </div>
      </div>
      <div class="small-box" :class="{ active: isLogin }">
        <div class="small-contain" key="smallContainRegister" v-if="isLogin">
          <div class="stitle">你好，朋友!</div>
          <p class="scontent">开始注册，和我们一起旅行</p>
          <button class="sbutton" @click="changeType(false)">注册</button>
        </div>
        <div class="small-contain" key="smallContainLogin" v-else>
          <div class="stitle">欢迎回来!</div>
          <p class="scontent">与我们保持联系，请登录你的账户</p>
          <button class="sbutton" @click="changeType(false)">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { appStore } from "@/stores";
import { LoginValidator } from "@/utils/validator/login";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { register } from "@/api";
import { ElMessage } from "element-plus";

const { login } = appStore.user;

const router = useRouter();

const isLogin = ref(true);
const passwordError = ref(false);
const existed = ref(false);
const form = reactive({
  username: "admin",
  password: "123456",
});

const changeType = (flag: boolean = false) => {
  isLogin.value = !isLogin.value;
  !flag && (form.username = "");
  form.password = "";
};

const hadnleLogin = async () => {
  const loginValidator = new LoginValidator(form.username, form.password);
  const errors = await loginValidator.validate();
  if (errors.length) {
    passwordError.value = true;
  } else {
    try {
      await login(loginValidator);
      router.push("/");
    } catch (error) {
      passwordError.value = true;
    }
  }
};
const handleRegister = async () => {
  const loginValidator = new LoginValidator(form.username, form.password);
  const errors = await loginValidator.validate();
  if (errors.length) {
    errors.forEach((item) => {
      for (let prop in item.constraints) {
        ElMessage({
          type: "error",
          message: item.constraints[prop],
        });
      }
    });
    return;
  }
  try {
    const res = await register(loginValidator);
    if (res.code == 500) {
      existed.value = true;
      ElMessage({
        type: "error",
        message: res.message,
      });
      return;
    }
    changeType(true);
    ElMessage({
      type: "success",
      message: res.message,
    });
  } catch (error) {
    existed.value = true;
  }
};
</script>

<style scoped="scoped" lang="scss">
.login-register {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
}
.contain {
  width: min(1000px, 80%);
  height: 500px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;
}
.big-box {
  width: 70%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 30%;
  transform: translateX(0%);
  transition: all 1s;
}
.big-contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.btitle {
  font-size: 1.5em;
  font-weight: bold;
  color: rgb(57, 167, 176);
}
.bform {
  width: 100%;
  height: 40%;
  padding: 2em 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  .errTips {
    display: block;
    width: 50%;
    text-align: left;
    color: red;
    font-size: 0.7em;
    margin-left: 1em;
  }
  input {
    width: 50%;
    height: 30px;
    border: none;
    outline: none;
    border-radius: 10px;
    padding-left: 2em;
    background-color: #f0f0f0;
    padding: 7px 20px;
  }
}

.bbutton {
  width: 20%;
  height: 40px;
  border-radius: 24px;
  border: none;
  outline: none;
  background-color: rgb(57, 167, 176);
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}
.small-box {
  width: 30%;
  height: 100%;
  background: linear-gradient(135deg, rgb(57, 167, 176), rgb(56, 183, 145));
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(0%);
  transition: all 1s;
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
}
.small-contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.stitle {
  font-size: 1.5em;
  font-weight: bold;
  color: #fff;
}
.scontent {
  font-size: 0.8em;
  color: #fff;
  text-align: center;
  padding: 2em 4em;
  line-height: 1.7em;
}
.sbutton {
  width: 60%;
  height: 40px;
  border-radius: 24px;
  border: 1px solid #fff;
  outline: none;
  background-color: transparent;
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}

.big-box.active {
  left: 0;
  transition: all 0.5s;
}
.small-box.active {
  left: 100%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
  transform: translateX(-100%);
  transition: all 1s;
}
</style>
