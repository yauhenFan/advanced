import dotenv from 'dotenv';
dotenv.config();
import { request } from 'playwright/test';

// eslint-disable-next-line no-undef
const SLACK_URL = process.env.SLACK_URL;

export const sendSlackRequest =  async(method, message) => {
    const context = await request.newContext();
    try{
      const response = await context[method](`${SLACK_URL}`, {
        headers: {
          'Content-Type': 'application/json',
      },
        data: message ? JSON.stringify({text: message}) : null
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