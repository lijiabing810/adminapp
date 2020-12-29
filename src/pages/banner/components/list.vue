<template>
  <div>
      <el-table
    :data="list"
    style="width: 100% ;font-size=10px"
    
    row-key="id"
    border
   
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column
      prop="id"
      label="编号"
      sortable width="180">
    </el-table-column>
    <el-table-column
      prop="title"
      label="轮播图标题"
      sortable width="180">
    </el-table-column>
    <el-table-column
      prop="icon"
      label="图片">
      <template slot-scope="scope">
          <img :src="$pre+scope.row.img" alt="">
        </template>
    </el-table-column>
    
    <el-table-column
      prop="address"
      label="状态">
       <template slot-scope="scope">
           <el-button type="primary"  v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else >禁用</el-button>
        </template>
      
    </el-table-column>
    <el-table-column
      prop="address"
      label="操作">
      <template slot-scope="scope">
          <el-button type="success" @click="edit(scope.row.id)" >编辑</el-button>
          <el-button type="danger" @click="remlis(scope.row.id)">删除</el-button>
        </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import {reqBannerDel} from "../../../utils/http"
export default {
    props:["list"],
     data() {
      return {
        
    }

},

methods:{
     remlis(id){

this.$confirm('此操作将永久删除菜单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

        reqBannerDel(id).then(res=>{
          
      if(res.data.code==200){

          this.$emit("info")
        this.$message({

              
            type: 'success',
            message: res.data.msg
          });
      } 
      else{
          this.$message({

              
            type: 'errora',
            message: res.data.msg
          });
      }

         })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });



    

     },


     edit(id){
         console.log(id,"444444444444");

          this.$emit("edit",id)



     }


}

}
</script>

<style>
.el-button{
    text-align: center;
    width: 80px;
}
.el-table{
    font-size: 8px;
}
img{
  width: 100px;
}
</style>