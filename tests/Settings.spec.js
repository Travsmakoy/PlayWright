import {test,expect} from '@playwright/test'
const BASE_URL = 'http://192.168.1.193:3000/en';
const local = 'https://dashboard.aqaryint.com';

async function login(page, user, password) {
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[name="user"]', user);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
    // await expect(page).toHaveURL('http://192.168.1.193:3000/en/dashboard');
    // await expect(page.getByText('Weclome, Aqary Investment')).toBeVisible(); 
}
async function addBank(page){
    // await page.getByLabel('open drawer').click();
    await page.getByRole('button', { name: 'Settings' }).click();
    await page.getByRole('button', { name: 'Banks' }).click();
    await page.getByRole('button', { name: 'Add Bank' }).click();
    const banklist = ['Test Bank 1', 'Test Bank 2', 'Test Bank 3' ];
    const selectedBank = banklist[Math.floor(Math.random() * banklist.length)];
    await page.getByPlaceholder('Enter Bank Name').fill(selectedBank);
    await page.locator('input[name="logo"]').setInputFiles('C:\\Users\\mark\\Downloads\\image (2).png');  // Using double backslashes
    await page.getByPlaceholder('http://').fill('https://www.'+ selectedBank.replace(/\s+/g, '')+'.com');
    await page.getByPlaceholder('Please enter email').fill('test@'+selectedBank.replace(/\s+/g, '')+'.com');
    await page.locator('input[name="interest_rate"]').fill((Math.floor(Math.random() * 10) + 1).toString());
    await page.locator('input[name="process_fee"]').fill((Math.floor(Math.random() * 10) + 1).toString());
    await page.getByPlaceholder('Select Country').click();
    await page.locator('ul[role="listbox"] >> li').nth(0).click();
    // await page.getByRole('button', { name: 'submit' }).click();
}

test('verify facilities & amenities category',async ({page}) => {
    page.setDefaultTimeout(3000);
    await login(page, 'superadmin', '123456');
    await page.getByRole('button', { name: 'Settings' }).click();
    await page.getByRole('button', { name: 'Category', exact: true }).click();
    await page.getByRole('button', { name: 'Add Category' }).click();
    const categorylist = ['Facilities & Amenities', 'Real Estate', 'Transportation', 'Health & Wellness', 'Education & Training', 'Services & Products', 'Entertainment & Recreation', 'Community & Governance', 'Sports & Leisure', 'Culinary & Dining', 'Business & Finance', 'Art & Culture', 'Science & Technology', 'Environment & Sustainability', 'Personal & Lifestyle', 'Other'];
    const selectRandom = categorylist[Math.floor(Math.random()*categorylist.length)];
    await page.getByRole('textbox', { name: 'Enter Title' }).fill(selectRandom)
    await page.getByRole('combobox', { name: 'Select type' }).click();
    await page.locator('ul[role="listbox"] >> li').nth(Math.floor(Math.random()*2)).click();
});

test('verify add bank',async ({page}) => {
    page.setDefaultTimeout(3000);
    await login(page, 'superadmin', '123456');
    await addBank(page);
});

test('verify add view', async ({page}) => {
    page.setDefaultTimeout(3000);
    await login(page, 'superadmin', '123456');
    // await page.getByLabel('open drawer').click();
    await page.getByRole('button', { name: 'Settings' }).click();
    await page.getByRole('button', { name: 'Views' }).click();
    await page.getByRole('button', { name: 'Add View' }).click();
    const viewlist = ['Test View 1', 'Test View 2', 'Test View 3' ];
    const selectedView = viewlist[Math.floor(Math.random() * viewlist.length)];
    await page.getByPlaceholder('Enter View Title').fill(selectedView);
    // await page.getByRole('button', { name: 'submit' }).cliclk();
});

