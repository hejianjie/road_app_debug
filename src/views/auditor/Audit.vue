<template>
  <div style="margin-bottom:4rem;">
    <Header ref="header"/>
    <HeaderMap/>
    <ion-card>
      <ion-item>
        <ion-col size="3">
          <ion-label>巡查路线</ion-label>
        </ion-col>
        <ion-col>
           <p style="text-align:right">{{ roadInfo.nationalHighwayName }} {{ roadInfo.roadSectionName }}</p>
           <p style="text-align:right"> {{ roadInfo.beginStake }}~{{ roadInfo.endStake }}</p>
        </ion-col>
      </ion-item>

      <ion-item>
        <ion-label>位置</ion-label>
        <p class="xinxi">{{ dataProblem.position}}</p>
      </ion-item>

      <ion-item>
        <ion-label>病害类型</ion-label>
        <p class="xinxi">{{hazardName.name}}</p>
      </ion-item>

      <ion-item>
            <ion-col>
                <ion-label v-if="dataProblem.sizeType===1">类型尺寸:{{sizeTypeName.hazard_unit_name}}{{"-"}}{{dataProblem.specificSize}}{{"(立方米)"}}</ion-label>
                <ion-label v-if="dataProblem.sizeType===2">类型尺寸:{{sizeTypeName.hazard_unit_name}}{{"-"}}{{dataProblem.specificSize}}{{"(平方米)"}}</ion-label>
                <ion-label v-if="dataProblem.sizeType===3">类型尺寸:{{sizeTypeName.hazard_unit_name}}{{"-"}}{{dataProblem.specificSize}}{{"(米)"}}</ion-label>
                <ion-label v-if="dataProblem.sizeType===4">类型尺寸:{{sizeTypeName.hazard_unit_name}}{{"-"}}{{dataProblem.specificSize}}{{"(个)"}}</ion-label>
            </ion-col>
            <ion-col>
                <ion-label style="text-align:right">工程量 {{saveInfoForm.workAmount}}</ion-label>
            </ion-col>            
      </ion-item>

      <ion-item>    
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-label>单价(元)</ion-label>
              <ion-input type="number" placeholder="请输入单价" :value="saveInfoForm.unitPrice" @ionInput="saveInfoForm.unitPrice=$event.target.value"></ion-input>
            </ion-col>
            <ion-col>
              <ion-label>总金额(元)</ion-label>
              <p>{{costPrice}}</p>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-item>

      <ion-item>
        <ion-label>扣款金额(元)</ion-label>
        <ion-input type="number" placeholder="输入扣款金额" :value="saveInfoForm.deduction" @ionInput="saveInfoForm.deduction=$event.target.value"></ion-input>
        <!-- <span>万</span> -->
      </ion-item>

      <ion-item>
        <ion-label>复核金额(元)</ion-label>
        <p class="xinxi">{{secondAuditPrice}}</p>
        <!-- <span>万</span> -->
      </ion-item>

      <ion-item>
        <ion-label>是否完成</ion-label>
        <ion-toggle @ionChange="saveInfoForm.firstAuditResult=$event.target.checked"></ion-toggle>
      </ion-item>

      <ion-item>
        <ion-label position="floating">请输入核量备注</ion-label>
        <ion-textarea :value="saveInfoForm.description"  @ionChange="saveInfoForm.description=$event.target.value" ></ion-textarea>
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
          图片(最多6张，还可上传
          <span v-text="6-imgList.length"></span>张)
        </p>
          <div style="display:flex;justify-content: space-around;flex-wrap: wrap;">
              <div v-for="(url,index) in imgList" :key="index" v-show="imgList.length">
                <!-- <ion-icon name="close-circle" @click.stop="delImg(index)"></ion-icon> -->
                <img style="width:10px;height:10px;" align="right" src="@/assets/img/delect.png"  @click.stop="delImg(index)"> 
                <img style="width:90px;height:100px" :src="url.file.src" />
              </div>

              <div class="add" @click="chooseType" v-show="imgList.length!=6">
                  <div class="add-image" align="center">
                    <ion-icon style="font-size: 2rem" name="add"></ion-icon>
                    <p>添加图片</p>
                  </div>
              </div>
          </div>
      </div>
    </ion-card>
    <ion-button expand="block" color="success" @click="saveInfo()">保存</ion-button>
    <TabBar />
  </div>
