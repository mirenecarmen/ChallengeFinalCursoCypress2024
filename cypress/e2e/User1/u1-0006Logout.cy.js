describe('Validación del proceso de logout', () => {
    it('Debería permitir al usuario cerrar sesión de manera exitosa', () => {
        // Paso 1: Iniciar sesión
        cy.visit('https://www.saucedemo.com/');
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();

        // Paso 2: Navegar a la página principal después de iniciar sesión
        cy.url().should('include', '/inventory.html');

        // Paso 3: Hacer clic en el icono hamburguesa para abrir el menú
        cy.get('#react-burger-menu-btn').should('be.visible').click();

        // Paso 4: Hacer clic en la opción de menú "Logout"
        cy.get('.bm-item-list').contains('Logout').should('be.visible').click();

        // Paso 5: Verificar que el usuario es redirigido a la página de inicio de sesión
        cy.url().should('include', '/');
        cy.get('#login-button').should('be.visible'); // Verifica que el botón de login está visible, lo que indica que estamos en la página de inicio de sesión
    });
});