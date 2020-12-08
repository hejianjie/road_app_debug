<template>
  <div style="margin-bottom: 60px">
    <Header ref="header" />
    <HeaderMap />
    <ion-card>
      <ion-item>
        <!-- <ion-icon name="flashlight" slot="start"></ion-icon> -->
        <img
          src="https://static.easyicon.net/preview/128/1280439.gif"
          style="width: 30px; height: 30px"
          alt=""
        />
        <ion-label>
          <span>巡查路段</span
          ><span style="margin-left: 10%">
            {{ patrolInfo.nationalHighwayName }}
            {{ patrolInfo.roadSectionName }} {{ patrolInfo.beginStake }}~{{
              patrolInfo.endStake
            }}</span
          ></ion-label
        >
      </ion-item>

      <ion-item>
        <!-- <ion-icon name="business"></ion-icon> -->
        <img
          src="https://static.easyicon.net/preview/108/1087412.gif"
          alt=""
          style="width: 30px; height: 30px"
        />
        <ion-label> 管理单位 </ion-label>
        <ion-label>{{ deptName }}</ion-label>
      </ion-item>

      <ion-item v-if="!patrolCarShow">
        <!-- <ion-icon name="car" slot="start"></ion-icon> -->
        <img
          src="https://static.easyicon.net/preview/121/1215020.gif"
          alt=""
          style="width: 30px; height: 30px"
        />
        <ion-label>巡查车辆</ion-label>
        <ion-select
          placeholder="选择车辆"
          :value="patrolResult.patrolCar"
          @ionChange="patrolResult.patrolCar = $event.target.value"
          ok-text="确定"
          cancel-text="取消"
        >
          <ion-select-option
            v-for="(patrolCar, index) in patrolCars"
            :key="index"
            :value="patrolCar.carNumber"
            >{{ patrolCar.carNumber }}</ion-select-option
          >
        </ion-select>
      </ion-item>

      <ion-item v-if="patrolCarShow">
        <!-- <ion-icon name="car" slot="start"></ion-icon> -->
        <img
          src="https://static.easyicon.net/preview/121/1215020.gif"
          alt=""
          style="width: 30px; height: 30px"
        />
        <ion-label> 巡查车辆 </ion-label>
        <ion-label> {{ patrolBeginInfo.patrolCar }} </ion-label>
      </ion-item>

      <ion-item>
        <!-- <ion-icon name="man"></ion-icon> -->
        <img
          src="https://static.easyicon.net/preview/129/1292944.gif"
          alt=""
          style="width: 30px; height: 30px"
        />
        <ion-label> 巡查员 </ion-label>
        <ion-label>{{ patrolInfo.inspector }}</ion-label>
      </ion-item>

      <ion-item v-if="patrolBeginTime">
        <!-- <ion-icon name="time" slot="start"></ion-icon> -->
        <img
          src="https://static.easyicon.net/preview/122/1225731.gif"
          alt=""
          style="width: 30px; height: 30px"
        />
        <ion-label> 开始时间 </ion-label>
        <ion-label> {{ patrolBeginInfo.beginTime }} </ion-label>
      </ion-item>
    </ion-card>

    <ion-button expand="block" @click="confirmBegin" v-if="patrolBeginBtn"
      >开始巡查</ion-button
    >
    <ion-button
      expand="block"
      @click="patrolBegin"
      v-if="patrollingBtn"
      disabled="true"
      >巡查中</ion-button
    >

    <ion-card v-if="!patrolBeginBtn" @click="addProblem">
      <ion-item>
        <!-- <ion-icon name="add-circle-outline" slot="start"></ion-icon> -->
        <img
          src="https://static.easyicon.net/preview/124/1246170.gif"
          alt=""
          style="width: 20px; height: 20px"
        />
        <ion-label
          v-if="problemCount === null"
          class="label-content"
          color="primary"
          >暂未发现问题,有待添加.</ion-label
        >
        <ion-label
          v-if="!problemCount === null"
          class="label-content"
          color="primary"
          >发现问题 ({{ problemCount }}处)</ion-label
        >
      </ion-item>

      <ion-item
        v-for="problem in problems"
        :key="problem.roadHazardId"
        @click="viewProblem(problem.roadHazardId, problem.patrolResultId)"
      >
        <ion-label class="label-content">
          {{ problem.position }} {{ problem.hazardType }}
          {{ problem.hazardUnitName }}: {{ problem.specificSize }}<br />
          <ion-label color="medium" class="time-label">{{
            problem.detectTime
          }}</ion-label>
        </ion-label>
        <ion-icon name="arrow-dropright" slot="end"></ion-icon>
      </ion-item>
    </ion-card>
    <ion-button
      v-if="patrolEndBtn"
      expand="block"
      color="danger"
      @click="confirmEnd"
      >结束巡查</ion-button
    >
    <TabBar />
  </div>
</template>

