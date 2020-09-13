import { request1 } from './request'

export function modify_password(obj) {
    return request1({
        url: '/user/modify_password',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: obj,
        transformRequest: [
            function(data) {
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                ret = ret.substring(0, ret.lastIndexOf('&'));
                return ret
            }
        ],
    })

}

export function queryRouter(obj) {
    return request1({
        url: '/user/query_router',
        method: 'get',
        params: obj
    })
}

export function getUsers() {
    return request1({
        url: '/user/query_user',
        method: 'get'
    })
}

export function resetToken(name) {
    return request1({
        url: '/user/modify_user?name=' + name,
        method: 'post',
    })
}

export function deleteUser(name) {
    return request1({
        url: '/user/delete_user?name=' + name,
        method: 'post',
    })
}

export function addUser(obj) {
    return request1({
        url: '/user/add_user',
        method: 'post',
        data: obj
    })
}

export function query_sysdate() {
    return request1({
        url: '/sysinfo/query_sysdate',
        method: 'get',
    })
}

export function modify_sysdate(date) {
    return request1({
        url: '/sysinfo/modify_sysdate?date=' + date,
        method: 'post'
    })
}

export function query_case() {
    return request1({
        url: '/case/query_case',
        method: 'get'
    })
}

export function modify_case(obj) {
    return request1({
        url: '/case/modify_case',
        method: 'post',
        data: {
            "useCaseLibrary": obj
        }
    })
}

export function delete_case(caseName) {
    return request1({
        url: '/case/delete_case?caseName=' + caseName,
        method: 'post'
    })
}

export function add_case(obj) {
    console.log(obj);
    return request1({
        url: '/case/add_case',
        method: 'post',
        data: {
            "useCaseLibrary": obj
        }
    })
}

export function query_login_stat() {
    return request1({
        url: '/login/query_login_stat',
        method: 'get',
    })
}

export function minor_logout() {
    return request1({
        url: '/login/minor_logout',
        method: 'post',
    })
}

export function query_task() {
    return request1({
        // url: '/task/query_task?taskNum=' + taskNum,
        url: '/task/query_task',
        method: 'get',
    })
}

export function query_singel_task(taskNum) {
    return request1({
        url: '/task/query_task?taskNum=' + taskNum,
        // url: '/task/query_task',
        method: 'get',
    })
}

export function add_task(obj) {
    return request1({
        url: '/task/add_task',
        method: 'post',
        data: obj
    })
}

export function modify_task(obj) {
    return request1({
        url: '/task/modify_task',
        method: 'post',
        data: obj
    })
}

export function delete_task(taskNum) {
    return request1({
        url: '/task/delete_task?taskNum=' + taskNum,
        // url: '/task/query_task',
        method: 'post',
    })
}

export function start_task(taskNum) {
    return request1({
        url: '/task/start_task?taskNum=' + taskNum,
        // url: '/task/query_task',
        method: 'post',
    })
}

export function stop_task(taskNum) {
    return request1({
        url: '/task/stop_task?taskNum=' + taskNum,
        // url: '/task/query_task',
        method: 'post',
    })
}

export function restart_task(taskNum) {
    return request1({
        url: '/task/restart_task?taskNum=' + taskNum,
        // url: '/task/query_task',
        method: 'post',
    })
}

export function clean_data(taskNum) {
    return request1({
        url: '/task/clean_data?taskNum=' + taskNum,
        // url: '/task/query_task',
        method: 'post',
    })
}