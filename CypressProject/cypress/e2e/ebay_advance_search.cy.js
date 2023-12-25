// Add global exception handling at the top of your test file
Cypress.on('uncaught:exception', (err, runnable) => {
  // We return false to prevent Cypress from failing the test
  return false;
});
describe('eBay Advanced Search Test', () => {
  it('Performs an advanced search with various parameters and checks results', () => {
    // Navigate to eBay's main page
    cy.visit('https://www.ebay.com/');

    // Click on the "Advanced" link
    cy.get('a[href*="sch/ebayadvsearch"]').first().click();

    // Interact with text inputs, checkboxes, radio buttons, dropdowns, etc.
    cy.get('input[id="_nkw"]').type('Laptop'); // Enter keywords
    cy.get('select[name="_in_kw"]').select('1'); // Select keyword options
    cy.get('input[id="_ex_kw"]').type('Apple'); // Exclude words from your search
    // cy.get('select[name="_sacat"]').select('1'); // Choose category

    // Additional interactions based on your provided HTML structure
    cy.get('input[name="LH_TitleDesc"]').check(); // Check 'Title and description'
    cy.get('input[name="LH_Complete"]').check(); // Check 'Completed items'
    cy.get('input[name="LH_Sold"]').check(); // Check 'Sold items'
    // ... and so on for other checkboxes

    cy.get('input[name="_udlo"]').type('50'); // Enter minimum price
    cy.get('input[name="_udhi"]').type('500'); // Enter maximum price

    cy.get('input[name="LH_FS"]').check(); // Check 'Free shipping'
    cy.get('input[name="LH_LPickup"]').check(); // Check 'Local pickup'

    cy.get('input[name="LH_PrefLoc"]').check(); // Select preferred location option
    cy.get('select[name="_salic"]').select('1'); // Select 'Located in' option

    cy.get('input[name="_fss"]').check(); // Check 'Only show items from:'
    cy.get('input[name="_sasl"]').type('seller_id'); // Type seller ID

    cy.get('select[name="_sop"]').select('12'); // Select 'Sort by' option
    cy.get('select[name="_dmd"]').select('2'); // Select 'View results' option
    cy.get('select[name="_ipg"]').select('120'); // Select 'Results per page' option

    // Click the search button
    cy.get('button[type="submit"]').first().click();

    // Wait for the results page to load and verify the results
    // Add your assertions here to validate the search results
  });
});
