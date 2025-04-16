import { test } from '@playwright/test';
import { LoginVerifications } from '../Pages/login';

test.describe('Login Test Cases', () => {
  let loginPage: LoginVerifications;

  test.beforeEach('Navigate to login page', async ({ page }) => {
    loginPage = new LoginVerifications(page);
    await loginPage.goToURL();
  });



  test('Verify logging in successfully', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
    // await loginPage.validAccount();
    const status = await loginPage.checkAccountStatus();
    switch (status) {
      case 'valid':
        console.log('Account is valid');
        break;
    case 'invalid':
        console.log('Account is invalid');
        break;
    case 'locked':
        console.log('Account is locked');
        break;
    default:
    console.log('Unknown account status');
}
  });

  // test('Verify invalid login', async () => {
  //   await loginPage.login('invalid_user', 'invalidPassword');
  //   await loginPage.invalidAccount();
  // });

  // test('Verify locked account logging in', async () => {
  //   await loginPage.login('locked_out_user', 'secret_sauce');
  //   await loginPage.lockedAccount();
  // });
});
