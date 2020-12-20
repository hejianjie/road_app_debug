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
                <ion-label>工程量:{{AuditInfo.work_amount}}</ion-label>
            </ion-col>  
            <ion-col>
                <ion-label v-if="dataProblem.sizeType===1">类型尺寸:{{sizeTypeName.hazard_unit_name}}{{dataProblem.specificSize}}{{"(立方米)"}}</ion-label>
                <ion-label v-if="dataProblem.sizeType===2">类型尺寸:{{sizeTypeName.hazard_unit_name}}{{dataProblem.specificSize}}{{"(平方米)"}}</ion-label>
                <ion-label v-if="dataProblem.sizeType===3">类型尺寸:{{sizeTypeName.hazard_unit_name}}{{dataProblem.specificSize}}{{"(米)"}}</ion-label>
                <ion-label v-if="dataProblem.sizeType===4">类型尺寸:{{sizeTypeName.hazard_unit_name}}{{dataProblem.specificSize}}{{"(个)"}}</ion-label>
            </ion-col>          
      </ion-item>

      <ion-item>    
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-label>单价(元):{{AuditInfo.unit_price}}</ion-label>
            </ion-col>
            <ion-col>
              <ion-label>总金额(元):{{AuditInfo.cost_price}}</ion-label>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-item>

      <ion-item>
        <ion-label>扣款金额(元):{{AuditInfo.deduction}}</ion-label>
      </ion-item>

      <ion-item>
        <ion-label>复核金额(元):{{AuditInfo.second_audit_price}}</ion-label>
      </ion-item>

      <ion-item>
        <ion-label>是否完成</ion-label>
        <p style="position:relative;left:-15px;font-size:16px;text-align:left;color:red" v-if="AuditInfo.first_audit_result === 0">未完成</p>
        <p v-else>完成</p>

      </ion-item>
    </ion-card>
    <ion-card>
      <ion-item>
        <ion-card-content style="width:300px;height:80px;text-align:left">
        {{AuditInfo.description}}
      </ion-card-content>
      </ion-item>
    </ion-card>

    <ion-card v-if = auditImgs.length>
      <div style="display:flex;justify-content: space-around;flex-wrap: wrap;">
      <viewer :images="auditImgs">
        <img style="width:100px;height:100px" v-for="item in auditImgs" :src="'http://47.99.65.198:8020/image/'+item.name" :key="item.name">
      </viewer>
      </div>
    </ion-card>
    <ion-card v-else style="margin-bottom:5rem;">
      <ion-label style="text-align:center;font-size:16px">
        暂无图片
      </ion-label>
    </ion-card>
    <!-- <ion-button expand="block" color="success" @click="gosaveInfo()">保存</ion-button> -->
    <TabBar />
  </div>
</template>
<script>
import * as API from '@/api/API'
import Header from '@/components/Header'
import HeaderMap from '@/components/HeaderMap'
import TabBar from '@/components/TabBar_Auditor'

export default {
  name: 'AuditResult',
  components: {
    Header,
    HeaderMap,
    TabBar
  },
  data() {
    return {
      auditImgs:{},
      hazardName:{},
      dataProblem:{},
      sizeTypeName:{},
      roadInfo:{},
      AuditInfo:{},
    }
  },
  mounted(){
    this.$refs.header.title = '核量结果'
    this.getcheckRoadProblem()
    this.getAudit()
  },
  methods: {
    getcheckRoadProblem(){
       console.log("垃圾")
      var params = {
        //roadHazardId = this.$route.query.roadHazardId
        roadHazardId : this.$route.query.roadHazardId,
      }
      API.getcheckRoadProblem(params).then(response => {
        this.hazardName = response.hazardName 
        this.dataProblem = response.data
        this.sizeTypeName = response.sizeTypeName
        this.getRoadSection(response.data.patrolResultId)
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
    getAudit(){
     
      const param ={
        //acceptanceId = this.$route.query.acceptanceId
        acceptanceId:this.$route.query.acceptanceId
      }
      API.getAudit(param).then(response =>{
        this.AuditInfo = response.data
        this.auditImgs = response.auditImgs
      })
    }
    
  }
}

</script>
<style>
.xinxi{
    position:relative;
    left:-10px;
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
