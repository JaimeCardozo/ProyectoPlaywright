import { promises as fs } from 'fs';
import path from 'path';
import {EmailService} from './emails'

export default async () => {
  const emailService = new EmailService(
    'realesnotificaciones@gmail.com',
    'gflapimrrqqigoer',
    'C:\\Users\\RED5G\\Desktop\\ProyectoPlaywright'
  );

  const errorLogPath = path.resolve(process.cwd(), 'results/error-log.json');
  let isSuccessful = true;
  let errorMessage = '';
  let errorStack = ''

  try {
    // Leer el archivo de error
    console.log('Leyendo el archivo de error...');
    const errorData = await fs.readFile(errorLogPath, 'utf-8');
    const { isSuccessful: statusFromLog, errorMessage: errorFromLog, errorStack: errorStackLog} = JSON.parse(errorData);

    isSuccessful = statusFromLog;
    errorMessage = errorFromLog || '';
    errorStack = errorStackLog || '';
    console.log('Datos del archivo de error:', { isSuccessful, errorMessage, errorStack  });

  } catch (readError) {
    console.log('No se encontró un archivo de error. Asumiendo ejecución exitosa.');
  }
  const reportUrl = 'https://jaimecardozo.github.io/ProyectoPlaywright/#';

  try {
    console.log('Generando y sirviendo el reporte de Allure...');

    //const allureUrl = await emailService.generateAndServeAllureReport2();
    //console.log(`Reporte disponible en: ${allureUrl}`);  
    //await emailService.generateAndServeAllureReport(); -->Aqui se sirve el reporte de Allure Localmente....
    const subject = isSuccessful ? 'Reporte de pruebas - Éxitoso' : 'Reporte de pruebas - Fallo detectado';
    const errorDetails = `
      <h1 style="color: #d32f2f;">🚨 Pruebas fallidas</h1>
      <p><strong>Error:</strong> ${errorMessage}</p>
      <pre style="white-space: pre-wrap; font-family: Consolas, 'Courier New', monospace;">${errorStack}</pre>
      <p>Consulta el reporte completo en: <a href="${reportUrl}" target="_blank">${reportUrl}</a></p>
    `;

    console.log('Enviando correo con el reporte...');
    
    await emailService.sendTestReport(',sqa20@red5g.co', subject, isSuccessful, reportUrl, errorDetails);

    console.log('Proceso completado exitosamente.');
  } catch (error) {
    console.error('Error durante el proceso:', error.message);

    await emailService.sendTestReport(
      'reinagr3@gmail.com, sqa20@red5g.co',
      'Reporte de Pruebas Automatizadas (Con Errores)',
      false,
      reportUrl,
      error.message
    );
  }
};