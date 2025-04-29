import { expect, type Locator, type Page } from '@playwright/test';
import { GeneralTemplate } from './generalTemplate';
import { CREDENTIALS, URL } from '../utils/globals';
import { fillFieldAndPressSpace } from '../utils/filmsUtils';

export class Login extends GeneralTemplate{

    private readonly user: Locator;
    private readonly password: Locator;
    private readonly buttonLogin: Locator;

    constructor(page:Page){
        super(page);
        this.user = page.locator('id=user-name');
        this.password = page.locator('id=password');
        this.buttonLogin = page.locator('id=login-button');
    };

    async loginAccess(){
        await this.user.fill(CREDENTIALS.USER);
        await this.password.fill(CREDENTIALS.PASS);
        await this.buttonLogin.click();
    }
}