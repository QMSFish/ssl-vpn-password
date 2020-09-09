import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui';
import { query_login_stat } from 'network/home'

const UserLogin = () =>
    import ('views/login/UserLogin')
const Home = () =>
    import ('views/home/Home')
const HomePage = () =>
    import ('views/home/homeChildComps/homePage/HomePage')
const BasicConfiguration = () =>
    import ('views/home/homeChildComps/role_0/taskManage/BasicConfiguration')
const UseCaseManage = () =>
    import ('views/home/homeChildComps/role_0/taskManage/UseCaseManage')
const TaskConfiguration = () =>
    import ('views/home/homeChildComps/role_0/taskManage/TaskConfiguration')
const LogManage = () =>
    import ('views/home/homeChildComps/role_0/logManage/LogManage')
const EncryptManage = () =>
    import ('views/home/homeChildComps/role_0/encryptManage/EncryptManage')
const UserManagement = () =>
    import ('views/home/homeChildComps/role_1/managementTool/UserManagement')
const SetSystemTime = () =>
    import ('views/home/homeChildComps/role_1/systemManagement/SetSystemTime')
const SystemUpgrade = () =>
    import ('views/home/homeChildComps/role_1/systemManagement/SystemUpgrade')


Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: UserLogin },
    {
        path: '/home',
        component: Home,
        redirect: '/homePage',
        children: [
            { path: '/homePage', component: HomePage },
            { path: '/basic', component: BasicConfiguration, meta: { level: 2 } },
            { path: '/cases', component: UseCaseManage, meta: { level: 2 } },
            { path: '/config', component: TaskConfiguration, meta: { level: 2 } },
            { path: '/log', component: LogManage, meta: { level: 2 } },
            { path: '/encryptManage', component: EncryptManage, meta: { level: 2 } },
            { path: '/usersmg', component: UserManagement, meta: { level: 3 } },
            { path: '/systemtime', component: SetSystemTime, meta: { level: 3 } },
            { path: '/systemup', component: SystemUpgrade, meta: { level: 3 } }

        ]
    }

]

const router = new VueRouter({
    routes
})

//对于路由守卫来说  (redirect 重定向 没有经过路由守卫)  直接重新改变to的指向  to 就是重定向后的route对象
//  '/'  (重定向)--> '/login'  from: "/"  to: "/login"
//  '/login'  (跳转)--> '/home  (重定向)--> '/homepage'  from: '/login'  to: '/homepage'

// 只有from 和 to 不一样的时候 才会触发路由守卫

// 前置路由守卫  设置登录权限和路由跳转权限
router.beforeEach(async(to, from, next) => {
    console.log('进入路由守卫');
    console.log(from);
    //to and from are Route Object,next() must be called to resolve the hook
    const userName = localStorage.getItem('username');
    const level = localStorage.getItem('level');
    const active = sessionStorage.getItem('activeIndex');
    // 跳转页面是否是登录页面
    if (to.path === '/login') {
        console.log('login');
        // 查询用户登录状态
        const res = await query_login_stat();
        console.log(res);
        if (!res || res.data === false) {
            return next();
        }
        // 识别登录用户名是否相同
        if (res.data.name !== userName) {
            Message.error('请重新登录！');
            return next();
        }
        next('/home');
    } else if (to.path === '/homePage') {
        // 查询用户登录状态
        const res = await query_login_stat();
        console.log(res);
        if (!res || res.data === false) {
            Message.error('请重新登录！');
            return next('/login');
        }
        // 识别登录用户名是否相同
        if (res.data.name !== userName) {
            Message.error('请重新登录！');
            return next('/login');
        }
        if (active) {
            sessionStorage.removeItem('activeIndex')
        }
        // window.location.reload();
        next();
    } else {
        // 查询用户登录状态
        const res = await query_login_stat();
        console.log(res);
        if (!res || res.data === false) {
            Message.error('请重新登录！');
            return next('/login');
        }
        // 识别登录用户名是否相同
        if (res.data.name !== userName) {
            Message.error('请重新登录！');
            return next('/login');
        }
        if (to.meta.level != level) {
            Message.error('无访问权限');
            return next(from.path);
        }
        next();
    }
})

export default router