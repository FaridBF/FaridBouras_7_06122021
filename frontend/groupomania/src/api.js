import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/';
axios.defaults.headers.post['Content-Type'] = 'text/plain';
axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true;

export default axios;
