import { request1 } from './request'

export function modify_password(obj) {
    return request1({
        url: '/user/modify_password',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: obj
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