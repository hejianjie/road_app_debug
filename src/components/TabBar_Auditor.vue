<template>
<div class="tab-bottm">
  <ion-tabs >

    <!-- Match by "app.patrol" route name -->
    <ion-tab tab="auditing" >
      
    </ion-tab>

    <!-- Match by an array of route names -->
    <ion-tab tab="settings" :routes="['app.settings']">
      <Settings />
    </ion-tab>
 
    <!-- Use v-slot:bottom with Vue ^2.6.0 -->
    <template v-slot:bottom>
      <ion-tab-bar>
        <!-- Provide a custom route to navigate to -->
        <ion-tab-button tab="auditing">
          <ion-icon name="calendar"></ion-icon>
          <ion-label>核量</ion-label>
        </ion-tab-button>

        <!-- Provide extra data to route -->
        <ion-tab-button tab="settings">
          <ion-icon name="settings"></ion-icon>
          <ion-label>我的</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </template>
  </ion-tabs>
</div>
</template>

<script>
export default {
    name: 'TabBar'
}
</script>
<style scoped>
  .tab-bottm {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
  }
</style>