import axios from 'axios'

// axios 配置
axios.defaults.timeout = 500 * 1000
axios.defaults.baseURL = "http://47.99.65.198:8020"
var qs = require('qs')

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

// 处理状态码
const handleStatus = ({ status, data = {} }) => {
    if (status === 200) {
        return data
    } else {
        return
    }
}

// 处理响应
const handleResponse = (result) => {
    return Promise.resolve(result)
}

export default {
    get(url, params = {}) {
        let queryString = []
        for (let key in params) {
            queryString.push(`${key}=${params[key]}`)
        }
        if (queryString.length > 0) {
            queryString = queryString.join('&')
            url += `?${queryString}`
        }
        return axios.get(url).then(handleStatus).then(handleResponse)
            .catch(error => {
                return
            })
    },

    post(url, params = {}) {
        return axios.post(url, qs.stringify(params)).then(handleStatus).then(handleResponse)
            .catch(error => { })
    }
}
