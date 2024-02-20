describe('Pruebas de RegistroCliente', () => {
  it('Obtener clientes', () => {
    cy.request('GET', 'http://localhost:5000/clientes')
      .then(response => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.length(29) // ejemplo
      }) 
  })

  it('Mostrar titulo correctamente', () => {
    cy.visit('http://localhost:3000/registro-clientes')
  
    .then(response => {
      cy.get('h1').should('contain', 'GESTIÓN DE CLIENTES')
    }) 
  })
  it('Verificar que se muestre la tabla de clientes', () => {
    cy.visit('http://localhost:3000/registro-clientes')
  
    .then(response => {
      cy.get('table').should('be.visible')
    }) 
  })

  it('Agregar cliente esta visible', () => {
    cy.visit('http://localhost:3000/registro-clientes')
  
    .then(response => {
      cy.get('.custom-button').contains('Agregar Cliente').click();
      cy.get('.modal').should('be.visible');
    }) 
  })
  /* it('Verificar que se pueda filtrar por cedula', () => {
    cy.visit('http://localhost:3000/registro-clientes')
  
    .then(response => {
      cy.get('#search').select('1725412371')
      cy.get('table tbody tr').should('have.length', 2)
    }) 
  }) */

  
});