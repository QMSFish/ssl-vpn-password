<template>
  <div>
      <el-container class="home_container">
      <!-- 头部区域 -->
      <el-header height="50px" class="home_head">
        <div class="head_left">
          <span>SSLVPN密码检测系统</span>
        </div>
        <div class="head_right">
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-left">
             你好，{{username}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <span class="el-dropdown-right">?</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="out">退出登录</el-dropdown-item>
              <el-dropdown-item command="change">修改密码</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>  
        </div>
      </el-header>
      
      <el-container class="home_child_container ">
        <!-- 侧边栏区域 -->
        <el-aside width="180px" class="home_aside">
          <!-- 显示logo部分 -->
          <div class="aside_top">SCCTC</div>
          <!-- 菜单栏部分 -->
          <home-aside :meunList="meunList" 
          :iconList="iconList[level]" :flag="flag">
            <el-menu-item index="/homePage" class="home_aside_item" @click="clearActive">
              <i class="el-icon-house border"></i>
              <span slot="title">首页</span>
            </el-menu-item>  
          </home-aside>
        </el-aside>
 
        <!-- 主体和底部区域 -->
        <el-container>
          <el-main class="home_main">
            <!-- 子组件跳转占位标签 -->
            <router-view></router-view>
          </el-main>
          <el-footer class="home_footer">Copyright@infosec Corporation, All Right Reserved</el-footer>
        </el-container>
      </el-container>
    </el-container>

    <!-- 修改密码对话框 -->
    <el-dialog
      title="修改密码"
      :visible.sync="modifyPasswordFlag"
      width="50%"
      @close="modifyPasswordClosed">
      <el-form :model="modifyPassword" status-icon :rules="modifyPassword_rules" 
      ref="modifyPassword_ref" label-width="100px">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="modifyPassword.userName" disabled></el-input>
        </el-form-item>
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input type="password" v-model="modifyPassword.oldPassword" placeholder="请输入旧密码" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="modifyPassword.newPassword" placeholder="请输入新密码" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input type="password" v-model="modifyPassword.checkPassword" placeholder="请再次输入新密码" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyPasswordFlag = false">取 消</el-button>
        <el-button type="primary" @click="btnClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import HomeAside from 'components/common/aside/HomeAside'

import {queryRouter,modify_password,minor_logout} from 'network/home'


export default {
  name: 'home',
  data() {
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入旧密码'));
        } else {
          if (this.modifyPassword.newPassword !== '') {
            this.$refs.modifyPassword_ref.validateField('newPassword');
          }
          callback();
        }
      };
      var validatePass1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if(value === this.modifyPassword.oldPassword) {
            callback(new Error('新密码和旧密码不能一样!'));
            // return;
          } else {
            if(this.modifyPassword.checkPassword !== '') {
              this.$refs.modifyPassword_ref.validateField('checkPassword');
            }
              callback();
          }
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value !== this.modifyPassword.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      // 角色 0
      meunList: [],
      iconList: {
        '1': ['iconfont icon-users','iconfont icon-tijikongjian','iconfont icon-shangpin'],
        '2': ['iconfont icon-users','iconfont icon-tijikongjian','iconfont icon-shangpin'],
        '3': ['iconfont icon-users','iconfont icon-tijikongjian'],
        '4': ['iconfont icon-users','iconfont icon-tijikongjian']
      },
      flag: false,
      activeFlag: false,
      // 判断角色的变量
      level: '',
      // 登录用户名
      username: '',
      // 修改密码对话框显示隐藏变量
      modifyPasswordFlag: false,
      modifyPassword: {
        userName: '',
        oldPassword: '',
        newPassword: '',
        checkPassword: ''
      },
      // from表单的验证规则
      modifyPassword_rules: {
        userName: [
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ],
        oldPassword: [
          { validator: validatePass, trigger: 'blur' }
        ],
        newPassword: [
          { validator: validatePass1, trigger: 'blur' }
        ],
        checkPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      // 修改密码请求参数
      modifyPasswordParams: {
        name: '',
        newPwd: '',
        oldPwd: ''
      }

    }
  },
  components: {
    HomeAside
  },
  created() {
    this.username = localStorage.getItem('username');
    this.level = localStorage.getItem('level');
    console.log(this.level);
    this.queryRouter1({level: this.level})
  },
  // destroyed() {
  //   // home页面关闭后  断开了和服务端的对话框  清空localStorage，再次进入home页面需要重新登录
  //   sessionStorage.removeItem('username');
  //   sessionStorage.removeItem('level')
  // },
  methods: {
    //  菜单栏请求
    async queryRouter1(obj) {
      const res = await queryRouter(obj);
      console.log(res);
      if(!res || res.status !== 0) {
        return this.$message.error('请求菜单失败！')
      }
      this.meunList = res.data;
    },
    // 修改用户名密码请求
    async modify_password1(obj) {
      const res = await modify_password(obj);
      console.log(res);
      if(!res || res.status !== 0) {
        return this.$message.error('修改密码失败！')
      }
      this.$message.success('修改密码成功');
      this.$router.push('/login');
    },
    // 用户登出请求
    async minor_logout1() {
      const res = await minor_logout();
      console.log(res);
      if(!res || res.status !== 0) {
        return this.$message.error('登出失败！')
      }
      this.$router.push('/login');
    },
    // 点击修改密码对话框中的确定按钮
    btnClick() {
      this.$refs.modifyPassword_ref.validate((valid) => {
        if(!valid) {
          return this.$message.error('验证不通过！')
        }
        const pass = this.modifyPassword;
        const passParams = this.modifyPasswordParams;
        passParams.name = pass.userName;
        passParams.newPwd = pass.newPassword;
        passParams.oldPwd = pass.oldPassword;
        console.log(passParams);
        this.modify_password1(passParams);
        // 隐藏对话框
        this.modifyPasswordFlag = false;
      })
    },
    handleCommand(command) {
      // 点击退出登录按钮
      if(command === 'out') {
        console.log('退出登录');
         this.minor_logout1()
      } else {
        // 点击修改按钮 修改用户名密码
        console.log("修改密码");
        this.modifyPassword.userName = localStorage.getItem('username');
        this.modifyPasswordFlag = true
      }
    },
    // 对话框关闭 把表单恢复到初始状态
    modifyPasswordClosed() {
      this.$refs.modifyPassword_ref.resetFields()
    },
    // 点击菜单栏首页
    clearActive() {
      console.log(11);
      // if(sessionStorage.getItem('activeIndex')) {
      //   sessionStorage.removeItem('activeIndex')
      // }
    }

  }
}

</script>
<style scoped>
  .home_container {
    /* 让容器撑满整个页面 */
    height: 100vh;
  }
  .home_head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 400px;
    color: #e9edf0;
    background-color: #0f5076;
  }
  .head_left {
    font-size: 15px;
  }
  .home_child_container {
    height: calc(100% - 50px);
  }
  .home_aside {
    background-color: #22262f;
  }
  .home_main {
    min-width: 1000px;
    padding: 20px 10px 10px 20px;
    background-color: #ffffff;
    /* overflow: auto; */
    overflow-y: auto;
    overflow-x: hidden;
  }
  .el-dropdown-left {
    cursor: pointer;
    color: #e9edf0;
  }
  .el-dropdown-right {
    cursor: pointer;
    color: #e9edf0;
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .aside_top {
    font-size: 15px;
    color: #e9edf0;
    padding: 10px 0 20px 50px;
  }
  .home_aside_item {
    padding-left: 17px!important;
  }
  .home_footer {
    font-size: 14px;
    text-align: right;
    height: 40px!important;
    line-height: 40px;
    padding-right: 10px ;
    background-color: #eeeeee;
  }
</style>