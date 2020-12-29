<template>
  <div>
    <el-dialog
      :title="into.dp ? '添加' : '编辑'"
      @closed="changeIsshow"
      :visible.sync="into.isshow"
    >
      <el-form :model="user">
        <el-form-item label="所属角色" :label-width="formLabelWidth">
          <el-select v-model="user.roleid" placeholder="请选择">
            <el-option
              :label="itme.rolename"
              v-for="itme in list"
              :key="itme.id"
              :value="itme.id"
            >
              {{ itme.rolename }}---{{ itme.id }}
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="user.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>
        <h2 v-if="!into.dp" class="tishi">留空则不修改</h2>

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
        <!-- <el-button type="primary"  @click="get" >获取</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import {childrens } from "../../../router/index"
import { reqUserAdd, reqUsereDit, reqRolelist } from "../../../utils/http";
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
        roleid: 14, //角色编号

        username: "", //角色名称

        password: "", //角色密码

        status: 1, //状态
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    changeIsshow() {
      if(!this.into.dp){     
       this.resetUser()
     this.into.dp = true;
      }     
      this.into.isshow = false;
    },

    add(user) {
      console.log(user, "添加之前的参数");

      reqUserAdd(user).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.resetUser()
          this.changeIsshow();
          this.$emit("info");
          
        }
      });
    },
    // 修改
    changeuser(uid) {
      this.user.roleid = this.into.onelist.roleid;
      this.user.username = this.into.onelist.username;
      this.user.status = this.into.onelist.status;
      this.user.password = "";
      this.user.uid = this.into.onelist.uid;
    },

    // 确认编辑修改
    resDit(user) {
      console.log(user, "000000");
      reqUsereDit(user).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.resetUser();
          this.$emit("info");
          this.changeIsshow();
          console.log("确认编辑修改");
        }
      });
    },
    resetUser() {
      //初始值重置
      this.user = {
        username: "", //角色名称
        roleid: 14, //角色编号
        password: "", //角色密码
        status: 1, //状态
      }
    },
  },
  mounted(){
    reqRolelist().then((res) => {
      this.list = res.data.list; //获取列表详情
    });
  },
};
</script>
<style>
.tishi {
  margin-left: 120px;
  font: 14px/20px "微软雅黑";
  color: darkorange;
}
.el-dialog {
  width: 70%;
}
</style>