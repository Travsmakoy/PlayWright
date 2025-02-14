import{test,expect} from '@playwright/test'
const fs = require('fs');
const path = require('path');
const BASE_URL = 'https://dashboard.aqaryint.com';
const local = 'http://192.168.1.193:3000/en';

async function login(page, user, password) {
    await page.goto(`${local}/login`);
    await page.fill('input[name="user"]', user);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
    // await expect(page).toHaveURL('http://192.168.1.193:3000/en/dashboard');
    // await expect(page.getByText('Weclome, Super Ahmad')).toBeVisible();
  }
  async function addCompanyUser(page){
    // await page.getByLabel('open drawer').click();
    await page.getByRole('button', { name: 'Company users' }).click();
    await page.getByRole('button', { name: 'Add User' }).click();
    const firstname = ['Mark', 'John', 'Ken', 'Bob','Bruno']
    const selectFname = firstname[(Math.floor(Math.random() * firstname.length))]
    // console.log(selectFname);
    const lastname = ['Smith','Doe','Dale','Kingston']
    const selectlastname = lastname[(Math.floor(Math.random() * lastname.length))]
    // console.log(selectlastname);
    await page.getByPlaceholder('Enter username').fill(selectFname);
    await page.getByPlaceholder('Enter first name').fill(selectFname);
    await page.getByPlaceholder('Enter last name').fill(selectlastname);
    await page.getByPlaceholder('Enter email').fill(`${selectFname}@aqaryinvestment.com`);
    await page.getByPlaceholder('Select Gender').click();
    await page.locator('ul[role="listbox"] >> li').nth(0).click();
    await page.locator('input[name="primary_phone"]').fill('543835792');
    await page.locator('input[name="botim_phone"]').fill('543835792');
    await page.locator('input[name="whatsapp_phone"]').fill('543835792');
    await page.locator('input[name="secondary_phone"]').fill('543835792');
    await page.locator('input[name="tawasal_phone"]').fill('543835792');
    await page.locator('input[name="profile_picture"]').setInputFiles('D:\\Mark OneDrive\\OneDrive - aqary international group\\Desktop\\profile.webp')
    await selectUserType(page);
  }
  async function selectUserType(page) {
    await page.getByPlaceholder('Select User type').click();
    const selectedType = (Math.floor(Math.random() * 2)+1).toString(); 
    console.log(selectedType);
    await page.locator('ul[role="listbox"] >> li').nth(parseInt(selectedType) - 1).click(); // Adjust for zero-based index
    
    if (selectedType == '1') {
      
    }
    if (selectedType == '2') {
        await page.getByRole('combobox', { name: 'Select department' }).click(); // Adjust for zero-based index
        await page.locator('ul[role="listbox"] >> li').nth(0).click();
        await page.getByRole('combobox', { name: 'Select User role' }).click(); // Adjust for zero-based index
        await page.locator('ul[role="listbox"] >> li').nth(0).click();
        await page.getByPlaceholder('Enter BRN No').fill((Math.floor(Math.random() * 1000000) + 100000).toString());
        await page.locator('input[name="brn_expiry_date"]').fill('01/20/2025');
        await page.getByPlaceholder('Select Nationality').click();
        await page.locator('ul[role="listbox"] >> li').nth((Math.floor(Math.random()*100)+1)).click();
        await page.getByPlaceholder('Multi language').click();
        await page.locator('ul[role="listbox"] >> li').nth(1).click();
        await page.getByPlaceholder('Multi language').click();
        await page.locator('ul[role="listbox"] >> li').nth(0).click();
        await page.locator('input[name="experience_since"]').fill('05/20/2012');
        await page.getByPlaceholder('facebook link').fill('https://www.facebook.com/aqaryinvestment');
        await page.getByPlaceholder('twitter link').fill('https://www.twitter.com/aqaryinvestment');
        await page.getByPlaceholder('linkedin link').fill('https://www.linkedin.com/aqaryinvestment');
        await page.getByRole('combobox', { name: 'Select Country' }).click();
        await page.locator('ul[role="listbox"] >> li').nth(0).click();
        await locationRandom(page);
        await page.getByPlaceholder('premuim').fill('10');
        await page.getByPlaceholder('standard').fill('10');
        await page.getByPlaceholder('featured').fill('10');
        await page.getByPlaceholder('top deal').fill('10');
      // await page.getByRole('button', { name: 'submit' }).click();
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

test('verify add company user', async ({page}) => {
  page.setDefaultTimeout(3000);
  await login(page, 'OMNIYAT','123456')
    // await login(page,'admin@finehomeint.com','123456' );
    // await login(page,'aqary@aqaryinvestment.com','123456' );
    await addCompanyUser(page);
});

test('verify edit company user', async ({page}) => {
  page.setDefaultTimeout(2000);
  await login(page,'mark.admin@gmail.com','123456' );
  await page.getByRole('button', { name: 'Company users' }).click();
  await page.getByRole('button', { name: 'Manage Users' }).click();
  await page.getByRole('row', { name: `1` }).getByRole('cell', { name: 'Edit Delete' }).getByRole('link').click();
  await page.getByRole('button', { name: 'submit' }).click();
  await expect(page.getByText(/Updated successfully/)).toBeVisible();
});

test('verify delete/restore company user', async ({page}) => {
  page.setDefaultTimeout(2000);
  await login(page,'mark.admin@gmail.com','123456' );
  await page.getByRole('button', { name: 'Company users' }).click();
  await page.getByRole('button', { name: 'Manage Users' }).click();
  await page.getByRole('row', { name: `1` }).getByLabel('Delete').getByRole('button').click();
  await page.getByRole('button', { name: 'yes' }).click();
  await expect(page.getByText(/Deleted user successfully/)).toBeVisible();
});

// Company Admin Broker
// mark.admin@gmail.com


// Company Email address
// mark.casuco5@gmail.com

//DEYAAR297@gmail.com
// $2a$06$nV4o2DptjJtXphGTdJcRbOXbeVNZDov09RcGKbuMzyPnIo6VLYXLu = 123456