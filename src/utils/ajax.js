import axios from 'axios';
import { Message } from 'element-ui';

let baseURL = 'http://stargate.testnet-tichex.bas.network';

const $ajax = axios.create({ baseURL });

$ajax.interceptors.response.use(
  function(config) {
    return config;
  },
  function(error) {
    Message({
      type: 'error',
      message: 'Network Error',
      center: true
    });
    return Promise.reject(error);
  }
);

export default $ajax;
