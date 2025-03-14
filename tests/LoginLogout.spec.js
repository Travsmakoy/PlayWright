const { test } = require('@playwright/test');
const LoginPage = require('./pageobjectmodel/LoginPage').default;
const DashboardPage = require('./pageobjectmodel/DashboardPage').default;

test('verify login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.login('superadmin', '123456');
    await dashboardPage.verifyDashboard();
    await page.context().storageState({ path: 'auth.json' });
});

test('verify invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('superadmin', 'ahdmin');
    await loginPage.verifyInvalidCredentials();
});

test('verify logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.login('superadmin', '123456');
    await dashboardPage.verifyDashboard();
    await dashboardPage.logout();
    await loginPage.verifyLoginPage();
});
  