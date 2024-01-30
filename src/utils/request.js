import axios from 'axios';

const service = axios.create({
    baseURL:'https://www.fastmock.site/mock/f77346976c3e5f4014d420ac460dc8d9/ftl',
    timeout: 5000
})

// 请求拦截器

service.interceptors.request.use(config => {
    (config)=>{
        config.headers.icode = 'chublur'
    }
    return config;
}, error => {
    return Promise.reject(error);
})

// 响应拦截器

service.interceptors.response.use(response => {
    const {success , message ,data} = response.data;
    if (success) {
        return data;
    }else {
        return Promise.reject(message);
    }
}, error => {
    return Promise.reject(error);
})

export default service;