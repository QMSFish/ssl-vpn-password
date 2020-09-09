<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 图标部分 -->
      <slot></slot>
      <!-- 登录表单部分 -->
      <el-form label-width="0" ref="loginForm" 
      :rules="loginRules" :model="loginForm" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="name">
          <el-input v-model="loginForm.name" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-password" type="password"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-row class="login_btn">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      //这是表单的数据绑定对象
      loginForm: {
        name: 'taskadmin',
        password: '123456'
      },
      //这是表单的验证规则对象
      loginRules: {
        name: [
          { required: true, message: '请输入登录用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm() {
      //对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      this.$refs.loginForm.resetFields();
    },
    login() {
      // 导出this.$refs.loginForm和this.loginForm
      this.$emit('loginCheck',this.$refs.loginForm,this.loginForm)
    }
  }
}

</script>
<style scoped>
  .login_container {
    height: 100%;
  }
  .login_box {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 450px;
    height: 300px;
    background-color: #fff;
  }
  .login_form {
    position: absolute;
    width: 100%;
    bottom: 0;
    padding: 20px;
    box-sizing: border-box;
  }
  .login_btn {
    display: flex;
    justify-content: flex-end;
  }
</style>