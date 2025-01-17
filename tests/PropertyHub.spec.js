const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');
const { write } = require('fs');
const BASE_URL = 'https://dashboard.aqaryint.com';
const local = 'http://192.168.1.193:3000/en';
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
const START_PRICE_RANGE = { min: 1, max: 999999 };

async function login(page, user, password) {
  await page.goto(`${local}/login`);
  await page.fill('input[name="user"]', user);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');
  // await expect(page).toHaveURL('http://192.168.1.193:3000/en/dashboard');
  // await expect(page.getByText('Weclome, Aqary Investment')).toBeVisible();
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
  for (let i = 0; i < 3; i++) {
    await page.getByPlaceholder('Select Unit type').click();
    const random = (Math.floor(Math.random() * 2) + 1).toString();
    const option = page.locator(`[data-option-index="${random}"]`);  
    await option.click();  
  }
  await randomView(page);
  if(await page.getByPlaceholder('Enter Plot Area').isVisible()){
    await page.getByPlaceholder('Enter Plot Area').fill((Math.floor(Math.random() * 1000) + 500).toString());
  }
  if(await page.getByPlaceholder('Enter Built Up Area').isVisible()){
    await page.getByPlaceholder('Enter Built Up Area').fill((Math.floor(Math.random() * 499) + 1).toString());
  }
  // await page.getByPlaceholder('Enter Plot Area').fill((Math.floor(Math.random() * 1000) + 500).toString());
  // await page.getByPlaceholder('Enter Built Up Area').fill((Math.floor(Math.random() * 499) + 1).toString());
  await page.getByPlaceholder('Enter sector number').fill(Math.floor(Math.random()*100).toString());
  await page.getByPlaceholder('Enter Property number').fill(Math.floor(Math.random()*100).toString());
  if(await page.getByPlaceholder('Select Ownership').isVisible()){
    await page.getByPlaceholder('Select Ownership').click();
    await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random()*4)).click();
  }
  // await page.getByPlaceholder('Select Ownership').click();
  // await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random()*4)).click();
  await page.getByPlaceholder('Select Life Style').click();
  await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random()*1)).click();
  await page.locator('input[name="completion_date"]').fill('01/20/2025');
  await page.locator('input[name="handover_date"]').fill('01/31/2025');
  if(await page.locator('input[name="start_date"]').isVisible()){
    await page.locator('input[name="start_date"]').fill('01/01/2025');
  }
  if(await page.getByText('currency').isVisible()){
    await page.getByText('currency').click();
    await page.getByRole('option', { name: 'UAE Dirham AED' }).click();
    await page.getByPlaceholder('Enter service charge').fill((Math.floor(Math.random() * 1000) + 1).toString());
    await page.getByText('measure', { exact: true }).click();
    await page.getByRole('option', { name: 'sqft' }).click();
    }
  await page.getByPlaceholder('Enter Min Area').fill((Math.floor(Math.random() * 1000) + 1).toString());
  await page.getByPlaceholder('Enter Max Area').fill((Math.floor(Math.random() * 1500) + 1000).toString());
  await page.locator('input[placeholder="Select Furnished"]').click();
  await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random() * 3)).click();
  await page.getByPlaceholder('No of units').fill((Math.floor(Math.random() * 100) + 1).toString());
  await page.getByPlaceholder('Enter no of floors').fill((Math.floor(Math.random() * 100) + 1).toString());
  if(await page.getByPlaceholder('Enter no of parking').isVisible()){
    await page.getByPlaceholder('Enter no of parking').fill((Math.floor(Math.random() * 100) + 1).toString());
  }
  // await page.getByPlaceholder('Enter no of parking').fill((Math.floor(Math.random() * 100) + 1).toString());
  await page.getByPlaceholder('Enter no of pools').fill((Math.floor(Math.random() * 100) + 1).toString());
  await page.getByPlaceholder('Enter no of elevators').fill((Math.floor(Math.random() * 100) + 1).toString());
  const startingPrice = getRandomStartingPrice().toString();
  await page.getByPlaceholder('Enter Price').fill(startingPrice);
  const randomIndex = Math.floor(Math.random() * 1);
  if(await page.getByPlaceholder('Select Completion Status').isVisible()){
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
   }
  }

 if(await page.getByPlaceholder('Select Rent Type').isVisible()){
   await page.getByPlaceholder('Select Rent Type').click();
   await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random()*3)).click();
 } 
 if(await page.getByPlaceholder('Enter No. of Payments').isVisible()){
   await page.getByPlaceholder('Enter No. of Payments').fill((Math.floor(Math.random() * 100) + 1).toString());
 }
}

