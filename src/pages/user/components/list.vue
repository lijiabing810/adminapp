<template>
  <div>
    <el-table :data="list" border style="width: 80%">
      <el-table-column prop="id" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色" width="180">
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
          <el-button type="success" @click="edit(scope.row.uid)"
            >编辑</el-button
          >
          <el-button type="danger" @click="remlis(scope.row.uid)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reqUserDel } from "../../../utils/http";
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
          reqUserDel(uid).then((res) => {
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

    edit(uid) {
      console.log(uid);

      this.$emit("edit", uid);
    },
  },
};
</script>

<style>
.el-button {
  text-align: center;
  width: 80px;
}
.el-table {
  font-size: 8px;
}
</style>