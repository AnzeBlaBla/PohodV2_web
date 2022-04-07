import axios from 'axios';

import { BACKEND_URL } from '../config/env';

export function request(
  url,
  method = 'GET',
  data = null,
  headers = null,
  api_url = BACKEND_URL
) {
  return new Promise((resolve, reject) => {
    axios({
      url: api_url + url,
      method: method,
      data: data,
      headers: headers,
      withCredentials: true,
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
}
