<template>
  <ion-app class="background">
    <ion-label class="label">大连公路巡查</ion-label>
    <div>
      <ion-input
        placeholder="用户名"
        class="input"
        :value="username"
        @ionInput="username = $event.target.value"
      ></ion-input>
      <ion-input
        placeholder="密码"
        class="input"
        type="password"
        :value="password"
        @ionInput="password = $event.target.value"
      ></ion-input>
    </div>
    <ion-button class="btn" @click="loginMobile" shape="round">登录</ion-button>
    <a class="link"></a>
  </ion-app>
</template>
<script>
import * as request from "@/api/API";
import { getStore, setStore, removeStore } from "@/assets/js/localStorage";
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      username: [],
      password: [],

      addInformationForm: {
        // 用户名
        username: "",
        // 密码
        password: "",
      },
    };
  },
  methods: {
    loginMobile() {
      this.addInformationForm.username = this.username;
      this.addInformationForm.password = this.password;

      const params = this.addInformationForm;
      request
        .loginMobile(params)
        .then((response) => {
          setStore("id", response.data.id);
          setStore("name", response.data.name);
          setStore("deptId", response.data.deptId);
          setStore("account", response.data.account);
          setStore("avatar", response.data.avatar);
          setStore("deptName", response.data.deptName);
          setStore("email", response.data.email);
          setStore("roleId", response.data.roleList[0]);
          switch (response.data.roleList[0]) {
            case 12:
              this.$router.push({ path: "/home" });
              break;
            case "1200000929026998274":
              this.$router.push({ path: "/auditing" });
              break;
            case "1200000838539083777":
              this.$router.push({ path: "/assessing" });
              break;
            case 16:
              this.$router.push({ path: "/auditing" });
              break;
            default:
              this.$ionic.alertController
                .create({
                  header: "登录失败",
                  message: "用户名或密码错误.",
                  buttons: ["确定"],
                })
                .then((a) => a.present());
          }
        })
        .catch((err) => {
          // console.log("登陆失败");
          this.$ionic.alertController
            .create({
              header: "登录失败",
              message: "用户名或密码错误.",
              buttons: ["确定"],
            })
            .then((a) => a.present());
        });
    },
  },
};
</script>
<style scoped>
.background {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url("~@/assets/img/mybackground.png");
  background-size: 100% 100%;
}
.input {
  border-style: none;
  height: 2.3rem;
  width: 17rem;
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #ffffff;
  border-radius: 2rem;
  text-indent: 1rem;
  display: block;
  font-size: small;
  color: #ffffff;
  outline: none;
}
.label {
  margin-left: auto;
  margin-right: auto;
  color: white;
  margin-top: 50%;
  font-weight: bold;
  font-size: 1.5rem;
}
.btn {
  height: 2.3rem;
  width: 17rem;
  background-color: #108ee9;
  color: #ffffff;
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;
  border-radius: 2rem;
  font-size: medium;
}
.link {
  font-size: 0.5rem;

  margin-right: auto;
  margin-left: auto;
  color: #ffffff;
  margin-bottom: 55%;
}
</style>