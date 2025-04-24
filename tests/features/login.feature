Feature: Login test
  Scenario Outline: Login operation was valid
    Given User navigates to the website
    Then User enters the username as "<username>"
    And User enters the password as "<password>"
    And User clicks on Login button
    Then Login operation must be "<status>"

    Examples:
      | username        | password     | status  |
      | standard_user   | secret_sauce | valid   |
      | hakuna          | matata       | invalid |
      | locked_out_user | secret_sauce | locked  |
