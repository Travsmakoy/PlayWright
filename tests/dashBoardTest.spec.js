const { test, expect } = require('@playwright/test');
const BASE_URL = 'http://192.168.1.193:3000/en';
const VALID_USER = 'admin';
const VALID_PASSWORD = 'newadmin';
const PROJECT_NAMES = ['PlayWrightAuto ', 'Playwright Alpha ', 'Playwright Gamma ', 'Playwright Delta '];
const START_PRICE_RANGE = { min: 1, max: 999999 };

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

function getRandomProject() {
  const randomIndex = Math.floor(Math.random() * PROJECT_NAMES.length);
  return PROJECT_NAMES[randomIndex];
}

function getRandomLicenseNumber() {
  return Math.floor(Math.random() * 999999999) + 1;
}

function getRandomProjectNumber() {
  return Math.floor(Math.random() * 999999999) + 1;
}

function getRandomStartingPrice() {
  return Math.floor(Math.random() * (START_PRICE_RANGE.max - START_PRICE_RANGE.min + 1)) + START_PRICE_RANGE.min;
}

async function drawPolygonOnMap(page) {
  const mapContainer = await page.waitForSelector('#map', { state: 'visible' });
  await mapContainer.scrollIntoViewIfNeeded();

  const polygonButton = await page.locator('//html[1]/body[1]/div[2]/main[1]/form[1]/div[2]/div[1]/div[2]/div[1]/div[6]/div[2]/div[1]/div[3]/div[4]/button[1]');
  await polygonButton.click();
  console.log('Clicked on the polygon icon');

  await page.waitForTimeout(500);

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

  await page.mouse.move(startX, startY);
  await page.mouse.click(startX, startY);
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

  await page.evaluate(() => window.scrollBy(0, 500));
  // await page.evaluate(() => window.maximize());
}

async function addProject(page) {
  const randomProject = getRandomProject() + getRandomStartingPrice().toString();
  const licenseNumber = getRandomLicenseNumber().toString();
  const projectNumber = getRandomProjectNumber().toString();
  const startingPrice = getRandomStartingPrice().toString();

  await page.getByLabel('open drawer').click();
  await page.getByRole('button', { name: 'Projects' }).click();
  await page.getByRole('button', { name: 'Add Project' }).click();
  await expect(page).toHaveURL('http://192.168.1.193:3000/en/dashboard/project/add');

  await page.fill('input[name="project_name"]', randomProject);
  await page.fill('input[name="license_no"]', licenseNumber);
  await page.fill('input[name="project_no"]', projectNumber);
  await page.fill('input[name="starting_price"]', startingPrice);

  await page.locator('input[placeholder="Developer Company"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random() * 10) + 1 - 1).click();
  
  await page.locator('input[placeholder="Select Country"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(0).click();
  await page.locator('input[placeholder="Select State"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(0).click();
  await page.locator('input[placeholder="Select City"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(0).click();
  await page.locator('input[placeholder="Select Community"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random() * 50) + 1 - 1).click();
  await page.locator('input[placeholder="Select Sub Community"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random() * 3) + 1 - 1).click();
  await page.locator('input[placeholder="Select Completion Status"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(0).click();
  
  await page.fill('input[name="completion_percentage"]',(Math.floor(Math.random() * 100) + 1).toString());


await page.locator('input[name="completion_date"]').fill('01/06/2025');

await page.locator('input[name="handover_date"]').fill('01/06/2025');


  await drawPolygonOnMap(page);
  
}

test('LOGIN FUNCTIONALITY', async ({ page }) => {
  await login(page, VALID_USER, VALID_PASSWORD);
});

test('INVALID LOGIN FUNCTIONALITY', async ({ page }) => {
  await page.goto(`${BASE_URL}/login`);
  await page.fill('input[name="user"]', 'invalidcredentials');
  await page.fill('input[name="password"]', 'invalidcredentials');
  await page.click('button[type="submit"]');
  await expect(page.getByText(/no data found/i)).toBeVisible();
});

test('LOGOUT FUNCTIONALITY', async ({ page }) => {
  await login(page, VALID_USER, VALID_PASSWORD);
  await logout(page);
});

test('VERIFY LANDING PAGE', async ({ page }) => {
  await page.goto(BASE_URL);
  await expect(page.getByText('Go to Dashboard')).toBeVisible();
});

test('VERIFY ADD PROJECT PAGE OFFPLAN', async ({ page }) => {
  await login(page, VALID_USER, VALID_PASSWORD);
  await addProject(page);
});
