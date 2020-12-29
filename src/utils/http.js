import axios from "axios"
import qs from "qs"
import Vue from "vue"
import {erroralert} from "./alert"
//开发环境使用 8080
let baseUrl="/api"
Vue.prototype.$pre="http://localhost:3000"

//生产环境使用 打包
// let baseUrl=""
// Vue.prototype.$pre=""
function dataToFORMDATE(user){
 let data=new FormData()
 for (let i  in user) {
    data.append(i,user[i])
    
    
    
 }
 return data

}

//响应拦截
axios.interceptors.response.use(res=>{
    console.group("本次请求地址是："+res.config.url)
    console.log(res);
    console.groupEnd()
    if(!res.data.code==200){
        erroralert(res.data.msg)

    }
    return res
})
// ————————————————————菜单管理————————————————————————————————
//获取菜单
export let reqMenulist=()=>{
    return axios({
        url:baseUrl+"/api/menulist",
        params:{
            istree:true
        }
    })
}

//添加菜单
export let reqMenuAdd=(user)=>{
    return axios({
        url:baseUrl+"/api/menuadd",
        method:"post",
        data:qs.stringify(user)
    })
}
//删除一条
export let reqMenuDel=(id)=>{
    return axios({
        url:baseUrl+"/api/menudelete",
        method:"post",
        data:{
            id:id
        }
    })
}
//请求一条
export let reqMenuInfo=(id)=>{
    console.log(id)
    return axios({
        url:baseUrl+"/api/menuinfo",
        method:"get",
        params:{
            id:id
        }
    })
}
//修改一条
export let reqMenuDit=(user)=>{
    console.log(user)
    return axios({
        url:baseUrl+"/api/menuedit",
        method:"post",
        data:qs.stringify(user)
    })
}

// ----------------------------- 角色管理----------------------
//获取会员
export let reqRolelist=()=>{
    return axios({
        url:baseUrl+"/api/rolelist",
        
    })
}

//请求一条角色
export let reqRoleuInfo=(id)=>{
    console.log(id)
    return axios({
        url:baseUrl+"/api/roleinfo",
        method:"get",
        params:{
            id:id
        }
    })
}
//添加-条角色
export let reqRoleAdd=(user)=>{
    return axios({
        url:baseUrl+"/api/roleadd",
        method:"post",
        data:qs.stringify(user)
    })
}

//删除一条角色
export let reqRoleDel=(id)=>{
    return axios({
        url:baseUrl+"/api/roledelete",
        method:"post",
        data:{
            id:id
        }
    })
}
//修改一条角色
export let reqRoleDit=(user)=>{
    console.log(user)
    return axios({
        url:baseUrl+"/api/roleedit",
        method:"post",
        data:qs.stringify(user)
    })
}
// ----------------------------- 管理员管理----------------------
//获取会员
export let reqUserlist=(num)=>{
    return axios({
        url:baseUrl+"/api/userlist",
        method:"get",
        params:{
            size:3,//条数
            page:num // 页码

        }
        
    })
}

//请求一条角色
export let reqUserInfo=(uid)=>{
    console.log(uid)
    return axios({
        url:baseUrl+"/api/userinfo",
        method:"get",
        params:{
            uid:uid
        }
    })
}
//添加-条角色
export let reqUserAdd=(user)=>{
    return axios({
        url:baseUrl+"/api/useradd",
        method:"post",
        data:qs.stringify(user)
    })
}

//删除一条角色
export let reqUserDel=(uid)=>{
    console.log("1111")
    return axios({
        url:baseUrl+"/api/userdelete",
        method:"post",
        data:{
            uid:uid
        }
    })
}
//修改一条角色
export let reqUsereDit=(user)=>{
    console.log(user)
    return axios({
        url:baseUrl+"/api/useredit",
        method:"post",
        data:qs.stringify(user)
    })
}
//分页总数
export let reqUserCount=()=>{
   
    return axios({
        url:baseUrl+"/api/usercount",
        method:"get"
      
    })
}

// -------------------------商品管理------------------------------

                    //  ---商品分类---


//添加-条商品
export let reqCateAdd=(user)=>{
    console.log("222",user)
    return axios({
        url:baseUrl+"/api/cateadd",
        method:"post",
        data:dataToFORMDATE(user)
    })
}

//获取表格
export let reqCatelist=()=>{
    return axios({
        url:baseUrl+"/api/catelist",
        method:"get",
        params:{
            istree:true,//条数
            // pid:1 // 页码

        }
        
    })
}
//请求一条商品
export let reqCateInfo=(id)=>{
    console.log(id)
    return axios({
        url:baseUrl+"/api/Cateinfo",
        method:"get",
        params:{
            id:id
        }
    })
}
//修改一条分类
export let reqCateDit=(user)=>{
    console.log(user)
    return axios({
        url:baseUrl+"/api/cateedit",
        method:"post",
        data:qs.stringify(user)
    })
}
//删除一条分类
export let reqCateDel=(id)=>{
   
    return axios({
        url:baseUrl+"/api/catedelete",
        method:"post",
        data:{
            id:id
        }
    })
}

