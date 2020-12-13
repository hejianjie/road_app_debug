<template>
  <div style="margin-bottom: 60px">
    <Header ref="header" />
    <ion-card>
      <ion-card-header style="text-align: center">
        <ion-card-subtitle class="title_card"
          >- 请选择巡查类型 -</ion-card-subtitle
        >
      </ion-card-header>
      <ion-grid style="height: 50%">
        <ion-row>
          <ion-col style="padding-bottom: 10%">
            <img
              src="@/assets/img/icon1.png"
              id="imgsize"
              @click="dailyPatrol"
            />
            <ion-title class="font1">日常巡查线路</ion-title>
            <ion-title class="font2" style="font-size: 0.7rem"
              >日常负责的巡查线路</ion-title
            >
          </ion-col>
          <ion-col>
            <img
              src="@/assets/img/icon2.png"
              id="imgsize"
              @click="tempPatrol"
            />
            <ion-title class="font1">临时巡查线路</ion-title>
            <ion-title class="font2" style="font-size: 0.7rem"
              >临时负责的巡查线路</ion-title
            >
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-card>
    <ion-card>
      <ion-item @click="record">
        <ion-icon name="menu"></ion-icon>
        <ion-label>最近巡查记录({{ patrolResultList.length }}条)</ion-label>
        <ion-icon name="arrow-dropright"></ion-icon>
      </ion-item>
      <ion-item
        v-for="patrolResult in patrolResultList"
        :key="patrolResult.patrolResultId"
        @click="viewPatrol(patrolResult.patrolResultId)"
      >
        <ion-label class="label-content">
          {{ patrolResult.nationalHighwayName }}
          {{ patrolResult.roadSectionName }} {{ patrolResult.beginStake }}~{{
            patrolResult.endStake
          }}
          <ion-label color="medium" class="time-label"
            >{{ patrolResult.beginTime }} {{ patrolResult.endTime }}</ion-label
          >
        </ion-label>
        <ion-chip v-if="patrolResult.issueCount" color="danger">
          <ion-label>问题数:{{ patrolResult.issueCount }}</ion-label>
        </ion-chip>
        <ion-chip v-if="!patrolResult.issueCount" color="success">
          <ion-label>暂无问题</ion-label>
        </ion-chip>
        <ion-icon name="arrow-dropright" @click="record"></ion-icon>
      </ion-item>
    </ion-card>
    <TabBar />
  </div>
</template>
<script>
import TabBar from "@/components/TabBar";
import Header from "@/components/Header";
import * as API from "@/api/API";
import { getStore, setStore, removeStore } from "@/assets/js/localStorage";
export default {
  name: "Inspection",
  components: {
    TabBar,
    Header,
  },

  data() {
    return {
      patrolResultList: [],
    };
  },

  mounted() {
    this.$refs.header.title = "大连公路巡查";
    this.listPatrol();
  },

  methods: {
    listPatrol() {
      const params = { inspectorId: getStore("id") };
      API.listPatrol(params).then((response) => {
        if (response.statusCode === 1) {
          this.patrolResultList = response.data.content;
        }
      });
    },
    record() {
      this.$router.push("/record-record");
    },
    dailyPatrol() {
      console.log(getStore("patrolResultId"));
      console.log(getStore("tempFlag1"));
      if (
        getStore("patrolResultId") !== null &&
        getStore("tempFlag1") == "daily"
      ) {
        this.$ionic.alertController
          .create({
            header: "日常巡查",
            message: "尚有日常巡查未进行完毕",
            buttons: ["确定"],
          })
          .then((a) => a.present());
        this.$router.push("/patrol-result");
      } else if (getStore("tempFlag1") == "temp") {
        this.$ionic.alertController
          .create({
            header: "临时巡查",
            message: "尚有临时巡查未进行完毕",
            buttons: ["确定"],
          })
          .then((a) => a.present());
        this.$router.push({
          path: "/patrol-result",
          query: {
            tempFlag: 1,
          },
        });
      } else {
        this.$router.push({
          path: "/daily-patrol",
          query: {
            tempFlag: 0,
          },
        });
      }
    },
    tempPatrol() {
      if (
        getStore("patrolResultId") !== null &&
        getStore("tempFlag1") == "temp"
      ) {
        this.$ionic.alertController
          .create({
            header: "临时巡查",
            message: "尚有临时巡查未进行完毕",
            buttons: ["确定"],
          })
          .then((a) => a.present());
        // this.$router.push("/patrol-result");
        this.$router.push({
          path: "/patrol-result",
          query: {
            tempFlag: 1,
          },
        });
      } else if (getStore("tempFlag1") == "daily") {
        this.$ionic.alertController
          .create({
            header: "日常巡查",
            message: "尚有日常巡查未进行完毕",
            buttons: ["确定"],
          })
          .then((a) => a.present());
        setStore("tempFlag", 0);
        this.$router.push({
          path: "/patrol-result",
          // query: {
          //   tempFlag: 0,
          // },
        });
      } else {
        this.$router.push("/temp-patrol");
      }
    },
    viewPatrol(patrolResultId) {
      this.$router.push({
        path: "/view-patrol",
        query: { patrolResultId: patrolResultId },
      });
    },
  },
};
</script>
<style>
.title_card {
  color: #969696;
  font-size: 0.5rem;
  margin-top: 1rem;
}
.font1 {
  color: #797979;
  font-size: small;
  font-weight: bold;
  text-align: center;
}
.font2 {
  color: #bbbbbb;
  padding-top: 5px;
  text-align: center;
}
#imgsize {
  width: auto;
  height: auto;
  padding-top: 10%;
  margin: auto;
}
</style>