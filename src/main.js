import Vue from 'vue'
import App from './App.vue'
import Input from 'buefy/dist/components/input';
import Field from 'buefy/dist/components/field';
import Tab from 'buefy/dist/components/tabs';
import Loading from 'buefy/dist/components/loading';
import Toast from 'buefy/dist/components/toast';
import VeeValidate from 'vee-validate';

import 'buefy/dist/buefy.css'

Vue.config.productionTip = false
Vue.use(Input);
Vue.use(Field);
Vue.use(Loading);
Vue.use(Tab);
Vue.use(Toast);
Vue.use(VeeValidate);

new Vue({
  render: h => h(App),
}).$mount('#app')