<script>
import * as API from "@/api/API";
import TabBar from "@/components/TabBar";
import Header from "@/components/Header";
import HeaderMap from "@/components/HeaderMap";
import { getStore, setStore, removeStore } from "@/assets/js/localStorage";
export default {
  name: "DailyPatrol",
  components: {
    TabBar,
    Header,
    HeaderMap,
  },
  data() {
    return {
      problems: {},
      problemCount: null,
      patrolInfo: {},
      deptName: getStore("deptName"),
      patrolCars: [],
      patrolEndBtn: false,
      patrolBeginBtn: true,
      patrollingBtn: false,
      patrolCarShow: false,
      patrolBeginTime: false,
      patrolBeginInfo: {},
      patrolResult: {
        nationalHighwayId: null,
        roadSectionId: null,
        patrolCar: null,
        stakeEndId: null,
        stakeBeginId: null,
        // 需要改动成当前登录用户所属部门的ID
        patrolOrganizationId: getStore("deptId"),
        // 需要改动成当前登录用户的ID
        inspectorId: getStore("id"),
      },
      patrolResultId: null,
    };
  },
  mounted() {
    this.getPatrolInfo();
    this.listPatrolCar();
    this.$refs.header.title = "日常巡查";
  },
  methods: {
    confirmBegin() {
      setStore("tempFlag1", "daily");
      this.$ionic.alertController
        .create({
          header: "日常巡查",
          message: "确定要开始日常巡查吗？",
          buttons: [
            { text: "取消" },
            {
              text: "确定",
              handler: () => {
                this.patrolBegin();
              },
            },
          ],
        })
        .then((a) => a.present());
    },

    confirmEnd() {
      this.$ionic.alertController
        .create({
          header: "日常巡查",
          message: "确定要结束日常巡查吗？",
          buttons: [
            {
              text: "确定",
              handler: () => {
                this.patrolEnd();
              },
            },
            { text: "取消" },
          ],
        })
        .then((a) => a.present());
    },

    /**
     * 获取巡查车辆列表
     */
    listPatrolCar() {
      const params = { deptId: getStore("deptId") };
      API.listPatrolCar(params).then((response) => {
        if (response.statusCode === 1) {
          this.patrolCars = response.data;
        }
      });
    },

    /**
     * 获取上一次巡查的信息
     */
    getPatrolInfo() {
      const params = { inspectorId: getStore("id") };
      API.getPatrolInfo(params).then((response) => {
        if (response.statusCode === 1 && response.data.length !== 0) {
          this.patrolInfo = response.data[0];
          this.patrolResult.nationalHighwayId = this.patrolInfo.highwayId;
          this.patrolResult.roadSectionId = this.patrolInfo.roadSectionId;
          this.patrolResult.stakeBeginId = this.patrolInfo.stakeBeginId;
          this.patrolResult.stakeEndId = this.patrolInfo.stakeEndId;
        } else {
          this.$ionic.alertController
            .create({
              header: "暂无数据",
              message: "尚未巡查过的话是没有日常巡查记录的.",
              buttons: ["确定"],
            })
            .then((a) => a.present());
        }
      });
    },

    /**
     * 查看问题
     */
    viewProblem(roadHazardId, patrolResultId) {
      this.$router.push({
        path: "/view_problem",
        query: { roadHazardId: roadHazardId, patrolResultId: patrolResultId },
      });
    },

    /**
     * 开始巡查
     */
    patrolBegin() {
      const params = this.patrolResult;
      if (this.patrolResult.patrolCar !== null) {
        API.patrolBegin(params).then((response) => {
          if (response.statusCode === 1) {
            this.patrolResultId = response.data.patrolResultId;
            setStore("patrolResultId", response.data.patrolResultId);
            this.patrolEndBtn = true;
            this.patrolBeginBtn = false;
            this.patrollingBtn = true;
            this.patrolCarShow = true;
            this.patrolBeginTime = true;
            this.patrolBeginInfo = response.data;
            this.$ionic.alertController
              .create({
                header: "开始巡查",
                message: "开始巡查",
                buttons: ["确定"],
              })
              .then((a) => a.present());
          }
        });
      } else {
        this.$ionic.alertController
          .create({
            header: "开始巡查",
            message: "请先选择巡查车辆",
            buttons: ["确定"],
          })
          .then((a) => a.present());
      }
    },

    /**
     * 结束巡查
     */
    patrolEnd() {
      const params = {
        patrolResultId: getStore("patrolResultId"),
        stakeEndId: this.patrolInfo.stakeEndId,
      };
      removeStore("tempFlag1");
      if (getStore("patrolResultId") !== null) {
        API.patrolEnd(params).then((response) => {
          removeStore("tempFlag1");
          if (response.statusCode === 1) {
            removeStore("patrolResultId");
            this.patrolEndBtn = false;
            this.patrolBeginBtn = false;
            this.patrollingBtn = false;
            this.patrolCarShow = true;
            this.patrolBeginTime = true;
            this.patrolBeginInfo = response.data;
            this.$ionic.alertController
              .create({
                header: "结束巡查",
                message: "巡查已结束",
                buttons: ["确定"],
              })
              .then((a) => a.present());
          }
        });
      } else {
        this.$ionic.alertController
          .create({
            header: "结束巡查",
            message: "您尚未开始巡查.",
            buttons: ["确定"],
          })
          .then((a) => a.present());
      }
    },

    /**
     * 添加问题
     */
    addProblem() {
      if (getStore("patrolResultId") !== null) {
        console.log("///////////////");
        this.$router.push({
          path: "/problem",
          query: { patrolResultId: getStore("patrolResultId") },
        });
      } else {
        this.$ionic.alertController
          .create({
            header: "结束巡查",
            message: "您尚未开始巡查.",
            buttons: ["确定"],
          })
          .then((a) => a.present());
      }
    },
  },
};
</script>

<style scoped>
.time-label {
  font-size: 90%;
}
.label-content {
  font-size: 0.88rem;
}
.span-font-size {
  font-size: 0.8rem;
}
</style>
