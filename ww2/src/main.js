// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('.././node_modules/bootstrap/dist/css/bootstrap.min.css');
import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App'
import { routes } from './router/routes';
// import seneca2 from './seneca/seneca.js'
// import senecatest from './seneca/senecatest.js'

Vue.config.productionTip = false

Vue.config.devtools = true

// var seneca;
// seneca = Seneca()
//     .test('print')
//     .client({type:'browser', pin:'search:*',port:9020})
//     .client({type:'browser', pin:'info:*', port:9030})
//     .client({type:'browser', pin:'suggest:*', port:9060})


const router =  new VueRouter({
  routes,
  mode: 'history'
});


Vue.use(VueRouter);
//Vue.use(seneca);

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  routes,
//  seneca,
  render: h => h(App)
});
