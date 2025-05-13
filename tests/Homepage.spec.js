const { test } = require('@playwright/test');

async function checkHome(page){
    await page.goto('http://192.168.1.138:3000/en/listing/sale/property');
}

test('verify hompage', async ({ page }) => {
//   page.setDefaultTimeout(5000);
  await checkHome(page);
});