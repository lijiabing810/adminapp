<template>
  <div class="login">
      <div class="con">
        <h3 class="center">登录</h3>
        <div class="ipt">
          <el-input v-model="user.name" placeholder="请输入账号" clearable></el-input>
        </div>
        <div class="ipt">
          <el-input v-model="user.pass" placeholder="请输入密码" clearable show-password></el-input>
        </div>
        <div class="center">
          <el-button type="primary" @click="login">登录</el-button>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      user:{
        name:"",
        pass:""
      }
    }
  },
  methods:{
    //登录
    login(){
      this.$router.push("/")
    }
  }
}
</script>

<style scoped>
.login{
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right,#553544,#433A52,#303D60);
}
.con{
  width: 400px;
  background: #ffffff;
  padding: 20px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  border-radius: 20px;
}
.ipt{
  margin: 10px;
}
.center{
  text-align: center;
}
</style>