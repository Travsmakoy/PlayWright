const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');
const { write } = require('fs');
const BASE_URL = 'https://dashboard.aqaryint.com';
const local = 'http://192.168.1.193:3000/en';


async function login(page){
    await page.goto(local);
    await page.getByRole('button', { name: 'Discover Now' }).click();
    await page.getByRole('textbox', { name: 'Email/Username' }).fill('superadmin');
    await page.fill('input[name="password"]', '123456');
    await page.click('button[type="submit"]');
    await expect(page.getByText('Good Morning, Super Admin')).toBeVisible();
}

test('Agriculture', async ({ page }) => {
    await login(page);
    await page.getByRole('button', { name: 'Agriculture' }).click();
    await page.getByRole('button', { name: 'Add Property' }).click();
});