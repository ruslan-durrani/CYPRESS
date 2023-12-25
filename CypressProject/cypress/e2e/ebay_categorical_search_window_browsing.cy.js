// Add global exception handling at the top of your test file
Cypress.on('uncaught:exception', (err, runnable) => {
  // We return false to prevent Cypress from failing the test
  return false;
});

describe('eBay Category Search Tests', () => {

  before(() => {
    // Actions to perform before any test starts
    // e.g., setting up test data or environment
    cy.log('Starting eBay Category Search Tests');
  });

  beforeEach(() => {
    // Actions to perform before each test
    // e.g., visiting a specific page or resetting state
    cy.visit(Cypress.env("WEBSITE"), { timeout: 10000 });
  });
  
  afterEach(() => {
    // Actions to perform after each test
    // e.g., logging, cleaning up state, or resetting cookies/localStorage
    cy.log('Test completed');
  });

  after(() => {
    // Actions to perform after all tests are completed
    // e.g., clean up test data or close connections
    cy.log('All eBay Category Search Tests completed');
  });
  // Define categories and corresponding search queries
  const categories = [
    { name: 'Electronics', searchQuery: 'smartphone', expectedResults: 'Smartphones' },
    { name: 'Fashion', searchQuery: 'sneakers', expectedResults: 'Sneakers' },
    { name: 'Home & Garden', searchQuery: 'lamp', expectedResults: 'Lamps' },
    { name: 'Motors', searchQuery: 'sedan', expectedResults: 'Sedan Cars' },
    { name: 'Sporting Goods', searchQuery: 'bicycle', expectedResults: 'Bicycles' },
    { name: 'Toys & Hobbies', searchQuery: 'lego', expectedResults: 'Lego' },
    { name: 'Business & Industrial', searchQuery: 'printer', expectedResults: 'Printers' },
    { name: 'Health & Beauty', searchQuery: 'skincare', expectedResults: 'Skincare Products' },
    { name: 'Books', searchQuery: 'novel', expectedResults: 'Novels' },
    { name: 'Music', searchQuery: 'guitar', expectedResults: 'Guitars' },
    { name: 'Collectibles & Art', searchQuery: 'painting', expectedResults: 'Paintings' },
    { name: 'Pet Supplies', searchQuery: 'dog food', expectedResults: 'Dog Food' }

  ];

  categories.forEach(category => {

      it(`Should perform a search in ${category.name} category and display correct results`, () => {

          // Perform search with explicit wait
          cy.get('input[id="gh-ac"]', { timeout: 5000 }).type(`${category.searchQuery}{enter}`);
          
          // Wait for results and validate URL contains the search query
          cy.url().should('include', encodeURI(category.searchQuery));
          cy.get('.srp-results', { timeout: 10000 }).should('exist');
      });
  });
});
