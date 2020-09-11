<template>
  <div>
    <div class="main_header">
      <!-- 顶行 -->
      <top-line :topdata="topdata" class="top_line"></top-line>
      <!-- 设配详情行 -->
      <div class="homepage_device">
        <div class="first">
          <div class="first_inc">
            <span class="first_inc_device">设配型号</span>
            <span>VMware,Inc.</span>
          </div>
        </div>
        <div class="two">
          <div class="two_inc">
            <span class="two_inc_device">软件版本</span>
            <span>检测厂家1.0_ScctccSSLVPN检测工具V1.0.0.3_build20200807</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopLine from 'components/content/TopLine'

export default {
  name: 'homepage',
  components: {
    TopLine,
  },
  data() {
    return {
      topdata: {
        left: '系统信息',
        center: '',
      },
    }
  }
}

</script>
<style scoped>
  /* .main_header {
    margin: 20px 20px 0;
  } */
  .homepage_device {
    min-width: 1000px;
    margin: 18px 8px 0;
  }
  .two,
  .first {
    position: relative;
    height: 48px;
  }
  .first {
    background-color: #66a3d2;
  }
  .two_inc,
  .first_inc {
    display: flex;
    align-items: center;
    position: absolute;
    left: 510px;
    top: 0;
    height: 48px;
    font-size: 13px;  
  }
  .first_inc {
    color: #fff;
  }
  .two_inc_device,
  .first_inc_device {
    margin-right: 54px;
  }
</style>