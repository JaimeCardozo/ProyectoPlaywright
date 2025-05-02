import { attachment, description, label, step } from 'allure-js-commons';
import { test } from '../fixtures/contex';
import { gotoPage, loginSuccess } from '../flujos/flujosLogin';
import { Context } from 'vm';
import fs from 'fs/promises';
import path from 'path';
import { getEnvVariable } from '../utils/globals';


test.describe('Flujos Carrito de compra', () => {
    let pageSauce: any;
    const errorLogPath = path.resolve(process.cwd(), 'results/error-log.json');
    

    test.beforeAll(async () => {
        await step('Preparacion de ambiente', async () => {
           attachment('Preparacion de ambiente',
           'Se prepara el json de errores para no tener el anterior registro',
           'text/plain')
          try {
            console.log('Limpiando archivo de error-log.json al inicio de las pruebas...');
            await fs.writeFile(errorLogPath, JSON.stringify({ isSuccessful: true, errorMessage: '',errorStack: '' }, null, 2), 'utf-8');
          } catch (error) {
            console.error('Error al limpiar el archivo de error:', error);
            attachment('Error',
              'Error al limpiar el achivo de error','text/plain')
          }
        })
        
      
    });

    test.afterEach(async({}, testInfo) => {
        attachment('Información', 'Parte final de las pruebas, se pasa a cerrar la grabación', 'text/plain');
        await test.step('Pasos finales', async () => {
        //await Grabacion(testInfo);
        await pageSauce.waitForTimeout(10000);
         if (testInfo.status === 'failed' || testInfo.status ==='timedOut') {
           const error = testInfo.error as Error;
           const errorMessage = error.message || 'Error desconocido';
           const errorStack = error.stack || 'Stack no disponible';
      
           console.log('Error capturado en afterEach:', errorMessage);
          // Guardar el error en un archivo JSON
           await fs.writeFile(
            errorLogPath,
            JSON.stringify({
              isSuccessful: false,
              errorMessage,
              errorStack
            }, null, 2),
            'utf-8'
           );
           //const screenshotPath = await pageAllianz.screenshot();
           //attachment(screenshotPath, 'Captura final de pantalla','image/png')
        }
        })
        
        
      });

    test.afterAll(async () => {
        try {
          // Verificar si ya existe un error registrado
          const errorData = await fs.readFile(errorLogPath, 'utf-8').catch(() => null);
      
          if (!errorData) {
            // Si no existe el archivo o no contiene errores, asumimos éxito
            await fs.writeFile(
              errorLogPath,
              JSON.stringify({ isSuccessful: true, errorMessage: '' }, null, 2),
              'utf-8'
            );
          }
        } catch (error) {
          console.error('Error al finalizar la captura del resultado:', error);
        }
      });

    

    test('Comprar un producto', async ({ context }) => {
        label('epic', 'Flujo Compras')
        label('feature','Simular una compra')
        label('story', 'Simular Compra')
        label('owner','kike')
        label('suite','Prueba de smoking')
        description('Se simula la compra de un producto')
        
        await creacionContexto(context);
        await gotoPage(pageSauce);
        await loginSuccess(pageSauce);
    });

    async function creacionContexto(contex: Context) {
        await step('Creación del contexto', async () => { 
        pageSauce = await contex.newPage();
        });
    };
    
    
})
