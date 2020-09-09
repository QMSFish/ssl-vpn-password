<template>
  <div>
    <div class="main_header">
      <!-- 顶行 -->
      <top-line :topdata="topdata"></top-line>
      <!-- 用例库配置 -->
      <div class="use_case">
        <!-- top -->
        <div class="use_case_top">
          <i class="el-icon-film"></i>
          <span>用例库配置</span>
        </div>
        <!-- form -->
        <div class="use_case_form">
          <el-form :model="useCaseForm" :rules="useCaseForm_rules" ref="useCaseForm_ref" 
           label-width="110px">
           <!-- 用例库名称 -->
            <el-form-item label="用例库名称" prop="caseName">
              <el-input v-model="useCaseForm.caseName" placeholder="请输入用例库名称"></el-input>
            </el-form-item>
            <!-- 待测设配类型 -->
            <el-form-item label="待测设配类型" prop="deviceType">
              <el-select v-model="useCaseForm.deviceType" placeholder="请选择">
                <el-option
                  v-for="item in deviceOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 模式 -->
            <el-form-item label="模式" prop="mode">
              <el-select v-model="useCaseForm.mode" placeholder="请选择">
                <el-option
                  v-for="item in modeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 用例选择 -->
            <div class="use_case_select">
              用例选择
              <!-- <div class="select_father">
                table right
                <table class="select_child_left">
                  <tr><td><el-checkbox label="未选择"></el-checkbox></td></tr>
                  <tr><td>
                    <el-input
                     placeholder="关键词搜索"
                     prefix-icon="el-icon-search">
                    </el-input>
                  </td></tr>
                  <tr><td>
                    <div class="td_div_1">
                      <el-checkbox-group v-model="checkList_1" class="checkbox_group_1">
                      <el-row>
                        <el-checkbox label="协商通信检测"></el-checkbox>
                      </el-row>
                      <el-row class="row">
                        <el-checkbox label="密钥交换检测"></el-checkbox>
                      </el-row>
                      <el-row class="row">
                        <el-checkbox label="安全报文传输检测"></el-checkbox>
                      </el-row>
                      <el-row class="row">
                        <el-checkbox label="身份鉴别检测"></el-checkbox>
                      </el-row>
                      <el-row class="row">
                        <el-checkbox label="工作密钥更新检测"></el-checkbox>
                      </el-row>
                      <el-row class="row">
                        <el-checkbox label="随机数采集"></el-checkbox>
                      </el-row>
                    </el-checkbox-group>
                    </div>
                  </td></tr>
                </table>
                table left
                <table class="select_child_right">
                  <tr><td><el-checkbox label="已选择"></el-checkbox></td></tr>
                  <tr><td>
                    <el-input
                     placeholder="关键词搜索"
                     prefix-icon="el-icon-search">
                    </el-input>
                  </td></tr>
                  <tr><td>
                    <div class="td_div_2">
                      <div class="no_data">无数据</div>
                    </div>
                  </td></tr>
                </table>
                center
                <div class="select_child_center">
                  <div class="right_arrow">&gt;&gt;</div>
                  <div class="left_arrow">&lt;&lt;</div>
                </div>
              </div>-->
              <!-- 上面和下面这个功能一样 -->
              <el-transfer
              filterable
              filter-placeholder="关键词搜索"
              v-model="caseValue"
              :data="caseSelectData"
              :titles="['未选择', '已选择']"
              class="el_transfer">
              </el-transfer>
            </div>
            <!-- 保存 -->
            <div class="save_form" @click="addCaseBtn">保存</div>
          </el-form>
        </div>
      </div>
      <!-- 用例库表 -->
      <div class="use_case_list">
        <!-- top -->
        <div class="use_case_top1">
          <i class="el-icon-film"></i>
          <span>用例库表</span>
        </div>
        <!-- table -->
        <el-table
          :data="tableData"
          style="width: 100%"
          border
          stripe>
          <el-table-column
            type="index">
          </el-table-column>
          <el-table-column
            prop="name"
            label="用例库表名称"
            sortable
            min-width="200">
          </el-table-column>
          <el-table-column
            prop="time"
            label="创建时间"
            sortable
            min-width="160">
          </el-table-column>
          <el-table-column
            prop="type"
            label="待检设备类型"
            sortable
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="mode"
            label="模式"
            sortable
            min-width="100">
          </el-table-column>
          <el-table-column
            label="操作"
            min-width="180">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" 
              @click="showModifyDialog(scope.row)">修改</el-button>
              <el-button type="danger" size="mini"
              @click="deleteCaseBtn(scope.row.name)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 修改用例对话框 -->
      <el-dialog
        title="修改用例"
        :visible.sync="modifyCaseFlag"
        width="50%"
        @close="modifyCaseClosed">
        <el-form :model="useCaseLibrary" :rules="useCaseLibrary_rules" ref="useCaseLibrary_ref" 
        label-width="110px">
          <el-form-item label="用例库表名称" prop="caseName">
            <el-input v-model="useCaseLibrary.caseName"></el-input>
          </el-form-item>
          <el-form-item label="待检设备类型" prop="deviceType">
            <el-select v-model="useCaseLibrary.deviceType" placeholder="请选择">
              <el-option
                v-for="item in deviceOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="模式" prop="mode">
            <el-select v-model="useCaseLibrary.mode" placeholder="请选择">
              <el-option
                v-for="item in modeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用例选择" prop="caseName">
            <el-select v-model="useCaseLibrary.case[0].caseName" placeholder="请选择">
              <el-option
                v-for="item in caseOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="modifyCaseFlag = false">取 消</el-button>
          <el-button type="primary" @click="btnClicked">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import TopLine from 'components/content/TopLine'

