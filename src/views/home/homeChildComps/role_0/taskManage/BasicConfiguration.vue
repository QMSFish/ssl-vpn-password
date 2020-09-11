<template>
  <div>
    <div class="main_header">
      <!-- 顶行 -->
      <top-line :topdata="topdata"></top-line>
      <!-- 中间展示行 -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" 
      label-width="100px">
      <!-- TOOL行 -->
        <div class="form_tool">
          TOOL
          <div class="form_tool_center">
            <el-form-item label="PORT1" prop="port">
              <el-input v-model="ruleForm.tcpPort"></el-input>
              <div class="input_back">待检设备为服务端时的数据转发端口(TCP)</div>
            </el-form-item>
            <el-form-item label="PORT2" prop="port">
              <el-input v-model="ruleForm.sslPort"></el-input>
              <div class="input_back">待检设备为服务端时的数据转发端口(SSL)</div>
            </el-form-item>
          </div>
          <div class="form_tool_right">
            <button class="btn">保存</button>
            <button>恢复默认配置</button>
          </div>
        </div>
        <!-- CS-SERVER行 -->
        <div class="form_cs_server">
          CS-SERVER
          <div class="form_tool_center">
            <el-form-item label="待测设备IP" prop="Ip">
              <el-input v-model="ruleForm.serverIp"></el-input>
              <div class="input_back">待检设备IP</div>
            </el-form-item>
            <el-form-item label="PORT1" prop="port">
              <el-input v-model="ruleForm.serverPort1"></el-input>
              <div class="input_back">待检设备端口(双向SSL)</div>
            </el-form-item>
            <el-form-item label="PORT2" prop="port">
              <el-input v-model="ruleForm.serverPort2"></el-input>
              <div class="input_back">待检设备端口(单向SSL)</div>
            </el-form-item>
            <el-form-item label="模式" prop="select">
              <el-select v-model="selectValue" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <div class="input_back">模式(0:同时支持单双向多实例；1:单向SSL；2:双向SSL)</div>
            </el-form-item>
          </div>
        </div>
        <!-- CS-CLIENT行 -->
        <div class="form_cs_client">
          CS-CLIENT
          <div class="form_tool_center">
            <el-form-item label="待测设备IP" prop="Ip">
              <el-input v-model="ruleForm.clientIp"></el-input>
              <div class="input_back">待检设备IP</div>
            </el-form-item>
            <el-form-item label="PORT1" prop="port">
              <el-input v-model="ruleForm.clientPort"></el-input>
              <div class="input_back">待检设备端口</div>
            </el-form-item>
          </div>
        </div>
        <!-- 套件行 -->
        <div class="form_suite">
          套件
          <div class="form_suite_center">
            套件列表
            <el-checkbox-group v-model="checkList" class="form_suite_group" text-color="#53bc78">
              <el-row>
                <el-checkbox label="ECC-SM4-SM3"></el-checkbox>
                <el-checkbox label="ECC-SM1-SM3"></el-checkbox>
              </el-row>
              <el-row>
                <el-checkbox label="ECDHE-SM4-SM3"></el-checkbox>
                <el-checkbox label="ECDHE-SM1-SM3"></el-checkbox>
              </el-row>
              <el-row>
                <el-checkbox label="RSA-SM4-SM3"></el-checkbox>
                <el-checkbox label="RSA-SM1-SHA1"></el-checkbox>
              </el-row>
              <el-row>
                <el-checkbox label="RSA-SM1-SM3"></el-checkbox>
                <el-checkbox label="RSA-SM4-SHA1"></el-checkbox>
              </el-row>
            </el-checkbox-group>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import TopLine from 'components/content/TopLine'
export default {
  name: 'basic',
  components: {
    TopLine
  },
  data() {
    return {
      topdata: {
        left: '基本配置',
        center: '',
        right: {
          info: ['首页','任务管理','基本配置'],
          path: ['/homePage','/basic']
        }
      },
      ruleForm: {
        tcpPort: 9001,
        sslPort: 9011,
        serverIp: '192.168.15.209',
        serverPort1: 10001,
        serverPort2: 10002,
        clientIp: '192.168.15.209',
        clientPort: 10003
      },
      // from表单的验证规则
      rules: {
        port: [
          { required: true, message: '请输入端口号', trigger: 'blur' }
        ],
        Ip: [
          { required: true, message: '请输入设备ip', trigger: 'blur' }
        ],
        select: [
          { required: true, message: '请选择一个选项', trigger: 'blur' }
        ]
      },
      options: [{
          value: '模式0',
          label: '0'
        }, {
          value: '模式1',
          label: '1'
        }, {
          value: '模式2',
          label: '2'
        }],
      selectValue: '模式0',
      // 套件行 中的checklist
      checkList: ['ECC-SM4-SM3'],
      
    }
  }
}

</script>
<style scoped>
  /* .main_header {
    min-width: 1000px;
    margin: 20px 20px 0;
  } */
  .form_tool {
    position: relative;
    height: 150px;
    padding: 10px 10px 0;
    border-bottom: 3px solid #f8f8f8;
  }
  .form_tool_center {
    position: absolute;
    left: 30%;
    bottom: 0;
  }
  .input_back {
    position: absolute;
    left: 210px;
    top: 0;
    width: 400px;
    color: #d9d9d9;
  }
  .form_tool_right {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .form_tool_right .btn {
    margin-right: 10px;
  }
  .form_tool_right button {
    color: #fff;
    background-color: #247095;
  }
  .form_cs_server {
    position: relative;
    height: 250px;
    padding: 10px 10px 0;
    border-bottom: 3px solid #f8f8f8;
  }
  .form_cs_client {
    position: relative;
    height: 130px;
    padding: 10px 10px 0;
    border-bottom: 3px solid #f8f8f8;
  }
  .form_suite {
    position: relative;
    height: 216px;
    padding: 10px 10px 0;
    
    /* border-bottom: 3px solid #f8f8f8; */
  }
  .form_suite_center {
    position: absolute;
    left: 30%;
    top: 40px;
  }
  .form_suite_group {
    margin-left: 70px;
    margin-top: 20px;
  }
  
</style>