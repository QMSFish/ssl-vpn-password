<template>
  <div>
    <div class="main_header">
      <!-- 顶行 -->
      <top-line :topdata="topdata"></top-line>
      <div class="config_base">
        <!-- 基本信息 -->
        <el-form :model="configData" :rules="configData_rules" 
        ref="configData_ref" label-width="100px">
          <!-- top -->
          <div class="form_top">
            <!-- 基本信息 -->
            <div class="taskconfig_top1">
              <i class="el-icon-film"></i>
              <span>基本信息</span>
            </div>
            <!-- form-item -->
            <div class="form_item">
              <el-form-item label="任务号" prop="taskNum">
                <el-input v-model="configData.taskNum" placeholder="请输入任务号"></el-input>
              </el-form-item>
              <el-form-item label="厂商名称" prop="manCompany">
                <el-input v-model="configData.manCompany" placeholder="请输入任务号"></el-input>
              </el-form-item>
              <el-form-item label="CPU型号" prop="cpu">
                <el-input v-model="configData.cpu" placeholder="请输入任务号"></el-input>
              </el-form-item>
              <div class="task_introduction">
                <el-form-item label="任务简介" prop="brief">
                  <el-input type="textarea" v-model="configData.brief" 
                  placeholder="请输入内容"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <!-- bottom -->
          <div class="form_bottom">
            <!-- 测试用例关联 -->
            <div class="taskconfig_top2">
              <i class="el-icon-film"></i>
              <span>测试用例关联</span>
            </div>
            <!-- form-item -->
            <div class="form_item">
              <el-form-item label="用例库" prop="caseLib">
                <el-select v-model="configData.caseLib" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
        </el-form>
        <!-- 保存 -->
        <div class="save_form" @click="saveClick">保存</div>
      </div>
      <!-- 任务列表 -->
      <div class="task_list">
        <!-- top -->
        <div class="task_list_top">
          <i class="el-icon-film"></i>
          <span>任务列表</span>
        </div>
        <!-- center  div -->
        <div class="task_list_center">
          <ul>
            <el-tooltip content="查询任务" placement="top-end" :enterable='false'>
              <li @click="query_task_btn">
                <i class="el-icon-set-up"></i>
              </li>
            </el-tooltip>
            <el-tooltip content="修改任务" placement="top-end" :enterable='false'>
              <li @click="change_task_btn">
                <i class="el-icon-platform-eleme"></i>
              </li>
            </el-tooltip>
            <el-tooltip content="删除任务" placement="top-end" :enterable='false'>
              <li @click="delete_task_btn">
                <i class="el-icon-delete-solid"></i>
              </li>
            </el-tooltip>
            <el-tooltip content="启动任务" placement="top-end" :enterable='false'>
              <li @click="start_task_btn">
                <i class="el-icon-setting"></i>
              </li>
            </el-tooltip>
            <el-tooltip content="停止任务" placement="top-end" :enterable='false'>
              <li @click="stop_task_btn">
                <i class="el-icon-s-help"></i>
              </li>
            </el-tooltip>
            <el-tooltip content="重启任务" placement="top-end" :enterable='false'>
              <li @click="restart_task_btn">
                <i class="el-icon-upload"></i>
              </li>
            </el-tooltip>
            <el-tooltip content="清理数据" placement="top-end" :enterable='false'>
              <li @click="clean_data">
                <i class="el-icon-s-cooperation"></i>
              </li>
            </el-tooltip>
          </ul>
        </div>
        <!-- table -->
        <el-table
          :data="tableData"
          style="width: 100%"
          :height="250"
          border
          stripe>
          <el-table-column
          width="50">
            <template slot-scope="scope">
              <input type="radio" name="user" :value="scope.row.taskNumber" @change="radioChange">
            </template>
          </el-table-column>
          <el-table-column
            prop="taskNumber"
            label="任务号"
            sortable
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            sortable
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="lastChangeTime"
            label="最后修改时间"
            sortable
            min-width="150">
          </el-table-column>
          <el-table-column
            prop="lastDetectTime"
            label="最后一次检测完成时间"
            sortable
            min-width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="厂家名称"
            sortable
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="cpuModel"
            label="CPU型号"
            sortable
            min-width="120">
          </el-table-column>
        </el-table>
      </div>
      <!-- 查询单个任务对话框 -->
      <el-dialog
        title="任务详情"
        :visible.sync="queryTaskFlag"
        width="30%">
        <div v-for="(value,key,index) in taskData" :key="index" class="query_task_div">
          <span class="query_task_left">{{key}}:</span><span class="query_task_right">{{value}}</span>
        </div>
      </el-dialog>
      <!-- 修改任务对话框 -->
      <el-dialog
        title="修改任务"
        :visible.sync="modifyTaskFlag"
        width="50%"
        >
        <el-form :model="modifyTaskData" :rules="modifyTask_rules" ref="modifyTask_ref" 
        label-width="100px">
          <el-form-item label="任务编号" prop="taskNum">
            <el-input v-model="modifyTaskData.taskNum"></el-input>
          </el-form-item>
          <el-form-item label="cpu型号" prop="cpu">
            <el-input v-model="modifyTaskData.cpu"></el-input>
          </el-form-item>
          <el-form-item label="厂商信息" prop="manCompany">
            <el-input v-model="modifyTaskData.manCompany"></el-input>
          </el-form-item>
          <el-form-item label="任务简介" prop="brief">
            <el-input type="textarea" v-model="modifyTaskData.brief"></el-input>
          </el-form-item>
          <el-form-item label="用例库名称" prop="caseLib">
            <el-select v-model="modifyTaskData.caseLib" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="modifyTaskFlag = false">取 消</el-button>
          <el-button type="primary" @click="modifyTaskBtnClick">确 定</el-button>
        </span>
      </el-dialog>
    </div>
     
  </div>
