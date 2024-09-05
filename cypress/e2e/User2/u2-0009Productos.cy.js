describe('Verificar Información del Producto en Página Principal y Página de Detalles', () => {
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

    it('Debería verificar que la información del producto es consistente en la página principal y en la página de detalles', () => {
        // Paso 1: Navegar a la página principal donde se muestran los productos
        cy.url().should('include', '/inventory.html');

        // Paso 2: Seleccionar el producto "Sauce Labs Backpack" y tomar nota de su nombre y precio
        cy.get('[data-test="inventory-item-name"]').contains('Sauce Labs Backpack')
          .then($product => {
              // Extraer nombre y precio del producto en la página principal
              const productName = $product.text().trim();

              // Extraer el precio del producto, asumimos que el precio está dentro del mismo contenedor
              // Puedes ajustar el selector según el HTML exacto
              const productPrice = $product.parents('.inventory_item')
                                         .find('.inventory_item_price').text().trim();

              // Paso 3: Hacer clic en el producto para acceder a la página de detalles del mismo
              $product.click();

              // Paso 4: Comparar el nombre y el precio del producto en la página de detalles con el nombre y el precio en la página principal
              cy.url().should('include', '/inventory-item.html'); // Asegúrate de que la URL cambie según la estructura del sitio

              // Verificar nombre del producto en la página de detalles
              cy.get('.inventory_details_name').should('have.text', productName);

              // Verificar precio del producto en la página de detalles
              cy.get('.inventory_details_price').should('have.text', productPrice);
          });
    });
});