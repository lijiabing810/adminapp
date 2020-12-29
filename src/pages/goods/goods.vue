<template>
  <div>
    <el-button type="primary" @click="changeshow">添加</el-button>
    <v-list :list="list" @info="reqlist" @edit="reqInfo"></v-list>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="3"
      @next-click="changepage()"
      @prev-click="changepage()"
      @current-change="changepage()"
      :total="total"
      ref="pagination"
    >
    </el-pagination>
    <v-add :into="into" @info="reqlist" ref="add"></v-add>
     
  </div>
</template>

<script>
import vList from "./components/list";
import vAdd from "./components/add";

import { reqGoodslist, reqGoodsInfo, reqGoodsCount } from "../../utils/http";

export default {
  components: {
    vList,
    vAdd,
  
  },
  data() {
    return {
      pagNo: 1,
      total: 0,
      into: {
        isshow: false,
        onelist: {},
        dp: true,
      },
      list: [],
    };
  },
  methods: {
    //弹窗出现
    changeshow() {
      this.into.isshow = true;
    },
    //列表更新
    reqlist() {
     
 
       if(this.list.length==1){
          
        this.pagNo--
        reqGoodsCount(this.pagNo).then((res) => {
        this.total = res.data.list[0].total;
      });

      reqGoodslist(this.pagNo).then((res) => {
        this.list = res.data.list;
      });
      return
        }

      reqGoodsCount(this.pagNo).then((res) => {
        this.total = res.data.list[0].total;
      });

      reqGoodslist(this.pagNo).then((res) => {
        this.list = res.data.list;
        if( !this.list){
          this.list=[]

        }
      });
    },

    //页码变化刷新数据

    changepage() {
      // let num=this.$refs.pagination.internalCurrentPage
      this.pagNo = this.$refs.pagination.internalCurrentPage;
      console.log(this.pagNo);
      this.reqlist();
    },

    //编辑一条数据
    reqInfo(id) {
      this.changeshow();
      this.into.dp = false;

      reqGoodsInfo(id).then((res) => {
        if (res.data.code == 200) {
          this.into.onelist = res.data.list;

          this.$refs.add.edet(id);
        }
      });
    },
  },
  mounted() {
    this.reqlist();
  },
};
</script>

<style>
.el-button {
  margin: 10px 0;
}
</style>