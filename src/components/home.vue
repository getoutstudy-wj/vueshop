<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <i class="el-icon-platform-eleme"></i>
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <i :class="iconsObj[item.order - 1]"></i>
              <span>{{ item.authName }}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体内容 -->
      <el-container>
        <el-main> 
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menulist: [],
      // iconsObj: {
      //   '125': '',
      //   '103': '',
      //   '101': '',
      //   '102': '',
      //   '145': '',
      // }
      iconsObj: [
        "el-icon-user-solid",
        "el-icon-s-tools",
        "el-icon-s-goods",
        "el-icon-s-claim",
        "el-icon-s-data",
      ],
      isCollapse: false,
    };
  },
  created() {
    this.getMenulist();
  },
  methods: {
    //清空token，退回login页面
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    async getMenulist() {
      const { data: res } = await this.$http.get("menus"); //解构data赋值res
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.menulist = res.data;
      console.log(res);
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

//组件名称就是类名class，所以用.选择器
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between; //左右居中对齐
  padding-left: 0; //header有左padding，设置为0则贴边
  align-items: center; //再align轴居中
  color: #fff; //字体颜色
  font-size: 20px; //字体大小
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
  .toggle-button {
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
}

.el-main {
  background-color: #eaedf1;
}
</style>