const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');
const { write } = require('fs');
const BASE_URL = 'https://dashboard.aqaryint.com';
const local = 'http://192.168.1.193:3000/en';
const VALID_USER = 'superadmin';
const VALID_PASSWORD = '123456';
const PROJECT_NAMES = ["Burj Khalifa Residences", "Palm Jumeirah Villas", "Jumeirah Beach Apartments",
                "Downtown Dubai Towers", "Business Bay Heights", "Dubai Marina Skyrise",
                "Emaar Beachfront", "Bluewaters Island Residences", "Meydan Heights Villas",
                "Al Barari Oasis", "DAMAC Hills Residences", "Arabian Ranches Villas",
                "City Walk Dubai", "La Mer Beachfront", "Dubai Creek Harbour Residences",
                "Dubai Hills Estate", "Tilal Al Ghaf Residences", "Port de La Mer Apartments",
                "Madinat Jumeirah Living", "Serenia Residences Palm Jumeirah",
                "Vida Residences Downtown", "The Address Sky View", "One Za’abeel Residences",
                "Opera Grand Downtown", "Safa Two by DAMAC", "Park Ridge by Emaar",
                "The Cove Dubai Creek", "Al Furjan Residences", "Green Community Villas",
                "The Meadows Dubai", "The Springs Dubai", "Jumeirah Golf Estates",
                "Victory Heights Villas", "The Sustainable City", "Dubai South Residences",
                "Mudon Villas", "Remraam Apartments", "Dubai Silicon Oasis Residences",
                "The Executive Towers", "Zabeel Saray Villas", "Amna Tower Al Habtoor City",
                "Shams JBR Apartments", "Rimal Residences", "Sadaf Apartments JBR",
                "Golden Mile Palm Jumeirah", "Jade at the Fields", "Gardenia Villas by Nakheel",
                "Dragon City Residences", "Sobha Hartland Greens", "Mohammed Bin Rashid City",
                "Nad Al Sheba Villas", "Al Khail Heights", "Azizi Riviera Apartments",
                "Creek Palace Residences", "Sunset at Creek Beach", "Lotus Creek Beach",
                "Eden at The Valley", "Bayshore Creek Beach", "Maple Townhouses Dubai Hills",
                "Sidra Villas Dubai Hills", "Golf Place Villas", "Acacia Park Heights",
                "Park Point Residences", "The Pinnacle Dubai Hills", "Ellington Belgravia",
                "Wilton Terraces by Ellington", "Collective Apartments", "Executive Residences",
                "The Terraces Sobha Hartland", "Wilton Park Residences", "Marsa Plaza Residences",
                "Al Badia Residences", "Dubai Festival City Apartments", "Deira Islands Residences",
                "Plazzo Heights JVC", "Vincitore Boulevard", "Pantheon Boulevard",
                "District One Residences", "Azizi Mirage Apartments", "Azizi Aura Residences",
                "Signature Livings JVC", "Seventh Heaven Al Barari", "Ashjar Al Barari",
                "The Nest Al Barari", "West Yas Residences", "The Address Dubai Mall",
                "The Address Fountain Views", "Burj Royale Downtown", "South Ridge Downtown",
                "Marina Promenade Dubai", "Silverene Tower Dubai Marina", "The Torch Tower Marina",
                "Princess Tower Marina", "Marina Gate Residences", "Vida Marina Residences",
                "Jumeirah Living Marina Gate", "Cayan Tower Marina", "Le Reve Marina",
                "Jumeirah Bay X1 JLT", "Jumeirah Bay X2 JLT", "Saba Tower JLT",
                "Concorde Tower JLT", "Almas Tower JLT", "Green Lakes Towers JLT",
                "Lake Terrace JLT", "Lake View JLT", "Laguna Tower JLT", "ICON Tower JLT",
                "DAMAC Heights Marina", "The One JLT Residences", "Grosvenor House Apartments",
                "Al Seef Towers", "Bahar Residences JBR", "Shoreline Apartments Palm Jumeirah",
                "Garden Homes Palm Jumeirah", "Signature Villas Palm Jumeirah",
                "Fairmont Residences Palm Jumeirah", "One Palm Jumeirah", "Muraba Residences Palm",
                "Atlantis The Royal Residences", "W Residences Palm Jumeirah",
                "Serenia Living Palm Jumeirah", "Six Senses Residences The Palm",
                "SO/ Residences Uptown Dubai", "Signature Mansions Tilal Al Ghaf",
                "Harmony Villas Tilal Al Ghaf", "AURA Tilal Al Ghaf", "Elysian Mansions",
                "Marasi Riverside Apartments", "Central Park City Walk", "The Residences JBR",
                "Vida Dubai Marina", "St. Regis Residences Downtown", "Ritz-Carlton Residences",
                "Palm Tower Apartments", "The Royal Atlantis Palm", "Dubai Wharf Residences",
                "Sobha Hartland Forest Villas", "Imperial Avenue Downtown", "One Park Avenue",
                "Anwa Residences Dubai Maritime City", "The Opus by Zaha Hadid",
                "Meliá Desert Palm Residences", "Al Seef 2 Tower JLT", "Artesia DAMAC Hills",
                "Carson Towers DAMAC Hills", "The Legends DAMAC Hills", "DAMAC Lagoons",
                "Santorini DAMAC Lagoons", "Costa Brava DAMAC Lagoons",
                "Monte Carlo DAMAC Lagoons", "Emaar South Expo Golf Villas",
                "Al Wasl 1 Residences", "Harbour Gate Dubai Creek", "Harbour Views Towers",
                "Creek Edge Residences", "Creek Rise Residences", "Palace Residences",
                "Cedar Creek Beach", "Lotus Dubai Creek", "Marina Shores Dubai Marina",
                "Marina Vista Emaar Beachfront", "South Beach Holiday Homes",
                "Beach Isle Emaar Beachfront", "Sunrise Bay Emaar Beachfront",
                "Grand Bleu Tower by Elie Saab", "Seagate Rashid Yachts & Marina",
                "Sirdhana Residences Rashid Port", "Orchid at Creek Beach", "Rosewater Creek Beach",
                "Lime Gardens Dubai Hills", "Elvira Dubai Hills", "Park Horizon Dubai Hills",
                "Palm Views Apartments", "Al Bandar Residences", "Al Zeina Residences",
                "Al Muneera Residences", "Raha Gardens", "Al Reef Villas",
                "The Bridges Al Reem Island", "Waters Edge Yas Island",
                "Mayan Residences Yas Island", "The Cedars Yas Acres",
                "Al Ghadeer Phase 2", "Jumeirah Luxury Villas", "Silver Springs Villas",
                "Veneto Residences Dubai Waterfront", "Nikki Beach Residences",
                "Nad Al Hamar Villas", "District 2020 Residences", "One Central Residences",
                "Bayz Tower Business Bay", "DAMAC Maison Prive", "Millennium Binghatti Residences",
                "Oasis Residences Masdar City", "Al Maryah Vista", "Waterfront City Al Zorah",
                "Al Mahra Desert Resort Villas", "Sharjah Waterfront City Residences",
                "Ajmal Makan Sharjah Waterfront", "Aljada by ARADA Residences", "Reem Hills",
                "Mamsha Al Saadiyat", "Jubail Island Villas", "Nurai Island Villas",
                "Lea at Yas Acres", "Saadiyat Reserve Residences", "Bloom Gardens Abu Dhabi",
                "Faya Residences Abu Dhabi", "Park View Residences Saadiyat",
                "Pixel Residences Al Reem Island", "Louvre Abu Dhabi Residences"];