import {query_case,modify_case,delete_case,add_case} from 'network/home'

export default {
  name: 'usecase',
  components: {
    TopLine
  },
  data() {
    const generateData = () => {
        const data1 = [];
        const cases = ['身份鉴别检测', '密钥交换检测', '工作密钥更新检测', '随机数采集', '协商通信检测', '安全报文传输检测'];
        const englishName = ['Identity_Authentication', 'Key_Exchange', 'Key_Update', 'Random_Data_Acquisition', 'Negotiation_Communication', 'Security_Message'];
        cases.forEach((item, index) => {
          data1.push({
            label: item,
            key: englishName[index],
          });
        });
        // console.log(data1);
        return data1;
      };
    return {
      // 添加用例中 用例选择穿梭框模块的数据
      caseSelectData: generateData(),
      // 添加用例中 由选中的key组成的数组
      caseValue: [],
      topdata: {
        left: '用例管理',
        center: '',
        right: {
          info: ['首页','任务管理','用例管理'],
          path: ['/homePage','/basic']
        }
      },
      useCaseForm: {
        caseName:'',
        deviceType: '',
        mode: '',
        case: []
      },
      // from表单的验证规则
      useCaseForm_rules: {
        caseName: [
          { required: true, message: '请输入用例库名称', trigger: 'blur' }
        ],
        deviceType: [
          { required: true, message: '请选择设备类型', trigger: 'blur' }
        ],
        mode: [
          { required: true, message: '请选择模式', trigger: 'blur' }
        ],
        caseName: [
          { required: true, message: '请选择用例', trigger: 'blur' }
        ],
      },
      // 用例选择
      checkList_1: [],
      checkList_2: [],
      // 请求过来的用例数据
      caseData: [],
      // 用例库表 table
      tableData: [],
      // 用例对话框显示隐藏变量
      modifyCaseFlag: false,
      // 修改用例请求参数对象
      useCaseLibrary: {
        caseName:'',
        deviceType: '',
        mode: '',
        case: [{
          caseName: ''
          }]
      },
      // 待检设备类型 select数据
      deviceOptions: [{
        value: 'user',
        label: '客户端'
      }, {
        value: 'server',
        label: '服务端'
      }],
      // 模式 select数据
      modeOptions: [{
        value: 'CSMODE',
        label: '客户端-服务端模式'
      }, {
        value: 'SMODE',
        label: '服务端模式'
      }],
      // 用例选择  select数据
      caseOptions: [{
        value: 'Identity_Authentication',
        label: '身份鉴别检测'
      }, {
        value: 'Key_Exchange',
        label: '密钥交换检测'
      },{
        value: 'Key_Update',
        label: '工作密钥更新检测'
      },{
        value: 'Random_Data_Acquisition',
        label: '随机数采集'
      },{
        value: 'Negotiation_Communication',
        label: '协商通信检测'
      },{
        value: 'Security_Message',
        label: '安全报文传输检测'
      }],
      // 修改用例对话框 from表单的验证规则
      useCaseLibrary_rules: {
        caseName: [
          { required: true, message: '请输入用例库名称', trigger: 'blur' }
        ],
        deviceType: [
          { required: true, message: '请选择设备类型', trigger: 'blur' }
        ],
        mode: [
          { required: true, message: '请选择模式', trigger: 'blur' }
        ],
        caseName: [
          { required: true, message: '请选择用例', trigger: 'blur' }
        ],
      },
    }
  },
  created() {
    this.query_case1()
  },
  methods: {
    // 查询用例请求
    async query_case1() {
      const res = await query_case();
      console.log(res);
      if(!res || res.status !== 0) {
        return this.$message.error('查询用例失败')
      }
      res.data.forEach(item => {
        const table = {};
        table.name = item.useCaseLibrary.caseName;
        table.time = item.useCaseLibrary.time;
        table.type = item.useCaseLibrary.deviceType;
        table.mode = item.useCaseLibrary.mode;
        table.casesName = item.useCaseLibrary.casesName[0];
        this.tableData.push(table)
      })
    },
    // 修改用例请求
    async modify_case1(obj) {
      const res = await modify_case(obj);
      console.log(res);
      if(!res || res.status !== 0) {
        return this.$message.error('修改用例失败')
      }
      // 重新查询用例信息
      this.query_case1()
    },
    //  删除用例请求
    async delete_case1(name) {
      const res = await delete_case(name);
      console.log(res);
      if(!res || res.status !== 0) {
        return this.$message.error('删除用例失败')
      }
      // 重新查询用例信息
      this.query_case1()
    },
    //新增用例请求
    async add_case1(obj) {
      const res = await add_case();
      console.log(res);
      if(!res || res.status !== 0) {
        return this.$message.error('添加用例失败')
      }
      // 重新查询用例信息
      this.query_case1()
    },
    //点击修改按钮
    showModifyDialog(row) {
      console.log(row);
      this.useCaseLibrary.caseName = row.name;
      this.useCaseLibrary.deviceType = row.type;
      this.useCaseLibrary.mode = row.mode;
      this.useCaseLibrary.case[0].caseName = row.casesName;
      this.modifyCaseFlag = true
    },
    // 修改用例对话框关闭,重置表单到初始状态
    modifyCaseClosed() {
      this.$refs.useCaseLibrary_ref.resetFields()
    },
    // 点击修改用例对话框的确定按钮，进行提交修改
    btnClicked() {
      this.$refs.useCaseLibrary_ref.validate((valid) => {
        if(!valid) {
          return this.message.error('验证不通过！')
        };
        // 对象深拷贝
        const obj = JSON.parse(JSON.stringify(this.useCaseLibrary));
        this.modify_case1(obj);
        this.modifyCaseFlag = false;
      })
    },
    // 点击修改用例对话框的删除按钮.进行用例删除
    deleteCaseBtn(name) {
      this.delete_case1(name)
    },
    // 点击保存按钮 添加用例
    addCaseBtn() {
      this.$refs.useCaseForm_ref.validate((valid) => {
        if(!valid) {
          return this.$message.error('验证不通过！')
        };
        if(this.caseValue.length == 0) {
          return this.$message.error('至少选择一个用例')
        }
        this.caseValue.forEach(item => {
          this.useCaseForm.case.push({
            caseName: items
          })
        });
        const obj = JSON.parse(JSON.stringify(this.useCaseForm))
        this.add_case1(obj);
        // 把表单恢复到初始状态
        this.$refs.useCaseForm_ref.resetFields();
        this.caseValue = [];
      })
    }
  }

}

