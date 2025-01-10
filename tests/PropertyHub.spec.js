const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');
const { write } = require('fs');
const BASE_URL = 'http://192.168.1.193:3000/en';
const PROJECT_NAMES = ['PlayWright Beta ', 'Playwright Alpha ', 'Playwright Gamma ', 'Playwright Delta '];
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

async function ifLand(page){  
  await page.getByPlaceholder('Select Unit type').click();
  const option = page.locator('[data-option-index="0"]');
  await option.click();
  await randomView(page);  
  await page.getByPlaceholder('Enter Plot Area').fill(Math.floor(Math.random()*1000).toString());
  await page.getByPlaceholder('Enter Built Up Area').fill(Math.floor(Math.random()*500).toString());
  await page.getByPlaceholder('Enter sector number').fill(Math.floor(Math.random()*100).toString());
  await page.getByPlaceholder('Enter Property number').fill(Math.floor(Math.random()*100).toString());
  await page.getByPlaceholder('Select Ownership').click();
  await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random()*4)).click();
  await page.getByText('currency').click();
  await page.getByRole('option', { name: 'UAE Dirham AED' }).click();
  await page.getByPlaceholder('Enter service charge').fill((Math.floor(Math.random() * 1000) + 1).toString());
  await page.getByText('measure', { exact: true }).click();
  await page.getByRole('option', { name: 'sqft' }).click();
  const startingPrice = getRandomStartingPrice().toString();
  await page.getByPlaceholder('Enter Price').fill(startingPrice);
}
async function IfResidential(page){
  for (let i = 0; i < 2; i++) {
    await page.getByPlaceholder('Select Unit type').click();
    const random = Math.floor(Math.random() * 3);
    const option = page.locator(`[data-option-index="${random}"]`);  
    await option.click();  
  }
  await randomView(page);
  await page.getByPlaceholder('Enter Plot Area').fill((Math.floor(Math.random() * 1000) + 500).toString());
  await page.getByPlaceholder('Enter Built Up Area').fill((Math.floor(Math.random() * 499) + 1).toString());
  await page.getByPlaceholder('Enter sector number').fill(Math.floor(Math.random()*100).toString());
  await page.getByPlaceholder('Enter Property number').fill(Math.floor(Math.random()*100).toString());
  await page.getByPlaceholder('Select Ownership').click();
  await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random()*4)).click();
  await page.getByPlaceholder('Select Life Style').click();
  await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random()*1)).click();
  await page.locator('input[name="completion_date"]').fill('01/20/2025');
  await page.locator('input[name="handover_date"]').fill('01/31/2025');
  await page.locator('input[name="start_date"]').fill('01/01/2025');
  await page.getByText('currency').click();
  await page.getByRole('option', { name: 'UAE Dirham AED' }).click();
  await page.getByPlaceholder('Enter service charge').fill((Math.floor(Math.random() * 1000) + 1).toString());
  await page.getByText('measure', { exact: true }).click();
  await page.getByRole('option', { name: 'sqft' }).click();
  await page.getByPlaceholder('Enter Min Area').fill((Math.floor(Math.random() * 1000) + 1).toString());
  await page.getByPlaceholder('Enter Max Area').fill((Math.floor(Math.random() * 1500) + 1000).toString());
  await page.locator('input[placeholder="Select Furnished"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random() * 3)).click();
  await page.getByPlaceholder('No of units').fill((Math.floor(Math.random() * 100) + 1).toString());
  await page.getByPlaceholder('Enter no of floors').fill((Math.floor(Math.random() * 100) + 1).toString());
  await page.getByPlaceholder('Enter no of parking').fill((Math.floor(Math.random() * 100) + 1).toString());
  await page.getByPlaceholder('Enter no of pools').fill((Math.floor(Math.random() * 100) + 1).toString());
  await page.getByPlaceholder('Enter no of elevators').fill((Math.floor(Math.random() * 100) + 1).toString());
  const startingPrice = getRandomStartingPrice().toString();
  await page.getByPlaceholder('Enter Price').fill(startingPrice);
  const randomIndex = Math.floor(Math.random() * 1);
  await page.getByPlaceholder('Select Completion Status').click();
  const listItems = page.locator('ul[role="listbox"] >> li');
  const selectedOption = listItems.nth(randomIndex);
  let selectedText = '';
  try {
    selectedText = await selectedOption.textContent();
  } catch (error) {
    console.error('Error getting text content:', error);
  }
  await selectedOption.click();

  if (selectedText === 'Off Plan') {
     await page.locator('input[name="completion_percentage_date"]').fill('01/08/2025');
     await page.fill('input[name="completion_percentage"]',(Math.floor(Math.random() * 100) + 1).toString());
  } else {
    return null;
  }
}

