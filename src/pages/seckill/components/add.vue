<template>
  <div>
   

<el-dialog :title="into.dp? '添加' :'编辑'" :visible.sync="into.isshow" 
@closed="changeIsshow" >
  <el-form :model="user">
    <el-form-item label="活动名称" :label-width="formLabelWidth">
      <el-input v-model="user.title" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="活动期限" :label-width="formLabelWidth">
  <!-- <div class="block">
    <span class="demonstration"></span>
    <el-date-picker
      v-model="value1"
      type="datetimerange"
      :start-placeholder="begintime"
      :end-placeholder="endtime"
      :default-time="['12:00:00']">
    </el-date-picker>
  </div> -->
    </el-form-item>
    <el-form-item label="一级分类" :label-width="formLabelWidth"  >
      <el-select v-model="user.first_cateid" placeholder="请选择" @change="setSecod(user.first_cateid)">
        <el-option :label="itme.catename" :value="itme.id"  v-for="itme in fristlist" :key="itme.catename">
        </el-option>
      
      </el-select>
    </el-form-item>
    <el-form-item label="二级分类" :label-width="formLabelWidth"  >
      <el-select v-model="user.second_cateid" placeholder="请选择菜单图标" @change=" setgoods(user.second_cateid)">
        <el-option :label="itme2.catename" :value="itme2.id"  v-for="itme2 in secondlist" :key="itme2.catename">
        </el-option>
      
      </el-select>
    </el-form-item>
    <el-form-item label="商品" :label-width="formLabelWidth">
      <el-select v-model="user.goodsid" placeholder="请选择菜单图标">
        <!-- <el-option :label="itme2" :value="itme2"  v-for="itme2 in icons" :key="itme2">
        </el-option>       -->
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
    
{{user}}
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
import {reqSeckaAdd,reqSeckaeDit,reqCatelist} from "../../../utils/http"
import {successalert,erroralert} from "../../../utils/alert"
export default {
    props:["into"],
    data(){
return{
fristlist:[],
secondlist:[],
 
user: {

          title: '',//活动名称
         begintime: 0,//开始时间
         endtime: 0,  //结束时间
        first_cateid: "",  // 一级分类
        second_cateid:"",
        goodsid:"",
         status: 1, //状态       
        },
        formLabelWidth: '120px'
      };
},
methods:{

  setSecod(id){
this.secondlist=this.fristlist.find(itme=> itme.id=id).children
   
console.log(this.secondlist,"111111111111111")
  },
  setgoods(id){
this.secondlist=this.fristlist.find(itme=> itme.id=id).children
   
console.log(this.secondlist,"111111111111111")
  },

  changeIsshow(){

    if(!this.into.dp){
  this.Resetuer() 
  this.into.dp=true  
    }  
      this.into.isshow=false
    },

    add(user){        
reqSeckaAdd(user).then(res=>{   
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
reqSeckaeDit(user).then(res=>{
  if(res.data.code==200){
successalert(res.data.msg)
  this.$emit("info")
  this.changeIsshow()
  }    
})
 },
  Resetuer(){
this.user={
     
          title: '',//活动名称
         begintime: 0,//开始时间
         endtime: 0,  //结束时间
        first_cateid: "",  // 一级分类
        second_cateid:"",
        goodsid:"",
         status: 1, //状态         
        }
  },

 
    
 
},
mounted(){

    reqCatelist().then(res=>{
       this.fristlist=res.data.list
  console.log(this.fristlist)

    })
  },

}
</script>
<style>
.el-dialog{
    width: 70%;
}
</style>