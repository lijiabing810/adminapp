<template>
  <div>
    
      <v-list :list="list"  @edit="reqInfo" ></v-list>
      <v-edit :into="into"  @info="reqlist" ref="edit"></v-edit>
  </div>
</template>

<script>
import vList from "./components/list"
import vEdit from "./components/edit"
import {reqMemberlist,reqMemberInfo} from "../../utils/http"
export default {
  components:{
 vList,
 vEdit
  
  },
  data(){
   return {
     into:{
       isshow:false,
       onelist:{},

     },
     list:[]
     
   }

  },
  methods:{
  changeshow(){
    this.onto.isshow=true
  },
  
  //列表更新
  reqlist(){
    reqMemberlist().then(res=>{
       this.list=res.data.list
       if(!this.list){
         this.list=[]
       }
  console.log(res)

    })
  },
//编辑一条数据
  reqInfo(id){

    this. changeshow()
    reqMemberInfo(id).then(res=>{
      if(res.data.code==200){
        console.log(res.data.list)
 this.into.onelist=res.data.list

 this.$refs.eidt.changeuser( id)

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