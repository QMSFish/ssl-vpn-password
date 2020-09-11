<template>
  <div>
    <div class="main_header">
      <!-- 顶行 -->
      <top-line :topdata="topdata"></top-line>
      <!-- form表单 -->
      <div class="user_center">
        <div class="user_center_form">
          <el-form :model="userFormData" :rules="userForm_rules" 
          ref="userForm_ref" label-width="100px">
            <el-form-item label="用户名称" prop="name">
              <el-input v-model="userFormData.name" placeholder="请输入用户名称"></el-input>
            </el-form-item>
            <el-form-item label="用户口令" prop="password">
              <el-input type="password" v-model="userFormData.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item type="password" label="确定口令" prop="checkPassword">
              <el-input v-model="userFormData.checkPassword" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="用户类型" prop="level">
               <el-select v-model="userFormData.level" placeholder="请选择">
                 <el-option
                   v-for="item in options"
                   :key="item.value"
                   :label="item.label" 
                   :value="item.value">
                 </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addUserBtn">立即提交</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- table -->
      <!-- table -->
        <el-table
          :data="tableData"
          style="width: 100%"
          border
          stripe>
          <el-table-column
            prop="id"
            label="ID"
            sortable
            align='center'
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="name"
            label="管理员名称"
            sortable
            align='center'
            min-width="200">
          </el-table-column>
          <el-table-column
            prop="level"
            label="用户角色"
            sortable
            align='center'
            min-width="100">
          </el-table-column>
          <el-table-column
            label="操作员"
            align='center'
            min-width="180">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" 
              @click="resetTokenBtn(scope.row.name)">重置口令</el-button>
              <el-button type="danger" size="mini" 
              v-if="scope.row.level !== 3" @click="deleteUserBtn(scope.row.name)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
import TopLine from 'components/content/TopLine'

import {getUsers,resetToken,deleteUser,addUser} from 'network/home'

export default {
  name: 'usermanage',
  components: {
    TopLine
  },
  data() {
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.userFormData.password !== '') {
            this.$refs.userForm_ref.validateField('checkPassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.userFormData.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      // 顶行 
      topdata: {
        left: '用户管理',
        center: '',
        right: {
          info: ['首页','管理工具','用户管理'],
          path: ['/homePage','/usermg']
        }
      },
      // form表单
      userFormData: {
        name: '',
        password: '',
        checkPassword: '',
        level: '2'
      },
      // form-item  select
      options: [{
          value: '1',
          label: '1'
        }, {
          value: '2',
          label: '2'
        }, {
          value: '3',
          label: '3'
        }, {
          value: '4',
          label: '4'
        }],
      // from表单的验证规则
      userForm_rules: {
        name: [
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        level: [
          { required: true, message: '请选择一个选项', trigger: 'blur' }
        ]
      },
      // 用户管理 table
        tableData: [],
    }
  },
  created() {
    this.getUsers1();

  },
  methods: {
    // 用户查询请求
    async getUsers1() {
      const res = await getUsers();
      console.log(res);
      if(!res || res.status !== 0) {
        return this.$message.error('请求失败')
      }
      this.tableData = res.data;
    },
    // 添加用户请求
    async addUser1(obj) {
      const res = await addUser(obj);
      console.log(res);
      if(!res || res.status !== 0) {
        return this.$message.error('添加用户失败')
      }
      this.$message.success('添加用户成功');
      // 重新请求用户信息
      this.getUsers1();
    },

    // 重置口令请求
    async resetToken1(name) {
      const res = await resetToken(name);
      console.log(res);
      if(!res || res.status !== 0) {
        return this.$message.error('重置失败')
      }
      this.$message.success('重置成功');
      // 重新请求用户信息
      this.getUsers1();
    },
    // 删除用户请求
    async deleteUser1(name) {
      const res =await deleteUser(name);
      console.log(res);
      if(!res || res.status !== 0) {
        return this.$message.error('删除用户失败')
      }
      this.$message.success('删除用户成功');
      // 重新请求用户信息
      this.getUsers1();
    },
    // 重置表单
    resetForm() {
      this.$refs.userForm_ref.resetFields();
    },
    // 点击重置口令按钮
    resetTokenBtn(name) {
      console.log(name);
      this.resetToken1(name)
    },
    // 点击删除按钮
    deleteUserBtn(name) {
      this.deleteUser1(name)
    },
    // 点击添加用户按钮
    addUserBtn() {
      this.$refs.userForm_ref.validate((valid) => {
        if(!valid) {
          return this.$message.error('验证不通过！')
        }
        // 对象深拷贝
        const obj = JSON.parse(JSON.stringify(this.userFormData));
        this.addUser1(obj);
        this.$refs.userForm_ref.resetFields();
      })
      
    }
  }
}

</script>
<style scoped>
  /* .main_header {
    margin: 20px 20px 0;
  } */
  .user_center {
    position: relative;
    height: 400px;
  }
  .user_center_form {
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translate(-50%);
  }
</style>