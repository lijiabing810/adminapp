<template>
  <div>
     <el-button type="primary" @click="changeshow">添加</el-button>
      <v-list :list="list"   @info="reqlist" @edit="reqInfo" ></v-list>
      <v-add :into="into" :list="list" @info="reqlist" ref="add"></v-add>
  </div>
</template>

<script>
import vList from "./components/list"
import vAdd from "./components/add"
import {reqBannerlist,reqBannerInfo} from "../../utils/http"
export default {
  components:{
 vList,
 vAdd
  
  },
  data(){
   return {
     into:{
       isshow:false,
       onelist:{},
       dp:true
     },
     list:[]
     
   }

  },
  methods:{
    //弹窗出现
  changeshow(){
    this.into.isshow=true
  },
  //列表更新
  reqlist(){
    reqBannerlist().then(res=>{
       this.list=res.data.list
 
      if(!this.list){
        this.list=[]
      }
    })
  },
//编辑一条数据
  reqInfo(id){
     
    this. changeshow()
    this. into.dp=false
    reqBannerInfo(id).then(res=>{
      if(res.data.code==200){  
 this.into.onelist=res.data.list
 this.$refs.add.changeuser( id)

      }
      


    })
  }

  },
  mounted(){
    this.reqlist()

  }

}
</script>

<style>
.el-button{
  margin: 10px 0;
}
</style>