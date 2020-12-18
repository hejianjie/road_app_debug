<template>
  <div style="margin-bottom:4rem;">
    <Header ref="header" />

    <div class="user-style">
        <ion-card>
          <ion-img class="img"></ion-img>
        </ion-card>
        <span class="username-plus">{{UserInfo.name}}</span>
		</div>

    <div>

      <ion-card>
        <ion-card-header>
          <ion-card-title style="text-align:center;">个人信息</ion-card-title>
        </ion-card-header>

        <ion-item @click="updatePassword">
          <ion-text >修改密码</ion-text> 
        </ion-item>

        <ion-item>
          <ion-label>性别</ion-label>
          <p class="sfxx">{{UserInfo.sexName}}</p>
          <ion-icon name="arrow-dropright"></ion-icon>
        </ion-item>

        <ion-item>
          <ion-label>电话</ion-label>
          <p class="sfxx">{{UserInfo.phone}}</p>
          <ion-icon name="arrow-dropright"></ion-icon>
        </ion-item>

        <ion-item>
          <ion-label>邮箱</ion-label>
          <p class="sfxx">{{UserInfo.email}}</p>
          <ion-icon name="arrow-dropright"></ion-icon>
        </ion-item>

        <ion-item>
          <ion-label>所属</ion-label>
          <p class="sfxx">{{UserInfo.deptName}}</p>
          <ion-icon name="arrow-dropright"></ion-icon>
        </ion-item>

        <ion-item>
          <ion-label>身份</ion-label>
          <p class="sfxx">{{UserInfo.roleName}}</p>
          <ion-icon name="arrow-dropright"></ion-icon>
        </ion-item>
    
      </ion-card>
      <ion-button expand="block" color="danger" @click="quit()">退出</ion-button>
    </div>
    <TabBar v-if="itab" @change="idTab" />
    <TabBarAudit v-if="itab_audit" @change="idTab" />
    <TabBarAssess v-if="itab_assess" @change="idTab" />
  </div>
</template>
<script>
import TabBar from '@/components/TabBar.vue'
import TabBarAudit from '@/components/TabBar_Auditor.vue'
import TabBarAssess from '@/components/TabBar_Evaluator'
import Header from '@/components/Header.vue'
import * as request from '@/api/API'
import{ getStore, setStore, removeStore } from "@/assets/js/localStorage"
export default {
  name: 'Info',
  components: {
    TabBar,
    Header,
    TabBarAudit,
    TabBarAssess
  },
  // props: ['imageSrc'],
  data(){
    return{
      UserInfo:{},
      itab: true,
      itab_audit: false,
      itab_assess: false
    }

  },
  mounted(){
    this.$refs.header.title = '个人信息'
    this.getUserInfo();
    this.idTab();
  },
  methods:{
    updatePassword: function() {
      this.$router.push({path:'/modifypwd'})
    },
    updateInfo:function(){
      alert("修改信息")
    },

    idTab(){
      if("1200000929026998274" === getStore("roleId")){
        this.itab = false
        this.itab_audit = true
        this.itab_assess = false
      }else if("1200000838539083777" === getStore("roleId")){
        this.itab_assess = true
        this.itab_audit = false
        this.itab = false
      }else if(16 === getStore("roleId")) {
        this.itab = false
        this.itab_audit = true
        this.itab_assess = false
      }
    },

    back() {
        this.$router.go(-1)
      },
      home(){
        this.$router.push({path:'/home'})
      },
      quit(){
        this.$router.push("/")
      },
    getUserInfo(){
      const params = {
        userId: getStore("id")
      }
      request.getUserInfo(params).then(response =>{
        this.UserInfo = response.data
      })

    }

  },
  
}
</script>
<style>
  .user-style{
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	width: 100%;
	align-items: center;
	padding: 10px 5%;
	box-shadow: 10px 0 10px #CAE1FF;
	cursor: pointer;
  background-color:#3880ff;
}
.mymess{
	width: 90%;
	margin-top:10px;
	padding: 10px 5%;
	box-shadow: 0px 0 2px #ccc;
	cursor: pointer;
}
.img{
  border-radius: 5rem;
  width: 5rem;
  height: 5rem;
  left: 0rem;
  top: 0.005rem;
  border: 0.04rem solid rgba(255, 255, 255, 1);
  
}
.username-plus{ 
	width:60%;
  color: #fff;
  font-size: large;
}
.btn-update{
	width: 10%;
}
.sfxx{
    font-size: 0.24rem;
    color: rgba(166, 166, 166, 1);
}


</style>