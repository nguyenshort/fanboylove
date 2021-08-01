import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const BookMark = () => import('../components/settings/BookMark.vue')
const History = () => import('../components/settings/History.vue')
const AccountSetting = () => import('../components/settings/AccountSetting.vue')

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/settings/bookmark', component: BookMark },
    { path: '/settings/history', component: History },
    { path: '/settings/account', component: AccountSetting }
  ]
})
