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
    await page.getByLabel('open drawer').click();
    await page.getByRole('button', { name: 'Settings' }).click();
    await page.getByRole('button', { name: 'Banks' }).click();
    await page.getByRole('button', { name: 'Add Bank' }).click();
    const banklist = ['Test Bank 1', 'Test Bank 2', 'Test Bank 3' ];
    const selectedBank = banklist[Math.floor(Math.random() * banklist.length)];
    await page.getByPlaceholder('Enter Bank Name').fill(selectedBank);
    // await page.locator('input[name="logo"]').setInputFiles(['path/to/logo.png']); // put valid logo path here
    await page.getByPlaceholder('http://').fill('https://www.'+ selectedBank.replace(/\s+/g, '')+'.com');
    await page.getByPlaceholder('Please enter email').fill('test@'+selectedBank.replace(/\s+/g, '')+'.com');
    await page.locator('input[name="interest_rate"]').fill((Math.floor(Math.random() * 10) + 1).toString());
    await page.locator('input[name="process_fee"]').fill((Math.floor(Math.random() * 10) + 1).toString());
    await page.getByPlaceholder('Select Country').click();
    await page.locator('ul[role="listbox"] >> li').nth(0).click();
    // await page.getByRole('button', { name: 'submit' }).click();
}

test('add bank',async ({page}) => {
    await login(page, 'admin', 'newadmin');
    await addBank(page);
});

test('add view', async ({page}) => {
    await login(page, 'admin', 'newadmin');
    await page.getByLabel('open drawer').click();
    await page.getByRole('button', { name: 'Settings' }).click();
    await page.getByRole('button', { name: 'Views' }).click();
    await page.getByRole('button', { name: 'Add View' }).click();
    const viewlist = ['Test View 1', 'Test View 2', 'Test View 3' ];
    const selectedView = viewlist[Math.floor(Math.random() * viewlist.length)];
    await page.getByPlaceholder('Enter View Title').fill(selectedView);
    // await page.getByRole('button', { name: 'submit' }).cliclk();
});

test('add luxury brand', async ({page}) => {
    await login(page, 'admin', 'newadmin');
    await page.getByLabel('open drawer').click();
    await page.getByRole('button', { name: 'Settings' }).click();
    await page.getByRole('button', { name: 'Luxury Brands' }).click();
    await page.getByRole('button', { name: 'Add Luxury Brand' }).click();
    const brandlist = ['Test Brand 1', 'Test Brand 2', 'Test Brand 3' ];
    const selectedBrand = brandlist[Math.floor(Math.random() * brandlist.length)];
    await page.getByPlaceholder('Enter title').fill(selectedBrand);
    // await page.getByPlaceholder('Enter Brand Logo').fill('path/to/logo.png'); // put valid logo path here
    // await page.getByRole('button', { name: 'submit' }).click();
})