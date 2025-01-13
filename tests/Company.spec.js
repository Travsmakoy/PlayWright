const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');
const { write } = require('fs');
const BASE_URL = 'http://192.168.1.193:3000/en';
const VALID_USER = 'admin';
const VALID_PASSWORD = 'newadmin';
const PROJECT_NAMES = ['PlayWright Beta ', 'Playwright Alpha ', 'Playwright Gamma ', 'Playwright Delta '];

async function login(page, user, password) {
  await page.goto(`${BASE_URL}/login`);
  await page.fill('input[name="user"]', user);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('http://192.168.1.193:3000/en/dashboard');
  await expect(page.getByText('Weclome, Super Ahmad')).toBeVisible();
}

async function locationRandom(page) {
  await page.locator('input[placeholder="Select Country"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(0).click();
  await page.locator('input[placeholder="Select State"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(0).click();
  await page.locator('input[placeholder="Select City"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(0).click();
  await page.locator('input[placeholder="Select Community"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random() * 60) + 1 - 1).click();
  await page.locator('input[placeholder="Select Sub Community"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random() * 1) + 1 - 1).click();
}

async function addCompany(page){
  await page.getByLabel('open drawer').click();
  await page.getByRole('button', { name: 'Company', exact: true }).click();
  await page.getByRole('button', { name: 'Add Company' }).click();
  await page.getByPlaceholder('Please Select Company Type').click();
  await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random() * 3) + 1 ).click();
  await page.getByPlaceholder('Choose category').click();
  await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random() * 3) + 1 ).click();
  await page.getByPlaceholder('Choose a company activity').click();
  await page.locator('ul[role="listbox"] >> li').nth(0).click();
  const ProjectNumber = Math.floor(Math.random() * 1000000);
  await page.getByPlaceholder('Enter a company name').fill(PROJECT_NAMES[Math.floor(Math.random() * 4)] + ProjectNumber);

  await locationRandom(page);

  const mapElement = await page.locator("div[style*='z-index: 3'][style*='position: absolute']");
  await mapElement.waitFor({ state: 'visible' });

  const box = await mapElement.boundingBox();
  if (box) {
      await page.mouse.move(box.x + 50, box.y + 50);
      await page.mouse.click(box.x + 50, box.y + 50);
  } else {
      console.error('Element not found or not visible');
  }
  await page.getByPlaceholder('Enter Commercial License No').fill((Math.floor(Math.random() * 1000000)).toString());

  await licenseFile(page);

  await page.locator('input[name="commercial_license_registration_date"]').fill('01/20/2025');
  await page.locator('input[name="commercial_issue_date"]').fill('01/25/2025');
  await page.locator('input[name="commercial_license_expiry"]').fill('01/31/2025');

  await page.getByPlaceholder('Enter vat number').fill('VAT'+(Math.floor(Math.random() * 1000000)).toString());
  await page.getByPlaceholder('Please Select VAT Status').click();
  await page.locator('ul[role="listbox"] >> li').nth((Math.floor(Math.random() * 2) + 1)).click();

  await vatFile(page);

}

async function licenseFile(page){
  const folderPath = 'D:\\Mark OneDrive\\OneDrive - aqary international group\\Desktop\\IMAGES';
  const files = fs.readdirSync(folderPath);
  const randomFile = files[Math.floor(Math.random() * files.length)];
  const filePath = path.join(folderPath, randomFile);
  const fileInput = await page.$('//input[@type="file"]');
  await fileInput.setInputFiles(filePath);
}

async function vatFile(page){
  const folderPath = 'D:\\Mark OneDrive\\OneDrive - aqary international group\\Desktop\\IMAGES';
  const files = fs.readdirSync(folderPath);
  const randomFile = files[Math.floor(Math.random() * files.length)];
  const filePath = path.join(folderPath, randomFile);
  await page.locator('input[name="vat_file_url"]').setInputFiles(filePath);
}


test('add company', async ({page}) => {
    await login(page, VALID_USER, VALID_PASSWORD);
    await addCompany(page);
    });