// Add global exception handling at the top of your test file
Cypress.on('uncaught:exception', (err, runnable) => {
  // We return false to prevent Cypress from failing the test
  return false;
});
describe('eBay Login Tests', () => {

  before(() => {
    // Actions before any tests start, such as initializing test data
    cy.log('Starting eBay Login Tests');
  });

  beforeEach(() => {
    // Actions before each test, like navigating to a common starting page
    // Here, it's intentionally left blank as we're directly visiting the login page in the test
  });

  afterEach(() => {
    // Actions after each test, like clearing cookies or local storage
    cy.log('Test completed');
  });

  after(() => {
    // Actions after all tests are done, such as cleanup operations
    cy.log('All eBay Login Tests completed');
    // Navigate to eBay homepage
    cy.visit(Cypress.env("WEBSITE"));
  });


  it('Should log in and skip passkey if prompted', () => {
      // Visit eBay login page
      cy.visit(Cypress.env("WEBSITE_SIGNIN"));

      // Enter username and click continue
      cy.login("ruslandu63","SoftwareTesting786@");
      // cy.login("ruslandu46","SoftwareTesting786");
      
      // Check for the link to skip adding a passkey
      cy.get('a[id="passkeys-cancel-btn"]').should('exist').click();

  });
});



// cy.get('input[id="userid"]').type('ruslandu46');
      // cy.get('button[id="signin-continue-btn"]').click();

      // // Enter password
      // cy.get('input[id="pass"]').type('SoftwareTesting786');

      // // Submit the login form
      // cy.get('button[id="sgnBt"]').click();
