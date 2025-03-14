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
async function locationRandom(page) {
    await page.locator('input[placeholder="Select Country"]').click(),{timeout:1000};
    await page.locator('ul[role="listbox"] >> li').nth(0).click();
    await page.locator('input[placeholder="Select State"]').click();
    await page.locator('ul[role="listbox"] >> li').nth(0).click();
    await page.locator('input[placeholder="Select City"]').click();
    await page.locator('ul[role="listbox"] >> li').nth(0).click();
    await page.locator('input[placeholder="Select Community"]').click();
    await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random() * 50) + 1 - 1).click();
    await page.locator('input[placeholder="Select Sub Community"]').click();
    await page.locator('ul[role="listbox"] >> li').nth(0).click();
  }

  async function clickCenterMap(page){
    await page.getByRole('button', { name: 'Map camera controls' }).click();
  await page.getByRole('button', { name: 'Zoom in' }).click();
  await page.getByRole('button', { name: 'Zoom in' }).click();
  await page.waitForTimeout(2000);

  
  const mapElement = await page.locator("div[style*='z-index: 3'][style*='position: absolute']");
  await mapElement.waitFor({ state: 'visible' });

  const box = await mapElement.boundingBox();
  if (box) {
      await page.mouse.move(box.x + 50, box.y + 50);
      await page.mouse.click(box.x + 50, box.y + 50);
  } else {
      console.error('Element not found or not visible');
  }
  }

test('Add Industry', async ({ page }) => {
    await login(page);
    await page.getByRole('button', { name: 'Industrial' }).click();
    await page.getByRole('button', { name: 'Add Property' }).click();
    await page.getByRole('combobox', { name: 'Choose category' }).click();
    await page.locator('ul[role="listbox"] >> li').nth(0).click();
    const industry = ['Industrial', 'Warehouse', 'Factory', 'Land', 'Labor Camp', 'Open Yard', 'Showroom', 'Workshop'];
    const random = Math.floor(Math.random() * industry.length);
    await page.getByRole('textbox', { name: 'Enter property name' }).fill(industry[random]);
    await locationRandom(page);
    await clickCenterMap(page);
    await page.getByRole('combobox', { name: 'Select Property type' }).click();
    const ran = Math.floor(Math.random() * 2);
    console.log(ran);
    await page.locator('ul[role="listbox"] >> li').nth(ran).click();
});