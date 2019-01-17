import Vue from 'vue'
import App from './App.vue'
import Input from 'buefy/dist/components/input';
import Field from 'buefy/dist/components/field';
import Loading from 'buefy/dist/components/loading';

import 'buefy/dist/buefy.css'

Vue.config.productionTip = false
Vue.use(Input);
Vue.use(Field);
Vue.use(Loading);

new Vue({
  render: h => h(App),
}).$mount('#app')
