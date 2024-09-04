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

// Importa el archivo JSON que contiene los datos de los usuarios
const users = require('../fixtures/usuarios.json');

// Comando personalizado para iniciar sesión
Cypress.Commands.add('login', (userKey) => {
  const user = users[userKey];
  if (user) {
    cy.visit('https://www.saucedemo.com/');
    cy.get('input[name="user-name"]').type(user.username);
    cy.get('input[name="password"]').type(user.password);
    cy.get('input[type="submit"]').click();
  } else {
    throw new Error(`User ${userKey} not found in usuarios.json`);
  }
});