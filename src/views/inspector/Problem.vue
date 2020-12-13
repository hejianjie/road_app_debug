<template>
  <div style="margin-bottom: 60px">
    <Header ref="header" />
    <HeaderMap ref="map" />
    <TabBar />
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
            {{ roadInfo.beginStake }}~<span v-if="this.tempFlag == 1"
              >暂无</span
            >
            <span v-else>{{ roadInfo.endStake }}</span>
          </p>
        </ion-col>
      </ion-item>
      <ion-item>
        <ion-label style="display: inline-block; width: 18%">位置</ion-label>
        <!-- <div style="display:inline-block;width:82%"> -->
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-input
                type="number"
                placeholder="如：12.3"
                style="font-size: 14px"
                :value="stake"
                @ionChange="stake = $event.target.value"
              ></ion-input>
            </ion-col>

            <ion-col>
              <ion-select
                placeholder="行"
                :value="stream"
                @ionChange="stream = $event.target.value"
                style="
                  display: inline-block;
                  font-size: 14px;
                  text-align: center;
                "
                ok-text="确定"
                cancel-text="取消"
              >
                <ion-select-option>上行</ion-select-option>
                <ion-select-option>下行</ion-select-option>
              </ion-select>
            </ion-col>

            <ion-col>
              <ion-select
                placeholder="侧"
                :value="orientation"
                @ionChange="orientation = $event.target.value"
                style="
                  display: inline-block;
                  font-size: 14px;
                  text-align: center;
                "
                ok-text="确定"
                cancel-text="取消"
              >
                <ion-select-option>左侧</ion-select-option>
                <ion-select-option>右侧</ion-select-option>
              </ion-select>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-item>

      <ion-item>
        <ion-label>病害类型</ion-label>
        <ion-select
          :value="addRoadProblemForm.hazardStatus"
          @ionChange="addRoadProblemForm.hazardStatus = $event.target.value"
          placeholder="选择"
          ok-text="确定"
          cancel-text="取消"
        >
          <ion-select-option
            v-for="(option, index) in hazardList"
            :key="index"
            :value="option.info_id"
            >{{ option.name }}</ion-select-option
          >
        </ion-select>
      </ion-item>

      <ion-segment>
        <ion-segment-button value="cube" checked="true" @click="handleCube">
          <ion-label>体积</ion-label>
        </ion-segment-button>
        <ion-segment-button value="square" @click="handleSquare">
          <ion-label>面积</ion-label>
        </ion-segment-button>
        <ion-segment-button value="length" @click="handleLength">
          <ion-label>长度</ion-label>
        </ion-segment-button>
        <ion-segment-button value="count" @click="handleCount">
          <ion-label>数量</ion-label>
        </ion-segment-button>
      </ion-segment>

      <ion-grid v-if="cubeOrSquare">
        <ion-row>
          <ion-col>
            <ion-input
              type="number"
              placeholder="请输入长度"
              :value="cubeOrSquareLength"
              @ionInput="cubeOrSquareLength = $event.target.value"
            ></ion-input>
          </ion-col>
          <ion-col>
            <ion-input
              type="number"
              placeholder="请输入宽度"
              :value="cubeOrSquareWidth"
              @ionInput="cubeOrSquareWidth = $event.target.value"
            ></ion-input>
          </ion-col>
          <ion-col v-if="!square">
            <ion-input
              type="number"
              placeholder="请输入高度"
              :value="cubeOrSquareHeight"
              @ionInput="cubeOrSquareHeight = $event.target.value"
            ></ion-input>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-grid v-if="lengthOrNumber">
        <ion-row>
          <ion-col v-if="length">
            <ion-input
              type="number"
              placeholder="请输入长度"
              :value="lengthOrNumberLength"
              @ionInput="lengthOrNumberLength = $event.target.value"
            ></ion-input>
          </ion-col>
          <ion-col v-if="!length">
            <ion-input
              type="number"
              placeholder="请输入数量"
              :value="lengthOrNumberNumber"
              @ionInput="lengthOrNumberNumber = $event.target.value"
            ></ion-input>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-item>
        <ion-label>是否存在安全隐患</ion-label>

        <ion-toggle
          @ionChange="
            addRoadProblemForm.potentialHazard = $event.target.checked
          "
        ></ion-toggle>
      </ion-item>

      <ion-item>
        <ion-label position="floating">请输入病害描述</ion-label>
        <ion-textarea
          :value="addRoadProblemForm.description"
          @ionChange="addRoadProblemForm.description = $event.target.value"
        ></ion-textarea>
      </ion-item>
    </ion-card>

    <ion-card>
      <input
        @change="fileChange($event)"
        type="file"
        id="upload_file"
        multiple
        style="display: none"
      />

      <div class="add-img">
        <p class="font14" v-show="imgList.length">
          图片（最多6张，还可上传
          <span v-text="6 - imgList.length"></span>张）
        </p>
        <div
          style="display: flex; justify-content: space-around; flex-wrap: wrap"
        >
          <div
            v-for="(url, index) in imgList"
            :key="index"
            v-show="imgList.length"
          >
            <!-- <ion-icon name="close-circle" @click.stop="delImg(index)"></ion-icon> -->
            <img
              style="width: 10px; height: 10px"
              align="right"
              src="@/assets/img/delect.png"
              @click.stop="delImg(index)"
            />
            <img style="width: 90px; height: 100px" :src="url.file.src" />
          </div>

          <div class="add" @click="chooseType" v-show="imgList.length != 6">
            <div class="add-image" align="center">
              <ion-icon style="font-size: 2rem" name="add"></ion-icon>
              <p>添加图片</p>
            </div>
          </div>
        </div>
      </div>
    </ion-card>

    <ion-button expand="block" color="danger" @click="clickHandle()"
      >提交问题</ion-button
    >
  </div>
