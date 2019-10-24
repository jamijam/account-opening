# Account Opening Use Case

This use case demonstrates the account openning process with ID verification.

This use case is built with Angular 8. To go through the use case, you don't need to know Angular. But if you are interested in leaning Angular, please follow [this](https://www.bitovi.com/academy/learn-angular.html) tutorial.

## APIs used to implement the use case

1. HyperVerge Face Match ([Link](https://apixplatform.com/profile/api-detail?api-id=30))

    * Additional API Keys are required to access HyperVerge Face Match API.
        * appId: *[Contact Hyperverge to get the credentials]*
        * appKey: *[Contact Hyperverge to get the credentials]*

2. Smart Bank - Party ([Link](https://apixplatform.com/profile/api-detail?api-id=107))
3. Smart Bank - Account ([Link](https://apixplatform.com/profile/api-detail?api-id=103))

Login to [APIX Platform](https://apixplatform.com) and subscribe to above APIs before continue to next step.

## Provision APIX IDE Instance

1. Login to [APIX Platform](https://apixplatform.com)
2. From the main menu, go to Sandbox > [Secure Experimentation Sandbox/IDE](https://apixplatform.com/ide/api-ide)
3. Click `Create IDE Instance` button
4. Provide `Name`, `URL`, `Description`, `Password` for the IDE instance and click `Create` button. 
Please note that `URL` should be unique and `Password` must be atleast 8 characters long, must contain a number, uppercase, lowercase and a special character.
5. Provide the confirmation by clicking on `Create and Launch` button. Wait for the IDE instance to be provissioned.
6. Newly created IDE instance will be openned in a new browser tab. Provide the `Password` and click on `Open IDE` button.
7. Already created IDE instances will appear in `IDE Instance Manager` view. Click on the IDE instance name to re-open the IDE instance
8. Please note that IDE instance will be available for 24 hours. Data should be backed up by pushing code to GitHub before auto termination. One hour before the termination, you can request for an termination extension.

## Setting up the development server

1. Open and login to IDE instance
2. From the main menu, click `View` > `Terminal`.

Execute following commands in Terminal window.

1.  Download the code into IDE instance

        git clone https://github.com/apixplatform/account-opening.git

2.  Use case code is downloaded to IDE instance to the folder `account-opening`. Let's change the terminal directory to `account-opening` folder.

        cd account-opening/

3.  Download Angular dependancies with below commands.

        npm install

4.  Start the Angular application server.

        npm start

To configure the use case,

1. Open `account-openning` > `api-config.json` from the `Project Explorer` left pane.
2. Provide your APIX credentials.

        "userName": "Replace this with your APIX username",
        "password": "Replace this with your APIX password"

3. From the main menu, click `File` > `Save`.

Now the development server is up and running with correct configurations. To open the use case website follow the below instructions.

1. Copy the IDE instance URL from the browser tab. (ex: `https://ide-xxxxxx.services.apixplatform.com/`)
2. Open a new browser tab and paste the copied IDE url. Change the `ide` text to `app` in the URL and open. New URL would look like (ex: `https://app-xxxxxx.services.apixplatform.com/`)

## Testing the use case

1. In the GitHub project go to `test-images` and download `id.jpg` and `selfie.jpg`. Provide these two images in the 1st step of application window and click `Verify` button. 

    * HyperVerge Face Match API will get executed to validate the provided identity document and selfie. 
    * Match confidence level will be provided as the output. 
    * Click on `Go to Account Creation` button to proceed. 

2. Provide account creation inputs and click `Create Account` Button.

    * Bank customer will get created with the provided `Account Holder's Name` using `Smart Bank - Party` API.
    * New Account gets created using `Smart Bank - Account` API.
    * Newly created customer will be assigned to the Account as the Account Owner using `Smart Bank - Account` API.

3. Created Account Details will be shown in the Step 3.