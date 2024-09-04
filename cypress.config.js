const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Aquí puedes configurar eventos personalizados
      // Por ejemplo, agregar un manejador para `uncaught:exception`
      on('uncaught:exception', (err, runnable) => {
        // Ignora errores específicos
        if (err.message.includes('POST 401')) {
          return false;
        }
        return true;
      });

      // Puedes agregar más configuraciones aquí
    },
    baseUrl: 'https://www.saucedemo.com', // URL base para las pruebas
    chromeWebSecurity: false, // Desactiva la seguridad de Chrome si es necesario
    // Agrega otras configuraciones aquí
  },
});
