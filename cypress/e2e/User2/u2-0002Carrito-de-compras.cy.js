describe('Validar la funcionalidad para agregar productos al carrito con usuario "problem_user"', () => {
    beforeEach(() => {
        // Precondición: Iniciar sesión con usuario y contraseña
        cy.visit('https://www.saucedemo.com/');
        cy.get('#user-name').type('problem_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
    });

    it('Debería permitir agregar los productos al carrito y actualizar el ícono del carrito correctamente', () => {
        // Paso 1: Verificar que estamos en la página de productos
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');

        // Paso 2: Identificar los productos y agregar al carrito
        cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click();
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        // Paso 3: Verificar que el número de productos en el ícono del carrito se actualice correctamente
        cy.get('.shopping_cart_badge').should('have.text', '3');

        // Paso 4: Hacer clic en el ícono del carrito de compras
        cy.get('.shopping_cart_link').click();

        // Paso 5: Confirmar que los productos agregados coinciden con la cantidad elegida
        cy.get('.cart_item').should('have.length', 3);
        
        // Verificar los nombres de los productos en el carrito
        cy.get('.inventory_item_name').eq(0).should('contain.text', 'Sauce Labs Onesie');
        cy.get('.inventory_item_name').eq(1).should('contain.text', 'Sauce Labs Bike Light');
        cy.get('.inventory_item_name').eq(2).should('contain.text', 'Sauce Labs Backpack');
    });
});