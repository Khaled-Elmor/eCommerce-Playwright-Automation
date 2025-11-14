# Shopping Automation Framwork

**Playwright Automation Framework in TypeScript** for modern shopping websites. This project delivers comprehensive **UI testing**, **API validation**, and **security checks**, all powered by **data-driven, end-to-end workflows**. Built with scalability and maintainability in mind, Shopwright is fully compatible with **GitHub Actions CI/CD** for seamless automation.

---

## 🚀 Features

- ✅ **UI Testing**: Covers critical user journeys including login, product search, cart operations, and checkout.
- 🔌 **API Validation**: Verifies backend endpoints using Playwright’s request context and custom assertions.
- 🔐 **Security Checks**: Includes token validation, authentication flows, and basic vulnerability probes.
- 📊 **Data-Driven Execution**: External JSON/CSV datasets drive dynamic test scenarios.
- 🧱 **Modular Architecture**: Built using Page Object Model (POM) for clean separation and reusability.
- ⚙️ **CI/CD Ready**: Integrated with GitHub Actions for automated test runs on push, pull requests, and scheduled jobs.

---

## 📁 Project Structure  
<img width="737" height="251" alt="image" src="https://github.com/user-attachments/assets/95c5a16d-bce5-4c14-9a28-561de0a97572" />

---

## 🧪 Getting Started

```bash
# Install dependencies
npm install

# Run tests
npx playwright test

# View test report
npx playwright show-report

#some Custom Scripts
npm run Full_DataDriven_ETE
npm run Selective_DataDriven_ETE
npm run mockNetwork
npm run API

#allure Reorting is integrated
npm run Full_DataDriven_ETE_allure
allure serve allure-results
```
🔄 GitHub Actions Integration
This project includes a CI workflow that:

Installs dependencies

Runs Playwright tests

Uploads test reports as artifacts


📌 Future Enhancements
Add visual regression testing

Expand security test coverage

add mobile emulation support