</template>

<script>
import TopLine from 'components/content/TopLine'

import {query_task,query_case,add_task,query_singel_task,modify_task,delete_task,start_task,stop_task,restart_task,clean_data} from 'network/home'

export default {
  name: 'taskconfig',
  components: {
    TopLine
  },
  data() {
    return {
      topdata: {
        left: '任务配置',
        center: '',
        right: {
          info: ['首页','任务管理','任务配置'],
          path: ['/homePage','/basic']
        }
      },
      // 基本信息 from
      configData: {
        taskNum: '',
        manCompany: '',
        cpu: '',
        brief: '',
        caseLib: ''
      },
      // 用例库 select
      options: [],
      // from表单的验证规则
      configData_rules: {
        taskNum: [
          { required: true, message: '请输入任务号', trigger: 'blur' }
        ],
        manCompany: [
          { required: true, message: '请输入厂商名称', trigger: 'blur' }
        ],
        cpu: [
          { required: true, message: '请输入CPU型号', trigger: 'blur' }
        ],
        brief: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        caseLib: [
          { required: true, message: '请选择一个选项', trigger: 'blur' }
        ],
      },
      // 任务列表 table
      tableData: [],
      // 选中的任务号
      selectedTask: null,
      // 查询任务对话框的显示隐藏变量
      queryTaskFlag: false,
      // 查询任务的对象数据
      taskData: {},
      // 修改任务对话框的显示隐藏变量
      modifyTaskFlag: false,
      // 修改任务 from
      modifyTaskData: {
        taskNum: '',
        manCompany: '',
        cpu: '',
        brief: '',
        caseLib: ''
      },
     // 修改任务 表单的验证规则
      modifyTask_rules: {
        taskNum: [
          { required: true, message: '请输入任务号', trigger: 'blur' }
        ],
        manCompany: [
          { required: true, message: '请输入厂商名称', trigger: 'blur' }
        ],
        cpu: [
          { required: true, message: '请输入CPU型号', trigger: 'blur' }
        ],
        brief: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        caseLib: [
          { required: true, message: '请选择一个选项', trigger: 'blur' }
        ],
      },
    } 
  },
  created() {
    this.query_case1();
    this.query_task1();
  },
  methods: {
    // 查询用例请求
    async query_case1() {
      const res = await query_case();
      console.log('查询用例');
      console.log(res);
      if(!res || res.status !== 0) {
        return this.$message.error('查询用例失败')
      }
      this.options = [];
      res.data.forEach(item => {
        this.options.push({
          value: item.useCaseLibrary.caseName,
          label: item.useCaseLibrary.caseName,
        })
      })
    },
    // 任务查询请求
    async query_task1() {
      const res = await query_task();
      console.log(res);
      if(!res || res.status !== 0) {
        return this.$message.error('查询任务失败')
      }
      // 每次重新请求 清空tableData
      this.tableData = [];
      // const obj = res.data['演示任务']
      for(var key in res.data) {
        const val = {};
        const obj = res.data[key]
        val.taskNumber = obj.taskNum;
        val.status = obj.state;
        val.name = obj.manCompany;
        val.cpuModel = obj.cpu;
        val.lastChangeTime = obj.lastModifyDate;
        val.lastDetectTime = obj.lastDate;
        this.tableData.push(val);
      }
    },
    // 查询单个任务请求
    async query_singel_task1(num) {
      const res = await query_singel_task(num);
      console.log(res);
      this.taskData = res.data;
      console.log(this.taskData);
      return this.taskData
    },
    // 新增任务请求
    async add_task1(obj) {
      const res = await add_task(obj);
      console.log(res);
      if(!res || res.status !== 0) {
        return this.$message.error('新增任务失败')
      }
      this.$message.success('新增任务成功');
      // 重新请求任务列表
      this.query_task1();
    },
    // 修改任务请求
    async modify_task1(obj) {
      const res = await modify_task(obj);
      console.log(res);
      if(!res || res.status !== 0) {
        return this.$message.error('修改任务失败')
      }
      this.$message.success('任务已修改');
      // 重新请求任务列表
      this.query_task1();
    },
    // 删除任务请求
    async delete_task1(num) {
      const res = await delete_task(num);
      console.log(res);
      if(!res || res.status !== 0) {
        return this.$message.error('删除任务失败')
      }
      this.$message.success('任务已删除');
      // 重新请求任务列表
      this.query_task1();
    },
    // 启动任务请求
    async start_task1(num) {
      const res = await start_task(num);
      console.log(res);
      if(!res || res.status !== 0) {
        return this.$message.error('启动任务失败')
      }
      this.$message.success('任务已启动');
    },
    // 停止任务请求
    async stop_task1(num) {
      const res = await stop_task(num);
      console.log(res);
      if(!res || res.status !== 0) {
        return this.$message.error('停止任务失败')
      }
      this.$message.success('任务已停止');
    },
    // 重启任务请求
    async restart_task1(num) {
      const res = await restart_task(num);
      console.log(res);
      if(!res || res.status !== 0) {
        return this.$message.error('重新启动任务失败')
      }
      this.$message.success('任务已重启');
    },
    // 清理数据请求
    async clean_data1(num) {
      const res = await clean_data(num);
      console.log(res);
      if(!res || res.status !== 0) {
        return this.$message.error('清理数据失败')
      }
      this.$message.success('数据清理完成');
    },
    // 点击保存按钮
    saveClick() {
      this.$refs.configData_ref.validate((valid) => {
        if(!valid) {
          return this.$message.error('验证不通过！')
        };
        // 对象深拷贝
        const obj = JSON.parse(JSON.stringify(this.configData));
        this.add_task1(obj);
        // 把表单恢复到初始状态
        this.$refs.configData_ref.resetFields();
      })
    },
    radioChange(e) {
      console.log(e.target.defaultValue);
      this.selectedTask = e.target.defaultValue;
    },
    // 点击修改任务对话框里面的确认按钮
    modifyTaskBtnClick() {
      this.$refs.modifyTask_ref.validate((valid) => {
        if(!valid) {
          return this.$message.error('验证不通过！')
        };
        this.modify_task1(this.modifyTaskData);
        // 隐藏对话框
        this.modifyTaskFlag = false;
      })
    },
    // 点击查询任务信息按钮
    query_task_btn() {
      console.log('11');
      if(this.selectedTask) {
        this.query_singel_task1(this.selectedTask);
        this.queryTaskFlag = true;
      } else {
        this.$message.error('请选择一个任务！')
      }
    },
    // 点击修改任务按钮
    change_task_btn() {
      console.log(22);
      if(this.selectedTask) {
        this.query_singel_task1(this.selectedTask).then((res) => {
          const obj = this.modifyTaskData;
          obj.taskNum = res.taskNum;
          obj.cpu = res.cpu;
          obj.manCompany = res.manCompany;
          obj.brief = res.brief;
          obj.caseLib = res.caseLib
          // 显示对话框
          this.modifyTaskFlag = true;
        });
        // this.modify_task1(this.modifyTaskData);
      } else {
        this.$message.error('请选择一个任务！')
      }
    },
    // 点击删除任务按钮
    delete_task_btn() {
      console.log(33);
      if(this.selectedTask) {
        this.delete_task1(this.selectedTask);
      } else {
        this.$message.error('请选择一个任务！')
      }
    },
    // 点击开始任务按钮
    start_task_btn() {
      console.log(44);
      if(this.selectedTask) {
        this.start_task1(this.selectedTask);
      } else {
        this.$message.error('请选择一个任务！')
      }
    },
    // 点击停止任务按钮
    stop_task_btn() {
      console.log(55);
      if(this.selectedTask) {
        this.stop_task1(this.selectedTask);
      } else {
        this.$message.error('请选择一个任务！')
      }
    },
    // 点击重启任务按钮
    restart_task_btn() {
      console.log(66);
      if(this.selectedTask) {
        this.restart_task1(this.selectedTask);
      } else {
        this.$message.error('请选择一个任务！')
      }
    },
    // 点击清理数据按钮
    clean_data() {
      console.log(77);
      if(this.selectedTask) {
        this.clean_data1(this.selectedTask);
      } else {
        this.$message.error('请选择一个任务！')
      }
    }
  }
}

