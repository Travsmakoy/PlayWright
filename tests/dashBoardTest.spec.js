const { test, expect } = require('@playwright/test');
const exp = require('constants');
const BASE_URL = 'http://192.168.1.193:3000/en';
const user = 'admin'; 
const password = 'newadmin';
const ProjectNames = '["PlayWrightAuto", "Project Beta", "Project Gamma", "Project Delta"]';
const randomProject = getRandomElementFromJsonArray(ProjectNames);
const licenseNumber = Math.floor(Math.random() * 999999999) + 1;
const projectNumber = Math.floor(Math.random() * 999999999) + 1;
const StartingPrice = Math.floor(Math.random() * 999999) + 1;


test('LOGIN FUNCTIONALITY', async ({ page }) => {

  await login(page, user, password);

});
test('INVALID LOGIN FUNCTIONALITY', async ({ page }) => {
  await page.goto(`${BASE_URL}/login`);


  await page.fill('input[name="user"]', 'invalidcredentials'); 
  await page.fill('input[name="password"]', 'invalidcredentials');

  await page.click('button[type="submit"]');

  await expect(page.getByText(/no data found/i)).toBeVisible();
});

test('LOGOUT FUNCTIONALITY', async ({ page }) => {
  const user = 'admin';
  const password = 'newadmin';

  await login(page, user, password);

  await page.locator('button.MuiButtonBase-root.setting').click();
  await page.getByRole('button', { name: 'Logout' }).click();
  await expect(page).toHaveURL(`${BASE_URL}/login`);
  await expect(page.getByRole('heading', { name: 'Hi, Welcome Back' })).toBeVisible();
});

test('VERIFY LANDING PAGE', async ({ page }) => {
  await page.goto(BASE_URL);
  await expect(page.getByText('Go to Dashboard')).toBeVisible();
});

test('VERIFY ADD PROJECT PAGE',async({page})=>{

  await login(page, user, password);
  await page.getByLabel('open drawer').click();
  await page.getByRole('button', { name: 'Projects' }).click();
  await page.getByRole('button', { name: 'Add Project' }).click();
  await expect(page).toHaveURL('http://192.168.1.193:3000/en/dashboard/project/add');
  await page.fill('input[name="project_name"]', randomProject);
  await page.fill('input[name="license_no"]',licenseNumber.toString());
  await page.fill('input[name="project_no"]',projectNumber.toString());
  await page.fill('input[name="starting_price"]',StartingPrice.toString());


await page.locator('input[placeholder="Developer Company"]').click();

await page.fill('input[placeholder="Developer Company"]', 'MERAAS');

await page.waitForSelector('ul[role="listbox"]'); // Adjust if necessary based on your dropdown

await page.locator('ul[role="listbox"] >> text=MERAAS').click();


})


// Function to get a random element from a JSON string
function getRandomElementFromJsonArray(jsonArrayString) {
  try {
    const array = JSON.parse(jsonArrayString);
    if (!Array.isArray(array)) {
      throw new Error("Input JSON is not an array.");
    }
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  } catch (error) {
    console.error("Error parsing JSON or accessing array:", error.message);
    return null;
  }
}

async function login(page, user, password) {
  await page.goto(`${BASE_URL}/login`); 

  await page.fill('input[name="user"]', user); 
  await page.fill('input[name="password"]', password);

  await page.click('button[type="submit"]'); 

  await expect(page).toHaveURL('http://192.168.1.193:3000/en/dashboard');
  await expect(page.getByText('Welcome Mr.Super Ahmad')).toBeVisible(); 
}