async function propertyTypeLogic(page) {
  await page.getByPlaceholder('Select Property type').click();
  
  const indices = [8, 11, 2, 3, 4, 0, 2];
  const randomIndex = Math.floor(Math.random() * indices.length);
  const randomValue = indices[randomIndex];
  const listItems = page.locator('ul[role="listbox"] >> li');
  const selectedOption = listItems.nth(randomValue);
 
  let selectedText = '';
  try {
    selectedText = await selectedOption.textContent();
    console.log('Selected text:', selectedText); 
    console.log(randomValue);
  } catch (error) {
    console.error('Error getting text content:', error);
  }
  
  await selectedOption.click();

  if (selectedText === 'Commercial Lands' || selectedText === 'Mixed used lands' || selectedText === 'Residential Lands') {
    await ifLand(page);
  } else {
    await IfResidential(page);
  }
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
  console.log(`PropertyName: `+propertyHubRan);
  const mark = await page.locator('input[placeholder="Search by name or number"]');
  await page.getByPlaceholder('Broker Agent').fill('Kashif');
  await page.waitForSelector('//ul[@role="listbox"]', { state: 'visible' });
  const firstOption = page.locator('//ul[@role="listbox"]//li[1]');
  await firstOption.click();
  await mark.fill('Ali');
  const secondOption = page.locator('//ul[@role="listbox"]//li[1]');
  await secondOption.click();
  await page.locator('input[placeholder="Choose category"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(0).click();
  // const categoryRan = Math.floor(Math.random() * 2);
  // const listItems = page.locator('ul[role="listbox"] >> li');
  // const selectedOption = listItems.nth(categoryRan);
 
  // let selectedText = '';
  // try {
  //   selectedText = await selectedOption.textContent();
  //   console.log('Selected text:', selectedText); 
  //   console.log(categoryRan);
  // } catch (error) {
  //   console.error('Error getting text content:', error);
  // }
  // await selectedOption.click();
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
  await propertyTypeLogic(page);
  await PropertyTitle(page);
  await WriteDescription(page);
  await facilities(page);
  await amenities(page);
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText(/Property created successfully/)).toBeVisible();
}

async function addGallery(page){
  await page.getByRole('row', { name: `${propertyHubRan}` }).getByRole('button').nth(7).click();
  await page.locator('div').filter({ hasText: /^Gallery$/ }).getByRole('link').click();
  for(let i=0; i<5; i++){
      await page.getByRole('button', { name: 'Add Gallery' }).click();
      await page.getByPlaceholder('Select Gallery Type').click();
      await page.locator('ul[role="listbox"] >> li').nth(0).click();
      await page.getByPlaceholder('Select Media Type').click();
      await page.locator('ul[role="listbox"] >> li').nth(0).click();
      const folderPath = 'D:\\Mark OneDrive\\OneDrive - aqary international group\\Desktop\\IMAGES';
      const files = fs.readdirSync(folderPath);
      const randomFile = files[Math.floor(Math.random() * files.length)];
      const filePath = path.join(folderPath, randomFile);
      const fileInput = await page.$('//input[@type="file"]');
      await fileInput.setInputFiles(filePath);
      await page.getByRole('button', { name: 'submit' }).click();
      await expect(page.getByText(/Created successfully/)).toBeVisible();
    }
    await page.getByRole('link', { name: 'Property gallery' }).click();
}
async function addPlan(page) {
  await page.getByRole('row', { name: `${propertyHubRan}` }).getByRole('button').nth(7).click();
  await page.locator('div').filter({ hasText: /^Manage Plan$/ }).getByRole('link').click();
  for(let i=0; i<3; i++){
    await page.getByRole('button', { name: 'Add Plan' }).click();
    await page.getByPlaceholder('Select Plan Type').click();
    await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random() * 3) + 1 - 1).click();
    const folderPath = 'D:\\Mark OneDrive\\OneDrive - aqary international group\\Desktop\\IMAGES';
    const files = fs.readdirSync(folderPath);
    const randomFile = files[Math.floor(Math.random() * files.length)];
    const filePath = path.join(folderPath, randomFile);
    const fileInput = await page.$('//input[@type="file"]');
    await fileInput.setInputFiles(filePath);
    await page.getByRole('button', { name: 'submit' }).click();
    await expect(page.getByText(/Created plan successfully/)).toBeVisible();
  }
  await page.getByRole('link', { name: 'Properties', exact: true }).click();
}

async function unitType(page){
  await page.getByRole('row', { name: `${propertyHubRan}` }).getByRole('button').nth(7).click();
  await page.locator('div').filter({ hasText: /^Manage Unit Types$/ }).getByRole('link').click();
  await page.getByRole('button', { name: 'Add Unit Type' }).click();
  await page.getByPlaceholder('Select unit type').click();
  await page.locator('ul[role="listbox"] >> li').nth(0).click();
  const randomType=['STUDIO','1BHK','2BHK','3BHK','4BHK','5BHK','6BHK','7BHK','8BHK','9BHK','10BHK'];
  const randomIndex = Math.floor(Math.random() * randomType.length);
  const randomValue = randomType[randomIndex];
  await page.getByPlaceholder('Enter type name').fill(`${randomValue}`);
  await page.getByPlaceholder('Enter min area').fill((Math.floor(Math.random() * 1000) + 1).toString());
  await page.getByPlaceholder('Enter max area').fill((Math.floor(Math.random() * 1800) + 1000).toString());
  await page.getByPlaceholder('Enter min price').fill((Math.floor(Math.random() * 1000) + 1).toString());
  await page.getByPlaceholder('Enter max price').fill((Math.floor(Math.random() * 1800) + 1000).toString());
  const folderPath = 'D:\\Mark OneDrive\\OneDrive - aqary international group\\Desktop\\IMAGES FOR AUTO\\UNIT TYPES';
  const files = fs.readdirSync(folderPath);
  const randomFile = files[Math.floor(Math.random() * files.length)];
  const filePath = path.join(folderPath, randomFile);
  const fileInput = await page.$('//input[@type="file"]');
  await fileInput.setInputFiles(filePath);
  if(page.getByPlaceholder('Enter No of Parking').isVisible())
    {
    await page.getByPlaceholder('Enter No of Parking').fill((Math.floor(Math.random() * 100) + 1).toString());
    };
  await page.getByRole('button', { name: 'submit' }).click();
  await page.getByRole('link', { name: 'Manage unit types', exact: true }).click();
}
test('add property sale', async ({ page }) => {
  await login(page, 'aqary@aqaryinvestment.com', '123456');
  await addPropertyHub(page);
  await unitType(page);
  await addGallery(page);
  await addPlan(page);
});