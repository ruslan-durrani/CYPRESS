Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});
describe('eBay Search Functionality Test', () => {
  it('successfully searches for products', () => {
    // Visit eBay's homepage
    cy.visit(Cypress.env("WEBSITE"));

    // Wait for the search input to be available and enabled
    cy.get('#gh-ac', { timeout: 10000 }).should('be.visible').and('be.enabled');

    cy.get('#gh-ac').screenshot('ebay-search-item-before');
    // Type the search term into the search input
    cy.get('#gh-ac').type('laptop');
    // Click the search button
    cy.get('#gh-btn').click();
    // After Click
    cy.get('#gh-ac').screenshot('ebay-search-item-after');
    // Wait for and verify that the search results are displayed
    cy.get('.srp-results', { timeout: 10000 }).should('be.visible');
    cy.get('.srp-results .s-item').should('have.length.at.least', 1);
  });
});