test('verify add luxury brand', async ({page}) => {
    page.setDefaultTimeout(3000);
    await login(page, 'superadmin', '123456');
    // await page.getByLabel('open drawer').click();
    await page.getByRole('button', { name: 'Settings' }).click();
    await page.getByRole('button', { name: 'Luxury Brands' }).click();
    await page.getByRole('button', { name: 'Add Luxury Brand' }).click();
    const brandlist = ['Test Brand 1', 'Test Brand 2', 'Test Brand 3' ];
    const selectedBrand = brandlist[Math.floor(Math.random() * brandlist.length)];
    await page.getByPlaceholder('Enter title').fill(selectedBrand);
    // await page.getByPlaceholder('Enter Brand Logo').fill('path/to/logo.png'); // put valid logo path here
    // await page.getByRole('button', { name: 'submit' }).click();
})
test('verify company type', async ({page}) =>{
    page.setDefaultTimeout(3000);
    await login(page, 'superadmin', '123456');
    await page.getByRole('button', { name: 'Settings' }).click();
    await page.getByRole('button', { name: 'Company Type' }).click();
    await page.getByRole('button', { name: 'Add Company Type' }).click();
    const typeList = ['Developer Company', 'Product Company', 'Services Company', 'Broker Company'];
    const selectedType = typeList[Math.floor(Math.random() * 4)];
    await page.getByPlaceholder('Enter Company Type').fill(selectedType);
    // await page.getByRole('button', { name: 'submit' }).click();
});
test('verify company category', async ({ page }) => {
    page.setDefaultTimeout(3000);
    await login(page, 'superadmin', '123456');
    await page.getByRole('button', { name: 'Settings' }).click();
    await page.getByRole('button', { name: 'Company Category' }).click();
    await page.getByRole('button', { name: 'Add Company Category' }).click();
    await page.getByRole('combobox', { name: 'Company Type' }).click();
    const randomIndex = Math.floor(Math.random() * 4);
    console.log('Random Index:', randomIndex);
    const selectedOption = await page.locator('ul[role="listbox"] >> li').nth(randomIndex).textContent();
    console.log('Selected Company Type:', selectedOption);
    await page.locator('ul[role="listbox"] >> li').nth(randomIndex).click();
    
    if(selectedOption === 'Developer Company'){
        await page.getByRole('textbox', { name: 'Enter Company Category' }).fill(selectedOption+' Category');
    }
    if(selectedOption === 'Product Company'){
        await page.getByRole('textbox', { name: 'Enter Company Category' }).fill(selectedOption+' Category');
    }
    if(selectedOption === 'Services Company'){
        await page.getByRole('textbox', { name: 'Enter Company Category' }).fill(selectedOption+' Category');
    }
    if(selectedOption === 'Broker Company'){
        await page.getByRole('textbox', { name: 'Enter Company Category' }).fill(selectedOption+' Category');
    }
    // await page.getByRole('button', { name: 'submit' }).click();
});


test('verify company activities', async ({page}) => {
page.setDefaultTimeout(2000);
await login(page, 'superadmin','123456');
await page.getByRole('button', { name: 'Settings' }).click();
await page.getByRole('button', { name: 'Company Activities' }).click();
await page.getByRole('button', { name: 'Add Company Activities' }).click();
await page.getByRole('combobox', { name: 'Select Company Type' }).click();
const randomIndex = Math.floor(Math.random() * 4);
// console.log('Random Index:', randomIndex);
const selectedOption = await page.locator('ul[role="listbox"] >> li').nth(randomIndex).textContent();
await page.locator('ul[role="listbox"] >> li').nth(randomIndex).click();
await page.getByRole('combobox', { name: 'Select Company Category' }).click();
const selectedCategory = await page.locator('ul[role="listbox"] >> li').nth(0).click();
await page.getByRole('textbox', { name: 'Enter title' }).fill(`${selectedOption} Activities`);
await page.getByRole('button', { name: 'submit' }).click();
});

