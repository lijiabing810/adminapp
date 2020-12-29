<template>
  <div>
      <el-table
    :data="list"
    style="width: 100% ;font-size=10px"
    
    row-key="id"
    border
   
   >
    <el-table-column
      prop="id"
      label="商品编号"
      sortable width="180">
    </el-table-column>
    <el-table-column
      prop="goodsname"
      label="商品名称"
      sortable width="180">
    </el-table-column>
    <el-table-column
      prop="price"
      label="商品价格"
      sortable width="180">
    </el-table-column>
    <el-table-column
      prop="market_price"
      label="市场价格"
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
      label="是否热卖">
       <template slot-scope="scope">
           <el-button type="primary"  v-if="scope.row.status===1">是</el-button>
          <el-button type="info" v-else >否</el-button>
        </template>
      
    </el-table-column>
    <el-table-column
      prop="address"
      label="是否新品">
       <template slot-scope="scope">
           <el-button type="primary"  v-if="scope.row.status===1">是</el-button>
          <el-button type="info" v-else >否</el-button>
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
import {reqGoodsDel} from "../../../utils/http"
export default {
    props:["list"],
    

methods:{
     remlis(id){

this.$confirm('此操作将永久删除菜单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

        reqGoodsDel(id).then(res=>{
          
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