// ----------------商品规格 ----------------------

//获取表格
export let reqSpecslist=(obj)=>{
    return axios({
        url:baseUrl+"/api/specslist",
        method:"get",
        params:obj
    })
}

//请求一条角色
export let reqSpecsInfo=(id)=>{
    console.log(id)
    return axios({
        url:baseUrl+"/api/specsinfo",
        method:"get",
        params:{
            id:id
        }
    })
}
//添加-条角色
export let reqSpecsAdd=(user)=>{
    return axios({
        url:baseUrl+"/api/specsadd",
        method:"post",
        data:qs.stringify(user)
    })
}

//删除一条角色
export let reqSpecsDel=(id)=>{
    console.log("1111")
    return axios({
        url:baseUrl+"/api/specsdelete",
        method:"post",
        data:{
            id:id
        }
    })
}
//修改一条角色
export let reqSpecseDit=(user)=>{
    console.log(user)
    return axios({
        url:baseUrl+"/api/specsedit",
        method:"post",
        data:qs.stringify(user)
    })
}
//分页总数
export let reqSpecsCount=()=>{
   
    return axios({
        url:baseUrl+"/api/Specscount",
        method:"get"
      
    })
}

//----------------------------------商品---------------------------------------
      //获取表格
export let reqGoodslist=(num)=>{
    return axios({
        url:baseUrl+"/api/goodslist",
        method:"get",
        params:{
            size:3,//条数
            page:num // 页码

        }
        
    })
}

//请求一条商品
export let reqGoodsInfo=(id)=>{
    console.log(id)
    return axios({
        url:baseUrl+"/api/goodsinfo",
        method:"get",
        params:{
            id:id
        }
    })
}
//添加-条商品
export let reqGoodsAdd=(user)=>{
    return axios({
        url:baseUrl+"/api/goodsadd",
        method:"post",
        data:dataToFORMDATE(user)
    })
}

//删除一条商品
export let reqGoodsDel=(id)=>{
    console.log("1111")
    return axios({
        url:baseUrl+"/api/goodsdelete",
        method:"post",
        data:{
            id:id
        }
    })
}
//修改一条商品
export let reqGoodseDit=(user)=>{
    console.log(user)
    return axios({
        url:baseUrl+"/api/goodsedit",
        method:"post",
        data:dataToFORMDATE(user)
    })
}
//分页总数
export let reqGoodsCount=()=>{
   
    return axios({
        url:baseUrl+"/api/goodscount",
        method:"get"
      
    })
}

// --------------------------------- 会员管理  ---------------------------------

//获取会员列表
export let reqMemberlist=()=>{
    return axios({
        url:baseUrl+"/api/memberlist",
       
    })
}


//请求一条
export let reqMemberInfo=(id)=>{
    console.log(id)
    return axios({
        url:baseUrl+"/api/memberinfo",
        method:"get",
        params:{
            id:id
        }
    })
}
//修改一条
export let reqMembereDit=(user)=>{
    console.log(user)
    return axios({
        url:baseUrl+"/api/memberedit",
        method:"post",
        data:dateF(user)
    })
}

// -----------------------------  轮播图管理  ---------------------------------

//获取轮播图列表
export let reqBannerlist=()=>{
    return axios({
        url:baseUrl+"/api/bannerlist",
       
    })
}

//添加轮播图
export let reqBannerAdd=(user)=>{
    return axios({
        url:baseUrl+"/api/banneradd",
        method:"post",
        data:dataToFORMDATE(user)
    })
}
//删除一条
export let reqBannerDel=(id)=>{
    return axios({
        url:baseUrl+"/api/bannerdelete",
        method:"post",
        data:{
            id:id
        }
    })
}
//请求一条
export let reqBannerInfo=(id)=>{
    console.log(id)
    return axios({
        url:baseUrl+"/api/bannerinfo",
        method:"get",
        params:{
            id:id
        }
    })
}
//修改一条
export let reqBannereDit=(user)=>{
    console.log(user)
    return axios({
        url:baseUrl+"/api/banneredit",
        method:"post",
        data:dataToFORMDATE(user)
    })
}
// ————————————————————秒杀————————————————————————————————
//获取秒杀
export let reqSeckalist=()=>{
    return axios({
        url:baseUrl+"/api/seckalist",
        params:{
            istree:true
        }
    })
}

//添加秒杀
export let reqSeckaAdd=(user)=>{
    return axios({
        url:baseUrl+"/api/seckaadd",
        method:"post",
        data:qs.stringify(user)
    })
}
//删除一条
export let reqSeckaDel=(id)=>{
    return axios({
        url:baseUrl+"/api/seckadelete",
        method:"post",
        data:{
            id:id
        }
    })
}
//请求一条
export let reqSeckaInfo=(id)=>{
    console.log(id)
    return axios({
        url:baseUrl+"/api/seckainfo",
        method:"get",
        params:{
            id:id
        }
    })
}
//修改一条
export let reqSeckaeDit=(user)=>{
    console.log(user)
    return axios({
        url:baseUrl+"/api/seckaedit",
        method:"post",
        data:qs.stringify(user)
    })
}
