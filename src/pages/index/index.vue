<template>
  <div>
 
    <el-container class="index">
  <el-aside width="150px">

<el-menu :default-openeds="['1', '3']"

 class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router

>
       <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-s-tools"></i>系统设置</template>
        <el-menu-item-group>
          
          <el-menu-item index="/menu">菜单管理</el-menu-item>
          <el-menu-item index="/role">角色管理</el-menu-item>
          <el-menu-item index="/user">管理员管理</el-menu-item>
        </el-menu-item-group>
   
       
      </el-submenu>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-goods"></i>商品管理</template>
        <el-menu-item-group>
          
              <el-menu-item index="/cate">商品分类</el-menu-item>
              <el-menu-item index="/specs">商品规格</el-menu-item>
              <el-menu-item index="/goods">商品管理</el-menu-item>
              <el-menu-item index="/member">会员管理</el-menu-item>
              <el-menu-item index="/banner">轮播图管理</el-menu-item>
              <el-menu-item index="/seckill">秒杀活动</el-menu-item>
        </el-menu-item-group>
   
        
      </el-submenu>
 </el-menu>
  </el-aside>
  <el-container>
    <el-header>{{$route.name}}</el-header>
    <el-main class="con">
      <el-breadcrumb separator="/" v-if="$route.name">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
   <router-view>
    
   </router-view>

     </el-main>
    </el-container>
   </el-container>
 
  </div>
</template>

<script>
export default {

}
</script>

<style>
.con{
  font-size: 10px;
}
.el-header{
    background-color:#b3c0d1;
   
  }
  
  .el-aside {
    background-color:#20222a;
    
  }
  
  .el-main {
    background-color:#fff;
    
  }
  
 .index{
   height: 100vh;
 }
  
  
</style>