</template>
<script>
import * as API from '@/api/API'
import axios from 'axios'
import Header from '@/components/Header'
import HeaderMap from '@/components/HeaderMap'
import TabBar from '@/components/TabBar_Auditor'
import{ getStore, setStore, removeStore } from "@/assets/js/localStorage"
export default {
  name: 'Audit',
  computed:{
    costPrice:function(){
      return Number(this.saveInfoForm.unitPrice)*Number(this.saveInfoForm.workAmount)
    },
    secondAuditPrice:function(){
      return Number(this.costPrice)-Number(this.saveInfoForm.deduction)
    }
  },
  components: {
    Header,
    HeaderMap,
    TabBar
  },
  data() {
    let self = this
    return {
      //添加图片需要一个list存储
      imgList: [],
      hazardName:{},
      dataProblem:{},
      hazardImgs:{},
      sizeTypeName:{},
      roadInfo:{},
      //核量表单
      saveInfoForm:{
        //申请表
        applicationId:'',
        //单位
        unit:'',
        //具体尺寸
        specificSize:'',
        //工程量
        workAmount:'',
        //单价
        unitPrice:'',
        //总金额
        costPrice:'',
        //是否完成 0-未完成 1-完成
        firstAuditResult:'',
        //扣款金额
        deduction:'',
        //复核金额
        secondAuditPrice:'',
        //复核描述
        description:'',
        acceptOrganisation: getStore('id'),
        roleId: getStore('roleId').toString()
      }
    }
  },
  mounted(){
    this.getRoadProblem()
    this.$refs.header.title = '核量'
  },
  methods: {
    getRoadProblem(){
      var params = {
        roadHazardId: this.$route.query.roadHazardId
      }
      API.getcheckRoadProblem(params).then(response => {
        this.hazardName = response.hazardName 
        this.dataProblem = response.data
        this.hazardImgs = response.hazardImgs
        this.sizeTypeName = response.sizeTypeName
        this.getRoadSection(response.data.patrolResultId)
        this.calculate()
      })
    },
    getRoadSection(patrolResultId) {
      const params = {
        patrolResultId:patrolResultId
      }
      API.getRoadSection(params).then(response => {
        if(response.statusCode === 1) {
          this.roadInfo = response.data
        }
      })
    },
    back() {
        this.$router.go(-1)
    },
    calculate(){
      var sizeArr = this.dataProblem.specificSize.split("*")
      
        switch(this.dataProblem.sizeType){
          case 1 :
            this.saveInfoForm.workAmount = (sizeArr[0]*sizeArr[1]*sizeArr[2])
            break;
          case 2 :
            console.log("hahah" + sizeArr[0]*sizeArr[1])
            this.saveInfoForm.workAmount = (sizeArr[0]*sizeArr[1])
            break;
          case 3:
            this.saveInfoForm.workAmount = (sizeArr[0])
            break;
          case 4:
            this.saveInfoForm.workAmount = (sizeArr[0])
            break;
        }

    },
    saveInfo(){
        //能否传入
        this.saveInfoForm.applicationId = this.$route.query.applicationId
        this.saveInfoForm.firstAuditResult === true ? this.saveInfoForm.firstAuditResult = 1 : this.saveInfoForm.firstAuditResult = 0
        this.saveInfoForm.unit = this.dataProblem.sizeType,
        this.saveInfoForm.specificSize =this.dataProblem.specificSize;
        this.saveInfoForm.costPrice = this.costPrice
        this.saveInfoForm.secondAuditPrice = this.secondAuditPrice
        const params = this.saveInfoForm
        //为了传图片设置的变量
        var acceptanceId =0;
      API.saveAudit(params).then(response =>{
        if(response.statusCode === 1){
          this.$ionic.alertController
            .create({
              header: '核量信息',
              message: '添加核量成功.',
              buttons: ['确定'],
            }).then(a => a.present())
           acceptanceId = response.data
           for(let i=0;i<this.imgList.length;i++){
              let param = new FormData();
              param.append("file", this.imgList[i].file);
              param.append("acceptanceId",acceptanceId)
              let config = {
                headers: { "Content-Type": "multipart/form-data" }, 
              };

            axios.post('http://47.99.65.198:8020/road_hazard_img/uploadAcceptance', param ,config).then(
              function (response) 
              { console.log(response); })
              .catch(function (error) {
              console.log(error);
              });
            }
        }
      })
      this.$router.push('/auditing')
    },

     //添加图片
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
      files.createReader().readEntries(function(file) {
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
      entry.file(function(file) {
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
        console.log('上传失败')
        this.$dialog.toast({ mes: "请选择图片文件" });
      } else {
        let reader = new FileReader();
        let image = new Image();
        let _this = this;
        reader.readAsDataURL(file);
        reader.onload = function() {
          file.src = this.result;
          image.onload = function() {
            let width = image.width;
            let height = image.height;
            file.width = width;
            file.height = height;
            _this.imgList.push({
              file
            });
            console.log(_this.imgList);
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
    
  }
}

</script>
<style>
.xinxi{
    position:relative;
    left:-15px;
    font-size:16px;
    text-align:left
}
img{
  width: 100px;
  height: 100px;
  float: center;
  padding: 5px;

}
.time-label {
    font-size: 90%
  }
  .label-content {
    font-size: .88rem
  }
  .amap-demo {
    height: 100px;
  }
</style>
