import { set, isEmpty } from 'lodash';
import $ajax from '@/utils/ajax';

export default {
  namespaced: true,
  state: {
    list: [],
    details: {},
    load: false
  },
  mutations: {
    setList: function(state, list) {
      state.list = list.reverse();
    },
    setDetails: function(state, data) {
      state.details = Object.assign({}, state.details, data);
    },
    setLoad: function(state, load) {
      state.load = load;
    }
  },
  actions: {
    fetchList: async function(context) {
      context.commit('setLoad', true);
      const { data } = await $ajax.get('/gov/proposals');
      context.commit('setLoad', false);
      context.commit('setList', data);
      return Promise.resolve(data);
    },
    fetchDetail: async function(context, id) {
      // check if existed;
      if (!isEmpty(context.state.details[id])) {
        return Promise.resolve();
      }
      context.commit('setLoad', true);
      const { data } = await $ajax.get(`/gov/proposals/${id}`);
      context.commit('setLoad', false);
      if (isEmpty(data)) {
        return Promise.reject();
      }
      context.commit('setDetails', { [id]: data });
      return Promise.resolve(data);
    }
  }
};
