<template>
  <div>
    <el-dialog
      :title="into.dp ? '添加' : '编辑'"
      @closed="changeIsshow"
      :visible.sync="into.isshow"
    >
      <el-form :model="user">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="user.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-tree
            :data="list"
            ref="tree"
            show-checkbox
            :check-strictly="true"
            node-key="id"
            :default-expanded-keys="[]"
            :default-checked-keys="JSON.parse(user.menus)"
            :props="defaultProps"
          >
          </el-tree>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="user.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="add(user)" v-if="into.dp"
          >添加</el-button
        >
        <el-button type="primary" @click="resDit(user)" v-else>修改</el-button>
        <el-button type="primary" @click="get">获取</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import {childrens } from "../../../router/index"
import { reqRoleAdd, reqRoleDit, reqMenulist } from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert";
export default {
  // 拿到数据
  props: ["into"],

  data() {
    return {
      list: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
      user: {
        rolename: "", //角色名称
        menus: "[]", //角色限权
        status: 1, //状态
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    changeIsshow() {
      if (!this.into.dp) {
        this.resetUser();
        this.$refs.tree.setCheckedKeys([], true);
        this.into.dp = true;
      }
      this.into.isshow = false;
    },
    add(user) {
      console.log(user, "添加之前的参数");
      let arr = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys());
      user.menus = JSON.stringify(arr);
      reqRoleAdd(user).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.changeIsshow();
          this.$emit("info");
          this.resetUser();
        }
      });
    },
    // 修改
    changeuser(id) {
      this.user = this.into.onelist;
      this.user.id = id;
    },

    // 确认编辑修改
    resDit(user) {
      user.menus = this.get();
      reqRoleDit(user).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);

          this.resetUser();
          this.$emit("info");
          this.changeIsshow();
          this.$refs.tree.setCheckedKeys([], true);
        }
      });
    },
    resetUser() {
      //初始值重置
      this.user = {
        rolename: "", //角色名称
        menus: "[]", //角色限权
        status: 1, //状态
      };
    },
    //h获取当前修改的menus
    get() {
      let arr = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys());
      console.log(arr);
      return JSON.stringify(arr);
    },
  },
  mounted() {
    reqMenulist().then((res) => {
      console.log(res.data.list, "设置初始值");
      this.list = res.data.list; //获取列表详情
      this.list.forEach((element) => {
        element.disabled = true;
        console.log(this.list);
      });
    });
  },
};
</script>
<style>
.el-dialog {
  width: 70%;
}
</style>