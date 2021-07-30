const Vue = require('vue')

const Axios = require('axios')
Vue.prototype.$http = Axios

const VueObserveVisibility = require('vue-observe-visibility')
Vue.use(VueObserveVisibility)

Vue.component('LoopInfinite', require('./components/LoopInfinite.vue').default)
Vue.component('SearchHeader', require('./components/SearchHeader.vue').default)
Vue.component('LoginModal', require('./components/LoginModal.vue').default)
Vue.component('SignUpModal', require('./components/SignUpModal.vue').default)
Vue.component('RelatedManga', require('./components/RelatedManga.vue').default)

const app = new Vue().$mount('#app')
