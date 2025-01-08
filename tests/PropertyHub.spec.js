const { test, expect } = require('@playwright/test');
const { write } = require('fs');
const Index = require('selenium-webdriver/bidi');
const BASE_URL = 'http://192.168.1.193:3000/en';
const PROJECT_NAMES = ['PlayWrightAuto ', 'Playwright Alpha ', 'Playwright Gamma ', 'Playwright Delta '];
const START_PRICE_RANGE = { min: 1, max: 999999 };

async function login(page, user, password) {
  await page.goto(`${BASE_URL}/login`);
  await page.fill('input[name="user"]', user);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('http://192.168.1.193:3000/en/dashboard');
  await expect(page.getByText('Welcome Mr.Aqary Investment')).toBeVisible();
}
function getrandomFacilities(count, min, max) {
  const ids = new Set();
  while (ids.size < count) {
      const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
      ids.add(randomId);
  }
  return Array.from(ids);
}
async function facilities(page){
const randomIds = getrandomFacilities(10, 1, 77);
    // console.log(`Randomly selected IDs: ${randomIds}`);
    for (const id of randomIds) {
        const testId = id.toString(); // Convert number to string for test ID
        try {
            // Attempt to click the element with the corresponding test ID
            await page.getByTestId(testId).click();
            // console.log(`Clicked on test ID: ${testId}`);
        } catch (error) {
          return error;
            // console.warn(`Could not click on test ID: ${testId} - ${error.message}`);
        }
    }
}
function getrandomAmenities(count, min, max) {
  const ids = new Set();
  while (ids.size < count) {
      const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
      ids.add(randomId);
  }
  return Array.from(ids);
}

async function amenities(page){
  const randomIds = getrandomAmenities(10, 78, 200);
      // console.log(`Randomly selected IDs: ${randomIds}`);
      for (const id of randomIds) {
          const testId = id.toString(); // Convert number to string for test ID
          try {
              // Attempt to click the element with the corresponding test ID
              await page.getByTestId(testId).click();
              // console.log(`Clicked on test ID: ${testId}`);
          } catch (error) {
            return error;
              // console.warn(`Could not click on test ID: ${testId} - ${error.message}`);
          }
      }
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
    while (description.length < 800) {
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      if (description.length + randomPhrase.length + 2 <= 800) { // +2 accounts for a period and space
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
async function randomView(page){
  for (let i = 0; i < 5; i++) {
    await page.getByPlaceholder('Select Views').click();
    // randomIndex = randomIndex = Math.floor(Math.random() * 6) + 1;
    await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random()*20)).click();
  }
}
async function PropertyTitle(page) {
  function generateRealEstateTittle() {
    const phrases = [
      "Spacious and modern",
      "Located in the heart of the city",
      "Breathtaking views of the skyline",
      "Ideal for families and professionals",
      "Featuring state-of-the-art amenities",
      "Open-concept living spaces",
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
    while (description.length < 55) {
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      if (description.length + randomPhrase.length + 1 <= 55) { 
        description += `${randomPhrase} `;
      } else {
        break;
      }
    }

    if (description.length > 55) {
      description = description.slice(0, 55).trim();
    } else if (description.length < 55) {
      description = description.padEnd(55, " ");
    }

    return description;
  }

  const description = generateRealEstateTittle();
  await page.getByPlaceholder('Property title').fill(description);

}

async function propertyTypeLogic(page) {
  await page.getByPlaceholder('Select Property type').click();
  await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random()*2)).click();
  await page.getByPlaceholder('Select Unit type').click();
  await page.getByRole('option', { Index: '0' }).click();
}

async function clickMiddleMap(page) {
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
async function AgentAndOwner(page) {
      const mark = await page.locator('input[placeholder="Search by name or number"]');
    await page.getByPlaceholder('Broker Agent').fill('Kashif');
    await page.waitForSelector('//ul[@role="listbox"]', { state: 'visible' });
    const firstOption = page.locator('//ul[@role="listbox"]//li[1]');
    await firstOption.click();
    await mark.fill('Ali');
    const secondOption = page.locator('//ul[@role="listbox"]//li[1]');
    await secondOption.click();
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
  await page.locator('ul[role="listbox"] >> li').nth(0).click();
}
const propertyHubRan = getRandomProject() + getRandomStartingPrice().toString();
async function addPropertyHub(page) {
  await page.getByLabel('open drawer').click();
  await page.getByRole('button', { name: 'Property Hub' }).click();
  await page.getByRole('button', { name: 'Add Property' }).click();
  await expect(page).toHaveURL('http://192.168.1.193:3000/en/dashboard/property_hub/add');
  await page.fill('input[name="property_name"]', propertyHubRan);
  console.log(`This is the PropertyName `+propertyHubRan);
  await page.locator('input[placeholder="Choose category"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(0).click();
  await AgentAndOwner(page);
  await locationRandom(page);
  await clickMiddleMap(page);
  await  propertyTypeLogic(page);
  await randomView(page);
  const startingPrice = getRandomStartingPrice().toString();
  await page.getByPlaceholder('Enter Price').fill(startingPrice);
  await PropertyTitle(page);
  await WriteDescription(page);
  await facilities(page);
  await amenities(page);
  // await expect(page.getByText(/invalid login credentials/)).toBeVisible();
  // await page.getByRole('button', { name: 'Submit' }).click();
}


test('add property commercial land', async ({ page }) => {
  await login(page, 'aqary@aqaryinvestment.com', '123456');
  await addPropertyHub(page);
});
