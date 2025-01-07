const { test, expect } = require('@playwright/test');
const { write } = require('fs');
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

function getRandomProject() {
  const randomIndex = Math.floor(Math.random() * PROJECT_NAMES.length);
  return PROJECT_NAMES[randomIndex];
}

function getRandomStartingPrice() {
  return Math.floor(Math.random() * (START_PRICE_RANGE.max - START_PRICE_RANGE.min + 1)) + START_PRICE_RANGE.min;
}

async function WriteDescription(page) {
  function generateRealEstateDescription() {
    const phrases = [
      "Spacious and modern",
      "Located in the heart of the city",
      "Breathtaking views of the skyline",
      "Ideal for families and professionals",
      "Close to schools, parks, and shopping centers",
      "Featuring state-of-the-art amenities",
      "Open-concept living spaces",
      "Designed for ultimate comfort and convenience",
      "Perfect for entertaining guests",
      "Luxury finishes throughout",
      "Private balcony or patio",
      "Natural light-filled interiors",
      "High ceilings and elegant design",
      "Fully equipped gourmet kitchen",
      "Top-of-the-line appliances",
      "Serene and peaceful surroundings",
      "Walking distance to public transport",
      "Minutes away from major highways",
      "Secure and gated community",
      "Energy-efficient construction",
      "Pet-friendly policies",
      "Resort-style pool and fitness center",
      "Ample storage and parking",
      "Unmatched investment opportunity",
      "Customizable options available"
    ];

    let description = "";
    while (description.length < 750) {
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      if (description.length + randomPhrase.length + 2 <= 780) { // +2 accounts for a period and space
        description += `${randomPhrase}. `;
      } else {
        break;
      }
    }
    return description.trim();
  }
  const description = generateRealEstateDescription();
  await page.fill('textarea[name="description"]', description);
  // console.log("Description filled with:", description);
}
async function locationRandom(page) {
  await page.locator('input[placeholder="Select Country"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(0).click();
  await page.locator('input[placeholder="Select State"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(0).click();
  await page.locator('input[placeholder="Select City"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(0).click();
  await page.locator('input[placeholder="Select Community"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random() * 50) + 1 - 1).click();
  await page.locator('input[placeholder="Select Sub Community"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random() * 2) + 1 - 1).click();
}
async function addPropertyHub(page) {
  const randomProject = getRandomProject() + getRandomStartingPrice().toString();
  await page.getByLabel('open drawer').click();
  await page.getByRole('button', { name: 'Property Hub' }).click();
  await page.getByRole('button', { name: 'Add Property' }).click();
  await expect(page).toHaveURL('http://192.168.1.193:3000/en/dashboard/property_hub/add');
  await page.fill('input[name="property_name"]', randomProject);
  await page.locator('input[placeholder="Choose category"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random() * 2) + 1 - 1).click();
  await locationRandom(page)
  await WriteDescription(page);

  // const elements = await page.$$('.mui-5wgy6m[data-testid]');
  // await elements[0].click('1');
}

test('login', async ({ page }) => {
  await login(page, VALID_USER, VALID_PASSWORD);
});

test('verify dashboard redirection', async ({ page }) => {
  await page.goto(BASE_URL);
  await expect(page.getByText(`Go to Dashboard`)).toBeVisible();
});

test('add property hub', async ({ page }) => {
  await login(page, VALID_USER, VALID_PASSWORD);
  await addPropertyHub(page);
});
