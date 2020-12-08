import http from './http'

const apiHost = 'http://47.99.65.198:8020'
/**
 * 定义 GET 与 POST 请求
 * @param {*} url 
 * @param {*} params 
 */
const GET = (url, params) => {
    return http.get(url, params)
}

const POST = (url, params) => {
    return typeof(params) != undefined ? http.post(url, params) : http.post(url)
}


/**
 * 定义各具体方法, 传入 url 与 params
 * @param {*} params 
 */

export const getProblemsCondition = (params) => {
    return GET('/inspector/list/problems-condition', params)
}

export const getRoadSection = (params) => {
    return GET('/inspector/get/road-section', params)
}

export const getPatrolInfo = (params) => {
    return GET('/inspector/patrol/daily', params)
}

export const patrolQuery = (params) => {
    return GET('/inspector/patrol/query', params)
}

export const listNationalHighway = (params) => {
    return GET('/inspector/list/highway', params)
}

export const listRoadSection = (params) => {
    return GET('/inspector/list/road-section', params)
}

export const listStake = (params) => {
    return GET('/inspector/list/stake', params)
}

export const listPatrolCar = (params) => {
    return GET('/inspector/list/car', params)
}

export const listNotification = (params) => {
    return GET('/inspector/list/notification', params)
}

export const listPatrol = (params) => {
    return GET('/inspector/list/patrol', params)
}

export const listAssessingAppraisal = (params) => {
    return GET('/inspector/list/assessing-appraisal', params)
}

export const listAcceptanceIng = (params) => {
    return GET('/inspector/list/acceptance-ing', params)
}

export const listAcceptanceEd = (params) => {
    return GET('/inspector/list/acceptance-ed', params)
}

export const listAssessedAppraisal = (params) => {
    return GET('/inspector/list/assessed-appraisal', params)
}

export const patrolBegin = (params) => {
    return POST('/inspector/patrol/begin', params)
}

export const patrolEnd = (params) => {
    return POST('/inspector/patrol/end', params)
}

export const getcheckRoadProblem = (params) =>{
    return GET('/roadhazard/checkRoadProblem',params)
}
export const getUserInfo = (params) =>{
    return GET('/mgr/getUserInfo',params)
}
export const addRoadProblem = (params) =>{
    return POST('/roadhazard/addRoadProblem',params)
}
export const getAllhazard = (params) =>{
    return GET('/hazard_base_info/getAll')
}
export const getAllUnit = (params) =>{
    return GET('/hazard_unit/getList')
}
export const loginMobile = (params) =>{
    return POST('/loginMobile', params)
}
export const uploadImg = (param) =>{
    return POST("/road_hazard_img/upload",param)
}
export const addAssessInfo = (params) =>{
    return POST("/appraisal/addassessinfo",params)
}
export const getAssessInfo = (param) =>{
    return GET("/appraisal/getlist",param)
}
export const saveAudit = (params) =>{
    return POST("/acceptance/save",params)
}
export const getAudit = (param) =>{
    return GET("/acceptance/findbyacceptanceId",param)
}
export const modifyPwd = (params) =>{
    return POST("/mgr/modifyPwd",params)
}
export const delectRoadProblem = (params) =>{
    return POST("/roadhazard/delectRoadProblem",params)
}
export const updateOneRoadProblem = (params) =>{
        return POST("/roadhazard/updateOneRoadProblem",params)
}
