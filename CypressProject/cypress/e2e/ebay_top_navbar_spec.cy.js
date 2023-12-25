// Add this at the top of your test file
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test upon an uncaught exception
  return false;
});

describe('eBay Top Navigation Bar Tests', () => {
  beforeEach(() => {
      // Visit eBay homepage before each test
      
      cy.visit(Cypress.env("WEBSITE"));
  });

  it('Should navigate to Daily Deals and back', () => {
      // Click on the Daily Deals link
      cy.get('li#gh-p-1 a').click();

      // Verify we are on the Daily Deals page
      cy.url().should('include', '/globaldeals');

      // Navigate back to eBay homepage
      cy.visit(Cypress.env("WEBSITE"));
  });

  it('Should navigate to Help & Contact and back', () => {
      // Click on the Help & Contact link
      cy.get('li#gh-p-3 a').click();

      // Verify we are on the Help & Contact page
      cy.url().should('include', '/ocs/home');

      // Navigate back to eBay homepage
      cy.visit(Cypress.env("WEBSITE"));
  });

  it('Should interact with Ship to and handle modal', () => {
    // Click on the 'Ship to' button
    cy.get('button[title="Ship to"]').click();

    // Assuming 'div#gh-shipto-click-modal' is the correct selector for the modal
    // Verify the modal is opened
    cy.get('div#gh-shipto-click-modal').should('be.visible');

    // Click the 'Done' button to close the modal
    // Correcting the selector for the 'Done' button
    cy.get("button.shipto__close-btn").click();

    // Verify the modal is closed after interaction
    // Use the same modal selector as above
    cy.get('div#gh-shipto-click-modal').should('not.be.visible');
});

it('Should navigate to the Sell page and back', () => {
  // Click on the Sell link
  cy.get('a.gh-p[href="https://www.ebay.com/sl/sell"]').click();

  // Verify we are on the Sell page
  cy.url().should('include', '/sl/sell');

  // Navigate back to eBay homepage
  cy.visit(Cypress.env("WEBSITE"));
});

it('Should navigate to the Shopping Cart page and back', () => {
  // Click on the Shopping Cart icon
  cy.get('a[aria-label="Your shopping cart"]').click();

  // Verify we are on the Shopping Cart page
  cy.url().should('include', '/sc/view');

  // Navigate back to eBay homepage
  cy.visit(Cypress.env("WEBSITE"));
});

  // Add more tests for other links in the navigation bar if needed
});
