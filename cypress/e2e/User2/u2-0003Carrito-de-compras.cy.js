describe('Verificar funcionalidad del Botón "Add to Cart"', () => {
    before(() => {
        // Iniciar sesión con el usuario problem_user usando datos del archivo usuarios.json
        cy.fixture('usuarios.json').then((usuarios) => {
            const { username, password } = usuarios.user2; // Obtener datos del usuario 2
            
            cy.visit('https://www.saucedemo.com/');
            cy.get('#user-name').type(username); // Usa el nombre de usuario del archivo usuarios.json
            cy.get('#password').type(password); // Usa la contraseña del archivo usuarios.json
            cy.get('#login-button').click();
        });
    });

    it('Debería permitir agregar el producto "Sauce Labs Backpack" al carrito', () => {
        // Paso 1: Navegar a la página de productos después de iniciar sesión
        cy.url().should('include', '/inventory.html');

        // Paso 2: Identificar el producto "Sauce Labs Backpack" y hacer clic en "Add to cart"
        cy.get('[data-test="inventory-item-name"]').contains('Sauce Labs Backpack')
          .parents('.inventory_item') // Encuentra el contenedor del producto
          .find('.btn_inventory') // Encuentra el botón "Add to cart"
          .click();

        // Paso 3: Verificar que el número de productos en el ícono del carrito se actualice correctamente
        cy.get('.shopping_cart_badge').should('contain.text', '1');
    });
});