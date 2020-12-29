<template>
<div class="ArticleDetail">
  <div id="editor" style="text-align:left"></div>
  <el-button @click="getht">获取</el-button>
</div>
</template>

<script>
  
  import E from 'wangeditor'
  var editor;

  export default {
    
    methods:{
      getht(){
        let ht= this.editor.txt.html()
          console.log(ht);
      }

    },
    mounted:function(){
      
       this.editor = new E("#editor");
      this.editor.create();
    }
  }
</script>