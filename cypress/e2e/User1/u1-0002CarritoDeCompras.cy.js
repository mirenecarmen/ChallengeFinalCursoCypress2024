describe('Validar la funcionalidad para agregar productos al carrito', () => {
    it('Debería permitir agregar el producto "Test.allTheThings() T-Shirt (Red)" al carrito y verificar la cantidad en el carrito', () => {
        // Paso 1: Iniciar sesión y navegar a la página de productos
        cy.visit('https://www.saucedemo.com/');
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        
        // Verificar que estamos en la página de productos
        cy.url().should('include', '/inventory.html');

        // Paso 2: Identificar el producto "Test.allTheThings() T-Shirt (Red)" y agregarlo al carrito
        cy.contains('Test.allTheThings() T-Shirt (Red)').parents('.inventory_item').within(() => {
            // Paso 3: Hacer clic en el botón "Add to cart"
            cy.contains('Add to cart').click();
        });

        // Paso 4: Verificar que el número de productos en el ícono del carrito se actualice correctamente
        cy.get('.shopping_cart_badge').should('contain', '1');

        // Paso 5: Navegar al ícono del carrito de compras, hacer clic y confirmar que el producto agregado coincide con la cantidad elegida
        cy.get('.shopping_cart_link').click();
        cy.url().should('include', '/cart.html');
        
        // Verificar que la cantidad de productos en el carrito es 1
        cy.get('.cart_quantity').should('contain', '1');
        
        // Verificar que el nombre del producto en el carrito es "Test.allTheThings() T-Shirt (Red)"
        cy.get('.inventory_item_name').should('have.text', 'Test.allTheThings() T-Shirt (Red)');
    });
});