import Vue from 'vue'
import App from './App.vue'
//import 'bootstrap';

require ('jquery/dist/jquery.slim.min.js');
require('popper.js/dist/umd/popper.min.js');
require('bootstrap/dist/js/bootstrap.min.js');
require('../sass/main.scss');


Vue.config.productionTip = false

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
