describe('Validar el proceso de checkout para el producto "Test.allTheThings() T-Shirt (Red)"', () => {
    it('Debería permitir completar el proceso de checkout desde el carrito de compras', () => {
        // Paso 1: Iniciar sesión y agregar el producto "Test.allTheThings() T-Shirt (Red)" al carrito
        cy.visit('https://www.saucedemo.com/');
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();

        // Verificar que estamos en la página de productos
        cy.url().should('include', '/inventory.html');

        // Agregar el producto "Test.allTheThings() T-Shirt (Red)" al carrito
        cy.contains('Test.allTheThings() T-Shirt (Red)').parents('.inventory_item').within(() => {
            cy.contains('Add to cart').click();
        });

        // Verificar que el número de productos en el ícono del carrito se actualice correctamente
        cy.get('.shopping_cart_badge').should('contain', '1');

        // Paso 2: Navegar al carrito de compras y verificar que la cantidad en el carrito sea correcta
        cy.get('.shopping_cart_link').click();
        cy.url().should('include', '/cart.html');
        cy.get('.cart_quantity').should('contain', '1');
        
        // Paso 3: Hacer clic en el botón "Checkout"
        cy.get('#checkout').click();
        cy.url().should('include', '/checkout-step-one.html');

        // Paso 4: Completar los campos First Name, Last Name, Zip/Postal Code
        cy.get('#first-name').type('irene');
        cy.get('#last-name').type('Machuca');
        cy.get('#postal-code').type('1234');

        // Paso 5: Hacer clic en el botón "Continue"
        cy.get('#continue').click();
        cy.url().should('include', '/checkout-step-two.html');

        // Resultado esperado: Verificar que se muestre una página con los detalles del pedido
        cy.get('.summary_info').should('be.visible');
        cy.get('.inventory_item_name').should('have.text', 'Test.allTheThings() T-Shirt (Red)');
    });
});