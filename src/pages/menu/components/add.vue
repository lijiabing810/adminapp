<template>
  <div>
   

<el-dialog :title="into.dp? '添加' :'编辑'" :visible.sync="into.isshow" 
@closed="changeIsshow" >
  <el-form :model="user">
    <el-form-item label="菜单名称" :label-width="formLabelWidth">
      <el-input v-model="user.title" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="上级菜单" :label-width="formLabelWidth">
      <el-select v-model="user.pid"   @change="changePid">
        <el-option label="顶级菜单" :value="0"></el-option>
        <el-option :label="itme1.title" :value="itme1.id" v-for="itme1 in list " :key="itme1.id"></el-option>
        
      </el-select>
    </el-form-item>
   <!-- <template slot-scope="scope">
         
        </template> -->
    
    <el-form-item label="菜单类型" :label-width="formLabelWidth">
      <el-radio v-model="user.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="user.type" :label="2" disabled>菜单</el-radio>
    </el-form-item>
    
     
    <el-form-item label="菜单图标" :label-width="formLabelWidth"   v-if="user.type==1">
      <el-select v-model="user.icon" placeholder="请选择菜单图标">
        <el-option :label="itme2" :value="itme2"  v-for="itme2 in icons" :key="itme2">
   <i :class="itme2"></i>

        </el-option>
      
      </el-select>
    </el-form-item>
     
    <el-form-item label="菜单地址" :label-width="formLabelWidth" v-else >
      <el-select v-model="user.url" placeholder="请选择单地址">
        <el-option :label="itme.path" :value="itme.path" v-for="itme in children" :key="itme.path">

            {{itme.path}}-----{{itme.name}}
        </el-option>
        
      </el-select>
    </el-form-item> 
    <el-form-item label="状态" :label-width="formLabelWidth">
       <el-switch
  v-model="user.status"
  active-color="#13ce66"
  inactive-color="#ff4949"
  :active-value="1" :inactive-value="2"
  >
</el-switch >
    </el-form-item> 
    

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="changeIsshow">取 消</el-button>
    <el-button type="primary"  @click="add(user)" v-if="into.dp">添加</el-button>
    <el-button type="primary"  @click="resDit(user)" v-else>修改</el-button>
  </div>
  
</el-dialog>

  </div>
</template>

<script>
import {childrens } from "../../../router/index"
import {reqMenuAdd,reqMenuDit} from "../../../utils/http"
import {successalert,erroralert} from "../../../utils/alert"
export default {
    props:["into","list"],
    data(){
return{

   children:childrens,
  icons:[    
  "el-icon-user-solid",
  "el-icon-camera" ,
  "el-icon-s-order",
  "el-icon-s-comment"
  ],

user: {
          pid: 0,  //     上级id
          title: '',//菜单名称
          icon: '',// 图标
          type: 1,  //单选框
          url: "",  // 菜单地址
         status: 1, //状态        
        },
        formLabelWidth: '120px'
      };
},
methods:{
  changeIsshow(){

    if(!this.into.dp){
  this.Resetuer() 
  this.into.dp=true  
    }  
      this.into.isshow=false
    },

    add(user){        
reqMenuAdd(user).then(res=>{   
    if(res.data.code==200){
  successalert(res.data.msg)
  this.Resetuer()
  this.changeIsshow()
  this.$emit("info")       
    }
})          
    },
    changeuser(id){
        console.log(id)
    this.user=this.into.onelist
    this.user.id=id
    },

    resDit(user){
console.log(user)
reqMenuDit(user).then(res=>{
  if(res.data.code==200){
successalert(res.data.msg)
  this.$emit("info")
  this.changeIsshow()
  }    
})
 },
  Resetuer(){
this.user={
          pid: 0,  //     上级id
          title: '',//菜单名称
          icon: 'el-icon-share',// 图标
          type: 1,  //单选框
          url: "",  // 菜单地址
         status: 1, //状态         
        }
  },

 changePid(){
      if(this.user.pid==0){
        this.user.type=1
      }else{
        this.user.type=2;
      }
    },
    
 
},

}
</script>
<style>
.el-dialog{
    width: 70%;
}
</style>