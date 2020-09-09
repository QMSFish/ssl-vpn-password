<template>
  <login @loginCheck="checkLogin" class="login_header"></login>
</template>

<script>
import Login from 'components/common/Login'

import {loginRequest} from 'network/login'


export default {
  name: 'userlogin',
  components: {
    Login
  },
  methods: {
    async loginRequest1(obj) {
      // setTimeout(() => {
      //   console.log('我执行了');
      // },1000)
      // this.add()
      // console.log("2222222222222" + 1 + 2 +4);
      // // loginRequest(obj);
      // // sleep(1000);
      // console.log("11111111111");
      // console.log('async---异步 --- 我先执行---1');

      // await 是同步操作 用await 必须加async
      const res = await loginRequest(obj);
      console.log(res);
      // console.log(await loginRequest(obj)); //请求发送失败(超时)，返回undefined
      console.log('444444')
      // 这里考虑服务器的原因，导致请求发送失败(超时)，返回undefined
      if(!res || res.status !== 0) {
        return this.$message.error('登录失败！')
      }
      localStorage.setItem('username',res.data.name)
      // 把识别角色的变量level保存到sessionStorage中
      localStorage.setItem('level',res.data.level)
      this.$message.success('登录成功！')
      this.$router.push('/home');
    },
    // 传出来的参数有两个 ，一个是标签元素：this.$refs.loginForm,
    // 一个是登录验证数据：this.loginForm
     checkLogin(tag,params) {
      // console.log(params);
      tag.validate( async(valid, object) => {
        if(!valid) { return this.$message.error('验证失败，请重新输入')}
        this.loginRequest1(params)
        // console.log('async---异步 --- 我先执行');
      })
    }
  },
}

</script>

<style scoped>
  .login_header {
    background: url('~assets/img/login.jpg') no-repeat;
    background-size: 100% 100%;
  }
</style>