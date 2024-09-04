describe('Validar el login con usuario “standard_user”', () => {
  it('Debería permitir el acceso a la página principal con usuario standard_user', () => {
      // Paso 1: Ingresar a la página de login
      cy.visit('https://www.saucedemo.com/');

      // Paso 2: Ingresar el usuario standard_user en el campo Username
      cy.get('#user-name').type('standard_user');

      // Paso 3: Ingresar la contraseña secret_sauce en el campo Password
      cy.get('#password').type('secret_sauce');

      // Paso 4: Hacer clic en el botón "Login"
      cy.get('#login-button').click();

      // Paso 5: Verificar que el usuario es redirigido a la página principal
      cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');
      
      // Verificar que el título de la página contiene "Products" (opcional pero recomendado)
      cy.get('.title').should('contain.text', 'Products');
  });
});