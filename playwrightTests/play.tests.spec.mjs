/* eslint-disable no-undef */
//* eslint-disable no-undef */
import { postData, postDataIncorrect, putData, putWidget }  from '../fetchTest/bodyData.mjs';
import { API_URL_PERSONAL } from '../src/data/url.mjs';
import { test,expect } from '@playwright/test';
import { sendRequest } from './utils/helpers/playwright.helper.mjs';
import { endpoints } from '../src/data/constants.mjs';


  let dashboardId;

  test.beforeAll('Create dashboard for specified project', async({request}) => {
      const response = await sendRequest(request, 'post', `${API_URL_PERSONAL}${endpoints.postDashboard}`, postData);
      expect(response.status()).toBe(201);
  
      const data = await response.json();
      if (response.status() == 201) {
        dashboardId = data.id;
      } else {
        throw new Error(`Failed to create dashboard: ${data.message}`);
      }
      });
  
  test.afterAll('Delete specified dashboard by ID for specified project',async ({request}) => {
    const response = await sendRequest(request, 'delete', `${API_URL_PERSONAL}${endpoints.postDashboard}/${dashboardId}`);
    expect(response.status()).toBe(200);
  
  });

test('Negative - Create dashboard for specified project with the same data', async({request}) => {
  const response = await sendRequest(request, 'post', `${API_URL_PERSONAL}${endpoints.postDashboard}`, postData);
  expect(response.status()).toBe(409);
  });

test('Negative - Create dashboard for specified project with invalid body', async({request}) => {
  const response = await sendRequest(request, 'post', `${API_URL_PERSONAL}${endpoints.postDashboard}`, postDataIncorrect);
  expect(response.status()).toBe(400);
});

test('Get specified dashboard by ID for specified project', async({request}) => {
   const response = await sendRequest(request, 'get', `${API_URL_PERSONAL}${endpoints.postDashboard}/${dashboardId}`);
   expect(response.status()).toBe(200);
});

test('Negative - Get specified dashboard by invalid ID for specified project', async({request}) => {
   const response = await sendRequest(request, 'get', `${API_URL_PERSONAL}${endpoints.postDashboard}/1111111`);
   expect(response.status()).toBe(404);
  });

test('Get all permitted dashboard resources for specified project', async({request}) => {
    const response = await sendRequest(request, 'get', `${API_URL_PERSONAL}${endpoints.postDashboard}`);
    expect(response.status()).toBe(200);
});

test('Update specified dashboard for specified project', async({request}) => {
    const response = await sendRequest(request, 'put', `${API_URL_PERSONAL}${endpoints.postDashboard}/${dashboardId}`, putData);
    const data1 = await response.json();
    expect(response.status()).toBe(200);
    expect(data1.message).toContain(`Dashboard with ID = '${dashboardId}' successfully updated`);
  });

test('Negative - Update specified dashboard for non-existent project', async({request}) => {
   const response = await sendRequest(request, 'put', `${API_URL_PERSONAL}${endpoints.invalidProject}/${dashboardId}`, putData);
    const data2 = await response.json();
    expect(response.status()).toBe(403);
    expect(data2.message).toContain('You do not have enough permissions. Access is denied');
  });

  test('Add widget to specified dashboard', async({request}) => {
      const response = await sendRequest(request, 'put', `${API_URL_PERSONAL}${endpoints.postDashboard}/${dashboardId}/add`, putWidget);
      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data.message).toContain(`Widget with ID = '${putWidget.addWidget.widgetId}' was successfully added to the dashboard with ID = '${dashboardId}'`);
      });

  test('Negative - Add widget to specified dashboard using POST method', async({request}) => {
      const response = await sendRequest(request, 'post', `${API_URL_PERSONAL}${endpoints.postDashboard}/${dashboardId}/add`, putWidget);
      expect(response.status()).toBe(405);
      });

    test('Negative - Add widget to specified dashboard using invalid endpoint', async({request}) => {
      const response = await sendRequest(request, 'put', `${API_URL_PERSONAL}${endpoints.postDashboard}/${dashboardId}/add4`, putWidget);
      expect(response.status()).toBe(405);
       });

    test('Remove widget from specified dashboard', async({request}) => {
      const response = await sendRequest(request, 'delete', `${API_URL_PERSONAL}${endpoints.postDashboard}/${dashboardId}/${putWidget.addWidget.widgetId}`);
      expect(response.status()).toBe(200);
    });

