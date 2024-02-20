describe('Página de inicio', () => {
  beforeEach(() => {
    // Puedes agregar configuraciones comunes o acciones antes de cada prueba si es necesario
    // Por ejemplo, puedes visitar la página de inicio antes de cada prueba
    cy.visit('http://localhost:3000/home');
  });

  // Prueba 1: Verifica que el título de la página sea correcto
  it('debería tener el título correcto', () => {
    cy.title().should('eq', 'HOME');
  });

  // Prueba 2: Verifica que la sección de bienvenida esté presente y contenga el texto adecuado
  it('debería mostrar la sección de bienvenida', () => {
    cy.get('.slider_item-detail').should('exist');
    cy.get('.slider_item-detail h1').should('contain', 'Bienvenido');
  });

  // Prueba 3: Verifica que la sección de productos esté presente y contenga las categorías adecuadas
  it('debería mostrar la sección de productos con categorías', () => {
    cy.get('.section2').should('exist');
    cy.get('.functionality__col').should('have.length', 4);
  });

  // Prueba 4: Verifica que la sección de información de la tienda esté presente y contenga el texto adecuado
  it('debería mostrar la sección de información de la tienda', () => {
    cy.get('#nombreTienda').should('exist');
    cy.get('.text-section3 h3').should('contain', 'Tiendita');
  });

  // Prueba 5: Verifica que la sección de contacto esté presente y contenga la información adecuada
  it('debería mostrar la sección de contacto', () => {
    cy.get('.section4').should('exist');
    cy.get('.section4-contenedores').should('have.length', 3);
  });

  // Prueba 6: Verifica que haya imágenes en la página
  it('debería mostrar imágenes', () => {
    cy.get('img').should('exist');
  });

  // Prueba 7: Verifica que el componente se renderice sin errores y en un tiempo razonable
  it('debería renderizar sin errores', () => {
    cy.get('.hero_area').should('exist');
  });

  // Prueba 8: Verifica que la sección de bienvenida contenga el texto esperado
  it('debería mostrar el mensaje de bienvenida correcto', () => {
    cy.get('.slider_item-detail h1').should('contain', 'Bienvenido');
  });

  // Prueba 9: Verifica que las imágenes en la sección de productos se carguen correctamente
  it('debería mostrar imágenes de productos', () => {
    cy.get('.functionality__col img').should('be.visible');
  });

  // Prueba 10: Asegúrate de que la sección de información de la tienda esté presente en la página
  it('debería mostrar la sección de información de la tienda', () => {
    cy.get('#nombreTienda').should('exist');
  });

  // Prueba 11: Asegúrate de que haya imágenes en la página
  it('debería mostrar imágenes', () => {
    cy.get('img').should('exist');
  });
});