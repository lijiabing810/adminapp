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
      label="用户编号"
      sortable width="180">
    </el-table-column>
    <el-table-column
      prop="title"
      label="昵称"
      sortable width="180">
    </el-table-column>
    <el-table-column
      prop="icon"
      label="手机号">
      
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
          <el-button type="success" @click="edit(scope.row.uid)" >编辑</el-button>
         
        </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>

export default {
    props:["list"],
     data() {
      return {
        
    }

},

methods:{
 

    


     edit(uid){
         console.log(id);

          this.$emit("edit",uid)



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
</style>