async function propertyTypeLogic(page) {
  await page.getByPlaceholder('Select Property type').click();
  let indices = [];

if (categoryRan == 1) {
    indices = [8, 11, 3, 4];
} else {
    indices = [8, 11, 2, 3, 4, 0, 1];
}

const listItems = page.locator('ul[role="listbox"] >> li');

const listCount = await listItems.count();
if (listCount === 0) {
    throw new Error("No items found in the listbox.");
}

indices = indices.filter(index => index < listCount);
if (indices.length === 0) {
    throw new Error("No valid indices available for the list items.");
}

const randomIndex = Math.floor(Math.random() * indices.length);
const randomValue = indices[randomIndex];

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
const propertyHubRan = getRandomProject();
  const categoryRan = (Math.floor(Math.random() * 2) + 0).toString();

async function addPropertyHub(page) {
  await page.getByLabel('open drawer').click();
  await page.getByRole('button', { name: 'Property Hub' }).click();
  await page.getByRole('button', { name: 'Add Property' }).click();
  // await expect(page).toHaveURL('http://192.168.1.193:3000/en/dashboard/property_hub/add');
  await page.fill('input[name="property_name"]', propertyHubRan+' Properties');
  console.log(`PropertyName: `+propertyHubRan);
  const mark = await page.locator('input[placeholder="Search by name or number"]');
  // await page.getByPlaceholder('Broker Agent').fill('Kashif');
  await page.getByPlaceholder('Broker Agent').fill('Ali');
  await page.waitForSelector('//ul[@role="listbox"]', { state: 'visible' });
  const firstOption = page.locator('//ul[@role="listbox"]//li[1]');
  await firstOption.click();
  await mark.fill('Ali');
  const secondOption = page.locator('//ul[@role="listbox"]//li[1]');
  await secondOption.click();
  await page.locator('input[placeholder="Choose category"]').click();
  // await page.locator('ul[role="listbox"] >> li').nth(0).click();
  const listItems = page.locator('ul[role="listbox"] >> li');
  const selectedOption = listItems.nth(categoryRan);
 
  let selectedText = '';
  try {
    selectedText = await selectedOption.textContent();
    console.log('Selected text:', selectedText); 
    console.log(categoryRan);
  } catch (error) {
    console.error('Error getting text content:', error);
  }
  await selectedOption.click();
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

  // await page.getByRole('button', { name: 'Submit' }).click();
  
  // await expect(page.getByText(/Property created successfully/)).toBeVisible();
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

async function unitType(page) {
  await page.getByRole('row', { name: `${propertyHubRan}` }).getByRole('button').nth(7).click();
  await page.locator('div').filter({ hasText: /^Manage Unit Types$/ }).getByRole('link').click();
  await page.getByRole('button', { name: 'Add Unit Type' }).click();
  await page.getByPlaceholder('Select unit type').click();
  await page.locator('ul[role="listbox"] >> li').nth(0).click();

  const randomType = ['STUDIO', '1BHK', '2BHK', '3BHK', '4BHK', '5BHK', '6BHK', '7BHK', '8BHK', '9BHK', '10BHK'];
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

  if (await page.getByPlaceholder('Enter No of Parking').isVisible()) {
    await page.getByPlaceholder('Enter No of Parking').fill((Math.floor(Math.random() * 100) + 1).toString());
  }

  if (await page.getByPlaceholder('Enter No of Bedrooms').isVisible()) {
    await page.getByPlaceholder('Enter No of Bedrooms').fill((Math.floor(Math.random() * 10) + 1).toString());
  }
  
  try {
    await page.getByRole('button', { name: /submit/i }).click();
  } catch (error) {
    try {
      await page.locator('button[type="submit"]').click();
    } catch (error) {
      try {
        await page.locator('//button[contains(translate(text(), "SUBMIT", "submit"), "submit")]').click();
      } catch (error) {
        console.error('Failed to click submit button:', error);
        throw error;
      }
    }
  }
  // await page.waitForTimeout(2000);
  await page.getByRole('link', { name: 'Manage unit types', exact: true }).click();
}

async function PaymentPlans(page) {
  await page.getByRole('row', { name: `${propertyHubRan}` }).getByRole('button').nth(7).click();
  if(await page.locator('div').filter({ hasText: /^Manage Payment Plans$/ }).getByRole('link')){
    await page.getByRole('link', { name: 'Add Payment Plans' }).click();
    await page.getByPlaceholder('Select Percentage').fill('100');
    await page.getByPlaceholder('Select Completion Status').fill('TEST AUTOMATION');
    await page.getByRole('button', { name: 'next' }).click();
    await page.getByRole('button', { name: 'submit' }).click();
    await page.locator('form').getByRole('link', { name: 'Manage Payment Plans', exact: true }).click();
    await page.getByRole('checkbox').click();
  }
  // await page.locator('div').filter({ hasText: /^Manage Payment Plans$/ }).getByRole('link').click();
}

test('add property sale', async ({ page }) => {
  page.setDefaultTimeout(3000);
  // await login(page, 'aqary@aqaryinvestment.com', '123456');
  await login(page, 'admin', 'newadmin');
  await addPropertyHub(page);
  // await unitType(page);
  // await addGallery(page);
  // await addPlan(page);
  // await PaymentPlans(page);
});