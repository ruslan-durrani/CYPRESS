const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    baseUrl: 'https://localhost:3000',
    WEBSITE:"www.ebay.com",
    LOCALHOST:"http://localhost:3000",
    LOCALHOST_LOGIN:"http://localhost:3000/login.html",
    WEBSITE_SIGNIN:"https://www.ebay.com/signin/"
  },
});
