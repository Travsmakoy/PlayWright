import {expect, Page} from '@playwright/test';

export default class LoginPage
{
    readonly page: Page;
    private readonly BASE_URL = 'http://192.168.1.193:3000/en';

    constructor(page: Page) {
        this.page = page;
    }

    // Locators
    private readonly userInput = () => this.page.locator('input[name="user"]');
    private readonly passwordInput = () => this.page.locator('input[name="password"]');
    private readonly submitButton = () => this.page.locator('button[type="submit"]');
    private readonly welcomeHeading = () => this.page.getByRole('heading', { name: 'Hi, Welcome Back' });
    private readonly invalidCredentialsMessage = () => this.page.getByText(/invalid login credentials/);

    // Actions
    async goto() {
        await this.page.goto(`${this.BASE_URL}/login`);
    }

    async login(username: string, password: string) {
        await this.userInput().fill(username);
        await this.passwordInput().fill(password);
        await this.submitButton().click();
    }

    // Verifications
    async verifyLoginPage() {
        await expect(this.page).toHaveURL(`${this.BASE_URL}/login`);
        await expect(this.welcomeHeading()).toBeVisible();
    }

    async verifyInvalidCredentials() {
        await expect(this.invalidCredentialsMessage()).toBeVisible();
    }
}