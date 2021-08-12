import Vue from 'vue'

import Axios from 'axios'
Vue.prototype.$http = Axios

import VueObserveVisibility from 'vue-observe-visibility'
Vue.use(VueObserveVisibility)

import moment from 'moment'
moment.locale('vi')
Vue.prototype.$moment = moment

import VueCropper from 'vue-cropperjs'
Vue.component('VueCropper', VueCropper)

import VueKonva from 'vue-konva'
Vue.use(VueKonva)

Vue.component('LoopInfinite', require('./components/LoopInfinite.vue').default)
Vue.component(
  'CategoryInfinite',
  require('./components/CategoryInfinite.vue').default
)
Vue.component(
  'SearchInfinite',
  require('./components/SearchInfinite.vue').default
)

Vue.component('SearchHeader', require('./components/SearchHeader.vue').default)
Vue.component('LoginModal', require('./components/LoginModal.vue').default)
Vue.component('SignUpModal', require('./components/SignUpModal.vue').default)
Vue.component('RelatedManga', require('./components/RelatedManga.vue').default)
Vue.component('TabBar', require('./components/settings/TabBar.vue').default)
Vue.component('ChapterView', require('./components/ChapterView.vue').default)

import router from './plugins/routes'
import apolloProvider from './plugins/apollo'

const app = new Vue({ router, apolloProvider }).$mount('#app')
