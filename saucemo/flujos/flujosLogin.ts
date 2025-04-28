import { expect, Locator, Page, TestInfo } from '@playwright/test';
import { attachment, step } from 'allure-js-commons';
import { Login } from '../pages/login';
import { URL } from '../utils/globals';

async function ValidarYCapturarResultado(pageSauce: Page, resultadoEsperado: Locator, nombreCaptura: string){
    await expect(resultadoEsperado).toBeVisible();
    await pageSauce.waitForTimeout(1000);
    const captura = await pageSauce.screenshot();
    await attachment(nombreCaptura,captura,'image/png');  
}

export async function gotoPage(pageSauce: Page) {
    await step('Ir a la pagina', async () => {
        await pageSauce.goto(URL.SAUCEDEMO);
        const pageTitle = pageSauce.getByText('Swag Labs');
        await ValidarYCapturarResultado(pageSauce, pageTitle, 'Validemos url de la pagina');
    });
    
};
export async function loginSuccess(pageSauce: Page) {
    await step('Ingreso al login', async () => {
        const login = new Login(pageSauce);
        await login.loginAccess();
        
    });
    
    
}