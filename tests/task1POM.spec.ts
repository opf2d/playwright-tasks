// import { test } from '@playwright/test';
// import { loginVerifications } from '../Pages/login.ts';

// test.describe('Login Test Cases', () => {
//   let loginPage: loginVerifications;

//   test.beforeEach('Navigate to login page', async ({ page }) => {
//     loginPage = new loginVerifications(page);
//     await loginPage.goToURL();
//   });

//   test('Verify logging in successfully', async () => {
//     await loginPage.login('standard_user', 'secret_sauce');
//     await loginPage.validAccount();
//   });

//   test('Verify invalid login', async () => {
//     await loginPage.login('invalid_user', 'invalidPassword');
//     await loginPage.invalidAccount();
//   });

//   test('Verify locked account logging in', async () => {
//     await loginPage.login('locked_out_user', 'secret_sauce');
//     await loginPage.lockedAccount();
//   });
// });
