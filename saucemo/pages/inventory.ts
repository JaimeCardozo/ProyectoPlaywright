import { expect, type Locator, type Page } from '@playwright/test';
import {PRODUCTS} from '../utils/globals';
import { GeneralTemplate } from './generalTemplate';

export class Inventory extends GeneralTemplate{
    //Esta es la clase para comprar los productos
    private readonly finalProducto: Locator;
    private readonly shoppingCart: Locator;

    constructor(page:Page){
        super(page);
        this.finalProducto = page.locator('id=add-to-cart-test.allthethings()-t-shirt-(red)');
        this.shoppingCart = page.locator('[data-test="shopping-cart-link"]');
    };

    async allProductBuys(){
      for (const [key, value] of Object.entries(PRODUCTS)) {
        if (key !== 'GENERALPRODUC') {
          const fullSelector = PRODUCTS.GENERALPRODUC + value;
          await this.page.locator(fullSelector).click();
          console.log(`${key}: ${fullSelector}`);
        }
      };
      await this.finalProducto.click();
      await this.shoppingCart.click();
    };

}