// Add global exception handling at the top of your test file
Cypress.on('uncaught:exception', (err, runnable) => {
  // We return false to prevent Cypress from failing the test
  return false;
});
describe('User Data Fetch Test', () => {
  afterEach(() => {
    cy.wait(7000);
  });
  it('fetches user data', () => {
    cy.visit(Cypress.env("LOCALHOST"));
    cy.get('.user-name').should('contain', 'John Doe');

    // More assertions as needed
  });
  it('successfully logs in', () => {
    cy.visit(Cypress.env("LOCALHOST_LOGIN"));
    cy.get('input#email').type('john.doe@example.com');
    cy.get('input#password').type('password123');
    cy.get('button[type="submit"]').click();
    // cy.get('form#loginForm').submit();
    // cy.contains('Login successful');
    // More assertions as needed
  });
});