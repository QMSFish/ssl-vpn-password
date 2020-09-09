import axios from 'axios';


export function request1(config) {
    // axios.defaults.withCredentials = true
    // 1、创建axios实例
    const instance = axios.create({
        // baseURL: 'http://192.168.0.104:8080/SSLVPN',
        baseURL: 'http://47.106.120.90:8080/nsttweb',
        //baseURL: '',
        withCredentials: true,
        timeout: 5000
    });
    // 2、axios拦截  request/respond
    // 请求拦截
    instance.interceptors.request.use(config => {
        // console.log(config);
        // 给请求的header添加token令牌
        // config.headers.Authorization = sessionStorage.getItem('token')
        // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        // config.headers['Cookie'] = 'BIDUPSID=F8A2914A7766A61D4B8D69E9477361CB'
        // console.log('请求成功----拦截');
        // console.log(config);
        return config
    }, err => {
        // console.log('请求异常---拦截');
        console.log(err);
    });
    // 响应拦截
    instance.interceptors.response.use(res => {
        // console.log('响应成功----拦截');
        // console.log(res);
        return res.data
            // return res
    }, err => {
        // console.log('响应异常----拦截'); 
        console.log(err);
    });
    // 3、真正请求数据
    return instance(config)


}