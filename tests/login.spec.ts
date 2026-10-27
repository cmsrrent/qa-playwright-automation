import { expect, test } from '@playwright/test';
import { LoginPage } from './pages/login.page';

test('user can log in to Sauce Demo', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/\/inventory\.html$/);
  await expect(page.getByText('Products', { exact: true })).toBeVisible();
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
});

test('shows an error when submitting the login form empty', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.submit();

  await expect(page.getByRole('alert')).toContainText('Epic sadface: Username is required');
});

test('shows an error when the username is missing', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('', 'secret_sauce');

  await expect(page.getByRole('alert')).toContainText('Epic sadface: Username is required');
});

test('shows an error when the password is missing', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', '');

  await expect(page.getByRole('alert')).toContainText('Epic sadface: Password is required');
});

test('rejects a locked-out user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('locked_out_user', 'secret_sauce');

  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('alert')).toContainText(
    'Epic sadface: Sorry, this user has been locked out.',
  );
});

test('rejects a valid username with an invalid password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'invalid_password');

  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('alert')).toContainText(
    'Epic sadface: Username and password do not match any user in this service',
  );
});

test('rejects an invalid username and invalid password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('invalid_user', 'invalid_password');

  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('alert')).toContainText(
    'Epic sadface: Username and password do not match any user in this service',
  );
});
