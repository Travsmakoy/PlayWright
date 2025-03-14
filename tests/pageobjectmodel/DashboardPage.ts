import { expect, Page } from '@playwright/test';

export default class DashboardPage {
    readonly page: Page;
    private readonly BASE_URL = 'http://192.168.1.193:3000/en';

    constructor(page: Page) {
        this.page = page;
    }

    private readonly logoutMenuButton = () => this.page.getByRole('button').filter({ hasText: /^$/ }).nth(4);
    private readonly logoutButton = () => this.page.getByRole('button', { name: 'Logout' });
    private readonly morningGreeting = () => this.page.getByText('Good Morning, Super Admin');
    private readonly eveningGreeting = () => this.page.getByText('Good Evening, Super Admin');

    async logout() {
        await this.logoutMenuButton().click();
        await this.logoutButton().click();
    }

    async verifyDashboard() {
        await expect(this.page).toHaveURL(`${this.BASE_URL}/dashboard`);
        
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            await expect(this.morningGreeting()).toBeVisible();
        } else {
            await expect(this.eveningGreeting()).toBeVisible();
        }
    }
} 