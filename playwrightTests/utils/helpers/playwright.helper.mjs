import dotenv from 'dotenv';
dotenv.config();
import { API_URL_PERSONAL } from '../../../src/data/url.mjs';
import { request } from 'playwright/test';

// eslint-disable-next-line no-undef
const PERSONAL_TOKEN = process.env.PERSONAL_TOKEN;

export const sendRequest =  async(method, apiUrl, data) => {
  const context = await request.newContext();
  try{
    const response = await context[method](`${API_URL_PERSONAL}${apiUrl}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PERSONAL_TOKEN}`,
    },
      data: data ? JSON.stringify(data) : null
    });
    const jsonData = await response.json();
      return {
        status: response.status(),
        data: jsonData
    };

  } catch(error) {
    return {
         status: error.response
    };
   }
 };