import Vue from 'vue'
import App from './App.vue'
import VueSimpleContextMenu from 'vue-simple-context-menu'

Vue.component('vue-simple-context-menu', VueSimpleContextMenu)
new Vue({
  el: '#app',
  render: h => h(App)
})