const START_PRICE_RANGE = { min: 1, max: 9999999 };

async function login(page, user, password) {
  await page.goto(`${local}/login`);
  await page.fill('input[name="user"]', user);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');
  // await expect(page).toHaveURL('http://192.168.1.193:3000/en/dashboard');
  // await expect(page.getByText('Weclome, Super Ahmad')).toBeVisible();
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
  return Math.floor(Math.random() * 10000 ) +1;
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
}
async function locationRandom(page) {
  await page.locator('input[placeholder="Select Country"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(0).click();
  await page.locator('input[placeholder="Select State"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(0).click();
  await page.locator('input[placeholder="Select City"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(0).click();
  await page.locator('input[placeholder="Select Community"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random() * 60)).click();
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
    for (const id of randomIds) {
        const testId = id.toString(); 
        try {
            await page.getByTestId(testId).click();
        } catch (error) {
          return error;
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

let randomIds = [];  // Define a global variable to store randomIds
async function amenities(page) {
  randomIds = getrandomAmenities(10, 78, 200);
  for (const id of randomIds) {
    const testId = id.toString();
    try {
      await page.getByTestId(testId).click();
    } catch (error) {
      return error;
    }
  }
  return randomIds;
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
const randomProjectOffPlan = getRandomProject();
async function addOffPlanDetails(page) {
  const licenseNumber = getRandomLicenseNumber().toString();
  const projectNumber = getRandomProjectNumber().toString();
  const startingPrice = getRandomStartingPrice().toString();
  // await page.getByLabel('open drawer').click({timeout: 3500});
  await page.getByRole('button', { name: 'Projects' }).click();
  await page.getByRole('button', { name: 'Add Project' }).click();
  // await expect(page).toHaveURL('http://192.168.1.193:3000/en/dashboard/project/add');
  await page.fill('input[name="project_name"]', randomProjectReady);
  console.log('Project Name:', randomProjectReady);
  await page.fill('input[name="license_no"]', licenseNumber);
  await page.fill('input[name="project_no"]', projectNumber);
  await page.fill('input[name="starting_price"]', startingPrice);
  await page.locator('input[placeholder="Developer Company"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(0).click(); //Math.floor(Math.random() * 10) + 1 - 1
  await locationRandom(page);
  await page.evaluate(() => window.scrollBy(0, 250));
  await drawPolygonOnMap(page);
  await projectDetails(page);
  await WriteDescription(page);
  await facilities(page);
  await amenities(page);
  await page.getByRole('button', { name: 'submit' }).click();
  // await expect(page.getByText(/Project created successfully/)).toBeVisible();
  await addOffplanProperty(page);
}
const randomProjectReady = getRandomProject();
async function projectReadyDetails(page) {
  const licenseNumber = getRandomLicenseNumber().toString();
  const projectNumber = getRandomProjectNumber().toString();
  const startingPrice = getRandomStartingPrice().toString();
  // await page.getByLabel('open drawer').click({timeout: 3500});
  await page.getByRole('button', { name: 'Projects' }).click();
  await page.getByRole('button', { name: 'Add Project' }).click();
  // await expect(page).toHaveURL('http://192.168.1.193:3000/en/dashboard/project/add');
  await page.fill('input[name="project_name"]', randomProjectReady);
  console.log('Project Name:', randomProjectReady+' Ready');
  await page.fill('input[name="license_no"]', licenseNumber);
  await page.fill('input[name="project_no"]', projectNumber);
  await page.fill('input[name="starting_price"]', startingPrice);
  await page.getByRole('combobox', { name: 'Enter developer company' }).click();
  await page.locator('ul[role="listbox"] >> li').nth(0).click(); //Math.floor(Math.random() * 10) + 1 - 1
  await locationRandom(page);
  await page.evaluate(() => window.scrollBy(0, 250));
  await drawPolygonOnMap(page);
  await readyDetails(page);
  await WriteDescription(page);
  await facilities(page);
  await amenities(page);
  await page.getByRole('button', { name: 'submit' }).click();
  // await expect(page.getByText(/Project created successfully/)).toBeVisible();
}
const randomProjectPhase = getRandomProject();
async function multiphaseDetails(page) {
  const licenseNumber = getRandomLicenseNumber().toString();
  const projectNumber = getRandomProjectNumber().toString();
  const startingPrice = getRandomStartingPrice().toString();
  // await page.getByLabel('open drawer').click({timeout: 3500});
  await page.getByRole('button', { name: 'Projects' }).click();
  await page.getByRole('button', { name: 'Add Project' }).click();
  // await expect(page).toHaveURL('http://192.168.1.193:3000/en/dashboard/project/add');
  await page.fill('input[name="project_name"]', randomProjectReady);
  console.log('Project Name:', randomProjectReady+' Multiphase');
  await page.fill('input[name="license_no"]', licenseNumber);
  await page.fill('input[name="project_no"]', projectNumber);
  await page.fill('input[name="starting_price"]', startingPrice);
  await page.locator('input[placeholder="Developer Company"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(0).click(); //Math.floor(Math.random() * 10) + 1 - 1
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
  // await expect(page.getByText(/Project created successfully/)).toBeVisible();
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
    await expect(page.getByText(/Created plan successfully/)).toBeVisible();
  }
  await page.getByRole('link', { name: 'Projects', exact: true }).click();
}
async function addReadyphasePlan(page) {
  await page.getByRole('row', { name: `${randomProjectReady}` }).getByRole('button').nth(5).click();
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
    await expect(page.getByText(/Created plan successfully/)).toBeVisible();

  }
  await page.getByRole('link', { name: 'Projects', exact: true }).click();
}
async function addOffplanGallery(page) {
  await page.getByRole('row', { name: `${randomProjectOffPlan}` }).getByRole('button').nth(5).click();
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
  }
  await page.getByRole('link', { name: 'Project gallery' }).click();
}
async function addReadyphaseGallery(page) {
  await page.getByRole('row', { name: `${randomProjectReady}` }).getByRole('button').nth(5).click();
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
  }
  await page.getByRole('link', { name: 'Project gallery' }).click();
}

async function addOffplanProperty(page){
    // await page.getByLabel('open drawer').click({timeout: 3500});
    // await page.getByRole('button', { name: 'Projects' }).click();
    // await page.getByRole('button', { name: 'Local Projects' }).click();
    // ${randomProjectReady} make it dynamic soon
    // await page.getByRole('row', { name: `PRO_1407774` }).getByTestId('secondary-actions').click();
    await page.getByRole('row', { name: `${randomProjectReady}` }).getByTestId('secondary-actions').click();
    await page.locator('div').filter({ hasText: /^Listing Properties$/ }).getByRole('link').click();
    await page.getByRole('button', { name: 'Add Property' }).click();
    const projectName = await page.locator('input[name="project_name"]').inputValue();
    const propName = projectName+ ' Properties';
    await page.getByPlaceholder('Enter property name').fill(propName);

    page.setDefaultTimeout(5000);
    await clickCenterMap(page);

    await page.getByPlaceholder('Select Property type').click();
    const indices = [0, 1, 3, 4, 5, 6, 9, 10, 11];
    const randomIndex = Math.floor(Math.random() * indices.length);
    const randomValue = indices[randomIndex];
    const listItems = page.locator('ul[role="listbox"] >> li');
    const selectedOption = listItems.nth(randomValue);
      let selectedText = '';
      try {
        selectedText = await selectedOption.textContent();
        // console.log('Selected text:', selectedText); 
      } catch (error) {
        // console.error('Error getting text content:', error);
      }
      await selectedOption.click();
    if (selectedText === 'Commercial Lands' || selectedText === 'Mixed used lands' || selectedText === 'Residential Lands'){
      await page.getByPlaceholder('Enter Plot Area').fill((Math.floor(Math.random() * 999) + 100).toString());
      await page.getByPlaceholder('Built up Area').fill((Math.floor(Math.random() * 999) + 100).toString());
      await page.getByPlaceholder('Enter Min Area').fill((Math.floor(Math.random() * 1000) + 1).toString());
      await page.getByPlaceholder('Enter Max Area').fill((Math.floor(Math.random() * 1500) + 1000).toString());
      await page.getByPlaceholder('No of units').fill((Math.floor(Math.random() * 1500) + 1000).toString());
      await page.getByText('currency').click();
      await page.getByRole('option', { name: 'UAE Dirham AED' }).click();
      await page.getByPlaceholder('Enter service charge').fill((Math.floor(Math.random() * 1000) + 1).toString());
      await page.getByText('measure', { exact: true }).click();

      await page.getByRole('option', { name: 'sqft' }).click();
    }
      
      await page.getByPlaceholder('Select Unit type').click();
      await page.locator('ul[role="listbox"] >> li').nth(0).click();

      if(await page.getByRole('combobox', { name: 'Furnished' }).isVisible()){
        await page.getByRole('combobox', { name: 'Furnished' }).click();
        await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random() * 3)).click();
      }
    
    await randomView(page);
    
    if(await page.getByPlaceholder('Enter Plot Area').isVisible()){
      await page.getByPlaceholder('Enter Plot Area').fill((Math.floor(Math.random() * 1000) + 500).toString());
    }
    if(await page.getByPlaceholder('Built up Area').isVisible()){
      await page.getByPlaceholder('Built up Area').fill((Math.floor(Math.random() * 499) + 1).toString());
    }
    await page.getByPlaceholder('Enter Min Area').fill((Math.floor(Math.random() * 1000) + 1).toString());
    await page.getByPlaceholder('Enter Max Area').fill((Math.floor(Math.random() * 1500) + 1000).toString());
    await page.getByPlaceholder('No of units').fill((Math.floor(Math.random() * 100) + 1).toString());
    if(await page.getByPlaceholder('No of floor').isVisible()){
      await page.getByPlaceholder('No of floor').fill((Math.floor(Math.random() * 100) + 1).toString());
    }
    if(await page.getByPlaceholder('Enter number of pools').isVisible()){
      await page.getByPlaceholder('Enter number of pools').fill((Math.floor(Math.random() * 100) + 1).toString());
    }
    if(await page.getByPlaceholder('No of elevator').isVisible()){
      await page.getByPlaceholder('No of elevator').fill((Math.floor(Math.random() * 100) + 1).toString());
    }
    if(await page.getByPlaceholder('Enter no of retail centers').isVisible()){
      await page.getByPlaceholder('Enter no of retail centers').fill((Math.floor(Math.random() * 100) + 1).toString());
    }
    if(await page.getByPlaceholder('No. of Parking').isVisible()){
      await page.getByPlaceholder('No. of Parking').fill((Math.floor(Math.random() * 100) + 1).toString());
    }
    if(await page.getByText('currency').isVisible()){
      await page.getByText('currency').click();
      await page.getByRole('option', { name: 'UAE Dirham AED' }).click();
      await page.getByPlaceholder('Enter service charge').fill((Math.floor(Math.random() * 1000) + 1).toString());
      await page.getByText('measure', { exact: true }).click();
      await page.getByRole('option', { name: 'sqft' }).click();
      }

      await WriteDescription(page);

      await getAmeneties(page);
  
  await page.getByRole('button', { name: 'submit' }).click();
  await addUnit(page);

  // await page.getByRole('row', { name: `${propName}` }).getByTestId('secondary-actions').click();
  
}

async function getAmeneties(page) {
      // Get all elements with `data-testid`
      await page.waitForSelector('[data-testid]', { timeout: 10000 });

    // Get all `data-testid` values (numeric and >= 77)
    let testIds = await page.locator('[data-testid]').evaluateAll(elements =>
        elements.map(el => el.getAttribute('data-testid'))
            .filter(id => id && !isNaN(id) && id >= 77)
    );
    // console.log(testIds);
    // Randomly select up to 5 IDs
    testIds = testIds.sort(() => Math.random() - 0.5).slice(0, 5);
    // console.log(`Selected testIds: ${testIds}`);

    // Click each selected element
    for (const testId of testIds) {
        // console.log(`Clicking testId: ${testId}`);
        await page.getByTestId(testId).click();
    }
}

async function randomView(page){
  for (let i = 0; i < 5; i++) {
    await page.getByPlaceholder('Select View').click();
    await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random()*20)).click();
  }
}

async function clickCenterMap(page) {
  await page.getByRole('button', { name: 'Map camera controls' }).click();
for (let i = 0; i < 3; i++) {
  await page.getByRole('button', { name: 'Zoom in' }).click();
  await page.getByRole('button', { name: 'Zoom in' }).click();
}

  const mapContainer = await page.waitForSelector('#map', { state: 'visible' });

  // Ensure the map is fully loaded
  await page.waitForSelector('.leaflet-tile-loaded, .gm-style', { timeout: 5000 });

  // Get bounding box
  const mapBoundingBox = await mapContainer.boundingBox();
  if (!mapBoundingBox) {
      throw new Error('Failed to retrieve map bounding box');
  }

  const { width, height, x, y } = mapBoundingBox;
  const centerX = x + width / 2;
  const centerY = y + height / 2;

  // console.log(`Clicking at: X=${centerX}, Y=${centerY}`);

  // Move mouse and click
  await page.mouse.move(centerX, centerY);
  await page.mouse.click(centerX, centerY);
}

test('add project property', async ({ page }) => {
  page.setDefaultTimeout(8000);
  await login(page, 'sobha', '123456');
  await addOffplanProperty(page);
})

async function addUnit(page){
  await page.getByRole('row', { name: `${randomProjectReady}` }).getByTestId('secondary-actions').click();
  await page.locator('div').filter({ hasText: /^Units$/ }).getByRole('link').click();
  await page.getByRole('button', { name: 'Add Unit' }).click();
  const projectName = await page.locator('input[name="project_name"]').inputValue();
  const propName = projectName+ ' Unit';
  await page.getByPlaceholder('Enter property name').fill(propName);

  page.setDefaultTimeout(5000); 
  await clickCenterMap(page); 
}

test('verify add project ready', async ({ page }) => {
  page.setDefaultTimeout(3000);
  // await login(page, 'omniyat', '123456');
  await login(page, 'sobha', '123456');

  await projectReadyDetails(page)
  // console.log('Random amenities '+randomIds);
  await addOffplanProperty(page);
  // await addReadyphaseGallery(page);
  // await addReadyphasePlan(page);
});

test('verify add project offplan', async ({ page }) => {
  page.setDefaultTimeout(3000);
  await login(page, 'omniyat', '123456');
  await addOffPlanDetails(page);
  await addOffplanGallery(page);
  await addOffplanPlan(page);
});

test('verify add project multiphase', async ({ page }) => {
  page.setDefaultTimeout(3000);
  await login(page, 'OMNIYAT', '123456');
  await multiphaseDetails(page);
  await addMultiphaseGallery(page);
  await addMultiphasePlan(page)
});