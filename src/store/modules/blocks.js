import { get, isEmpty } from 'lodash';
import axios from 'axios';
import $ajax from '@/utils/ajax';
import Codec from '@/utils/cdec';

export default {
  namespaced: true,
  state: {
    pageSize: 20,
    currentPage: 1,
    lastHeight: 0,
    list: [],
    details: {},
    proposers: {},
    validatorsets: {}
  },
  getters: {
    lastList: state => state.list.slice(0, 5),
    list: state => {
      const { list, details, validatorsets } = state;
      return list.map(item => {
        const height = get(item, 'header.height');
        if (isEmpty(details[height])) return item;
        const validators = get(validatorsets, [height, 'validators'], []);
        const block = get(details, [height, 'block']);
        return { ...item, block, validators };
      });
    }
  },
  mutations: {
    setCurrentPage: function(state, page) {
      state.currentPage = page;
    },
    setLastHeight: function(state, height) {
      height = Number(height);
      if (state.lastHeight > height) {
        return false;
      }
      state.lastHeight = height;
    },
    setList: function(state, list) {
      state.list = list;
    },
    setDetails: function(state, data) {
      state.details = Object.assign({}, data, state.details);
    },
    setProposers: function(state, data) {
      state.proposers = Object.assign({}, data, state.proposers);
    },
    setValidatorsets: function(state, data) {
      state.validatorsets = Object.assign({}, data, state.validatorsets);
    }
  },
  actions: {
    fetchList: async function(context, params = { page: 1 }) {
      const { minHeight, maxHeight, page } = params;
      let blockApiUri = 'http://rpc2.testnet-tichex.bas.network';
      const { data } = await axios.get(`${blockApiUri}/blockchain`, {
        params: { minHeight, maxHeight, random: new Date().getTime() }
      });
      const result = get(data, 'result');
      if (isEmpty(result)) {
        return Promise.reject();
      }
      const list = get(result, 'block_metas');
      const lastHeight = get(result, 'last_height');

      page && context.commit('setCurrentPage', page);
      context.commit('setList', list);
      context.commit('setLastHeight', lastHeight);

      list.forEach(item => {
        const height = get(item, 'header.height');
        const details = context.state.details;
        if (isEmpty(details[height])) {
          context.dispatch('fetchDetail', item.header.height);
        }
      });
      return Promise.resolve();
    },
    fetchValidatorset: async function(context, height) {
      const { data } = await $ajax.get(`/validatorsets/${height}`);
      if (!isEmpty(data)) {
        context.commit('setValidatorsets', { [height]: data });

        // find proposer of this block
        const block = context.state.details[height];
        const cons_hex = get(block, 'block.header.proposer_address');
        const cons_addr = Codec.Bech32.toBech32('cosmosvalcons', cons_hex);
        const proposer = data.validators.find(v => v.address === cons_addr);
        context.commit('setProposers', { [height]: proposer });
      }
    },
    fetchDetail: async function(context, height) {
      if (!isEmpty(context.state.details[height])) {
        return Promise.resolve(context.state.details[height]);
      }
      const { data } = await $ajax.get(`/blocks/${height}`);
      if (!isEmpty(data)) {
        context.dispatch('fetchValidatorset', height);
        context.commit('setDetails', { [height]: data });
        return Promise.resolve(data);
      }
    }
  }
};
