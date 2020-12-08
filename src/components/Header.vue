<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="primary" @click="back">
          <!-- <ion-icon name="arrow-back"></ion-icon> -->
          <img
            src="https://static.easyicon.net/preview/118/1183399.gif"
            alt=""
            style="width: 15px; height: 15px"
          />
          返回
        </ion-button>
      </ion-buttons>
      <ion-title style="text-align: center">{{ title }}</ion-title>
      <ion-buttons slot="end">
        <ion-button color="primary" @click="home">
          <!-- <ion-icon name="home"></ion-icon> -->
          <img
            src="https://static.easyicon.net/preview/122/1227781.gif"
            style="width: 30px; height: 30px"
            alt=""
          />
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {
      title: "",
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    home() {
      this.$router.push("/home");
    },
  },
};
</script>
<style scoped>
</style>