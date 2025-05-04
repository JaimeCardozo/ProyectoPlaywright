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

export const EMAILS = {
    EMAIL_SERVICE: getEnvVariable('EMAIL_SERVICE'),
    EMAIL_PASS: getEnvVariable('EMAIL_PASS'),
    EMAIL_SEND: getEnvVariable('EMAIL_SEND'),
}

export const PRODUCTS={
    GENERALPRODUC: '[data-test="add-to-cart-sauce-labs-',
    BACKPACK: 'backpack"]',
    BIKELIGHT: 'bike-light"]',
    BOLTTSHIRT: 'bolt-t-shirt"]',
    FLECEJACKET: 'fleece-jacket"]',
    ONESIE: 'onesie"]'
}