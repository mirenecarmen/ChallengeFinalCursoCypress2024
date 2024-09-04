describe('Verificación de checkout exitoso', () => {
    it('Debería completar el proceso de checkout y confirmar que el pedido se ha realizado con éxito', () => {
        // Paso 1: Iniciar sesión y navegar a la página de productos
        cy.visit('https://www.saucedemo.com/');
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        
        // Paso 2: Agregar el producto "Test.allTheThings() T-Shirt (Red)" al carrito
        cy.contains('Test.allTheThings() T-Shirt (Red)').parents('.inventory_item').within(() => {
            cy.contains('Add to cart').click();
        });

        // Paso 3: Navegar al carrito de compras
        cy.get('.shopping_cart_link').click();
        cy.url().should('include', '/cart.html');

        // Paso 4: Hacer clic en el botón "Checkout"
        cy.get('.checkout_button').click();

        // Paso 5: Completar los campos First Name, Last Name, Zip/Postal Code
        cy.get('#first-name').type('irene');
        cy.get('#last-name').type('Machuca');
        cy.get('#postal-code').type('1234');

        // Paso 6: Hacer clic en el botón "Continue"
        cy.get('.btn_primary').click();

        // Paso 7: Verificar que estamos en la página de confirmación del pedido
        cy.url().should('include', '/checkout-step-two.html');
        cy.get('.title').should('have.text', 'Checkout: Overview');
        
        // Verificar que el producto en los detalles del pedido es el correcto
        cy.contains('Test.allTheThings() T-Shirt (Red)').should('exist');

        // Paso 8: Hacer clic en el botón "Finish" para completar el pedido
        cy.get('.btn_action').contains('Finish').click();

    });
});