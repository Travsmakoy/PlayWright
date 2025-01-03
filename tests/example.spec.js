// @ts-check
const { test, expect } = require('@playwright/test');

// Base URL
const BASE_URL = 'http://192.168.1.193:3000/en';

// Reusable function to log in
async function login(page, user, password) {
  await page.goto(`${BASE_URL}/login`); // Navigate to the login page

  // Fill out login form
  await page.fill('input[name="user"]', user); // Updated to match the correct name attribute
  await page.fill('input[name="password"]', password);

  // Submit the form
  await page.click('button[type="submit"]'); // Use the correct ID for the submit button

  // Wait for navigation and verify login
  await expect(page).toHaveURL('http://192.168.1.193:3000/en/dashboard');
  await expect(page.getByText('Welcome Mr.Super Ahmad')).toBeVisible(); // Adjust based on your dashboard's welcome text
}

// Test to verify the title
test('Verify title of the dashboard', async ({ page }) => {
  await page.goto(BASE_URL);

  // Expect a title "to contain" a substring
  await expect(page).toHaveTitle(/Aqary International Group Dashboard/);
});

// Test login functionality and navigation
test('Test login and navigation through pages', async ({ page }) => {
  const user = 'admin'; // Replace with valid test username
  const password = 'newadmin'; // Replace with valid test password

  // Log in
  await login(page, user, password);

});

test('Login with invalid credentials', async ({ page }) => {
  await page.goto(`${BASE_URL}/login`);

  // Enter invalid credentials
  await page.fill('input[name="user"]', 'invalidUser'); // Updated for the correct name attribute
  await page.fill('input[name="password"]', 'wrongPassword');

  // Submit the form
  await page.click('button[type="submit"]');

  // Verify error message
  await expect(page.getByText(/no data found/i)).toBeVisible();
});

// Test logout functionality
test('Logout functionality', async ({ page }) => {
  const user = 'admin';
  const password = 'newadmin';

  // Log in
  await login(page, user, password);

  // Click logout
  await page.locator('button.MuiButtonBase-root.setting').click();
  await page.getByRole('button', { name: 'Logout' }).click();

  // Verify logout and redirection to login page
  await expect(page).toHaveURL(`${BASE_URL}/login`);
  await expect(page.getByRole('heading', { name: 'Hi, Welcome Back' })).toBeVisible();
});
