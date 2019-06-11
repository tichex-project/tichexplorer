import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Blocks from './views/Blocks.vue';
import BlockDetail from './views/BlockDetail.vue';
import Transactions from './views/Transactions.vue';
import TransactionDetail from './views/TransactionDetail.vue';
import AddressDetail from './views/AddressDetail.vue';
import Proposals from './views/Proposals.vue';
import ProposalDetail from './components/Proposals/Detail.vue';
import Tokens from './views/Tokens.vue';
import TokenDetail from './components/Tokens/Detail.vue';
import Validators from './views/Validators.vue';
import ValidatorDetail from './views/ValidatorDetail.vue';
import NotFound from './views/NotFound.vue';
import View from '@/components/View';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/block',
      component: View,
      children: [
        {
          path: '',
          name: 'blocks',
          component: Blocks
        },
        {
          path: '/block/:id',
          name: 'blockDetail',
          component: BlockDetail
        }
      ]
    },
    {
      path: '/txs/:category',
      name: 'transactions',
      component: Transactions
    },
    {
      path: '/tx/:hash',
      name: 'transactionDetail',
      component: TransactionDetail
    },
    {
      path: '/address/:address',
      name: 'addressDetail',
      component: AddressDetail
    },
    {
      path: '/proposal',
      component: View,
      children: [
        {
          path: '',
          name: 'proposals',
          component: Proposals
        },
        {
          path: ':id',
          name: 'proposalDetail',
          component: ProposalDetail
        }
      ]
    },
    {
      path: '/token',
      component: View,
      children: [
        {
          path: '',
          name: 'tokens',
          component: Tokens
        },
        {
          path: ':id',
          name: 'tokenDetail',
          component: TokenDetail
        }
      ]
    },
    {
      path: '/validator',
      component: View,
      children: [
        {
          path: '',
          name: 'validators',
          component: Validators
        },
        {
          path: ':address',
          name: 'validatorDetail',
          component: ValidatorDetail
        }
      ]
    },
    {
      path: '*',
      name: 'notFound',
      component: NotFound
    }
  ]
});
