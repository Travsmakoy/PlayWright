const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');
const { write } = require('fs');
const BASE_URL = 'http://192.168.1.193:3000/en';
const VALID_USER = 'admin';
const VALID_PASSWORD = 'newadmin';

async function login(page, user, password) {
  await page.goto(`${BASE_URL}/login`);
  await page.fill('input[name="user"]', user);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('http://192.168.1.193:3000/en/dashboard');
  await expect(page.getByText('Welcome Mr.Super Ahmad')).toBeVisible();
}

async function logout(page) {
  await page.locator('button.MuiButtonBase-root.setting').click();
  await page.getByRole('button', { name: 'Logout' }).click();
  await expect(page).toHaveURL(`${BASE_URL}/login`);
  await expect(page.getByRole('heading', { name: 'Hi, Welcome Back' })).toBeVisible();
}

test('login', async ({ page }) => {
  await login(page, VALID_USER, VALID_PASSWORD);
});

test('verify invalid credentials', async ({ page }) => {
  await page.goto(`${BASE_URL}/login`);
  await page.fill('input[name="user"]', 'admin');
  await page.fill('input[name="password"]', 'ahdmin');
  await page.click('button[type="submit"]');
  await expect(page.getByText(/invalid login credentials/)).toBeVisible();
});  
 
test('logout', async ({ page }) => { 
  await login(page, VALID_USER, VALID_PASSWORD);
  await logout(page);1  
});
