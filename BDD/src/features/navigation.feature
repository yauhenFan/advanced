Feature: Navigation through Report Portal Application

Background: I launch Report Portal on localhost
Given I open ReportPortal login page on localhost
And I login with default User credentials

Scenario: I can see Demo Dashboard in the list
When Dashboard icon displays on the left side bar
Then I click on Dashboard icon then Add New Dashboard button displays
And Element locator '//div[@class = "gridRow__grid-row--X9wIq"]//a[text() = "DEMO DASHBOARD"]' is displayed on the page

When I click on element locator on the page '//div[@class = "gridRow__grid-row--X9wIq"]//a[text() = "DEMO DASHBOARD"]'
Then Element locator 'div.react-grid-layout > div.react-grid-item:nth-child(1)' is displayed on the page