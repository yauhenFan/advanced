 //* eslint-disable no-undef */
import { postData, postDataIncorrect, putData, putWidget }  from '../fetchTest/bodyData.mjs';
import { test,expect } from '@playwright/test';
import { sendRequest } from './utils/helpers/api.helper.mjs';
import { endpoints } from '../src/data/constants.mjs';


  let dashboardId;

  test.beforeAll('Create dashboard for specified project', async({request}) => {
    const { status, data } = await sendRequest('post', `${endpoints.postDashboard}`, postData);
      expect(status).toBe(201);

      if (status == 201) {
        dashboardId = data.id;
      } else {
        throw new Error(`Failed to create dashboard: ${data.message}`);
      }
      });
  
  test.afterAll('Delete specified dashboard by ID for specified project',async ({request}) => {
    const  { status }  = await sendRequest('delete', `${endpoints.postDashboard}/${dashboardId}`);
    expect(status).toBe(200);
  
  });

test('Negative - Create dashboard for specified project with the same data', async({request}) => {
  const { status } = await sendRequest('post', `${endpoints.postDashboard}`, postData);
  expect(status).toBe(409);
  });

test('Negative - Create dashboard for specified project with invalid body', async({request}) => {
  const { status } = await sendRequest('post', `${endpoints.postDashboard}`, postDataIncorrect);
  expect(status).toBe(400);
});

test('Get specified dashboard by ID for specified project', async({request}) => {
   const { status } = await sendRequest('get', `${endpoints.postDashboard}/${dashboardId}`);
   expect(status).toBe(200);
});

test('Negative - Get specified dashboard by invalid ID for specified project', async({request}) => {
   const { status } = await sendRequest('get', `${endpoints.postDashboard}/1111111`);
   expect(status).toBe(404);
  });

test('Get all permitted dashboard resources for specified project', async({request}) => {
    const { status } = await sendRequest('get', `${endpoints.postDashboard}`);
    expect(status).toBe(200);
});

test('Update specified dashboard for specified project', async({request}) => {
    const { status, data } = await sendRequest('put', `${endpoints.postDashboard}/${dashboardId}`, putData);
    expect(status).toBe(200);
    expect(data.message).toContain(`Dashboard with ID = '${dashboardId}' successfully updated`);
  });

test('Negative - Update specified dashboard for non-existent project', async({request}) => {
   const { status,data } = await sendRequest('put', `${endpoints.invalidProject}/${dashboardId}`, putData);
    expect(status).toBe(403);
    expect(data.message).toContain('You do not have enough permissions. Access is denied');
  });
  test('Add widget to specified dashboard', async({request}) => {
      const { status, data} = await sendRequest('put', `${endpoints.postDashboard}/${dashboardId}/add`, putWidget);
      expect(status).toBe(200);
      expect(data.message).toContain(`Widget with ID = '${putWidget.addWidget.widgetId}' was successfully added to the dashboard with ID = '${dashboardId}'`);
      });

  test('Negative - Add widget to specified dashboard using POST method', async({request}) => {
      const { status } = await sendRequest('post', `${endpoints.postDashboard}/${dashboardId}/add`, putWidget);
      expect(status).toBe(405);
      });

    test('Negative - Add widget to specified dashboard using invalid endpoint', async({request}) => {
      const { status } = await sendRequest('put', `${endpoints.postDashboard}/${dashboardId}/add4`, putWidget);
      expect(status).toBe(405);
       });

    test('Remove widget from specified dashboard', async({request}) => {
      const { status } = await sendRequest('delete', `${endpoints.postDashboard}/${dashboardId}/${putWidget.addWidget.widgetId}`);
      expect(status).toBe(200);
    });

