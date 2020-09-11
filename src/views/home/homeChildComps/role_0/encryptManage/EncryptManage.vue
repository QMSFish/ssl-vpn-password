<template>
  <div>
    <div class="main_header">
      <!-- 顶行 -->
      <top-line :topdata="topdata"></top-line>
      <!-- center -->
      <div class="encrypt_center">
        <!-- 基本信息 -->
        <div class="basic_info">
          <!-- 第一行 -->
          <div class="basic_info_first">
            <!-- left -->
            <div class="basic_info_first_left">
              <i class="el-icon-film"></i>
              <span>基本信息</span>
            </div>
            <!-- right -->
            <div class="basic_info_first_right">加密卡初始化</div>
          </div>
          <!-- form -->
          <div class="el_form">
            <el-form :model="encryptForm" :rules="encrypt_rules" ref="encrypt_ref" 
            label-width="110px">
             <el-form-item label="管理员类型" prop="type">
               <el-select v-model="encryptForm.type" placeholder="请选择">
                 <el-option
                   v-for="item in options1"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
                 </el-option>
               </el-select>
             </el-form-item>
             <el-form-item label="管理员序号" prop="number">
               <el-select v-model="encryptForm.number" placeholder="请选择">
                 <el-option
                   v-for="item in options2"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
                 </el-option>
               </el-select>
             </el-form-item>
             <el-form-item label="密码" prop="password">
               <el-input v-model="encryptForm.password"></el-input>
             </el-form-item>
           </el-form>
          </div>
        </div>
        <!-- 管理员列表 -->
        <div class="admin_list">
          <!-- top -->
          <div class="admin_list_top">
              <i class="el-icon-film"></i>
              <span>基本信息</span>
          </div>
          <!-- table -->
          <el-table
          :data="tableData"
          style="width: 100%"
          border
          stripe
          class="el_table">
          <el-table-column
            prop="id"
            label="ID"
            sortable
            min-width="200">
          </el-table-column>
          <el-table-column
            prop="project"
            label="项目"
            sortable
            min-width="200">
          </el-table-column>
          <el-table-column
            prop="value"
            label="值"
            sortable
            min-width="200">
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         :current-page="1"
         :page-sizes="[1, 3, 5, 10]"
         :page-size="100"
         layout="total, sizes, prev, pager, next, jumper"
         :total="10">
        </el-pagination>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import TopLine from 'components/content/TopLine'
export default {
  name: 'encrymanage',
  components: {
    TopLine
  },
  data() {
    return {
      topdata: {
        left: '加密卡管理',
        center: '',
        right: {
          info: ['首页','加密卡管理','加密卡管理'],
          path: ['/homePage','/encryptManage']
        }
      },
      // 基本信息 form
      encryptForm: {
        type: '1',
        number: '',
        password: ''
      },
      // 管理员类型 select
      options1: [{
          value: '1',
          label: '管理员'
        }, {
          value: '2',
          label: '安全操作员'
        }, {
          value: '3',
          label: '系统管理员1'
        }, {
          value: '4',
          label: '系统管理员2'
        }],
        //  管理员序号 select
        options2: [{
          value: '1',
          label: '1'
        }, {
          value: '2',
          label: '2'
        }, {
          value: '3',
          label: '3'
        }],
       // from表单的验证规则
       encrypt_rules: {
         type: [
           { required: true, message: '请选择一个选项', trigger: 'blur' }
         ],
         number: [
           { required: true, message: '请选择一个选项', trigger: 'blur' }
         ],
         password: [
           { required: true, message: '请输入密码', trigger: 'blur' }
         ],
       },
       // 管理员列表 table
        tableData: [{
          id: '1',
          project: '当前权限状态',
          value: '无权限',
        }, {
          id: '2',
          project: '管理员数目',
          value: '0',
        }]
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(val);
    },
    handleCurrentChange(val) {
      console.log(val);
    }
  }

}

</script>
<style scoped>
  /* .main_header {
    margin: 20px 20px 0;
  } */
  .encrypt_center {
    margin: 10px 5px 0;
  }
  .basic_info {
    position: relative;
    height: 310px;
    
  }
  .basic_info_first {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }
  .admin_list_top span,
  .basic_info_first_left span {
    margin-left: 5px;
    font-weight: 700;
  }
  .basic_info_first_right {
    padding: 5px;
    color: #fff;
    background-color: #0f5076;
  }
  .el_form {
    position: absolute;
    left: 100px;
    top: 68px;
    /* margin: 30px 0 0 100px; */
  }
  .admin_list {
    padding-top: 5px;
    border-top: 3px solid #0f5076;
  }
  .admin_list_top span {
    font-size: 14px;
  }
  .el_table {
    margin-bottom: 10px;
  }
</style>