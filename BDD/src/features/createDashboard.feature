@logout

Feature: User creates several Dashboard and then delete

Background: User logs in with default credentials
Given I open ReportPortal login page on localhost
When I login with default User credentials

Scenario Outline: User creates several dashboards
When I click on Dashboard icon then Add New Dashboard button displays
Then I click on Add New Dashboard button and verify popup appears
Then Enter new dashboard name "<DashBoard_Name>" and save dashboard

Examples:
    | DashBoard_Name    |
    | NewOne            |
    | NewTwo            |

Scenario Outline: I delete all newly created Dashboard
Given I open ReportPortal login page on localhost
When I click on Dashboard icon then Add New Dashboard button displays
Then I delete dashboard with number "<Number>"

Examples:
    | Number    |
    | 2         |
    | 2         |

Scenario Outline: I verify that custom dashboards deleted
Given I open ReportPortal login page on localhost
When I click on Dashboard icon then Add New Dashboard button displays
Then I do not see dashboard with name "<DashBoard_Name>"

Examples:
    | DashBoard_Name    |
    | NewOne            |
    | NewTwo            |
