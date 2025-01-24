/* eslint-disable quotes */
import { API_URL } from '../../../src/data/url.mjs';
import fetch from 'node-fetch';
// eslint-disable-next-line camelcase
import { API_Token } from '../token.mjs';

export const sendRequest = async(url, data = null, method = "get") => {
    try {
        const response = await fetch(`${API_URL}${url}`, {
                  method: method.toUpperCase(),
                  headers: {
                      'Content-Type': 'application/json',
                      // eslint-disable-next-line camelcase
                      'Authorization': `Bearer ${API_Token}`,
      
                  },
                  body: data ? JSON.stringify(data) : null
      });
      const jsonData = await response.json();
      return {
        status: response.status,
        data: jsonData
    };

    } catch(error) {
     return {
          status: error.repsonse
     };
    }
  };