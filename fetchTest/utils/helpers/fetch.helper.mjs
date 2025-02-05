/* eslint-disable camelcase */
/* eslint-disable quotes */
import { API_URL_PERSONAL } from '../../../src/data/url.mjs';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

// eslint-disable-next-line no-undef
const PERSONAL_TOKEN = process.env.PERSONAL_TOKEN;

export const sendRequest = async(url, data = null, method = "get") => {
    try {
        const response = await fetch(`${API_URL_PERSONAL}${url}`, {
                  method: method.toUpperCase(),
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${PERSONAL_TOKEN}`,
      
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
          status: error.response
     };
    }
  };