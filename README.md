# Playwright QA automation

[![Playwright](https://img.shields.io/badge/Playwright-tested-45ba4b?logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

A minimal Playwright + TypeScript project with a local login demo. Playwright
starts the test app automatically, so the end-to-end test does not depend on an
external website or network availability.

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

To view the HTML report after a run, use `npm run test:report`. To start the
demo manually, run `npm run start:test` and open <http://127.0.0.1:4173/login>.

The sample test uses the local demo credentials (`tomsmith` /
`SuperSecretPassword`) and verifies both login and logout.