</script>
<style scoped>
  .main_header {
    margin: 20px 20px 0;
  }
  .use_case {
    position: relative;
    height: 650px;
    margin: 10px 0 0 5px;
  }
  .use_case_top1 span,
  .use_case_top span {
    margin-left: 5px;
    font-weight: 700;
  }
  .use_case_form {
    position: absolute;
    left: 85px;
    top: 26px;
  }
  .use_case_select {
    color: #606266;
    margin: 20px 0 0 35px;
  }
  .el_transfer {
    margin-top: 10px;
  }
  /* .select_father {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 580px;
    height: 300px;
    padding: 5px 0 0 2px;
  }
  .select_child_right,
  .select_child_left {
    border-collapse: collapse;

  }
  .select_child_right td,
  .select_child_left td {
    padding: 10px;
    border: 1px solid #c0c4cc;
  }
  .td_div_1 {
    height: 187px;
  }
  .select_child_left .checkbox_group_1 {
    height: 100%;
    overflow: auto;

  }
  .checkbox_group_1 .row {
    margin-top: 5px;
  }
  .td_div_2 {
    height: 187px;
  }
  .no_data {
    padding-top: 20px;
    color: #c0c4cc;
    text-align: center;
  }
  .select_child_center {
    position: absolute;
    left: 265px;
    top: 130px;
  }
  .left_arrow,
  .right_arrow {
    padding: 4px 15px;
    border: 1px solid #c0c4cc;
    background-color: #f1f3f4;
  }
  .right_arrow {
    margin-bottom: 10px;
  } */
  .save_form {
    position: absolute;
    left: 50px;
    bottom: -75px;
    color: #f1f3f4;
    background-color: #4e89b9;
    padding: 5px;
    cursor: pointer;
  }
  .use_case_list {
    padding-top: 10px;
    border-top: 3px solid #4e89b9;
  }
  .use_case_top1 {
    margin-bottom: 10px;
  }
</style>