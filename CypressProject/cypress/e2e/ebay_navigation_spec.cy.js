// Add global exception handling at the top of your test file
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('eBay Navigation Tests', () => {
  const testResults = [];

  beforeEach(() => {
    cy.visit(Cypress.env("WEBSITE"));
    cy.wait(5000);
  });

  afterEach(() => {
    cy.writeToFile(testResults,"navigation-test-results.json");
    // cy.writeFile('cypress/results/navigation-test-results.json', testResults);
  });

  const categories = [
    { name: 'Electronics', urlPart: '/b/Electronics' },
    { name: 'Motors', urlPart: '/b/Auto-Parts-Accessories' },
    { name: 'Fashion', urlPart: '/b/Fashion' },
    { name: 'Collectibles and Art', urlPart: '/b/Collectibles-Art' },
    { name: 'Sports', urlPart: '/b/Sporting-Goods' },
    { name: 'Health & Beauty', urlPart: '/b/Health-Beauty' },
    { name: 'Industrial equipment', urlPart: '/b/Business-Industrial' },
    { name: 'Home & Garden', urlPart: '/b/Home-Garden' }
  ];

  categories.forEach(category => {
    it(`navigates to ${category.name} section`, () => {
      cy.get('.hl-cat-nav__container').trigger('mouseover');

      cy.get('.hl-cat-nav__js-tab').contains(category.name).then($category => {
        if ($category.is(':visible')) {
          cy.wrap($category).click();
          cy.url().should('include', category.urlPart).then(url => {
            testResults.push({ category: category.name, result: 'passed' });
          });
        } else {
          // If the element is not visible, log as 'failed'
          testResults.push({ category: category.name, result: 'failed' });
        }
      });
    });
  });
});










  // // Tests for various subcategories under Electronics
  // const electronicsSubcategories = [
  //     '/b/Cell-Phones-Smart-Watches-Accessories',
  //     '/b/Video-Games-Consoles',
  //     '/b/Computers-Tablets-Network-Hardware',
  //     '/b/Cameras-Photo',
  //     '/b/Camera-Drones',
  //     '/b/eBay-Refurbished',
  //     '/b/Surveillance-Smart-Home-Electronics'
  // ];

  // electronicsSubcategories.forEach(subcategory => {
  //   it(`navigates to ${subcategory.name} under Electronics`, () => {
  //     // Hover to reveal the 'Electronics' category
  //     cy.get('.hl-cat-nav__container').trigger('mouseover');
  //     // Click on 'Electronics'
  //     cy.contains('.hl-cat-nav__js-tab', 'Electronics')
  //       .click({ force: true });
  //     // Now click on the subcategory
  //     cy.contains(`a[href*="${subcategory.urlPart}"]`, subcategory.name)
  //       .click({ force: true });
  //     cy.url().should('include', subcategory.urlPart);
  //   });
  // });

  // // Example test for expanding a category
  // it('expands the Electronics section', () => {
  //   cy.get('.hl-cat-nav__container').trigger('mouseover');
  //   cy.contains('.hl-cat-nav__js-tab', 'Electronics')
  //     .trigger('mouseover');
  //   cy.get('.hl-cat-nav__expander').within(() => {
  //     cy.get('button')
  //       .should('be.visible')
  //       .click();
  //   });
  //   cy.get('.hl-cat-nav__flyout').should('be.visible');
  // });