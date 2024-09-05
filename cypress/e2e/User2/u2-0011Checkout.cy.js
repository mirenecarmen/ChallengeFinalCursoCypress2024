describe('Verificación de restricción para finalizar checkout sin productos', () => {
    before(() => {
        // Leer datos del archivo usuarios.json
        cy.fixture('usuarios.json').then((usuarios) => {
            // Iniciar sesión con el usuario problem_user
            cy.visit('https://www.saucedemo.com/');
            cy.get('#user-name').type(usuarios.user2.username); // Usa el nombre de usuario del archivo usuarios.json
            cy.get('#password').type(usuarios.user2.password); // Usa la contraseña del archivo usuarios.json
            cy.get('#login-button').click();
        });
    });

    it('No debería permitir finalizar el checkout sin productos', () => {
        // Paso 1: Navegar al carrito de compras
        cy.get('[data-test="shopping-cart-link"]').click();
        
        // Verificar que el carrito está vacío
        cy.get('.cart_list').should('not.exist');

        // Paso 2: Hacer clic en el botón "Checkout"
        cy.get('[data-test="checkout"]').click();

        // Paso 3: Completar los campos de información
        cy.get('[data-test="firstName"]').type('irene');
        cy.get('[data-test="lastName"]').type('Machuca');
        cy.get('[data-test="postalCode"]').type('1234');

        // Paso 4: Hacer clic en el botón "Continue"
        cy.get('[data-test="continue"]').click();

        // Paso 5: Intentar finalizar el checkout y verificar el mensaje de advertencia
        cy.get('[data-test="finish"]').click();
        
        // Resultado esperado: El sistema debe mostrar una advertencia informando al usuario que no seleccionó ningún producto
        cy.get('.error-message-container').should('be.visible');
        cy.get('.error-message-container').contains('Your cart is empty');
    });
});