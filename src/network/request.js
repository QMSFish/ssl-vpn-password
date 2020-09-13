import axios from 'axios';
import { Message } from 'element-ui'
// import router from '../router/index'
// import { Loading } from 'element-ui';

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
    // loading实例对象变量
    // let loadingInstance = null
    // 2、axios拦截  request/respond
    // 请求拦截
    instance.interceptors.request.use(config => {
        // 每次发起请求创建loading实例
        // console.log(document.querySelector('.home_main'));
        // if (document.querySelector('.home_main')) {
        //     loadingInstance = Loading.service({
        //         text: '加载中',
        //         target: document.querySelector('.home_main'),
        //         fullscreen: false,
        //         spinner: 'el-icon-loading',
        //         // background: 'rgba(255, 255, 255, 0.8)',
        //         body: true
        //     })
        // }
        // console.log(config);
        // 给请求的header添加token令牌
        // config.headers.Authorization = sessionStorage.getItem('token')
        // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        if (config.url !== '/user/modify_password') {
            config.headers = {
                'Content-Type': 'application/json' //注意： 设置很关键
            };
        }
        // config.headers = {
        //     'Content-Type': 'application/json' //注意： 设置很关键
        // };
        // config.headers['Cookie'] = 'BIDUPSID=F8A2914A7766A61D4B8D69E9477361CB'
        // console.log('请求成功----拦截');
        // console.log(config);
        return config
    }, err => {
        // console.log('请求异常---拦截');
        // 关闭loading实例
        Message.error({ message: '请求超时!' });
        console.log(err);
    });
    // 响应拦截
    instance.interceptors.response.use(res => {
        // if (loadingInstance) {
        //     loadingInstance.close()
        // }
        return res.data
            // if (res.status == 200) {
            //     return res.data
            // } else if (res.status == 401) {
            //     router.push('/login');
            //     return Promise.reject(res);
            // } else if (res.status == 201) {
            //     Message.error({ message: res.data.status });
            //     return Promise.reject(res);
            // }
            // return Promise.reject(res);
            // console.log('响应成功----拦截');
            // console.log(res);
    }, err => {
        // console.log('响应异常----拦截'); 
        // if (loadingInstance) {
        //     loadingInstance.close()
        // }
        // if (err.response.status == 504 || err.response.status == 404) {
        //     Message.error({ message: '服务器被吃了⊙﹏⊙∥' });
        // } else if (err.response.status == 403) {
        //     Message.error({ message: '权限不足,请联系管理员!' });
        // } else {
        //     Message.error({ message: '未知错误' });
        // }
        // return Promise.reject(err);
        console.log(err);
    });
    // 3、真正请求数据
    return instance(config)


}