describe('Validación del proceso de checkout', () => {
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

    it('Debería permitir completar el proceso de checkout', () => {
        // Paso 1: Asegurarse de que el producto 'Test.allTheThings() T-Shirt (Red)' está disponible y agregarlo al carrito
        cy.get('[data-test="inventory-item-name"]').contains('Test.allTheThings() T-Shirt (Red)').parent().find('[data-test="add-to-cart"]').click();

        // Paso 2: Navegar al carrito de compras
        cy.get('[data-test="shopping-cart-link"]').click();
        
        // Verificar que el carrito contiene el producto 'Test.allTheThings() T-Shirt (Red)'
        cy.get('.cart_item').contains('Test.allTheThings() T-Shirt (Red)').should('be.visible');

        // Paso 3: Hacer clic en el botón "Checkout"
        cy.get('[data-test="checkout"]').click();

        // Paso 4: Completar los campos First Name, Last Name, Zip/Postal Code
        cy.get('[data-test="firstName"]').type('irene');
        cy.get('[data-test="lastName"]').type('Machuca');
        cy.get('[data-test="postalCode"]').type('1234');

        // Paso 5: Hacer clic en el botón "Continue"
        cy.get('[data-test="continue"]').click();

        // Paso 6: Verificar que se muestre una página con los detalles del pedido
        cy.url().should('include', '/checkout-step-two.html');
        cy.get('.summary_info').should('be.visible');
    });
});