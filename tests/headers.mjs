/* eslint-disable camelcase */
import { API_Token } from '../test/utils/token.mjs';

export const requestHeader = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_Token}`,
};