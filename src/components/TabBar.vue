<template>
  <div class="tab-bottm">
    <ion-tabs>
      <ion-tab tab="home"> </ion-tab>

      <!-- Match by "app.patrol" route name -->
      <ion-tab tab="inspection" :routes="'app.inspection'"> </ion-tab>

      <!-- Match by an array of route names -->
      <ion-tab tab="settings" :routes="['app.settings', 'app.other.route']">
        <Settings />
      </ion-tab>

      <!-- Use v-slot:bottom with Vue ^2.6.0 -->
      <template v-slot:bottom>
        <ion-tab-bar>
          <ion-tab-button tab="home">
            <!-- <ion-icon name="home"></ion-icon> -->
            <img
              src="https://static.easyicon.net/preview/119/1196077.gif"
              style="width: 22px; height: 22px"
              alt=""
            />
            <ion-label>首页</ion-label>
          </ion-tab-button>

          <!-- Provide a custom route to navigate to -->
          <ion-tab-button tab="inspection">
            <!-- <ion-icon name="man"></ion-icon> -->
            <img
              src="https://static.easyicon.net/preview/119/1197830.gif"
              alt=""
              style="width: 20px; height: 20px"
            />
            <ion-label>巡查</ion-label>
          </ion-tab-button>

          <!-- Provide extra data to route -->
          <ion-tab-button tab="settings">
            <!-- <ion-icon name="settings"></ion-icon> -->
            <img
              src="https://static.easyicon.net/preview/113/1133857.gif"
              alt=""
              style="width: 20px; height: 20px"
            />
            <ion-label>设置</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </template>
    </ion-tabs>
  </div>
  <!-- Listen to before and after tab change events -->
</template>

<script>
export default {
  name: "TabBar",
};
</script>
<style scoped>
.tab-bottm {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
}
@font-face {
  font-family: "iconfont"; /* project id 2137933 */
  src: url("//at.alicdn.com/t/font_2137933_k8ny7n8wv2.eot");
  src: url("//at.alicdn.com/t/font_2137933_k8ny7n8wv2.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_2137933_k8ny7n8wv2.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_2137933_k8ny7n8wv2.woff") format("woff"),
    url("//at.alicdn.com/t/font_2137933_k8ny7n8wv2.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_2137933_k8ny7n8wv2.svg#iconfont") format("svg");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
</style>