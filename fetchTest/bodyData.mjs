/* eslint-disable quotes */
const postData = {
  "description": "string",
  "name": "New"
};

const postDataIncorrect = {
  "description": "string",
  "notname": "New"
};

const putData = {
  'description': 'string',
  'name': 'string',
  'updateWidgets': [
    {
      'widgetName': 'string',
      'widgetId': 0,
      'widgetType': 'string',
      'widgetSize': {
        'width': 0,
        'height': 0
      },
      'widgetPosition': {
        'positionX': 0,
        'positionY': 0
      },
      'widgetOptions': {
        'additionalProp1': {},
        'additionalProp2': {},
        'additionalProp3': {}
      }
    }]
  };

const putWidget = {
    "addWidget": {
      "widgetName": "FAILED CASES TREND CHART",
      "widgetId": 187658,
      "widgetType": "bugTrend",
      "widgetSize": {
        "width": 6,
        "height": 5
      },
      "widgetPosition": {
        "positionX": 6,
        "positionY": 15
      },
      "widgetOptions": {}
    }
  };


export { postData, postDataIncorrect, putData, putWidget };