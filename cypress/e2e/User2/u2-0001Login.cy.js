describe('Validar el login con usuario "problem_user"', () => {
    before(() => {
        // Cargar los datos del archivo usuarios.json antes de que las pruebas se ejecuten
        cy.fixture('usuarios.json').as('usuarios');
    });

    it('Debería permitir el acceso a la página principal con usuario problem_user', function() {
        // Paso 1: Ingresar a la página de login
        cy.visit('https://www.saucedemo.com/');

        // Paso 2: Ingresar el usuario problem_user en el campo Username
        cy.get('#user-name').type(this.usuarios.user2.username);  // problem_user

        // Paso 3: Ingresar la contraseña secret_sauce en el campo Password
        cy.get('#password').type(this.usuarios.user2.password);   // secret_sauce

        // Paso 4: Hacer clic en el botón "Login"
        cy.get('#login-button').click();

        // Paso 5: Verificar que el usuario es redirigido a la página principal
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');
    });
});