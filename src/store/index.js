import Vue from 'vue'

import Vuex from 'vuex'

// 使用vuex
Vue.use(Vuex)

import state from './state'

import actions from './actions'

import mutations from './mutations'

import getters from './getters'

// 暴露并注册Store
export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})