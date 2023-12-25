// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('login', (username, password) => {
    // Enter username and click continue
    cy.get('input[id="userid"]').type(username);
    cy.get('button[id="signin-continue-btn"]').click();
    // Enter password
    cy.get('input[id="pass"]').type(password);
    cy.get('button[id="sgnBt"]').click();
  });
  
  Cypress.Commands.add("writeToFile",(mergedData,fileName)=>{
    cy.writeFile('cypress/results/'+fileName, JSON.stringify(mergedData)) // Make sure to stringify the data
            .then(() => {
              // You can log the merged data if needed
              cy.log(fileName+' Details:', mergedData);
            });
  });