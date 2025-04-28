import dotenv from 'dotenv'

dotenv.config();

export function getEnvVariable(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

export const URL = {
    SAUCEDEMO:'https://www.saucedemo.com/'
}

export const CREDENTIALS = {
    USER: getEnvVariable('USER'),
    PASS: getEnvVariable('PASS'),
};