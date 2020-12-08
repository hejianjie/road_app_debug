<template>
  <div style="margin-bottom: 60px">
    <Header ref="header" />

    <ion-card>
      <ion-item>
        <!-- <ion-icon name="locate" slot="start"></ion-icon> -->
        <img
          src="https://static.easyicon.net/preview/128/1280439.gif"
          style="width: 30px; height: 30px"
          alt=""
        />
        <ion-label>选择路线</ion-label>
        <ion-select
          placeholder="请选择"
          :value="nationalHighwayId"
          @ionChange="nationalHighwayId = $event.target.value"
          ok-text="确定"
          cancel-text="取消"
        >
          <ion-select-option
            v-for="(highway, index) in nationalHighways"
            :key="index"
            :value="highway.highwayId"
            >{{ highway.highwayName }}</ion-select-option
          >
        </ion-select>
      </ion-item>

      <!-- <ion-item>
        <ion-icon name="locate" slot="start"></ion-icon>
        <img
          src="https://static.easyicon.net/preview/128/1280439.gif"
          style="width: 30px; height: 30px"
          alt=""
        />
        <ion-label>选择路线</ion-label>
        <ion-select
          placeholder="请选择"
          :value="roadSectionId"
          @ionChange="roadSectionId = $event.target.value"
          ok-text="确定"
          cancel-text="取消"
        >
          <ion-select-option
            v-for="(roadSection, index) in roadSections"
            :key="index"
            :value="roadSection.roadSectionId"
            >{{ roadSection.name }}</ion-select-option
          >
        </ion-select>
      </ion-item> -->

      <ion-item>
        <!-- <ion-icon name="locate" slot="start"></ion-icon> -->
        <img
          src="https://static.easyicon.net/preview/122/1229977.gif"
          alt=""
          style="width: 25px; height: 25px"
        />
        <ion-label>选择起始桩</ion-label>
        <ion-select
          placeholder="请选择"
          :value="stakeBeginId"
          @ionChange="stakeBeginId = $event.target.value"
          ok-text="确定"
          cancel-text="取消"
        >
          <ion-select-option
            v-for="(stake, index) in stakes"
            :key="index"
            :value="stake.stakeId"
            >{{ stake.name }}</ion-select-option
          >
        </ion-select>
      </ion-item>

      <ion-item>
        <!-- <ion-icon name="locate" slot="start"></ion-icon> -->
        <img
          src="https://static.easyicon.net/preview/123/1231680.gif"
          alt=""
          style="width: 25px; height: 25px"
        />
        <ion-label>选择结束桩</ion-label>
        <ion-select
          placeholder="请选择"
          :value="stakeEndId"
          @ionChange="stakeEndId = $event.target.value"
          ok-text="确定"
          cancel-text="取消"
        >
          <ion-select-option
            v-for="(stake, index) in stakes"
            :key="index"
            :value="stake.stakeId"
            >{{ stake.name }}</ion-select-option
          >
        </ion-select>
      </ion-item>

      <ion-item>
        <!-- <ion-icon name="time"></ion-icon> -->
        <img
          src="https://static.easyicon.net/preview/122/1225731.gif"
          alt=""
          style="width: 30px; height: 30px"
        />
        <ion-label>开始时间</ion-label>
        <ion-datetime
          cancel-text="取消"
          done-text="确认"
          display-format="YYYY-MM-DD HH:mm"
          placeholder="开始时间"
          min="2010"
          max="2030"
          :value="beginTime"
          @ionChange="beginTime = $event.target.value"
        ></ion-datetime>
      </ion-item>
      <ion-item>
        <!-- <ion-icon name="time"></ion-icon> -->
        <img
          src="https://static.easyicon.net/preview/126/1264952.gif"
          alt=""
          style="width: 30px; height: 30px"
        />
        <ion-label>结束时间</ion-label>
        <ion-datetime
          cancel-text="取消"
          done-text="确认"
          display-format="YYYY-MM-DD HH:mm"
          placeholder="结束时间"
          min="2010"
          max="2030"
          :value="endTime"
          @ionChange="endTime = $event.target.value"
        ></ion-datetime>
      </ion-item>
    </ion-card>
    <ion-button expand="block" @click="patrolQuery">查看</ion-button>
    <ion-card>
      <ion-item v-if="totalElements != 0">
        <ion-label>共查询到{{ totalElements }}条记录</ion-label>
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
      </ion-item>
    </ion-card>
    <TabBar />
  </div>
