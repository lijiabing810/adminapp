<template>
  <div>
    <el-table :data="list" border style="width: 80%">
      <el-table-column prop="id" label="规格编号" width="180">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="规格属性" width="180">
       <template slot-scope="scope">
          <span class="guige" v-for="(itme,index ) in JSON.parse(!scope.row.attrs? '[]': scope.row.attrs) " :key="index">{{itme}}</span>
          
        </template>
      </el-table-column>
      <el-table-column prop="address" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="success" @click="edit(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" @click="remlis(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reqSpecsDel } from "../../../utils/http";
export default {
  props: ["list"],
  data() {
    return {};
  },

  methods: {
    remlis(uid) {
      console.log(uid, "  ---------------删除的参数");

      this.$confirm("此操作将永久删除菜单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log("确定");
          reqSpecsDel(uid).then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              this.$emit("info");
              this.$message({
                type: "success",
                message: res.data.msg,
              });
            } else {
              this.$message({
                type: "errora",
                message: res.data.msg,
                
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    edit(id) {
      

      this.$emit("edit", id);
    },
  },
  mounted(){

    // this.list.
  }
};

</script>

<style>
.guige{
  display:inline-block;
  width: 50px;
  background-color:#CAFFFF;
  text-align: center;
  line-height: 20px;
  color:#0080FF;
  margin: 5px;
  border-radius: 10%;

}
.el-button {
  text-align: center;
  width: 80px;
}
.el-table {
  font-size: 8px;
}
</style>