import nodemailer, { Transporter } from 'nodemailer';
import { spawn, exec } from 'child_process';
import util from 'util';
import path from 'path';
import { promises as fs } from 'fs';

const execAsync = util.promisify(exec);

export class EmailService {
  private transporter: Transporter;
  private baseReportPath: string;
  private allurePort: number = 5055;
  //private allurePort2: number = 5054;

  constructor(user: string, pass: string, baseReportPath: string) {
    this.baseReportPath = baseReportPath;
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: user,
        pass: pass,
      },
    });
  }

  /**
   * Verifica si el puerto está en uso y, si lo está, libera el puerto.
   */
  async checkAndReleasePort(port: number): Promise<void> {
    try {
      console.log(`Verificando si el puerto ${port} está en uso...`);
      const { stdout } = await execAsync(`netstat -ano | findstr :${port}`);
      if (stdout) {
        const pid = stdout.trim().split(/\s+/).pop();
        if (pid) {
          console.log(`Puerto ${port} ocupado por PID ${pid}. Liberando...`);
          await execAsync(`taskkill /PID ${pid} /F`);
          console.log(`Puerto ${port} liberado.`);
        }
      } else {
        console.log(`El puerto ${port} está libre.`);
      }
    } catch (error) {
      console.warn(`Error al verificar o liberar el puerto ${port}:`, error.message);
    }
  }

  /**
   * Genera y sirve el reporte de Allure en un servidor local de manera no bloqueante.
   */
  async generateAndServeAllureReport(): Promise<string> {
    try {
      console.log('Generando reporte de Allure...');
      const allureResultsPath = path.join(this.baseReportPath, 'allure-results');

      // Verificar y liberar el puerto antes de servir el reporte
      await this.checkAndReleasePort(this.allurePort);

      // Generar y servir el reporte en el puerto configurado sin bloquear el flujo
      console.log('Ejecutando comando para servir Allure...');
      const allureProcess = spawn('npx', ['allure', 'serve', allureResultsPath, '--port', `${this.allurePort}`], {
        shell: true,
        stdio: 'ignore',
        detached: true,
      });

      // Desvincular el proceso para que no bloquee el flujo principal
      allureProcess.unref();

      console.log('El reporte se está sirviendo en segundo plano.');
      return `http://localhost:${this.allurePort}`;
    } catch (error) {
      console.error('Error al generar o servir el reporte de Allure:', error.message);
      throw error;
    }
  }


  /**
   * Envía un correo con el reporte de prueba.
   */
  async sendTestReport(to: string, subject: string, isSuccessful: boolean, reportUrl: string, errorMessage: string = '') {
    const mailBody = isSuccessful
      ? `
      <h1>✅ Pruebas exitosas</h1>
      <p>El reporte está disponible en el siguiente enlace:</p>
      <p><a href="${reportUrl}" target="_blank">${reportUrl}</a></p>
      `
      : `
      <h1>🚨 Pruebas fallidas</h1>
      <p>Se ha producido un error durante la ejecución de las pruebas.</p>
      <p><strong>Detalles del error:</strong></p>
      <pre>${errorMessage}</pre>
      <p>Consulta el reporte en el siguiente enlace:</p>
      <p><a href="${reportUrl}" target="_blank">${reportUrl}</a></p>
      `;

    const mailOptions = {
      from: this.transporter.options.auth.user,
      to: to,
      subject: subject,
      html: mailBody,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Correo enviado exitosamente:', info.response);
    } catch (error) {
      console.error('Error al enviar correo:', error);
      throw error;
    }
  }
}
