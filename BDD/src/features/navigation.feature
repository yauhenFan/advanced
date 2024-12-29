@logout

Feature: Navigation through Report Portal Application

Background: I launch Report Portal on localhost
Given I open web site 'http://localhost:8080/ui/#login'
And I login with default User credentials 'default' and '1q2w3e'

Scenario: I can see Demo Dashboard in the list
When Dashboard icon displays on the left side bar
Then I click on Dashboard icon then Add New Dashboard button displays
And Element locator '//div[@data-id  = "15"]//a' is displayed on the page

When I click on element locator on the page '//div[@data-id  = "15"]//a'
Then Element locator 'div.react-grid-layout > div.react-grid-item:nth-child(1)' is displayed on the page