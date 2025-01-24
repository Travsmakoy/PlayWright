import {test,expect} from '@playwright/test'
const BASE_URL = 'http://192.168.1.193:3000/en';
async function login(page, user, password) {
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[name="user"]', user);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
    // await expect(page).toHaveURL('http://192.168.1.193:3000/en/dashboard');
    // await expect(page.getByText('Weclome, Aqary Investment')).toBeVisible();
  }
  async function addUnit(page){
    await page.getByLabel('open drawer').click();
    await page.getByRole('button', { name: 'Units', exact: true }).click();
    await page.getByRole('button', { name: 'Add Units' }).click();
  }

  async function removeUnit(page){
    return null; // implement this function to remove a unit using the page object
  }
test('add unit', async ({page}) => {
    await login(page, 'mark.admin@gmail.com', '123456');
    await addUnit(page);
});