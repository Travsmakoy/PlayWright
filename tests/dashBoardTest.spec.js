const { test, expect } = require('@playwright/test');
const exp = require('constants');
const BASE_URL = 'http://192.168.1.193:3000/en';
const user = 'admin'; 
const password = 'newadmin';
const ProjectNames = '["PlayWrightAuto", "Project Beta", "Project Gamma", "Project Delta"]';
const licenseNumber = Math.floor(Math.random() * 999999999) + 1;
const randomProject = getRandomElementFromJsonArray(ProjectNames);
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
  await page.fill('input[name="project_name"]', randomProject+StartingPrice.toString());
  await page.fill('input[name="license_no"]',licenseNumber.toString());
  await page.fill('input[name="project_no"]',projectNumber.toString());
  await page.fill('input[name="starting_price"]',StartingPrice.toString());


await page.locator('input[placeholder="Developer Company"]').click();


await page.locator('ul[role="listbox"] >> text=MERAAS').click();

await page.locator('input[placeholder="Select Country"]').click();
await page.locator('ul[role="listbox"] >> text=United Arab Emirates').click();
await page.locator('input[placeholder="Select State"]').click();
await page.locator('ul[role="listbox"] >> text=Abu Dhabi').click();
await page.locator('input[placeholder="Select City"]').click();
await page.locator('ul[role="listbox"] >> text=Abu Dhabi').click();
await page.locator('input[placeholder="Select Community"]').click();
await page.locator('ul[role="listbox"] >> text=Abu Dhabi Gate City').click();

await page.locator('input[placeholder="Select Sub Community"]').click();
await page.locator('ul[role="listbox"] >> text=Mangrove Village').click();
  const mapContainer = await page.waitForSelector('#map', { state: 'visible' });

  await mapContainer.scrollIntoViewIfNeeded();

  const polygonButton = await page.locator('//html[1]/body[1]/div[2]/main[1]/form[1]/div[2]/div[1]/div[2]/div[1]/div[6]/div[2]/div[1]/div[3]/div[4]/button[1]');
  await polygonButton.click();
  console.log('Clicked on the polygon icon');

  await page.waitForTimeout(500);

  // Get map dimensions
  const mapBoundingBox = await mapContainer.boundingBox();
  if (!mapBoundingBox) {
    throw new Error('Failed to retrieve map bounding box');
  }

  const { width: mapWidth, height: mapHeight, x: mapX, y: mapY } = mapBoundingBox;
  const centerX = mapX + mapWidth / 2;
  const centerY = mapY + mapHeight / 2;

  const boxWidth = 20;
  const boxHeight = 20;

  const startX = centerX - boxWidth / 2;
  const startY = centerY - boxHeight / 2;

  await page.mouse.move(startX, startY); // Move to starting point
  await page.mouse.click(startX, startY); // Start drawing
  console.log('Started at top-left corner');
  await page.waitForTimeout(500);

  await page.mouse.move(startX + boxWidth, startY);
  await page.mouse.click(startX + boxWidth, startY);
  console.log('Drew top edge');
  await page.waitForTimeout(500);

  await page.mouse.move(startX + boxWidth, startY + boxHeight);
  await page.mouse.click(startX + boxWidth, startY + boxHeight);
  console.log('Drew right edge');
  await page.waitForTimeout(500);

  await page.mouse.move(startX, startY + boxHeight);
  await page.mouse.click(startX, startY + boxHeight);
  console.log('Drew bottom edge');
  await page.waitForTimeout(500);

  await page.mouse.move(startX, startY);
  await page.mouse.click(startX, startY);
  console.log('Closed the box');
  await page.waitForTimeout(500);

  await page.mouse.click(startX + 1, startY + 1);
  console.log('Completed the box selection');
  await page.waitForTimeout(500);

  await page.evaluate(() => window.scrollBy(0, 250));
})

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