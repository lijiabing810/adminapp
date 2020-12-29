<template>
  <div>
    <el-dialog
      :title="into.dp ? '添加' : '编辑'"
      :visible.sync="into.isshow"
      @closed="changeIsshow"
    >
      <el-form :model="user">
        <el-form-item label="上级菜单" :label-width="formLabelWidth">
          <el-select v-model="user.pid">
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              :label="itme1.catename"
              :value="itme1.id"
              v-for="itme1 in list"
              :key="itme1.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="user.catename"></el-input>
        </el-form-item>

        <el-form-item
          label="图片"
          :label-width="formLabelWidth"
          v-if="!user.pid == 0"
        >
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
        <el-button @click="changeIsshow">取 消</el-button>
        <el-button type="primary" @click="add(user)" v-if="into.dp"
          >添加</el-button
        >
        <el-button type="primary" @click="resDit(user)" v-else>修改</el-button>
      </div>
    
    </el-dialog>
  </div>
</template>

<script>
import { reqCateAdd, reqCateDit } from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert";
export default {
  props: ["into", "list"],
  data() {
    return {
      imageUrl: "", //初始值
      user: {
        pid: 0, //     上级id
        catename: "", //菜单名称
        img: "", // 图标
        status: 1, //状态
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    //获取img参数并赋值
    changeImg(e) {
      console.log(e);
      this.user.img = e.raw;
      this.imageUrl = URL.createObjectURL(e.raw);
    },

    changeIsshow() {
      if( !this.into.dp){
        this.Resetuer()

        this.into.dp = true;
      }
      
      this.into.isshow = false;
    },

    add(user) {
      reqCateAdd(user).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.Resetuer();
          this.changeIsshow();
          this.$emit("info");
        }
      });
    },
    Resetuer() {
      (this.imageUrl = ""), //初始值
        (this.user = {
          pid: 0, //     上级id
          catename: "", //菜单名称
          img: "", // 图标
          status: 1, //状态
        });
    },

    changeuser(id) {
      this.user = this.into.onelist;
      this.imageUrl = this.$pre + this.into.onelist.img;
      //补了一个id
      this.user.id = id;
    },

    resDit(user) {
      console.log(user);

      reqCateDit(user).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.Resetuer();
          this.$emit("info");
          this.changeIsshow();
        }
      });
    },
  }, 
};
</script>
<style>
.el-dialog {
  width: 70%;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

</style>