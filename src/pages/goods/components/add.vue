<template>
  <div>
    <el-dialog
      :title="into.dp ? '添加' : '编辑'"
      :visible.sync="into.isshow"
      @closed="changeIsshow"
    >
      <el-form :model="user">
        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select v-model="user.first_cateid" >
            <el-option label="----请选择----" :value="0" disabled></el-option>
            <el-option
              :label="itme1.catename"
              :value="itme1.id"
              v-for="(itme1, index ) in first_list"
              :key="itme1.id"
              @click.native="getCate(index)"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select v-model="user.second_cateid">
             <el-option label="----请选择----" :value="0" disabled></el-option>
            <el-option
              :label="itme2.catename"
              :value="itme2.id"
              v-for="itme2 in children? [] : first_list[n].children"
              :key="itme2.id"
            ></el-option>
          </el-select>
        </el-form-item>




        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="user.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" :label-width="formLabelWidth">
          <el-input v-model="user.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" :label-width="formLabelWidth">
          <el-input v-model="user.market_price"></el-input>
        </el-form-item>

        <el-form-item
          label="图片"
          :label-width="formLabelWidth"
         
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


       <el-form-item label="商品规格" :label-width="formLabelWidth">
          <el-select v-model="user.specsid" >
          <el-option label="----请选择----" :value="0" disabled></el-option>
            <el-option
              :label="itme3.specsname"
              :value="itme3.id"
              v-for="(itme3,index) in specsids"
              :key="itme3.id"
            @click.native="getCate2(index)"
            ></el-option>
          </el-select>
        </el-form-item>
  
         <el-form-item label="规格属性" :label-width="formLabelWidth"  v-if="cuu">
          <el-select v-model="user.specsattr" multiple>
            <el-option label="----请选择----" :value="0" disabled></el-option>
            <el-option
              :label="itme4"
              :value="itme4"
              v-for="itme4 in JSON.parse(specsids[n1].attrs) "
              :key="itme4"
            ></el-option>
          </el-select>
        </el-form-item>


 <el-form-item label="是否新品" :label-width="formLabelWidth">
      <el-radio v-model="user. isnew" :label="1">目录</el-radio>
          <el-radio v-model="user.isnew" :label="2" >菜单</el-radio>
    </el-form-item>
 <el-form-item label="是否热卖" :label-width="formLabelWidth">
      <el-radio v-model="user.ishot" :label="1">目录</el-radio>
          <el-radio v-model="user.ishot" :label="2" >菜单</el-radio>
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
        <el-form-item label="状态" :label-width="formLabelWidth">
        <v-text ref="text"></v-text>
        </el-form-item>
      </el-form>

 


      <div slot="footer" class="dialog-footer">
        <el-button @click="changeIsshow">取 消</el-button>
        <el-button type="primary" @click="add(user)" v-if="into.dp"
          >添加</el-button
        >
        <el-button type="primary" @click="resDit(user)" v-else>修改</el-button>
      </div>
      <el-button @click="getText">获取</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { reqGoodsAdd, reqGoodseDit, reqCatelist,reqSpecslist} from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert";
 import vText from "./eq"

export default {

  components:{
      vText
  },
  props: ["into", "list"],
  data() {
   
    return {
      cuu:false,
         n:0,
         n1:0,
       first_list:[],
       children:[],
       
       specsids:[],
      imageUrl: "", //初始值
      user: {
        first_cateid:"" , //     一级分类
        second_cateid: "", //二级分类
       goodsname: "", // 商品名称
       price: "", // 价格
      market_price: "", //市场 价格
       img: null, //图片
       description: "<p>这是一段商品描述</p>", //商品描述
       specsid:0,// 商品规格编号
      specsattr: "", //商品规格属性
       isnew: 1, //是否新品
       ishot: 1, //是否热卖
      status: 1, //状态


      },
      formLabelWidth: "120px",
    };
  },
  methods: {

    edet(id){
     console.log("编辑的数组------------")
   this.user=this.into.onelist   
   this.specsattr=JSON.parse(this.specsattr)


    },
    getText(){
      
 this.user.description= this.$refs.text.editor.txt.html()
     

console.log(this.user);

    },

// 分类获取索引值
getCate(index){
 this.n=index
},
getCate2(index){
 this.n1=index
},

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

    this.getText()
user.specsattr=JSON.stringify(user.specsattr)        
      reqGoodsAdd(user).then((res) => {
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
        (this. user={
        first_cateid:"" , //     一级分类
        second_cateid: "", //二级分类
       goodsname: "", // 商品名称
       price: "", // 价格
      market_price: "", //市场 价格
       img: null, //图片
       description: "<p>这是一段商品描述</p>", //商品描述
       specsid:0,// 商品规格编号
      specsattr: "", //商品规格属性
       isnew: 1, //是否新品
       ishot: 1, //是否热卖
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

      reqGoodseDit(user).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.Resetuer();
          this.$emit("info");
          this.changeIsshow();
        }
      });
    },
  }, 

  mounted(){
    
     reqCatelist().then(res=>{
     
  this.first_list= res.data.list
  this.children=""
    })

    reqSpecslist().then((res) => {
        this.specsids = res.data.list;
        
        console.log(this.specsids,"商品分类编号");
         this.cuu=true
      });
  
    
  }
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

