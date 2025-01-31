/* eslint-disable camelcase */
//* eslint-disable no-undef */
import { postData, postDataIncorrect, putData, putWidget }  from '../test/bodyData.mjs';
import { API_URL } from '../src/data/url.mjs';
import { test,expect } from '@playwright/test';
import { requestHeader } from './headers.mjs';

  let dashboardId;
  test.beforeAll('Create dashboard for specified project', async({request}) => {
      const response = await request.post(`${API_URL}/v1/superadmin_personal/dashboard`, {
        headers: requestHeader,
        data: postData
      });
      expect(response.status()).toBe(201);
  
      const data = await response.json();
      if (response.status() == 201) {
        dashboardId = data.id;
      } else {
        throw new Error(`Failed to create dashboard: ${data.message}`);
      }
      });
  
  test.afterAll('Delete specified dashboard by ID for specified project',async ({request}) => {
    const response1 = await request.delete(`${API_URL}/v1/superadmin_personal/dashboard/${dashboardId}`, {
      headers: requestHeader,
    });
    expect(response1.status()).toBe(200);
  
  });

test('Negative - Create dashboard for specified project with the same data', async({request}) => {
  const repsonse7 = await request.post(`${API_URL}/v1/superadmin_personal/dashboard`, {
    headers: requestHeader,
    data: postData
  });
  expect(repsonse7.status()).toBe(409);
  });

test('Negative - Create dashboard for specified project with invalid body', async({request}) => {
  const response8 = await request.post(`${API_URL}/v1/superadmin_personal/dashboard`, {
    headers: requestHeader,
    data: postDataIncorrect
  });
  expect(response8.status()).toBe(400);
});

test('Get specified dashboard by ID for specified project', async({request}) => {
   const response3 = await request.get(`${API_URL}/v1/superadmin_personal/dashboard/${dashboardId}`, {
    headers: requestHeader,
   });
   expect(response3.status()).toBe(200);
});

test('Negative - Get specified dashboard by invalid ID for specified project', async({request}) => {
  const response9 = await request.get(`${API_URL}/v1/superadmin_personal/dashboard/1111111`, {
    headers: requestHeader,
   });

   expect(response9.status()).toBe(404);
  });

test('Get all permitted dashboard resources for specified project', async({request}) => {
  const response2 = await request.get(`${API_URL}/v1/superadmin_personal/dashboard`, {
      headers: requestHeader,
    });
    expect(response2.status()).toBe(200);
});

test('Update specified dashboard for specified project', async({request}) => {
    const response4 = await request.put(`${API_URL}/v1/superadmin_personal/dashboard/${dashboardId}`, {
      headers: requestHeader,
      data: putData
    });
    const data1 = await response4.json();
    expect(response4.status()).toBe(200);
    expect(data1.message).toContain(`Dashboard with ID = '${dashboardId}' successfully updated`);
  });

test('Negative - Update specified dashboard for non-existent project', async({request}) => {
  const response10 = await request.put(`${API_URL}/v1/superadmin_personalla/dashboard/${dashboardId}`, {
    headers: requestHeader,
    data: putData
  });

    const data2 = await response10.json();
    expect(response10.status()).toBe(404);
    expect(data2.message).toContain('Project \'superadmin_personalla\' not found. Did you use correct project name?');
  });

  test('Add widget to specified dashboard', async({request}) => {
      const response5 = await request.put(`${API_URL}/v1/superadmin_personal/dashboard/${dashboardId}/add`, {
        headers: requestHeader,
        data: putWidget
      });
      expect(response5.status()).toBe(404);
    });

  test('Negative - Add widget to specified dashboard using POST method', async({request}) => {
      const response11 = await request.post(`${API_URL}/v1/superadmin_personal/dashboard/${dashboardId}/add`, {
        headers: requestHeader,
        data: putWidget
      });
      expect(response11.status()).toBe(405);
      });

    test('Negative - Add widget to specified dashboard using invalid endpoint', async({request}) => {
       const response12 = await request.post(`${API_URL}/v1/superadmin_personal/dashboard/${dashboardId}/add4`, {
        headers: requestHeader,
        data: putWidget
      });
      expect(response12.status()).toBe(405);
       });

    test('Remove widget from specified dashboard', async({request}) => {
      const response6 = await request.delete(`${API_URL}/v1/superadmin_personal/dashboard/${dashboardId}/1`, {
        headers: requestHeader
      });
      expect(response6.status()).toBe(404);
    });

