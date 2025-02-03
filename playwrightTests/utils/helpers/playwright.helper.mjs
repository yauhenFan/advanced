import dotenv from 'dotenv';
dotenv.config();

// eslint-disable-next-line no-undef
const PERSONAL_TOKEN = process.env.PERSONAL_TOKEN;

export const sendRequest =  async(request, method, apiUrl, data) => {
    const response = await request[method](apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PERSONAL_TOKEN}`,
    },
      data: data ? JSON.stringify(data) : null
    });
    return response;

  };