const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');
const { write } = require('fs');
const BASE_URL = 'https://dashboard.aqaryint.com';
const local = 'http://192.168.1.193:3000/en';
const VALID_USER = 'admin';
const VALID_PASSWORD = 'newadmin';
const PROJECT_NAMES = ['ALDAR', 'EMAAR', 'DAMAC', 'NAKHEEL','MERAAS','SOBHA REALTY','OMNIYAT','DEYAAR'];

async function login(page, user, password) {
  await page.goto(`${BASE_URL}/login`);
  await page.fill('input[name="user"]', user);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');
  // await expect(page).toHaveURL('http://192.168.1.193:3000/en/dashboard');
  // await expect(page.getByText('Weclome, Super Ahmad')).toBeVisible();
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
  await page.locator('ul[role="listbox"] >> li').nth(0).click();
  await page.getByPlaceholder('Choose a company activity').click();
  await page.locator('ul[role="listbox"] >> li').nth(0).click();
  const ProjectNumber = Math.floor(Math.random() * 1000000);
  await page.getByPlaceholder('Enter a company name').fill(PROJECT_NAMES[Math.floor(Math.random() * 4)]);

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

  await page.getByPlaceholder('Enter Company Website').fill('https://'+PROJECT_NAMES[Math.floor(Math.random() * 4)]+ProjectNumber+'.com');
  const TRIMMED_PROJECT_NAMES = PROJECT_NAMES.map(name => name.trim());
  const randomIndex = Math.floor(Math.random() * TRIMMED_PROJECT_NAMES.length);
  const email = `${TRIMMED_PROJECT_NAMES[randomIndex]}${ProjectNumber}@gmail.com`.replace(/\s+/g, '');
  await page.getByPlaceholder('Company email address').fill(email);

  await page.getByPlaceholder('Enter Phone No').fill(Math.floor(Math.random() * 1000000000).toString());
  await page.getByPlaceholder('Enter Whatsapp No').fill(Math.floor(Math.random() * 1000000000).toString());
  await page.getByPlaceholder('Please Enter tagline ').fill('Best '+PROJECT_NAMES[Math.floor(Math.random() * 4)]+' Estate Management');
  await page.getByPlaceholder('Please Enter no of employees').fill((Math.floor(Math.random() * 1000) + 1).toString());

  await companyLogoCover(page);
  await WriteDescription(page);

  await page.getByPlaceholder('Enter Username').fill('PlaywrightUser'+(Math.floor(Math.random() * 1000) + 1).toString());
  await page.getByPlaceholder('Enter First Name ').fill('John');
  await page.getByPlaceholder('Enter Last Name ').fill('Doe');
  await page.getByPlaceholder('Enter Admin Phone No').fill(Math.floor(Math.random() * 1000000000).toString());
  await page.getByPlaceholder('Admin email address').fill('playwrightuser'+(Math.floor(Math.random() * 1000) + 1).toString()+'@gmail.com');
  await profile(page);

  await page.getByPlaceholder('Account number').fill((Math.floor(Math.random() * 987654321) + 12345678).toString());
  await page.getByPlaceholder('Account Name').fill('John Doe');
  await page.getByPlaceholder('IBAN Number').fill('AE07 0331 2345 6789 0123 456');
  await page.getByPlaceholder('Please a Country').click();
  await page.locator('ul[role="listbox"] >> li').nth(0).click();
  await page.getByPlaceholder('Please a Currency').click();
  await page.locator('ul[role="listbox"] >> li').nth((Math.floor(Math.random() * 2) + 1)).click();
  await page.getByPlaceholder('Bank Name').fill('Bank of America');
  await page.getByPlaceholder('Bank Branch').fill('1234567890');
  await page.getByPlaceholder('Swift Code').fill('USBAK9000000000000000');
  await page.getByRole('button', { name: 'submit' }).click();
}

async function profile(page){
  const folderPath = 'D:\\Mark OneDrive\\OneDrive - aqary international group\\Desktop\\IMAGES';
  const files = fs.readdirSync(folderPath);
  const randomFile = files[Math.floor(Math.random() * files.length)];
  const filePath = path.join(folderPath, randomFile);
  await page.locator('input[name="user_profile_picture"]').setInputFiles(filePath);
}

async function licenseFile(page){
  const folderPath = 'D:\\Mark OneDrive\\OneDrive - aqary international group\\Desktop\\IMAGES';
  const files = fs.readdirSync(folderPath);
  const randomFile = files[Math.floor(Math.random() * files.length)];
  const filePath = path.join(folderPath, randomFile);
  await page.locator('input[name="commercial_license_file_url"]').setInputFiles(filePath);
}

async function vatFile(page){
  const folderPath = 'D:\\Mark OneDrive\\OneDrive - aqary international group\\Desktop\\IMAGES';
  const files = fs.readdirSync(folderPath);
  const randomFile = files[Math.floor(Math.random() * files.length)];
  const filePath = path.join(folderPath, randomFile);
  await page.locator('input[name="vat_file_url"]').setInputFiles(filePath);
}

async function companyLogoCover(page){
  const folderPath = 'D:\\Mark OneDrive\\OneDrive - aqary international group\\Desktop\\IMAGES';
  const files = fs.readdirSync(folderPath);
  const randomFile = files[Math.floor(Math.random() * files.length)];
  const filePath = path.join(folderPath, randomFile);
  await page.locator('input[name="logo_url"]').setInputFiles(filePath);
  const randomFile1 = files[Math.floor(Math.random() * files.length)];
  const filePath1 = path.join(folderPath, randomFile1);
  await page.locator('input[name="cover_image_url"]').setInputFiles(filePath1);
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
  await page.getByPlaceholder('Description..').fill(description);
}

test('add company', async ({page}) => {
    await login(page, VALID_USER, VALID_PASSWORD);
    await addCompany(page);
    });