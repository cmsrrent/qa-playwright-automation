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
