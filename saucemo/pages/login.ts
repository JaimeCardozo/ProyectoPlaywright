import { expect, type Locator, type Page } from '@playwright/test';
import { GeneralTemplate } from './generalTemplate';
import { url } from '../utils/globals';
import { fillFieldAndPressSpace } from '../utils/filmsUtils';

export class Login extends GeneralTemplate{

    private readonly user: Locator;
    private readonly password: Locator;

    constructor(page:Page){
        super(page);
        this.user = page.locator('id=user-name');
        this.password = page.locator('password');
    }

    async loginAccess(){
        //await fillFieldAndPressSpace(this.page, this.user, "");
    }
}