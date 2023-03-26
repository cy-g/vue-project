import Vue from 'vue'
//使用过滤器格式化时间
Vue.filter('datetotime',function(value,format="YYYY-MM-DD HH:mm:ss"){
    return moment(value).format(format)
})