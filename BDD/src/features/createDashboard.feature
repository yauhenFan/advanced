Feature: User creates several Dashboard and then delete

Scenario: User logs in with default credentials
Given I open web site 'http://localhost:8080/ui/#login'
When I login with default User credentials 'default' and '1q2w3e'

Scenario Outline: User creates several dashboards
When I click on Dashboard icon then Add New Dashboard button displays
Then I click on Add New Dashboard button and verify popup appears
Then Enter new dashboard name "<DashBoard_Name>" and save dashboard

Examples:
    | DashBoard_Name    |
    | NewOne            |
    | NewTwo            |

Scenario Outline: I delete all newly created Dashboard
Given I open web site 'http://localhost:8080/ui/#login'
When I click on Dashboard icon then Add New Dashboard button displays
Then I delete dashboard with number "<Number>"

Examples:
    | Number    |
    | 1         |
    | 1         |

Scenario Outline: I verify that custom dashboards deleted
Given I open web site 'http://localhost:8080/ui/#login'
When I click on Dashboard icon then Add New Dashboard button displays
Then I do not see dashboard with name "<DashBoard_Name>"

Examples:
    | DashBoard_Name    |
    | NewOne            |
    | NewTwo            |
