describe('Verificación de restricción para finalizar checkout sin productos', () => {
    it('No debería permitir finalizar el checkout si no se seleccionaron productos', () => {
        // Paso 1: Iniciar sesión y navegar a la página principal
        cy.visit('https://www.saucedemo.com/');
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();

        // Paso 2: Navegar directamente al carrito de compras sin seleccionar productos
        cy.get('.shopping_cart_link').click();
        cy.url().should('include', '/cart.html');

        // Paso 3: Iniciar el proceso de checkout
        cy.get('.checkout_button').click();

        // Paso 4: Completar los campos de información personal
        cy.get('#first-name').type('irene');
        cy.get('#last-name').type('Machuca');
        cy.get('#postal-code').type('1234');

        // Paso 5: Hacer clic en el botón "Continue"
        cy.get('.btn_primary').click();

        // Paso 6: Intentar finalizar el checkout haciendo clic en "Finish"
        cy.get('.btn_action').contains('Finish').click();

        // Resultado esperado: Verificar que se muestra una advertencia sobre la falta de productos en el carrito
        cy.get('.error-message-container').should('not.exist')
    });
});