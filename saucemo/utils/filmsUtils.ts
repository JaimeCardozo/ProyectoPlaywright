import { Locator } from "@playwright/test";


  export async function fillFieldAndPressSpace(
    page: any,        // La página de Playwright
    locator: Locator,  // ID del campo (e.g., 'totalActivos', 'totalPasivos')
    value: string      // Valor a llenar
  ): Promise<void> {
    
      await locator.fill(value);
      await page.keyboard.press('Space');
    
  }

  export async function selectDropdownOptionSelect(
    page: any,              // Instancia de Playwright Page
    locator: Locator,     // Texto para filtrar (e.g., 'País de nacimiento')
    value: string,           // Valor a llenar (e.g., 'Colombia')
      
  ): Promise<void> {
    
      await locator.click();
      await locator.fill(value);
      await page.waitForTimeout(1000);
      await page.keyboard.press('Enter');
    
  }