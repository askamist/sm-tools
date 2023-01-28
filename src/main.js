import Vue from "vue";
import App from "./App.vue";
import Input from "buefy/dist/components/input";
import Select from "buefy/dist/components/select";
import Field from "buefy/dist/components/field";
import Tab from "buefy/dist/components/tabs";
import Loading from "buefy/dist/components/loading";
import Toast from "buefy/dist/components/toast";
import Button from "buefy/dist/components/button";
import Icon from "buefy/dist/components/icon";
import VeeValidate from "vee-validate";
import VueRouter from "vue-router";
import router from "./router";

import "buefy/dist/buefy.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.config.productionTip = false;
Vue.use(Input);
Vue.use(Field);
Vue.use(Loading);
Vue.use(Tab);
Vue.use(Toast);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Select);
Vue.use(VeeValidate);
Vue.use(VueRouter);

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
