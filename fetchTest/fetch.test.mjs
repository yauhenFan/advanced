/* eslint-disable no-undef */
import { expect } from 'chai';
import { postData, postDataIncorrect, putData, putWidget }  from './bodyData.mjs';
import { sendRequest } from './utils/helpers/fetch.helper.mjs';
import { endpoints }  from '../src/data/constants.mjs';

describe('Dashboard API Testing', function() {  
    let dashboardId;     

    it('Create dashboard for specified project', async() => {
      const { status, data }  = await sendRequest(endpoints.postDashboard, postData, 'post');
      expect(status).equals(201);
   
      if (status == 201) {
        dashboardId = data.id;
      } else {
        throw new Error(`Failed to create dashboard: ${data.message}`);
      }
    });

    it('Negative - Create dashboard for specified project with the same data', async() => {
      const { status }  = await sendRequest(endpoints.postDashboard, postData, 'post');
      expect(status).equals(409);
    });

    it('Negative - Create dashboard for specified project with invalid body', async() => {
      const { status }  = await sendRequest(endpoints.postDashboard, postDataIncorrect, 'post');
      expect(status).equals(400);
    });

    it('Get all permitted dashboard resources for specified project', async() => {
      const { status } = await sendRequest(endpoints.postDashboard, null,'get');
      expect(status).equals(200);
    });

    it('Get specified dashboard by ID for specified project', async() => {
      const { status } = await sendRequest(`${endpoints.postDashboard}/${dashboardId}`, null, 'get');
      expect(status).equals(200);
    });

    it('Negative - Get specified dashboard by invalid ID for specified project', async() => {
      const { status } = await sendRequest(`${endpoints.postDashboard}/1111111`, null, 'get');
      expect(status).equals(404);
    });

    it('Update specified dashboard for specified project', async() => {
      const { status, data} = await sendRequest(`${endpoints.postDashboard}/${dashboardId}`, putData, 'put');  
      expect(status).equals(200);
      expect(data.message).equals(`Dashboard with ID = '${dashboardId}' successfully updated`);    
    });

    it('Negative - Update specified dashboard for non-existent project', async() => {
      const { status, data} = await sendRequest(`${endpoints.invalidProject}/${dashboardId}`, putData, 'put');  
      expect(status).equals(403);
      expect(data.message).equals('You do not have enough permissions. Access is denied');    
    });

    it('Negative - Update specified dashboard with invalid body', async() => {
      const { status, data} = await sendRequest(`${endpoints.postDashboard}/${dashboardId}`, postDataIncorrect, 'put');  
      expect(status).equals(400);
      expect(data.message).contains('Incorrect Request. [Field \'name\' should not be null.]');    
    });

    it('Add widget to specified dashboard', async() => {
      const { status } = await sendRequest(`${endpoints.postDashboard}/${dashboardId}/add`, putWidget, 'put');
      expect(status).equals(200);
    });

    it('Negative - Add widget to specified dashboard using POST method', async() => {
      const { status } = await sendRequest(`${endpoints.postDashboard}/${dashboardId}/add`, putWidget, 'post');
      expect(status).equals(405);
    });

    it('Negative - Add widget to specified dashboard using invalid endpoint', async() => {
      const { status } = await sendRequest(`${endpoints.postDashboard}/${dashboardId}/add4`, putWidget, 'put');
      expect(status).equals(405);
    });

    it('Remove widget from specified dashboard', async() => {
      const { status } = await sendRequest(`${endpoints.postDashboard}/${dashboardId}/${putWidget.addWidget.widgetId}`, null, 'delete');
      expect(status).equals(200);
    });

    it('Delete specified dashboard by ID for specified project', async() => {
      const { status, data } = await sendRequest(`${endpoints.postDashboard}/${dashboardId}`, null, 'delete');
      expect(data.message).equals(`Dashboard with ID = '${dashboardId}' successfully deleted.`);
      expect(status).equals(200);
    });

    it('Negative - Delete specified dashboard twice', async() => {
      const { status,data } = await sendRequest(`${endpoints.postDashboard}/${dashboardId}`, null, 'delete');
      expect(data.message).equals(`Dashboard with ID '${dashboardId}' not found on project 'yauhen_habinet_personal'. Did you use correct Dashboard ID?`);
      expect(status).equals(404);
    });

  });