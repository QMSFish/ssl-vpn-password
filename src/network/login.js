import { request1 } from './request'


export function loginRequest(loginData) {
    return request1({
        url: '/login/minor_login',
        method: 'post',
        data: loginData
    })
}