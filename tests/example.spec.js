const { test, expect } = require('@playwright/test');
const BASE_URL = 'http://192.168.1.193:3000/en';

async function login(page, user, password) {
  await page.goto(`${BASE_URL}/login`); 

  await page.fill('input[name="user"]', user); 
  await page.fill('input[name="password"]', password);

  await page.click('button[type="submit"]'); 

  await expect(page).toHaveURL('http://192.168.1.193:3000/en/dashboard');
  await expect(page.getByText('Welcome Mr.Super Ahmad')).toBeVisible(); 
}


test('Verify title of the dashboard', async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page).toHaveTitle(/Aqary International Group Dashboard/);
});


test('Test login and navigation through pages', async ({ page }) => {
  const user = 'admin'; 
  const password = 'newadmin';

  await login(page, user, password);

});

test('Login with invalid credentials', async ({ page }) => {
  await page.goto(`${BASE_URL}/login`);


  await page.fill('input[name="user"]', 'invalidUser'); 
  await page.fill('input[name="password"]', 'wrongPassword');

  await page.click('button[type="submit"]');

  await expect(page.getByText(/no data found/i)).toBeVisible();
});


test('Logout functionality', async ({ page }) => {
  const user = 'admin';
  const password = 'newadmin';

  await login(page, user, password);

  await page.locator('button.MuiButtonBase-root.setting').click();
  await page.getByRole('button', { name: 'Logout' }).click();
  await expect(page).toHaveURL(`${BASE_URL}/login`);
  await expect(page.getByRole('heading', { name: 'Hi, Welcome Back' })).toBeVisible();
});

test('Add Project',async({page})=>{
  const user = 'admin'; 
  const password = 'newadmin';

  await login(page, user, password);
  await page.getByLabel('open drawer').click();
  await page.getByRole('button', { name: 'Projects' }).click();
  await page.getByRole('button', { name: 'Add Project' }).click();
})
