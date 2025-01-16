import {expect, Page} from '@playwright/test';

export default class LoginPage
{
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    public async goto(){
        await this.page.goto('https://192.168.1.193:8080/');
    }

    EnterUser = ()  => this.page.locator('input[name="user"]');   
    EnterPassword = () => this.page.locator('input[name="password"]');
    ClickLogin = () => this.page.locator('button[type="submit"]');
    
    VerifyLoginSuccess = async () => 
        {
            await expect(this.page).toHaveURL('https://192.168.1.193:8080/');
            await expect(this.EnterUser()).toBeVisible();
            await expect(this.EnterPassword()).toBeVisible();
            await expect(this.ClickLogin()).toBeVisible();
            await this.EnterUser().fill('admin');
            await this.EnterPassword().fill('password');
            await this.ClickLogin().click();
        }
    veroyInvalidLogin = async () =>
        {
            await this.EnterUser().fill('invalidUser');
            await this.EnterPassword().fill('invalidPassword');
            await this.ClickLogin().click();
            await expect(this.page).toHaveURL('https://192.168.1.193:8080/login');
            await expect(this.page.getByText('Invalid username or password.')).toBeVisible();
        }
}