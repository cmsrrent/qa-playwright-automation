import { expect, test } from '@playwright/test';

test('user can log in and log out', async ({ page }) => {
  await page.goto('/login');

  await page.getByLabel('Username').fill('tomsmith');
  await page.getByLabel('Password').fill('SuperSecretPassword');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/\/secure$/);
  await expect(page.getByRole('heading', { name: 'Secure Area' })).toBeVisible();
  await expect(page.locator('#flash')).toContainText('You logged into a secure area!');

  await page.getByRole('button', { name: 'Logout' }).click();

  await expect(page).toHaveURL(/\/login\?logout=1$/);
  await expect(page.locator('#flash')).toContainText('You logged out of the secure area!');
});
