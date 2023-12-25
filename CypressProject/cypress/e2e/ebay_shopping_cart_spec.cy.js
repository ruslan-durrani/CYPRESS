Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
})
describe('eBay Shopping Cart Tests', () => {

  beforeEach(() => {
      // Assuming the login process is the same for each test
      
  });

  it("Loggin in to ebay",() => {
    // Assuming the login process is the same for each test
    cy.visit(Cypress.env("WEBSITE_SIGNIN"));
    cy.get('input[id="userid"]').type('ruslandu63');//63 //46
    cy.get('button[id="signin-continue-btn"]').click();
    cy.get('input[id="pass"]').type('SoftwareTesting786@');//@ // 
    cy.get('button[id="sgnBt"]').click();
    // Skipping the passkey setup if prompted
    cy.get('a[id="passkeys-cancel-btn"]').should('exist').click();
});

it('Searches for a football, views its details, and adds it to the cart', () => {
  cy.visit(Cypress.env("WEBISTE"), { timeout: 10000 });
  cy.get('input[id="gh-ac"]', { timeout: 5000 }).type('football{enter}');
  
  cy.get('.srp-results .s-item', { timeout: 10000 }).should('have.length.at.least', 2).then(items => {
    // Navigate to the first product's detail page
    cy.wrap(items[0]).find('a.s-item__link').invoke('attr', 'href').then(href => {
      cy.visit(href);

      // Click the 'Add to Cart' button
      
      cy.get('button[class="ux-call-to-action__text"]').should('be.visible').click();

      // Navigate back to the eBay main page
      cy.visit('https://www.ebay.com/');
    });

    // Repeat for the second product
    cy.wrap(items[1]).find('a.s-item__link').invoke('attr', 'href').then(href => {
      cy.visit(href);

      // Click the 'Add to Cart' button
      cy.get('button[class="ux-call-to-action__text"]').should('be.visible').click();

      // Navigate back to the eBay main page
      cy.visit('https://www.ebay.com/');
    });
  });
});



// it("Adding items to the cart",()=>{
  // Select and click on the first product to view its details
  // cy.get('.srp-river-results').eq(0).click(); // Replace with the actual product item selector

  // // Assuming we are now on the product details page
  // cy.get('.product-details').should('be.visible'); // Replace with the actual product details selector

  // // Add the product to the cart
  // cy.get('button[id="isCartBtn_btn"]').click(); // Replace with the actual 'Add to Cart' button selector

  // // Go to the shopping cart to verify the item
  // cy.get('#gh-cart-n').click(); // Replace with the actual cart icon selector
  // cy.get('.cart-item').should('have.length', 1); // Replace with the actual cart item selector, assuming one item was added
// });

// it('Updates the quantity of an item in the cart', () => {
//   cy.visit('https://www.ebay.com/cart');
//   cy.get('.cart-item-quantity-selector').first().select('2'); // Update with the actual quantity selector
//   cy.get('.cart-item').first().should('contain', 'Quantity: 2'); // Update with the actual quantity text selector
// });

// it('Validates the total number of items in the cart', () => {
//   cy.visit('https://www.ebay.com/cart');
//   cy.get('.cart-item').should('have.length', 2); // Validate the number of different items
// });

// it('Navigates to the checkout page', () => {
//   cy.visit('https://www.ebay.com/cart');
//   cy.get('button[id="checkoutBtn"]').click(); // Proceed to checkout, update with actual checkout button selector
//   cy.url().should('include', '/checkout');
// });

  // Additional test cases...
});
