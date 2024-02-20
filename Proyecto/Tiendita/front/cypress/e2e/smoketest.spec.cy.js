describe('Pruebas de navegacion', () => {
  it('Verificar que se muestra la pantalla de login', () => {
      cy.visit('http://localhost:3000/');

      
      cy.get('[type="text"]').should('exist');
      cy.get('[type="password"]').should('exist');
      cy.get('.custom-button').should('exist');
  });

  it('Realizar el login y verificar la página de inicio', () => {
    
    cy.visit('http://localhost:3000/');
    cy.get('[type="text"]').should('be.visible').type('admin');
    cy.get('[type="password"]').type('password');
    cy.get('.custom-button').click();

    
    cy.wait(1000);

    
    cy.url().should('include', '/home');



  
  });
  it('Redireccionamiento a Facturacion desde Home', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[type="text"]').should('be.visible').type('admin');
    cy.get('[type="password"]').type('password');
    cy.get('.custom-button').click();
    cy.url().should('include', '/home');
    
    cy.wait(2000);
    cy.get(':nth-child(2) > .nav-link').click();
    cy.url().should('eq', 'http://localhost:3000/facturacion');
    cy.wait(3000);
    
  });
  it('Redireccionamiento a Registro de Clientes desde Home', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[type="text"]').should('be.visible').type('admin');
    cy.get('[type="password"]').type('password');
    cy.get('.custom-button').click();
    cy.url().should('include', '/home');
    
    cy.wait(2000);
    cy.get(':nth-child(3) > .nav-link').click();
    cy.url().should('eq', 'http://localhost:3000/registro-clientes');
    cy.wait(3000);
});

it('Redireccionamiento a Registro de Productos desde Home', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[type="text"]').should('be.visible').type('admin');
    cy.get('[type="password"]').type('password');
    cy.get('.custom-button').click();
    cy.url().should('include', '/home');
    
    cy.wait(2000);
    cy.get(':nth-child(4) > .nav-link').click();
    cy.url().should('eq', 'http://localhost:3000/registro-productos');
    cy.wait(3000);
});

it('Redireccionamiento a Registro de Proveedores desde Home', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[type="text"]').should('be.visible').type('admin');
    cy.get('[type="password"]').type('password');
    cy.get('.custom-button').click();
    cy.url().should('include', '/home');
    
    cy.wait(2000);
    cy.get(':nth-child(5) > .nav-link').click();
    cy.wait(2000);
    cy.url().should('eq', 'http://localhost:3000/registro-proveedor');
    cy.wait(3000);
});

it('Redireccionamiento a Facturas desde Home', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[type="text"]').should('be.visible').type('admin');
    cy.get('[type="password"]').type('password');
    cy.get('.custom-button').click();
    cy.url().should('include', '/home');
    
    cy.wait(2000);
    cy.get(':nth-child(6) > .nav-link').click();
    cy.url().should('eq', 'http://localhost:3000/registro-factura');
    cy.wait(3000);
});


});