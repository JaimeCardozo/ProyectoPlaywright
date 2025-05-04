import { test as base, chromium, expect, Page, type BrowserContext } from '@playwright/test';
import { step } from 'allure-js-commons';
import { Context } from 'vm';

export const test = base.extend<{
  context: BrowserContext;
}>({
  context: async ({}, use) => {
    // Lanzar el navegador sin contexto persistente
    const browser = await chromium.launch({
      //headless: false,  // Desactiva modo headless para ver el navegador
      slowMo: 500,
      headless: process.env.CI ? true : true,
      args: [
        //'--auto-open-devtools-for-tabs',  // Abrir DevTools automáticamente
        //'--window-size=280,768',          // Configurar tamaño de la ventana
      ],
    });

    // Crear un contexto no persistente
    const context = await browser.newContext({
      // viewport: { width: 1380, height: 768 },  // Configura el tamaño del viewport
    });

    try {
      // Usa el contexto en las pruebas
      await use(context);
    } finally {
      // Cierra el navegador al finalizar
      await browser.close();
    }
  },
});

export async function creacionContexto(contex: Context): Promise<Page> {
  return await step('Creación del contexto', async () => {
      return await contex.newPage();
  });
}