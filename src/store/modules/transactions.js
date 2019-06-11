import { set, isEmpty } from 'lodash';
import $ajax from '@/utils/ajax';

export default {
  namespaced: true,
  state: {
    pageSize: 20,
    currentPage: 1,
    totalCount: 0,
    list: [],
    details: {},
    lastList: [],
    load: false
  },
  getters: {
    lastList: state => state.lastList.slice(0, 5)
  },
  mutations: {
    setTotalCount(state, data) {
      state.totalCount = data;
    },
    setList: function(state, list) {
      state.list = list.reverse();
    },
    setLastList: function(state, list) {
      state.lastList = list.reverse();
    },
    setDetails: function(state, data) {
      const details = state.details;
      const { txhash } = data;
      if (isEmpty(details[txhash])) {
        state.details = Object.assign({}, state.details, { [txhash]: data });
      }
    },
    setLoad: function(state, load) {
      state.load = load;
    }
  },
  actions: {
    fetchTotalCount: async function(context, params = { action: 'send', page: 1 }) {
      context.commit('setLoad', true);
      const { data } = await $ajax.get('/txs', {
        params: { action: params.action || 'send', page: 1 }
      });
      context.commit('setLoad', false);
      if (isEmpty(data)) {
        return Promise.reject();
      }
      context.commit('setTotalCount', Number(data.totalCount));
      return Promise.resolve();
    },
    fetchList: async function(context, params = { action: 'send', page: 1 }) {
      params.limit = context.state.pageSize;
      context.commit('setLoad', true);
      const { data } = await $ajax.get('/txs', { params });
      context.commit('setLoad', false);
      if (isEmpty(data)) {
        return Promise.reject();
      }
      context.commit('setTotalCount', Number(data.totalCount));
      context.commit('setList', data.txs);
      return Promise.resolve();
    },
    fetch: async function(context, hash) {
      // check if existed;
      if (!isEmpty(context.state.details[hash])) {
        return Promise.resolve();
      }
      context.commit('setLoad', true);
      const { data } = await $ajax.get(`/txs/${hash}`);
      context.commit('setLoad', false);
      if (isEmpty(data)) {
        return Promise.reject();
      }
      context.commit('setDetails', data);
      return Promise.resolve(data);
    },
    fetchLastList: async function(context, config = {}) {
      const PAGE_SIZE = 5;
      const action = config.action || 'send';
      const totalCount = context.state.totalCount;
      const lastPage = Math.ceil(totalCount / PAGE_SIZE) || 1;

      let params = {
        action,
        limit: PAGE_SIZE,
        page: lastPage
      };

      context.commit('setLoad', true);
      var { data } = await $ajax.get('/txs', { params });
      if (isEmpty(data)) {
        context.commit('setLoad', false);
        return Promise.reject();
      }
      let txs = data.txs;
      if (txs.length < PAGE_SIZE && totalCount > PAGE_SIZE) {
        const prePageParams = { ...params, page: lastPage - 1 };
        var { data } = await $ajax.get('/txs', { params: prePageParams });
        if (isEmpty(data)) {
          context.commit('setLoad', false);
          return Promise.reject();
        }
        txs = txs.concat(data.txs);
      }
      context.commit('setLoad', false);
      context.commit('setTotalCount', data.totalCount);
      context.commit('setLastList', txs);
      return Promise.resolve();
    },
    fetchAddressTxList: async function(context, params = { action: 'send', page: 1 }) {
      params.limit = 100;
      context.commit('setLoad', true);

      // 1. query txs as sender
      const senderData = await $ajax.get('/txs', { params });
      if (isEmpty(senderData.data)) {
        context.commit('setLoad', false);
        return Promise.reject();
      }

      // 2. query txs as recipient
      params.recipient = params.sender;
      delete params.sender;
      const recipientData = await $ajax.get('/txs', { params });
      if (isEmpty(recipientData.data)) {
        context.commit('setLoad', false);
        return Promise.reject();
      }
      // show action as receive in address page
      const recipientList = recipientData.data.txs.map(i => {
        set(i, 'tags.0.value', 'receive');
        return i;
      });
      const list = [...senderData.data.txs, ...recipientList];

      list.sort((a, b) => a.height - b.height);
      context.commit('setLoad', false);
      context.commit('setList', list);
      return Promise.resolve();
    }
  }
};
