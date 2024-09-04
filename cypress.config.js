const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Aquí puedes configurar otros eventos personalizados si lo necesitas
    },
    baseUrl: 'https://www.saucedemo.com', // URL base para las pruebas
    chromeWebSecurity: false, // Desactiva la seguridad de Chrome si es necesario
    // Agrega otras configuraciones aquí
  },
});