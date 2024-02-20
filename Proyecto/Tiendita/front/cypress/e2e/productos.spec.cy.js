describe('API productos', () => {


  it('Obtener productos', () => {
    cy.request('GET', 'http://localhost:5000/productos')
      .then(response => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.length(39) // ejemplo
      }) 
  })

  it('Mostrar titulo correctamente', () => {
    cy.visit('http://localhost:3000/registro-productos')
  
    .then(response => {
      cy.get('h1').should('contain', 'GESTIÓN DE PRODUCTOS')
    }) 
  })


  it('Verificar que se muestre la tabla de productos', () => {
    cy.visit('http://localhost:3000/registro-productos')
  
    .then(response => {
      cy.get('table').should('be.visible')
    }) 
  })

  it('Agregar producto esta visible', () => {
    cy.visit('http://localhost:3000/registro-productos')
  
    .then(response => {
      cy.get('.custom-button').contains('Agregar Producto').click();
      cy.get('.modal').should('be.visible');
    }) 
  })
  
  it('Verificar que se pueda filtrar por categoría', () => {
    cy.visit('http://localhost:3000/registro-productos')
  
    .then(response => {
      cy.get('#categoria').select('Fruta')
      cy.get('table tbody tr').should('have.length', 2)
    }) 
    })
  
  })