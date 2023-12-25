// ebayNavigationContentAndSeo.spec.js
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});

describe('eBay Navigation Content and SEO Test', () => {
  before(() => {
    // Navigate to the eBay homepage
    cy.visit(Cypress.env("WEBSITE")); // Adjust URL if necessary
  });

  beforeEach(() => {
    // Actions to perform before each test
    // e.g., resetting state or preparing test data
    cy.log('Starting a new test');
  });

  afterEach(() => {
    // Actions to perform after each test
    // e.g., cleaning up state, logging, or resetting cookies/localStorage
    cy.log('Test completed');
  });

  after(() => {
    // Actions to perform after all tests in the block are done
    // e.g., final cleanup or closing connections
    cy.log('All tests completed');
  });

  it('Should have correct labels and SEO-friendly URLs', () => {
    const navigationItems = [
      { label: 'Home', url: 'https://www.ebay.com' }, // Assuming 'Home' redirects to the main page
        { label: 'Saved', url: 'https://www.ebay.com/feed' },
        { label: 'Electronics', url: 'https://www.ebay.com/b/Electronics/bn_7000259124' },
        { label: 'Motors', url: 'https://www.ebay.com/b/Auto-Parts-Accessories/6028/bn_569479' },
        { label: 'Fashion', url: 'https://www.ebay.com/b/Fashion/bn_7000259856' },
        { label: 'Collectibles and Art', url: 'https://www.ebay.com/b/Collectibles-Art/bn_7000259855' },
        { label: 'Sports', url: 'https://www.ebay.com/b/Sporting-Goods/888/bn_1865031' },
        { label: 'Health & Beauty', url: 'https://www.ebay.com/b/Health-Beauty/26395/bn_1865479' },
        { label: 'Industrial equipment', url: 'https://www.ebay.com/b/Business-Industrial/12576/bn_1853744' },
        { label: 'Home & Garden', url: 'https://www.ebay.com/b/Home-Garden/11700/bn_1853126' },
        { label: 'Deals', url: 'https://www.ebay.com/globaldeals' },
    ];

    const results = [];

    cy.wrap(navigationItems).each(item => {
      cy.contains('a', item.label).then(link => {
        const url = link.prop('href');
        const status = url === item.url ? 'passed' : 'failed';
        results.push({ label: item.label, expectedUrl: item.url, actualUrl: url, status: status });
      });
    }).then(() => {
      cy.writeFile('cypress/results/navigationTestResults.json', results);
    });
  });
});
