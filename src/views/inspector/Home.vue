<template>
  <ion-app style="background-color: #f2f2f2">
    <Header ref="header" />
    <ion-content>
      <ion-slides pager="true" :options="slideOpts" style="height: 30%">
        <ion-slide>
          <viewer>
            <img src="../../assets/img/img2.jpg" />
          </viewer>
        </ion-slide>
        <ion-slide>
          <viewer>
            <img src="../../assets/img/img3.jpg" />
          </viewer>
        </ion-slide>
      </ion-slides>
      <ion-card
        v-for="notification in notifications"
        :key="notification.notificationId"
      >
        <ion-item @click="presentAlert(notification.content)">
          <ion-label color="primary"
            >{{ notification.title }}
            <ion-badge color="success">1</ion-badge>
            <ion-label color="medium">{{ notification.content }}</ion-label>
          </ion-label>
          <ion-label
            >发布人: {{ notification.publisher }}
            <ion-label color="medium">{{ notification.publishTime }}</ion-label>
          </ion-label>
        </ion-item>
      </ion-card>
    </ion-content>
    <TabBar />
  </ion-app>
</template>

<script>
import * as API from "@/api/API";
import TabBar from "@/components/TabBar.vue";
import Header from "@/components/Header.vue";
import { thistle } from "color-name";
export default {
  name: "home",
  components: {
    TabBar,
    Header,
  },
  data() {
    return {
      slideOpts: {
        initialSlide: 1,
        speed: 400,
      },
      notifications: [],
    };
  },
  mounted() {
    this.$refs.header.title = "首页";
    this.listNotification();
  },
  methods: {
    /**
     * 弹出提示内容
     */
    presentAlert(content) {
      return this.$ionic.alertController
        .create({
          header: "正文内容",
          message: content,
          buttons: ["OK"],
        })
        .then((a) => a.present());
    },
    listNotification() {
      API.listNotification().then((response) => {
        this.notifications = response.data.content;
      });
    },
  },
};
</script>
<style scoped>
</style>
