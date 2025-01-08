const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');
const { write } = require('fs');
const BASE_URL = 'http://192.168.1.193:3000/en';
const VALID_USER = 'admin';
const VALID_PASSWORD = 'newadmin';
const PROJECT_NAMES = ['PlayWright Beta ', 'Playwright Alpha ', 'Playwright Gamma ', 'Playwright Delta '];
const START_PRICE_RANGE = { min: 1, max: 9999999 };

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

function getRandomProjectRan() {
  return Math.floor(Math.random() * 1000 ) +1;
}

function getRandomStartingPrice() {
  return Math.floor(Math.random() * (START_PRICE_RANGE.max - START_PRICE_RANGE.min + 1)) + START_PRICE_RANGE.min;
}

async function drawPolygonOnMap(page) {
  const mapContainer = await page.waitForSelector('#map', { state: 'visible' });
  await mapContainer.scrollIntoViewIfNeeded();
  const polygonButton = await page.locator('//html[1]/body[1]/div[2]/main[1]/form[1]/div[2]/div[1]/div[2]/div[1]/div[6]/div[2]/div[1]/div[3]/div[4]/button[1]');
  await polygonButton.click();
  // console.log('Clicked on the polygon icon');
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
  // console.log('Started at top-left corner');
  await page.waitForTimeout(500);

  await page.mouse.move(startX + boxWidth, startY);
  await page.mouse.click(startX + boxWidth, startY);
  // console.log('Drew top edge');
  await page.waitForTimeout(500);

  await page.mouse.move(startX + boxWidth, startY + boxHeight);
  await page.mouse.click(startX + boxWidth, startY + boxHeight);
  // console.log('Drew right edge');
  await page.waitForTimeout(500);

  await page.mouse.move(startX, startY + boxHeight);
  await page.mouse.click(startX, startY + boxHeight);
  // console.log('Drew bottom edge');
  await page.waitForTimeout(500);

  await page.mouse.move(startX, startY);
  await page.mouse.click(startX, startY);
  // console.log('Closed the box');
  await page.waitForTimeout(500);

  await page.mouse.click(startX + 1, startY + 1);
  // console.log('Completed the box selection');
  await page.waitForTimeout(500);

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
async function projectDetails(page) {
  await page.locator('input[placeholder="Select Completion Status"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(0).click();
  await page.fill('input[name="completion_percentage"]',(Math.floor(Math.random() * 100) + 1).toString());
  await page.locator('input[placeholder="Select Life Style"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random() * 2)).click();
  await page.locator('input[name="completion_percentage_date"]').fill('01/08/2025');
  await page.locator('input[name="completion_date"]').fill('01/20/2025');
  await page.locator('input[name="handover_date"]').fill('01/31/2025');
  await page.locator('input[name="start_date"]').fill('01/01/2025');
  await page.fill('input[name="plot_area"]',(Math.floor(Math.random() * 1000) + 1).toString());
  await page.fill('input[name="built_up_area"]',(Math.floor(Math.random() * 200) + 1).toString());
  await page.locator('input[placeholder="Select Furnished"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random() * 3)).click();
  await page.fill('input[name="no_of_properties"]',(Math.floor(Math.random() * 150) + 1).toString());
  await page.locator('input[placeholder="Select Ownership"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random() * 6)).click();
  await page.evaluate(() => window.scrollBy(0, 350));
  await page.getByText('currency').click();
  await page.getByRole('option', { name: 'UAE Dirham AED' }).click();
  await page.getByPlaceholder('Enter service charge').fill((Math.floor(Math.random() * 1000) + 1).toString());
  await page.getByText('measure', { exact: true }).click();
  await page.getByRole('option', { name: 'sqft' }).click();
}
const randomProjectOffPlan = getRandomProject() + getRandomProjectRan().toString();
async function addProject(page) {
  const licenseNumber = getRandomLicenseNumber().toString();
  const projectNumber = getRandomProjectNumber().toString();
  const startingPrice = getRandomStartingPrice().toString();
  await page.getByLabel('open drawer').click();
  await page.getByRole('button', { name: 'Projects' }).click();
  await page.getByRole('button', { name: 'Add Project' }).click();
  await expect(page).toHaveURL('http://192.168.1.193:3000/en/dashboard/project/add');
  await page.fill('input[name="project_name"]', randomProjectOffPlan+ ' Offplan');
  console.log('Project Name:', randomProjectOffPlan+ ' Offplan');
  await page.fill('input[name="license_no"]', licenseNumber);
  await page.fill('input[name="project_no"]', projectNumber);
  await page.fill('input[name="starting_price"]', startingPrice);
  await page.locator('input[placeholder="Developer Company"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random() * 10) + 1 - 1).click();
  await locationRandom(page);
  await page.evaluate(() => window.scrollBy(0, 250));
  await drawPolygonOnMap(page);
  await projectDetails(page);
  await WriteDescription(page);
  await facilities(page);
  await amenities(page);
  await page.getByRole('button', { name: 'submit' }).click();
  await expect(page.getByText(/Project created successfully/)).toBeVisible();
  await addOffplanGallery(page);
  await addOffplanPlan(page);
}
async function readyDetails(page) {
  await page.locator('input[placeholder="Select Completion Status"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(1).click();
  await page.locator('input[placeholder="Select Life Style"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random() * 2)).click();
  await page.locator('input[name="completion_date"]').fill('01/20/2025');
  await page.locator('input[name="handover_date"]').fill('01/31/2025');
  await page.locator('input[name="start_date"]').fill('01/01/2025');
  await page.fill('input[name="plot_area"]',(Math.floor(Math.random() * 1000) + 1).toString());
  await page.fill('input[name="built_up_area"]',(Math.floor(Math.random() * 200) + 1).toString());
  await page.locator('input[placeholder="Select Furnished"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random() * 3)).click();
  await page.fill('input[name="no_of_properties"]',(Math.floor(Math.random() * 150) + 1).toString());
  await page.locator('input[placeholder="Select Ownership"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random() * 6)).click();
  await page.evaluate(() => window.scrollBy(0, 350));
  await page.getByText('currency').click();
  await page.getByRole('option', { name: 'UAE Dirham AED' }).click();
  await page.getByPlaceholder('Enter service charge').fill((Math.floor(Math.random() * 1000) + 1).toString());
  await page.getByText('measure', { exact: true }).click();
  await page.getByRole('option', { name: 'sqft' }).click();
}
const randomProjectReady = getRandomProject() + getRandomProjectRan().toString();
async function addProjectReady(page) {
  const licenseNumber = getRandomLicenseNumber().toString();
  const projectNumber = getRandomProjectNumber().toString();
  const startingPrice = getRandomStartingPrice().toString();
  await page.getByLabel('open drawer').click();
  await page.getByRole('button', { name: 'Projects' }).click();
  await page.getByRole('button', { name: 'Add Project' }).click();
  await expect(page).toHaveURL('http://192.168.1.193:3000/en/dashboard/project/add');
  await page.fill('input[name="project_name"]', randomProjectReady+' Ready');
  console.log('Project Name:', randomProjectReady+' Ready');
  await page.fill('input[name="license_no"]', licenseNumber);
  await page.fill('input[name="project_no"]', projectNumber);
  await page.fill('input[name="starting_price"]', startingPrice);
  await page.locator('input[placeholder="Developer Company"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random() * 10) + 1 - 1).click();
  await locationRandom(page);
  await page.evaluate(() => window.scrollBy(0, 250));
  await drawPolygonOnMap(page);
  await readyDetails(page);
  await WriteDescription(page);
  await facilities(page);
  await amenities(page);
  await page.getByRole('button', { name: 'submit' }).click();
  await expect(page.getByText(/Project created successfully/)).toBeVisible();
  await addReadyphaseGallery(page);
  await addReadyphasePlan(page);
}
const randomProjectPhase = getRandomProject() + getRandomProjectRan().toString();
async function addProjectMultiPhase(page) {
  const licenseNumber = getRandomLicenseNumber().toString();
  const projectNumber = getRandomProjectNumber().toString();
  const startingPrice = getRandomStartingPrice().toString();
  await page.getByLabel('open drawer').click();
  await page.getByRole('button', { name: 'Projects' }).click();
  await page.getByRole('button', { name: 'Add Project' }).click();
  await expect(page).toHaveURL('http://192.168.1.193:3000/en/dashboard/project/add');
  await page.fill('input[name="project_name"]', randomProjectPhase+' Multiphase');
  console.log('Project Name:', randomProjectPhase+' Multiphase');
  await page.fill('input[name="license_no"]', licenseNumber);
  await page.fill('input[name="project_no"]', projectNumber);
  await page.fill('input[name="starting_price"]', startingPrice);
  await page.locator('input[placeholder="Developer Company"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random() * 10) + 1 - 1).click();
  await page.getByRole('checkbox').click();
  await locationRandom(page);
  await page.evaluate(() => window.scrollBy(0, 250));
  await drawPolygonOnMap(page);
  await page.locator('input[placeholder="Select Life Style"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random() * 2)).click();
  await page.locator('input[name="start_date"]').fill('01/01/2025');
  await page.evaluate(() => window.scrollBy(0, 350));
  await WriteDescription(page);
  await facilities(page);
  await page.getByRole('button', { name: 'submit' }).click();
  await expect(page.getByText(/Project created successfully/)).toBeVisible();
  await addMultiphaseGallery(page);
  await addMultiphasePlan(page)
}
async function addMultiphasePlan(page) {
  await page.getByRole('row', { name: `${randomProjectPhase}` }).getByRole('button').nth(3).click();
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
  }
  await page.getByRole('link', { name: 'Projects', exact: true }).click();
}
async function addReadyphasePlan(page) {
  await page.getByRole('row', { name: `${randomProjectReady}` }).getByRole('button').nth(3).click();
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
  }
  await page.getByRole('link', { name: 'Projects', exact: true }).click();
}
async function addMultiphaseGallery(page) {
  await page.getByRole('row', { name: `${randomProjectPhase}` }).getByRole('button').nth(3).click();
  await page.locator('div').filter({ hasText: /^Gallery$/ }).getByRole('link').click();
  for(let i=0; i<10; i++){
    await page.getByRole('button', { name: 'Add Gallery' }).click();
    await page.getByPlaceholder('Select Gallery Type').click();
    await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random() * 6) + 1 - 1).click();
    await page.getByPlaceholder('Select Media Type').click();
    await page.locator('ul[role="listbox"] >> li').nth(0).click();
    const folderPath = 'D:\\Mark OneDrive\\OneDrive - aqary international group\\Desktop\\IMAGES';
    const files = fs.readdirSync(folderPath);
    const randomFile = files[Math.floor(Math.random() * files.length)];
    const filePath = path.join(folderPath, randomFile);
    const fileInput = await page.$('//input[@type="file"]');
    await fileInput.setInputFiles(filePath);
    await page.getByRole('button', { name: 'submit' }).click();
  }
  await page.getByRole('link', { name: 'Project gallery' }).click();
}
async function addOffplanPlan(page) {
  await page.getByRole('row', { name: `${randomProjectOffPlan}` }).getByRole('button').nth(5).click();
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
  }
  await page.getByRole('link', { name: 'Projects', exact: true }).click();
}
async function addOffplanGallery(page) {
  await page.getByRole('row', { name: `${randomProjectOffPlan}` }).getByRole('button').nth(5).click();
  await page.locator('div').filter({ hasText: /^Gallery$/ }).getByRole('link').click();
  for(let i=0; i<10; i++){
    await page.getByRole('button', { name: 'Add Gallery' }).click();
    await page.getByPlaceholder('Select Gallery Type').click();
    await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random() * 6) + 1 - 1).click();
    await page.getByPlaceholder('Select Media Type').click();
    await page.locator('ul[role="listbox"] >> li').nth(0).click();
    const folderPath = 'D:\\Mark OneDrive\\OneDrive - aqary international group\\Desktop\\IMAGES';
    const files = fs.readdirSync(folderPath);
    const randomFile = files[Math.floor(Math.random() * files.length)];
    const filePath = path.join(folderPath, randomFile);
    const fileInput = await page.$('//input[@type="file"]');
    await fileInput.setInputFiles(filePath);
    await page.getByRole('button', { name: 'submit' }).click();
  }
  await page.getByRole('link', { name: 'Project gallery' }).click();
}
async function addReadyphaseGallery(page) {
  await page.getByRole('row', { name: `${randomProjectReady}` }).getByRole('button').nth(5).click();
  await page.locator('div').filter({ hasText: /^Gallery$/ }).getByRole('link').click();
  for(let i=0; i<10; i++){
    await page.getByRole('button', { name: 'Add Gallery' }).click();
    await page.getByPlaceholder('Select Gallery Type').click();
    await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random() * 6) + 1 - 1).click();
    await page.getByPlaceholder('Select Media Type').click();
    await page.locator('ul[role="listbox"] >> li').nth(0).click();
    const folderPath = 'D:\\Mark OneDrive\\OneDrive - aqary international group\\Desktop\\IMAGES';
    const files = fs.readdirSync(folderPath);
    const randomFile = files[Math.floor(Math.random() * files.length)];
    const filePath = path.join(folderPath, randomFile);
    const fileInput = await page.$('//input[@type="file"]');
    await fileInput.setInputFiles(filePath);
    await page.getByRole('button', { name: 'submit' }).click();
  }
  await page.getByRole('link', { name: 'Project gallery' }).click();
}

// test('login', async ({ page }) => {
//   await login(page, VALID_USER, VALID_PASSWORD);
// });

// test('verify invalid credentials', async ({ page }) => {
//   await page.goto(`${BASE_URL}/login`);
//   await page.fill('input[name="user"]', 'admin');
//   await page.fill('input[name="password"]', 'ahdmin');
//   await page.click('button[type="submit"]');
//   await expect(page.getByText(/invalid login credentials/)).toBeVisible();
// });  
 
// test('logout', async ({ page }) => { 
//   await login(page, VALID_USER, VALID_PASSWORD);
//   await logout(page);1  
// });

test('add project offplan', async ({ page }) => {
  await login(page, VALID_USER, VALID_PASSWORD);
  await addProject(page);
});

test('add project ready', async ({ page }) => {
  await login(page, VALID_USER, VALID_PASSWORD);
  await addProjectReady(page);
});
test('add project multiphase', async ({ page }) => {
  await login(page, VALID_USER, VALID_PASSWORD);
  await addProjectMultiPhase(page);
});