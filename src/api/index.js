//导入后端接口axios
import ajax from './ajax'
//商家列表地址
// let url = "http://localhost:8000/admin/shoplists"
const URLS = './api'
//获取商家列表方法
export let getShopLists=()=>ajax(`${URLS}/admin/shoplists`,'GET') 
//注册会员方法
export let addUser = (name,pass)=>ajax(`${URLS}/admin/registeruser`,{name,pass},'GET')
//会员登陆的方法
export let userLogin = (name,pass) =>ajax(`${URLS}/admin/loginuser`,{name,pass},'POST')
//获取登陆时cookie数据的方法
export let getUserCookie=()=>ajax(`${URLS}/admin/userinfos`,'GET') 
//清除cookie值退出登录操作方法
export let clearCookie=()=>ajax(`${URLS}/admin/vuelogout`,'GET') 
//获取单个商家页面头部信息方法
export let shopHeaders=(id)=>ajax(`${URLS}/admin/shoplistone`,{id},'GET') 
//获取单个商家下食品的具体信息
export let shopGoods=(id)=>ajax(`${URLS}/admin/vueshopgoods`,{id},'GET') 
//获取单个商家下的所有评价信息
export let shopRating=(id)=>ajax(`${URLS}/admin/vuecomments`,{id},'GET') 
//添加收获地址的方法
export let insertaddress = (name,phone,address,username) =>ajax(`${URLS}/admin/addaddress`,{name,phone,address,username},'POST')
//遍历收获地址的信息
export let getaddress=(username)=>ajax(`${URLS}/admin/usersaddress`,{username},'GET') 
//生成订单的方法
export let makeorder = (order_num,address_id,food_totalprice,username) =>ajax(`${URLS}/admin/addorder`,{order_num,address_id,food_totalprice,username},'POST')
//生成订单详情的方法
export let makeorderinfo = (foodname,pic,count,orders_id) =>ajax(`${URLS}/admin/addordergoods`,{foodname,pic,count,orders_id},'POST')
//获取当前登录会员的订单信息
export let getuserorder=(username)=>ajax(`${URLS}/admin/userorders`,{username},'GET') 
//获取订单详情的方法
export let getorderinfo=(orders_id)=>ajax(`${URLS}/admin/orderinfos`,{orders_id},'GET') 
//获取用户详情的方法
export let getusermessage=(name)=>ajax(`${URLS}/admin/usermessage`,{name},'GET') 
//添加用户信息的方法
export let addusermessage = (username,phone,email,userinfo_name) =>ajax(`${URLS}/admin/insertuserinfo`,{username,phone,email,userinfo_name},'POST')
//修改用户信息的方法
export let updateusermessage = (username,phone,email,userinfo_name) =>ajax(`${URLS}/admin/updateuserinfo`,{username,phone,email,userinfo_name},'POST')
//修改用户头像信息的方法
export let updateuserpic = (headerpic,userinfo_name) =>ajax(`${URLS}/admin/updateuserpic`,{headerpic,userinfo_name},'POST')
//搜索商家列表的方法
export let searchshoplists = (shopname) =>ajax(`${URLS}/admin/searchshoplists`,{shopname},'POST')