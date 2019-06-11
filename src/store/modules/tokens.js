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
    load: false
  },
  mutations: {
    setList: function(state, list) {
      state.list = list;
    },
    setTotalCount(state, data) {
      state.totalCount = data;
    },
    setDetails: function(state, data) {
      state.details = Object.assign({}, state.details, data);
    },
    setLoad: function(state, load) {
      state.load = load;
    }
  },
  actions: {
    fetchTotalCount: async function(context, params = { action: 'send', page: 1 }) {
      context.commit('setLoad', true);
      const { data } = await $ajax.get('/issue/list', { params: { limit: 1 } });
      context.commit('setLoad', false);
      if (isEmpty(data)) {
        return Promise.reject();
      }
      const total = (parseInt(data[0].issue_id.slice(4), 16) + '').slice(1) - 0 + 1;
      context.commit('setTotalCount', total);
      return Promise.resolve();
    },
    fetchList: async function(context, params = { page: 1 }) {
      const { pageSize, totalCount } = context.state;
      params.limit = pageSize;

      // change page to start-issue-id
      const startId = `coin${(1e11 + totalCount - pageSize * (params.page - 1)).toString(16)}`;
      params.start_issue_id = startId;
      delete params.page;

      context.commit('setLoad', true);
      const { data } = await $ajax.get('/issue/list', { params });
      context.commit('setLoad', false);
      if (isEmpty(data)) {
        return Promise.reject();
      }
      context.commit('setList', data);
      return Promise.resolve();
    },
    fetchDetail: async function(context, id) {
      // check if existed;
      if (!isEmpty(context.state.details[id])) {
        return Promise.resolve();
      }
      context.commit('setLoad', true);
      const { data } = await $ajax.get(`/issue/query/${id}`);
      context.commit('setLoad', false);
      if (isEmpty(data)) {
        return Promise.reject();
      }
      context.commit('setDetails', { [id]: data.value });
      return Promise.resolve(data);
    },
    search: async function(context, { symbol }) {
      context.commit('setLoad', true);
      const { data } = await $ajax.get(`/issue/search/${symbol}`);
      context.commit('setLoad', false);
      return Promise.resolve(data);
    }
  }
};
