# Playwright QA automation

[![Playwright](https://img.shields.io/badge/Playwright-tested-45ba4b?logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

A minimal Playwright + TypeScript project with a login test for the public
[Sauce Demo](https://www.saucedemo.com/) sandbox. Running the test requires
internet access.

## Getting started

```sh
npm install
npx playwright install chromium
npm test
```

To run the test with the browser visible (headed mode):

```sh
npm run test:headed
```

To view the HTML report after a run, use `npm run test:report`.

The test uses Sauce Demo's standard sandbox credentials (`standard_user` /
`secret_sauce`) and verifies that the products page loads after login.
