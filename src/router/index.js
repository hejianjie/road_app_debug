import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/common/Login.vue'
import Info from '@/views/common/Info.vue'
import Inspection from '@/views/inspector/Inspection.vue'
import PatrolResult from '@/views/inspector/PatrolResult.vue'
import Record from '@/views/inspector/Record.vue'
import Home from '@/views/inspector/Home.vue'
import Problem from '@/views/inspector/Problem.vue'
import ViewProblem from '@/views/inspector/ViewProblem.vue'
import ViewPatrolProblem from '@/views/inspector/ViewPatrolProblem.vue'
import EditProblem from '@/views/inspector/EditProblem.vue'
import DailyPatrol from '@/views/inspector/DailyPatrol.vue'
import TempPatrol from '@/views/inspector/TempPatrol.vue'
import ViewPatrol from '@/views/inspector/ViewPatrol.vue'
import RecordRecord from '@/views/inspector/RecordRecord.vue'
import Auditing from '@/views/auditor/Auditing.vue'
import Assessing from '@/views/evaluator/Assessing.vue'
import AddAssess from '@/views/evaluator/AddAssess.vue'
import ViewAssess from '@/views/evaluator/ViewAssess.vue'
import UpdateAssess from '@/views/evaluator/UpdateAssess.vue'
import AuditResult from '@/views/auditor/AuditResult.vue'
import Audit from '@/views/auditor/Audit.vue'
import ModifyPwd from '@/views/common/ModifyPwd.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/inspection',
    name: 'Inspection',
    component: Inspection
  },
  {
    path: '/record',
    name: 'Record',
    component: Record
  },
  {
    path:'/home',
    name:'Home',
    component: Home
  },
  {
    path: '/view_problem',
    name: 'ViewProblem',
    component: ViewProblem
  },
  {
    path: '/edit_problem',
    name: 'EditProblem',
    component: EditProblem
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Info
  },
  {
    path: '/problem',
    name: 'problem',
    component: Problem
  },
  {
    path: '/daily-patrol',
    name: 'DailyPatrol',
    component: DailyPatrol
  },
  {
    path: '/temp-patrol',
    name: 'TempPatrol',
    component: TempPatrol
  },
  {
    path: '/view-patrol',
    name: 'ViewPatrol',
    component: ViewPatrol
  },
  {
    path: '/view_patrol_problem',
    name: 'ViewPatrolProblem',
    component: ViewPatrolProblem
  },
  {
    path: '/record-record',
    name: 'RecordRecord',
    component: RecordRecord
  },
  {
    path: '/auditing',
    name: 'Auditing',
    component: Auditing
  },
  {
    path: '/assessing',
    name: 'Assessing',
    component: Assessing
  },
  {
    path: '/add-assess',
    name: 'AddAssess',
    component: AddAssess
  },
  {
    path: '/view-assess',
    name: 'ViewAssess',
    component: ViewAssess 
  },
  {
    path: '/update-assess',
    name: 'UpdateAssess',
    component : UpdateAssess
  },
  {
    path:'/audit-result',
    name:'AuditResult',
    component:AuditResult
  },
  {
    path:'/audit',
    name:'Audit',
    component:Audit
  },
  {
    path:'/modifypwd',
    name:'ModifyPwd',
    component:ModifyPwd
  },
  {
    path: '/patrol-result',
    name: 'PatrolResult',
    component: PatrolResult
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