</template>
<script>
import TabBar from "@/components/TabBar";
import Header from "@/components/Header";
import * as API from "@/api/API";
import { getStore } from "@/assets/js/localStorage";
export default {
  name: "RecordRecord",
  components: {
    TabBar,
    Header,
  },

  data() {
    return {
      patrolResultList: [],
      nationalHighways: [],
      roadSections: [],
      stakes: [],
      nationalHighwayId: null,
      roadSectionId: null,
      stakeBeginId: null,
      stakeEndId: null,
      beginTime: null,
      endTime: null,
      totalElements: 0,
    };
  },
  mounted() {
    this.$refs.header.title = "巡查记录";
    this.listNationalHighway();
    this.listStake();
  },
  watch: {
    /**
     * 当选中路线后执行
     */
    nationalHighwayId() {
      const params = { nationalHighwayId: this.nationalHighwayId };
      API.listRoadSection(params).then((response) => {
        this.roadSections = response.data;
      });
    },
  },

  methods: {
    viewPatrol(patrolResultId) {
      this.$router.push({
        path: "/view-patrol",
        query: { patrolResultId: patrolResultId },
      });
    },

    /**
     * 条件查询
     */
    patrolQuery() {
      var params = {
        inspectorId: getStore("id"),
        beginTime: this.beginTime,
        endTime: this.endTime,
      };
      if (this.nationalHighwayId !== null) {
        params.highwayId = this.nationalHighwayId;
      }
      if (this.roadSectionId !== null) {
        params.roadSectionId = this.roadSectionId;
      }
      if (this.stakeBeginId !== null) {
        params.stakeBeginId = this.stakeBeginId;
      }
      if (this.stakeEndId !== null) {
        params.stakeEndId = this.stakeEndId;
      }
      if (this.beginTime !== null && this.endTime !== null) {
        if (this.beginTime <= this.endTime) {
          API.patrolQuery(params).then((response) => {
            if (response.data.length === 0) {
              this.$ionic.alertController
                .create({
                  header: "条件查询",
                  message: "未查询到符合条件的数据.",
                  buttons: ["确定"],
                })
                .then((a) => a.present());
            }
            this.patrolResultList = response.data;
            this.totalElements = response.totalElements;
          });
        } else {
          this.$ionic.alertController
            .create({
              header: "条件查询",
              message: "[开始时间]必须小于[结束时间].",
              buttons: ["确定"],
            })
            .then((a) => a.present());
        }
      } else {
        this.$ionic.alertController
          .create({
            header: "条件查询",
            message: "请选择[开始时间]与[结束时间].",
            buttons: ["确定"],
          })
          .then((a) => a.present());
      }
    },

    /**
     * 获取问题列表
     */
    listPatrol() {
      const params = { inspectorId: localStorage.getItem("id") };
      API.listPatrol(params).then((response) => {
        if (response.statusCode === 1) {
          this.patrolResultList = response.data.content;
        }
      });
    },
    /**
     * 获取路线列表
     */
    listNationalHighway() {
      API.listNationalHighway().then((response) => {
        this.nationalHighways = response.data;
      });
    },

    /**
     * 获取桩
     */
    listStake() {
      API.listStake().then((response) => {
        this.stakes = response.data;
      });
    },
  },
};
</script>
<style scoped>
.time-label {
  font-size: 80%;
}
.label-content {
  font-size: 0.88rem;
}
</style>
