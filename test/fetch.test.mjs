/* eslint-disable no-undef */
import { expect } from 'chai';
import { postData, postDataIncorrect, putData, putWidget }  from './bodyData.mjs';
import { sendRequest } from './utils/helpers/fetch.helper.mjs';

describe('Dashboard API Testing', function() {  
    let dashboardId;     

    it('Create dashboard for specified project', async() => {
   const response  = await sendRequest('/v1/superadmin_personal/dashboard', postData, 'post');
   expect(response.status).equals(201);
   const data = response.data;
   
    if (response.status == 201) {
      dashboardId = data.id;
    } else {
      throw new Error(`Failed to create dashboard: ${data.message}`);
    }
    });

    it('Negative - Create dashboard for specified project with the same data', async() => {
      const response  = await sendRequest('/v1/superadmin_personal/dashboard', postData, 'post');
      expect(response.status).equals(409);
    });

    it('Negative - Create dashboard for specified project with invalid body', async() => {
      const response  = await sendRequest('/v1/superadmin_personal/dashboard', postDataIncorrect, 'post');
      expect(response.status).equals(400);
    });

    it('Get all permitted dashboard resources for specified project', async() => {
      const repsonse1 = await sendRequest('/v1/superadmin_personal/dashboard', null,'get');
      expect(repsonse1.status).equals(200);
    });

    it('Get specified dashboard by ID for specified project', async() => {
      const repsonse2 = await sendRequest(`/v1/superadmin_personal/dashboard/${dashboardId}`, null, 'get');
      expect(repsonse2.status).equals(200);
    });

    it('Negative - Get specified dashboard by invalid ID for specified project', async() => {
      const repsonse2 = await sendRequest(`/v1/superadmin_personal/dashboard/1111111`, null, 'get');
      expect(repsonse2.status).equals(404);
    });

    it('Update specified dashboard for specified project', async() => {
      const response3 = await sendRequest(`/v1/superadmin_personal/dashboard/${dashboardId}`, putData, 'put');  
      const data1 = await response3.data;
      expect(response3.status).equals(200);
      expect(data1.message).equals(`Dashboard with ID = '${dashboardId}' successfully updated`);    
    });

    it('Negative - Update specified dashboard for non-existent project', async() => {
      const response3 = await sendRequest(`/v1/superadmin_personalla/dashboard/${dashboardId}`, putData, 'put');  
      const data1 = await response3.data;
      expect(response3.status).equals(404);
      expect(data1.message).equals('Project \'superadmin_personalla\' not found. Did you use correct project name?');    
    });

    it('Negative - Update specified dashboard with invalid body', async() => {
      const response3 = await sendRequest(`/v1/superadmin_personala/dashboard/${dashboardId}`, postDataIncorrect, 'put');  
      const data1 = await response3.data;
      expect(response3.status).equals(400);
      expect(data1.message).contains('Incorrect Request. [Field \'name\' should not be null.]');    
    });

    it('Add widget to specified dashboard', async() => {
      const response4 = await sendRequest(`/v1/superadmin_personal/dashboard/${dashboardId}/add`, putWidget, 'put');
      expect(response4.status).equals(404);
    });

    it('Negative - Add widget to specified dashboard using POST method', async() => {
      const response4 = await sendRequest(`/v1/superadmin_personal/dashboard/${dashboardId}/add`, putWidget, 'post');
      expect(response4.status).equals(405);
    });

    it('Negative - Add widget to specified dashboard using invalid endpoint', async() => {
      const response4 = await sendRequest(`/v1/superadmin_personal/dashboard/${dashboardId}/add4`, putWidget, 'put');
      expect(response4.status).equals(405);
    });

    it('Remove widget from specified dashboard', async() => {
      const response5 = await sendRequest(`/v1/superadmin_personal/dashboard/${dashboardId}/1`, null, 'delete');
      expect(response5.status).equals(404);
    });

    it('Delete specified dashboard by ID for specified project', async() => {
      const response6 = await sendRequest(`/v1/superadmin_personal/dashboard/${dashboardId}`, null, 'delete');
      const data2 = await response6.data;
      expect(data2.message).equals(`Dashboard with ID = '${dashboardId}' successfully deleted.`);
      expect(response6.status).equals(200);
    });

    it('Negative - Delete specified dashboard twice', async() => {
      const response6 = await sendRequest(`/v1/superadmin_personal/dashboard/${dashboardId}`, null, 'delete');
      const data2 = await response6.data;
      expect(data2.message).equals(`Dashboard with ID '${dashboardId}' not found on project 'superadmin_personal'. Did you use correct Dashboard ID?`);
      expect(response6.status).equals(404);
    });

  });