<template>
  <div>
    <el-dialog
      :title="into.dp ? '添加' : '编辑'"
      @closed="changeIsshow"
      :visible.sync="into.isshow"
    >
      <el-form :model="user">
        <el-form-item label="规格名称" :label-width="formLabelWidth">
          <el-input v-model="user.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格属性" :label-width="formLabelWidth" v-for="(ie , index) in ipt" :key="index" >
          <el-input class="ipt" v-model="ipt[index]" autocomplete="off"></el-input>

          <div class="addlibox">
            <el-button type="primary" class="addli" @click="addli()"  v-if="index==0">新增规格属性</el-button>
            <el-button type="danger" class="det" @click="remli(index)" v-else >删除</el-button>
            </div>  
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
       
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqSpecsAdd, reqSpecseDit} from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert";
export default {
  // 拿到数据
  props: ["into"],

  data() {
    return {
      list: [],
     
      ipt:["",""],

      defaultProps: {
        children: "children",
        label: "title",
      },
    

      
      user: {
        specsname: "", //商品规格名称
        attrs: "[]", //商品属性值 
        status: 1, //状态
      },
      formLabelWidth: "120px",
    };
  },
  methods: {

    addli(){
     this.ipt.push("")
     console.log( this.ipt)
    },
    remli(index){
      console.log(index)
     this.ipt.splice(index,1)

    },
    changeIsshow() {
      if(!this.into.dp){     
       this.resetUser()
     this.into.dp = true;
      }     
      this.into.isshow = false;
    },

    add(user) {
      console.log(user, "添加之前的参数"); 
      user.attrs=JSON.stringify(this.ipt) 
      console.log(user)

      reqSpecsAdd(user).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.resetUser()
          this.changeIsshow();
          this.$emit("info");
          
        }
      });
    },
    

   
  //  编辑赋值参数

  edet(){
  let arr=JSON.parse(this.into.onelist[0].attrs)
  this.user=this.into.onelist[0]
  this.ipt=arr
  //  console.log(this.user,"pppppppp")
  },


    // 确认编辑修改
    resDit(user) {
       user.attrs=JSON.stringify(this.ipt)
      
      reqSpecseDit(user).then((res) => {
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
      this.ipt=["",""]
      this.user = {
        username: "", //角色名称
        roleid: 14, //角色编号
        password: "", //角色密码
        status: 1, //状态
      }
    },
  },
  mounted(){
     
    
  },
};
</script>
<style scoped>
.addlibox{
 float: left;
 width: 40%;
 /* text-align: none; */
  
}
.addli{
  width: 150px;
  margin: 0;
 
 
}
.ipt{
  width: 60%;
  float: left;
  
}
.det{
  margin: 0;
  /* width: 20%; */
}
.el-input__inner{

  width: 50%;
}
.el-dialog{
  width: 100%;
}
.tishi {
  margin-left: 120px;
  font: 14px/20px "微软雅黑";
  color: darkorange;
}
.el-dialog {
  width: 70%;
}
</style>