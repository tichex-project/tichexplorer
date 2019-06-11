import Vue from 'vue';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import '@/styles/element-variables.scss';
import App from './App.vue';
import router from './router';
import * as filters from '@/utils/filters.js';
import rootStore from './store/index.js';

import Card from '@/components/Card';
import Link from '@/components/Link';
import TransactionList from '@/components/TransactionList';
import ValidatorList from '@/components/ValidatorList';
import SubTitle from '@/components/SubTitle';
import DataItem from '@/components/DataArea/item.vue';
import Amount from '@/components/DataArea/Amount.vue';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(Vuex);
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));

const store = new Vuex.Store(rootStore);

// get blockchain basic info
store.dispatch('basic/fetch');

// 注册全局组件
Vue.component('Card', Card);
Vue.component('hg-link', Link);
Vue.component('transaction-list', TransactionList);
Vue.component('validator-list', ValidatorList);
Vue.component('sub-title', SubTitle);
Vue.component('data-item', DataItem);
Vue.component('data-amount', Amount);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
