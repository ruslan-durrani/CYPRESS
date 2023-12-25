// Add global exception handling at the top of your test file
Cypress.on('uncaught:exception', (err, runnable) => {
  // We return false to prevent Cypress from failing the test
  return false;
});

describe('eBay Category Search Tests', () => {
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
    it(`Should get the first two products in ${category.name} category after search`, () => {
      // Visit eBay homepage with a longer timeout
      cy.visit(Cypress.env("WEBSITE"), { timeout: 10000 });

      // Perform search with explicit wait
      cy.get('input[id="gh-ac"]', { timeout: 5000 }).type(`${category.searchQuery}{enter}`);

      // Wait for results and validate URL contains the search query
      cy.url().should('include', encodeURI(category.searchQuery));
      cy.get('.srp-results', { timeout: 10000 }).should('exist');

      // Get the first two product details
      cy.get('.srp-results .s-item', { timeout: 10000 }).should('have.length.at.least', 2).then(items => {
        // Extract the details of the first two products
        const firstProduct = extractProductDetails(items[0]);
        const secondProduct = extractProductDetails(items[1]);

        // Display the product details in the Cypress test output
        cy.log('First Product Details:', firstProduct);
        cy.log('Second Product Details:', secondProduct);

        // Read the existing data from the file
        cy.readFile('cypress/results/product-details.json').then(existingData => {
          let mergedData = [];
      
          // Check if the existing data is valid JSON
          if (existingData) {
            try {
              // Attempt to parse the existing data
              mergedData = existingData;
            } catch (error) {
              // Handle any parsing errors here
              cy.log('Error parsing existing data:', error);
            }
          }
      
          // Append the new product details to the existing data
          mergedData.push(firstProduct, secondProduct);
      
          // Store the merged data back in the file
          cy.writeToFile(mergedData,"product-details.json");
          // cy.writeFile('cypress/results/product-details.json', JSON.stringify(mergedData)) // Make sure to stringify the data
          //   .then(() => {
          //     // You can log the merged data if needed
          //     cy.log('Merged Product Details:', mergedData);
          //   });
        });
        

      });
    });
  });
});

// Function to extract product details from a Cypress element
function extractProductDetails(element) {
  const product = {
    title: Cypress.$(element).find('.s-item__title').text(),
    price: Cypress.$(element).find('.s-item__price').text(),
    shipping: Cypress.$(element).find('.s-item__shipping').text(),
    // Add more details as needed
  };
  return product;
}
