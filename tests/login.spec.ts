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