</template>
<script>
// import { toastController } from '@ionic/vue';

import HeaderMap from "@/components/HeaderMap";
import Header from "@/components/Header";
import TabBar from "@/components/TabBar";
import * as API from "@/api/API";
import axios from "axios";
import { getStore, setStore, removeStore } from "@/assets/js/localStorage";

export default {
  name: "Problem",
  components: {
    Header,
    HeaderMap,
    TabBar,
  },
  data: function () {
    return {
      tempFlag: this.$route.query.tempFlag,
      hazardList: [],
      UnitList: [],
      imgList: [],
      size: 0,
      limit: 6, //限制图片上传的数量
      tempImgs: [],
      stake: "", //桩.米
      stakes: [],
      orientation: "", //侧
      stream: "", //行
      flag: 0, //0代表已选，1代表体积未选，2代表面积未选，3代表长度未选，4代表数量未选
      cubeOrSquare: true,
      square: false,
      lengthOrNumber: false,
      length: false,
      cubeOrSquareLength: null,
      cubeOrSquareWidth: null,
      cubeOrSquareHeight: null,

      lengthOrNumberLength: null,
      lengthOrNumberNumber: null,

      addRoadProblemForm: {
        //位置（桩+侧+米）
        position: "",
        //病害类型
        hazardStatus: "",
        //类型尺寸
        sizeType: "",
        //具体尺寸
        specificSize: "",
        //潜在危险
        potentialHazard: "",
        //描述
        description: "",
        //经度
        longitude: "",
        //纬度
        latitude: "",
        //巡查情况
        patrolResultId: "",
        //巡查员
        userId: "",
      },
      roadInfo: {},
    };
  },

  mounted() {
    this.$refs.header.title = "添加问题";
    this.getAllhazard();
    this.getAllUnit();
    this.listStake();
    this.getRoadSection();
  },

  methods: {
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
    listStake() {
      API.listStake().then((response) => {
        if (response.statusCode === 1) {
          this.stakes = response.data;
        }
      });
    },
    clearAll() {
      this.cubeOrSquareLength = null;
      this.cubeOrSquareWidth = null;
      this.cubeOrSquareHeight = null;
      this.lengthOrNumberLength = null;
      this.lengthOrNumberNumber = null;
    },
    handleCube() {
      this.flag = 1;
      this.cubeOrSquare = true;
      this.lengthOrNumber = false;
      this.square = false;
      this.clearAll();
    },
    handleSquare() {
      this.flag = 2;
      this.cubeOrSquare = true;
      this.lengthOrNumber = false;
      this.square = true;
      this.clearAll();
    },
    handleLength() {
      this.flag = 3;
      this.cubeOrSquare = false;
      this.lengthOrNumber = true;
      this.length = true;
      this.clearAll();
    },
    handleCount() {
      this.flag = 4;
      this.cubeOrSquare = false;
      this.lengthOrNumber = true;
      this.length = false;
      this.clearAll();
    },
    clickHandle() {
      if (!this.stake || !this.stream || !this.orientation) {
        this.$ionic.alertController
          .create({
            header: "提交问题",
            message: "请填写具体的位置信息！",
            buttons: ["确定"],
          })
          .then((a) => a.present());
      } else if (!this.addRoadProblemForm.hazardStatus) {
        this.$ionic.alertController
          .create({
            header: "提交问题",
            message: "请填写病害类型！",
            buttons: ["确定"],
          })
          .then((a) => a.present());
      } else if (this.flag == 1 || this.flag == 0) {
        if (
          this.flag == 0 &&
          !this.cubeOrSquareLength &&
          !this.cubeOrSquareWidth &&
          !this.cubeOrSquareHeight
        ) {
          this.$ionic.alertController
            .create({
              header: "提交问题",
              message: "请填写具体的病害情况！",
              buttons: ["确定"],
            })
            .then((a) => a.present());
        } else if (
          !this.cubeOrSquareLength ||
          !this.cubeOrSquareWidth ||
          !this.cubeOrSquareHeight
        ) {
          this.$ionic.alertController
            .create({
              header: "提交问题",
              message: "请填写长、宽、高！",
              buttons: ["确定"],
            })
            .then((a) => a.present());
        } else if (
          this.cubeOrSquareLength &&
          this.cubeOrSquareWidth &&
          this.cubeOrSquareHeight
        ) {
          this.$ionic.alertController
            .create({
              header: "提交问题",
              message: "确定要提交问题吗？",
              buttons: [
                { text: "取消" },
                {
                  text: "确定",
                  handler: () => {
                    this.addRoadProblem();
                  },
                },
              ],
            })
            .then((a) => a.present());
        }
      } else if (this.flag == 2) {
        if (!this.cubeOrSquareLength || !this.cubeOrSquareWidth) {
          this.$ionic.alertController
            .create({
              header: "提交问题",
              message: "请填写长、宽！",
              buttons: ["确定"],
            })
            .then((a) => a.present());
        } else if (this.cubeOrSquareLength && this.cubeOrSquareWidth) {
          this.$ionic.alertController
            .create({
              header: "提交问题",
              message: "确定要提交问题吗？",
              buttons: [
                { text: "取消" },
                {
                  text: "确定",
                  handler: () => {
                    this.addRoadProblem();
                  },
                },
              ],
            })
            .then((a) => a.present());
        }
      } else if (this.flag == 3) {
        if (!this.lengthOrNumberLength) {
          this.$ionic.alertController
            .create({
              header: "提交问题",
              message: "请填写长度！",
              buttons: ["确定"],
            })
            .then((a) => a.present());
        } else if (this.lengthOrNumberLength) {
          this.$ionic.alertController
            .create({
              header: "提交问题",
              message: "确定要提交问题吗？",
              buttons: [
                { text: "取消" },
                {
                  text: "确定",
                  handler: () => {
                    this.addRoadProblem();
                  },
                },
              ],
            })
            .then((a) => a.present());
        }
      } else if (this.flag == 4) {
        if (!this.lengthOrNumberNumber) {
          this.$ionic.alertController
            .create({
              header: "提交问题",
              message: "请填写数量！",
              buttons: ["确定"],
            })
            .then((a) => a.present());
        } else if (this.lengthOrNumberNumber) {
          this.$ionic.alertController
            .create({
              header: "提交问题",
              message: "确定要提交问题吗？",
              buttons: [
                { text: "取消" },
                {
                  text: "确定",
                  handler: () => {
                    this.addRoadProblem();
                  },
                },
              ],
            })
            .then((a) => a.present());
        }
      }
    },
    addRoadProblem() {
      this.addRoadProblemForm.position =
        this.stake + " " + this.stream + "" + this.orientation + " ";
      if (this.addRoadProblemForm.potentialHazard) {
        this.addRoadProblemForm.potentialHazard = "有";
      } else {
        this.addRoadProblemForm.potentialHazard = "无";
      }
      if (
        this.cubeOrSquareLength != null &&
        this.cubeOrSquareWidth != null &&
        this.cubeOrSquareHeight != null
      ) {
        this.addRoadProblemForm.sizeType = 1;
        this.addRoadProblemForm.specificSize =
          this.cubeOrSquareLength +
          "," +
          this.cubeOrSquareWidth +
          "," +
          this.cubeOrSquareHeight;
      } else if (
        this.cubeOrSquareLength != null &&
        this.cubeOrSquareWidth != null
      ) {
        this.addRoadProblemForm.sizeType = 2;
        this.addRoadProblemForm.specificSize =
          this.cubeOrSquareLength + "," + this.cubeOrSquareWidth;
      } else if (this.lengthOrNumberLength != null) {
        this.addRoadProblemForm.sizeType = 3;
        this.addRoadProblemForm.specificSize = this.lengthOrNumberLength;
      } else {
        this.addRoadProblemForm.sizeType = 4;
        this.addRoadProblemForm.specificSize = this.lengthOrNumberNumber;
      }

      // 由上一级传入获得
      this.addRoadProblemForm.longitude = this.$refs.map.lng;
      this.addRoadProblemForm.latitude = this.$refs.map.lat;
      this.addRoadProblemForm.patrolResultId = this.$route.query.patrolResultId;
      this.addRoadProblemForm.userId = getStore("id");

      //为了传图片设置的变量
      var roadHazardId = 0;
      var params = this.addRoadProblemForm;
      console.log("params");
      console.log(params);
      API.addRoadProblem(params).then((response) => {
        this.$ionic.alertController
          .create({
            header: "巡查问题",
            message: "添加成功, 若无问题请点击结束巡查.",
            buttons: ["确定"],
          })
          .then((a) => a.present());
        roadHazardId = response;
        for (let i = 0; i < this.imgList.length; i++) {
          let param = new FormData();
          param.append("file", this.imgList[i].file);
          param.append("roadHazardId", roadHazardId);
          let config = {
            headers: { "Content-Type": "multipart/form-data" },
          };

          axios
            .post(
              "http://47.99.65.198:8020/road_hazard_img/upload",
              param,
              config
            )
            .then(function (response) {})
            .catch(function (error) {});
        }
      });
      if (this.tempFlag == 1) {
        this.$router.push({
          path: "/patrol-result",
          query: {
            patrolResultId: this.addRoadProblemForm.patrolResultId,
            tempFlag: 1,
          },
        });
      } else {
        this.$router.push({
          path: "/patrol-result",
          query: {
            patrolResultId: this.addRoadProblemForm.patrolResultId,
            tempFlag: 0,
          },
        });
      }
    },
    getAllhazard() {
      API.getAllhazard().then((response) => {
        this.hazardList = response.data;
      });
    },
    getAllUnit() {
      API.getAllUnit().then((response) => {
        this.UnitList = response.data;
      });
    },

    chooseType() {
      document.getElementById("upload_file").click();
    },
    fileChange(el) {
      if (!el.target.files[0].size) return;
      this.fileList(el.target);
      el.target.value = "";
    },
    fileList(fileList) {
      let files = fileList.files;
      for (let i = 0; i < files.length; i++) {
        //判断是否为文件夹
        if (files[i].type != "") {
          this.fileAdd(files[i]);
        } else {
          //文件夹处理
          this.folders(fileList.items[i]);
        }
      }
    },
    //文件夹处理
    folders(files) {
      let _this = this;
      //判断是否为原生file
      if (files.kind) {
        files = files.webkitGetAsEntry();
      }
      files.createReader().readEntries(function (file) {
        for (let i = 0; i < file.length; i++) {
          if (file[i].isFile) {
            _this.foldersAdd(file[i]);
          } else {
            _this.folders(file[i]);
          }
        }
      });
    },
    foldersAdd(entry) {
      let _this = this;
      entry.file(function (file) {
        _this.fileAdd(file);
      });
    },
    fileAdd(file) {
      if (this.limit !== undefined) this.limit--;
      if (this.limit !== undefined && this.limit < 0) return;
      //总大小
      this.size = this.size + file.size;
      //判断是否为图片文件
      if (file.type.indexOf("image") == -1) {
        this.$dialog.toast({ mes: "请选择图片文件" });
      } else {
        let reader = new FileReader();
        let image = new Image();
        let _this = this;
        reader.readAsDataURL(file);
        reader.onload = function () {
          file.src = this.result;
          image.onload = function () {
            let width = image.width;
            let height = image.height;
            file.width = width;
            file.height = height;
            _this.imgList.push({
              file,
            });
          };
          image.src = file.src;
        };
      }
    },
    delImg(index) {
      this.size = this.size - this.imgList[index].file.size; //总大小
      this.imgList.splice(index, 1);
      if (this.limit !== undefined) this.limit = 6 - this.imgList.length;
    },

    //Header的返回
    back() {
      this.$router.push({
        path: "/patrol-result",
        query: {
          tempFlag: 1,
        },
      });
    },
  },
};
</script>
<style>
.xinxi {
  position: relative;
  left: -15px;
  font-size: 16px;
  text-align: left;
}
.add {
  display: inline-block;
  margin-bottom: 20px;
}
.add-img {
  width: 100%;
  padding: 10px;
}
.add-image {
  padding-top: 15px;
  margin-left: 10px;
  width: 100px;
  height: 110px;
  border: 1px dashed rgba(0, 0, 0, 0.2);
}
.font14 {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  color: #aaa;
}
.img-list {
  overflow: hidden;
}
.del {
  position: absolute;
  width: 18px;
  top: 0;
  right: 0;
  z-index: 999;
}

.sfxx {
  font-size: 18px;
}
img {
  width: 20%;
  float: center;
  padding: 20px;
}
.amap-demo {
  height: 100px;
}
</style>
