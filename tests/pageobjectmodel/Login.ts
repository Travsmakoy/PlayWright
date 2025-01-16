import {test,expect, Page} from '@playwright/test';

export default class LoginPage
{
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    public async goto(){
        await this.page.goto('https://192.168.1.193:8080/');
    }
    //Locators Global variables
    EnterUser = ()  => this.page.fill('input[name="user"]', 'admin');       
    EnterPassword = (password: string) => this.page.fill('input[name="password"]', password);
    ClickLogin = () => this.page.click('button[type="submit"]');
    
    //Actions Global functions
    VerifyLoginSuccess = async () => 
        {
        await expect(this.page).toHaveURL('http://192.168.1.193:3000/en/dashboard');
        await expect(this.page.getByText('Weclome, Super Ahmad')).toBeVisible();
         }
}