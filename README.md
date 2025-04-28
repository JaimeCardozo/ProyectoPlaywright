Shopping Cart Automation
This repository contains an automation project using Playwright for testing a shopping cart flow.

Key Features
🛒 End-to-end shopping cart automation

🧪 Playwright framework

📈 Allure report generation

🔄 CI integration

📧 Email delivery of test reports

Quick Start
Install dependencies:

bash
Copy
Edit
npm install
Run tests:

bash
Copy
Edit
npx playwright test
Generate and open Allure report:

bash
Copy
Edit
npx allure generate ./allure-results --clean -o ./allure-report
npx allure open ./allure-report
CI/CD
Automated pipeline for:

Running tests

Generating Allure reports

Sending reports via email

Requirements
Node.js v16+

Playwright

Allure Commandline