</script>
<style scoped>
  /* .main_header {
    margin: 20px 8px 0 20px;
  } */
  .config_base {
    position: relative;
    margin: 50px 5px;
  }
  .form_bottom,
  .form_top {
    position: relative;
    height: 300px;
    background-color: #f1f1f1;
    border-left: 5px solid #009688;
    padding: 20px;
  }
  .taskconfig_top2 span,
  .taskconfig_top1 span {
    margin-left: 5px;
    font-weight: 700;
  }
  .form_bottom {
    margin-top: 20px;
    height: 100px;
  }
  .form_item {
    position: absolute;
    top: 58px;
    left: 60px;
  }
  .save_form {
    position: absolute;
    right: 0;
    top: -40px;
    color: #f1f3f4;
    background-color: #4e89b9;
    padding: 5px;
    cursor: pointer;
  }
  .task_introduction {
    position: absolute;
    top: 0;
    left: 320px;
    width: 500px;
  }
  .task_list {
    margin: 0 5px;
    border-top: 3px solid #1472b8;
  }
  .task_list_top {
    margin: 7px 0;
  }
  .task_list_top span {
    font-size: 14px;
    font-weight: 700;
    margin-left: 5px;
  }
  .task_list_center {
    position: relative;
    height: 40px;
    background-color: #f2f2f2;
  }
  .task_list_center ul {
    display: flex;

    position: absolute;
    /* width: 100px; */
    right: 0;
    top: 10px;
  }
  .task_list_center ul li {
    margin-right: 14px;
    border: 1px solid #c0c4cc;
    padding: 1px 2px;
    cursor: pointer;
  }
  .query_task_div {
    margin-bottom: 20px;
  }
  .query_task_left {
    display: inline-block;
    width: 150px;
    text-align: right;
    font-weight: 700;
    font-size: 18px;
    margin-right: 15px;
  }
</style>