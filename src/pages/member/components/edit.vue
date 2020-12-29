<template>
  <div>
   

<el-dialog title="编辑" :visible.sync="into.isshow" 
@closed="changeIsshow" >
  <el-form :model="user">
    <el-form-item label="手机号" :label-width="formLabelWidth">
      <el-input v-model="user.phone" autocomplete="off"></el-input>
    </el-form-item>
    
    <el-form-item label="昵称" :label-width="formLabelWidth">
      <el-input v-model="user.nickname" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth">
      <el-input v-model="user.password" autocomplete="off"></el-input>
    </el-form-item>
    
   <!-- <template slot-scope="scope">
         
        </template> -->
    
     

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
    <el-button type="primary"  @click="resDit(user)">修改</el-button>
  </div>
  
</el-dialog>

  </div>
</template>

<script>
import {reqMembereDit} from "../../../utils/http"
import {successalert,erroralert} from "../../../utils/alert"
export default {
    props:["into"],
    data(){
return{

   

user: {
          uid: 0,  //     上级id
          nickname: '',//菜单名称
          phone: '',// 图标
          password: "",  //单选框
         
         status: 1, //状态        
        },
        formLabelWidth: '120px'
      };
},
methods:{
  changeIsshow(){
      this.into.isshow=false
    },

    edit(){
      this.into.onelist=this.user
    },

  
resDit(user){
reqMembereDit(user).then(res=>{
  if(res.data.code==200){
successalert(res.data.msg)
  this.$emit("info")
  this.changeIsshow()
  }    
})
 },

},

}
</script>
<style>
.el-dialog{
    width: 70%;
}
</style>