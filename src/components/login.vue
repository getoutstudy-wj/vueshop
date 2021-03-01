<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登陆</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //登陆表单数据登陆对象
      loginForm: {
        username: "admin",
        password: "123456",
      },
      //预验证
      loginFormRules: {
        username: [
          { required: true, message: "请输入登陆名称", trigger: "blur" }, //必填项、提示信息、失去焦点触发
          { min: 3, max: 10, message: "长度为3-10为字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入登陆密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度为6-15为字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    resetLoginForm() {
      // console.log(this);
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        // console.log(valid);
        if (!valid) return;
        //axios返回对象为promise对象。同通过async、await处理异步操作，即可获得data数据
        const { data: res } = await this.$http.post("login", this.loginForm);
        // console.log(res);
        if (res.meta.status !== 200) return this.$message.error("登陆失败");
        this.$message.success("登陆成功");

        //将登陆成功后data中的token保存到sessionstorage中，
        //项目中想进入登陆界面以外的接口，必须登陆才能访问
        //token只因在网站打开期间生效，所以存在sessionstorage中
        window.sessionStorage.setItem("token", res.data.token);

        //通过编程式导航跳转到后台主页，路由地址是/home
        this.$router.push("/home");
      });
    },
  },
};
</script>

<style scoped lang="less">
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd; //添加阴影
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0; //接近底部
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box; //默认content
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>>
