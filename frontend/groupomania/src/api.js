import axios from 'axios';

// NON UTILISE POUR LE MOMENT

// début fonctionne
// const token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsImlhdCI6MTY0MDgwMjU0NywiZXhwIjoxNjQwODg4OTQ3fQ.FFtnsJy09qYkE3WX5P-8re3QLqAM2JWOSEelCKHhFAk';

// export default axios.create({
//   baseURL: 'http://localhost:3000/api/',
//   // si req prend plus de 5sec elle sera interrompue
//   //   timeout: 5000,
//   //   headers: { 'X-Custom-Header': 'foobar' }
//   Headers: {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${token}`
//   }
// });
// fin fonctionne

// début test
axios.defaults.baseURL = 'http://localhost:3000/api/';
axios.defaults.headers.post['Content-Type'] = 'text/plain';
axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true;

export default axios;
// fin test

// const token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsImlhdCI6MTY0MDY5MDI5MiwiZXhwIjoxNjQwNzc2NjkyfQ.x8KYfp1ptzVlExIUSZZEVc7LA1b3ggcyVR00JQwtES4';
// axios.defaults.baseUrl = 'http://localhost:3000/api/';
// axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
// export default axios;
