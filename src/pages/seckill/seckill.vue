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
import {reqSeckalist,reqSeckaInfo} from "../../utils/http"
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
    reqSeckalist().then(res=>{
       this.list=res.data.list
  console.log(res)

    })
  },
//编辑一条数据
  reqInfo(id){

    this. changeshow()
    this. into.dp=false
    reqSeckaInfo(id).then(res=>{
      if(res.data.code==200){
        console.log(res.data.list)
 this.into.onelist=res.data.list
//  console.log(this.$refs.add);
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