test('verify countries', async ({page}) => {
    await login(page, 'superadmin','123456');
    await page.getByRole('button', { name: 'Settings' }).click();
    await page.getByRole('button', { name: 'Country' }).click();
    await page.getByRole('button', { name: 'Add Country' }).click();
    const countryname = ['United States', 'Japan', 'Korea',];
    await page.getByRole('textbox', { name: 'Enter Country name' }).fill(countryname[Math.floor(Math.random()* countryname.length)])
    const countrycode = [12, 123, 1234, 12345]
    const selectedCode = countrycode[Math.floor(Math.random() * countrycode.length)];

    await page.evaluate((value) => {
        document.querySelector('[placeholder="Enter Country Code"]').value = value;
    }, selectedCode);
    await page.evaluate((value) => {
        document.querySelector('[placeholder="Enter Alpha Code 2"]').value = value;
    }, selectedCode);
    await page.evaluate((value) => {
        document.querySelector('[placeholder="Enter Alpha Code 3"]').value = value;
    }, selectedCode);
});
test('verify state', async ({page}) => {
    await login(page, 'superadmin','123456');
    await page.getByRole('button', { name: 'Settings' }).click();
    await page.getByRole('button', { name: `State`,exact: true }).click();
    await page.getByRole('button', { name: 'Add State' ,exact: true}).click();    
    await page.getByRole('combobox', { name: 'Select Country' }).click();
    await page.getByRole('option', { name: 'United Arab Emirates' }).click();
    await page.getByRole('textbox', { name: 'State' }).fill('Test State');
    // await page.getByRole('button', { name: 'submit' }).click();
});
test('verify city', async ({page}) => {
    await login(page, 'superadmin','123456');
    await page.getByRole('button', { name: 'Settings' }).click();
    await page.getByRole('button', { name: `City`,exact: true }).click();
    await page.getByRole('button', { name: 'Add City' ,exact: true}).click();    
    await page.getByRole('combobox', { name: 'Select Country' }).click();
    await page.getByRole('option', { name: 'United Arab Emirates' }).click();
    await page.getByRole('combobox', { name: 'Select State' }).click();
    await page.getByRole('option', { name: 'Abu Dhabi' }).click();
    await page.getByRole('textbox', { name: 'City' }).fill('Test Community');
    // await page.getByRole('button', { name: 'submit' }).click();
});
test('verify community', async ({page}) => {
    await login(page, 'superadmin','123456');
    await page.getByRole('button', { name: 'Settings' }).click();
    await page.getByRole('button', { name: `Community`,exact: true }).click();
    await page.getByRole('button', { name: 'Add Community' ,exact: true}).click();    
    await page.getByRole('combobox', { name: 'Select Country' }).click();
    await page.getByRole('option', { name: 'United Arab Emirates' }).click();
    await page.getByRole('combobox', { name: 'Select State' }).click();
    await page.getByRole('option', { name: 'Abu Dhabi' }).click();
    await page.getByRole('combobox', { name: 'Select City' }).click();
    await page.getByRole('option', { name: 'Abu Dhabi' ,exact:true}).click();
    await page.getByRole('textbox', { name: 'Community' }).fill('Test Community');
    // await page.getByRole('button', { name: 'submit' }).click();
});

test('verify sub-community', async ({page}) => {
    await login(page, 'superadmin','123456');
    await page.getByRole('button', { name: 'Settings' }).click();
    await page.getByRole('button', { name: 'Sub Community' }).click();
    await page.getByRole('button', { name: 'Add Sub Community' }).click();    
    await page.getByRole('combobox', { name: 'Select Country' }).click();
    await page.getByRole('option', { name: 'United Arab Emirates' }).click();
    await page.getByRole('combobox', { name: 'Select State' }).click();
    await page.getByRole('option', { name: 'Abu Dhabi' }).click();
    await page.getByRole('combobox', { name: 'Select City' }).click();
    await page.getByRole('option', { name: 'Abu Dhabi' }).click();
    await page.getByRole('combobox', { name: 'Select Community' }).click();
    const random = Math.floor(Math.random()*50);
    await page.locator('ul[role="listbox"] >> li').nth(random).click();
    await page.getByRole('textbox', { name: 'Community' }).fill('Test Community');
    // await page.getByRole('button', { name: 'submit' }).click();
});

test('verify currency', async ({page}) => {
    await login(page, 'superadmin','123456');
    await page.getByRole('button', { name: 'Settings' }).click();
    await page.getByRole('button', { name: 'Manage Currencies' }).click();
    await page.getByRole('button', { name: 'Add Currency' }).click();
    const currencyname = ['US Dollar', 'Japanese Dollar', 'Korean Dollar',];
    const selectedCurrency = currencyname[Math.floor(Math.random() * currencyname.length)];
    await page.getByPlaceholder('Enter Currency Name').fill(selectedCurrency);
    await page.getByRole('textbox', { name: 'Enter Currency Code' }).click();
    const currencycode = ['USD','JPY','KD'];
    await page.getByPlaceholder('Enter Currency Code').fill(currencycode[Math.floor(Math.random() * currencycode.length)]);
});