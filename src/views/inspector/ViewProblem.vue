<template>
  <div style="margin-bottom: 3rem">
    <Header ref="header" />
    <HeaderMap />
    <ion-card>
      <ion-item>
        <ion-col size="3">
          <ion-label>巡查路线</ion-label>
        </ion-col>
        <ion-col>
          <p style="text-align: right">
            {{ roadInfo.nationalHighwayName }} {{ roadInfo.roadSectionName }}
          </p>
          <p style="text-align: right">
            {{ roadInfo.beginStake }}~<span v-if="tempFlag == 1">暂无</span
            ><span v-else>{{ roadInfo.endStake }}</span>
          </p>
        </ion-col>
      </ion-item>

      <ion-item>
        <ion-label>位置</ion-label>
        <p class="xinxi">{{ dataProblem.position }}</p>
      </ion-item>

      <ion-item>
        <ion-label>病害类型</ion-label>
        <p class="xinxi">{{ hazardName.name }}</p>
      </ion-item>

      <ion-item>
        <ion-label>类型尺寸</ion-label>
        <p class="xinxi" v-if="dataProblem.sizeType === 1">
          {{ sizeTypeName.hazard_unit_name }}{{ ":"
          }}{{ dataProblem.specificSize }}{{ "(立方米)" }}
        </p>
        <p class="xinxi" v-if="dataProblem.sizeType === 2">
          {{ sizeTypeName.hazard_unit_name }}{{ ":"
          }}{{ dataProblem.specificSize }}{{ "(平方米)" }}
        </p>
        <p class="xinxi" v-if="dataProblem.sizeType === 3">
          {{ sizeTypeName.hazard_unit_name }}{{ ":"
          }}{{ dataProblem.specificSize }}{{ "(米)" }}
        </p>
        <p class="xinxi" v-if="dataProblem.sizeType === 4">
          {{ sizeTypeName.hazard_unit_name }}{{ ":"
          }}{{ dataProblem.specificSize }}{{ "(个)" }}
        </p>
      </ion-item>

      <ion-item>
        <ion-label>发现时间</ion-label>
        <p class="xinxi">{{ dataProblem.detectTime }}</p>
      </ion-item>
    </ion-card>

    <h4
      style="color: red; text-align: left; margin: 10px"
      v-if="dataProblem.potentialHazard == '有'"
    >
      存在安全隐患
    </h4>
    <h4 style="color: green; text-align: left; margin: 10px" v-else>
      无安全隐患
    </h4>
    <ion-card>
      <ion-card-content style="width: 300px; height: 80px; text-align: left">
        {{ dataProblem.description }}
      </ion-card-content>
    </ion-card>
    
    <ion-card v-if="hazardImgs.length">
      <div
        style="display: flex; justify-content: space-around; flex-wrap: wrap"
      >
        <viewer :images="hazardImgs">
          <img
            style="width: 100px; height: 100px"
            v-for="item in hazardImgs"
            :src="'http://47.99.65.198:8020/image/' + item.name"
            :key="item.name"
          />
        </viewer>
      </div>
    </ion-card>
    <ion-card v-else style="margin-bottom: 5rem">
      <ion-label style="text-align: center; font-size: 16px">
        暂无图片
      </ion-label>
    </ion-card>
    <ion-button
      expand="block"
      color="primary"
      @click="editProblem(roadHazardId, patrolResultId)"
      >修改</ion-button
    >
    <ion-button expand="block" color="danger" @click="corfirmEnd"
      >删除问题</ion-button
    >
    <TabBar />
  </div>
</template>
<script>
import * as API from "@/api/API";
import Header from "@/components/Header";
import HeaderMap from "@/components/HeaderMap";
import TabBar from "@/components/TabBar";
import { getStore, setStore, removeStore } from "@/assets/js/localStorage";
export default {
  name: "ViewProblem",
  components: {
    Header,
    HeaderMap,
    TabBar,
  },
  data() {
    let self = this;
    return {
      tempFlag: this.$route.query.tempFlag,
      roadHazardId: this.$route.query.roadHazardId,
      patrolResultId: this.$route.query.patrolResultId,
      hazardImgs: [],
      dataProblem: {},
      hazardName: {},
      sizeTypeName: {},
      roadInfo: {},
    };
  },
  mounted() {
    // this.roadHazardId: this.$route.query.roadHazardId,
    this.$refs.header.title = "查看巡查";
    this.getcheckRoadProblem();
    this.getRoadSection();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    home() {
      this.$router.push({ path: "/home" });
    },
    getRoadSection() {
      const params = {
        patrolResultId: this.$route.query.patrolResultId,
      };
      API.getRoadSection(params).then((response) => {
        if (response.statusCode === 1) {
          this.roadInfo = response.data;
        }
      });
    },
    getcheckRoadProblem() {
      var params = {
        roadHazardId: this.$route.query.roadHazardId,
      };
      API.getcheckRoadProblem(params).then((response) => {
        console.log(response);
        this.hazardName = response.hazardName;
        this.dataProblem = response.data;
        this.hazardImgs = response.hazardImgs;
        this.sizeTypeName = response.sizeTypeName;
      });
    },
    editProblem(roadHazardId, patrolResultId) {
      if (this.tempFlag == 1) {
        this.$router.push({
          path: "/edit_problem",
          query: {
            roadHazardId: roadHazardId,
            patrolResultId: patrolResultId,
            tempFlag: 1,
          },
        });
      } else {
        this.$router.push({
          path: "/edit_problem",
          query: {
            roadHazardId: roadHazardId,
            patrolResultId: patrolResultId,
            tempFlag: 0,
          },
        });
      }
    },
    corfirmEnd() {
      this.$ionic.alertController
        .create({
          header: "删除问题",
          message: "确定删除问题吗？",
          buttons: [
            { text: "取消" },
            {
              text: "确定",
              handler: () => {
                this.delectRoadProblem();
              },
            },
          ],
        })
        .then((a) => a.present());
    },

    delectRoadProblem() {
      var params = {
        roadHazardId: this.$route.query.roadHazardId,
        patrolResultId: getStore("patrolResultId"),
      };
      API.delectRoadProblem(params).then((response) => {
        if (response.statusCode === 200) {
          this.$ionic.alertController
            .create({
              header: "删除问题",
              message: "删除成功！",
              buttons: ["确定"],
            })
            .then((a) => a.present());
          this.$router.push("/patrol-result");
        } else {
          this.$ionic.alertController
            .create({
              header: "删除问题",
              message: "删除失败,巡查已结束！",
              buttons: ["确定"],
            })
            .then((a) => a.present());
        }
      });
    },
  },
};
</script>
<style>
.xinxi {
  position: relative;
  font-size: 0.6rem;
  text-align: left;
}
img {
  width: 100px;
  height: 100px;
  float: center;
  padding: 5px;
}
.time-label {
  font-size: 90%;
}
.label-content {
  font-size: 0.88rem;
}
.amap-demo {
  height: 100px;
}
</style>
