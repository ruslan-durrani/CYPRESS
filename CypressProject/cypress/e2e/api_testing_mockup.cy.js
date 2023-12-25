// Add global exception handling at the top of your test file
Cypress.on('uncaught:exception', (err, runnable) => {
    // We return false to prevent Cypress from failing the test
    return false;
  });
describe('User Data Fetch Test', () => {
  afterEach(() => {
    cy.wait(7000);
  });
  it('mocks a GET request for user data', () => {
      cy.intercept('GET', 'http://localhost:3000/users/1', {
          statusCode: 200,
          body: {
              id: 1,
              name: "John Doe",
              email: "john.doe@example.com"
          }
      }).as('getUserData');
      cy.visit('http://localhost:3000/');
      cy.wait(7000);
      cy.visit('http://localhost:3000/user-profile.html');
      cy.wait('@getUserData').its('response.statusCode').should('eq', 200);

      // Assertions to check if the data is displayed correctly on the page
      cy.get('.user-name').should('contain', 'John Doe');
      cy.get('.user-email').should('contain', 'john.doe@example.com');
      // Add more assertions as needed
  });
  it('mocks the login functionality with dummy data', () => {
    cy.intercept('POST', 'http://localhost:3000/login', (req) => {
        expect(req.body).to.include({
            email: 'test@example.com',
            password: 'password123'
        });
        req.reply({
            statusCode: 200,
            body: {
                message: 'Login successful'
            }
        });
    }).as('postLogin');

    cy.visit('http://localhost:3000/login.html');
    cy.get('input#email').type('test@example.com');
    cy.get('input#password').type('password123');
    cy.get('button[type="submit"]').click();

    cy.wait('@postLogin').its('response.statusCode').should('eq', 200);
    // cy.contains('Login successful'); // Adjust based on how your app handles login
});
});



// // userDataTest.spec.js
// describe('User Data Display Test', () => {
//   beforeEach(() => {
//     cy.intercept('POST', 'http://localhost:3000/login', {
//       body: { token: 'fake-jwt-token' },
//       headers: { 'Content-Type': 'application/json' },
//       statusCode: 200
//     }).as('login');

//     // Intercept the GET request and allow it to proceed to the server
//     cy.intercept('GET', 'http://localhost:3000/users/1').as('getUserData');

//     cy.visit('http://localhost:8080'); // Ensure this is the correct URL where your frontend is served
//   });

//   it('logs in and displays user data correctly', () => {
//     // Mock login
//     cy.get('#email').type('john.doe@example.com');
//     cy.get('#password').type('yourpassword');
//     cy.get('#loginButton').click();
//     cy.wait('@login').its('response.statusCode').should('eq', 200);

//     // Wait for the GET request to users/1 and validate
//     cy.wait('@getUserData').its('response.statusCode').should('eq', 200);
//     cy.get('@getUserData').then((interception) => {
//       assert.isNotNull(interception.response.body, '1st API call has data');
//     });

//     // Validate UI elements for user data
//     cy.get('.user-name').should('contain', 'John Doe');
//     cy.get('.user-email').should('contain', 'john.doe@example.com');
//     cy.get('.user-phone').should('contain', '123-456-7890');
//   });
// });
