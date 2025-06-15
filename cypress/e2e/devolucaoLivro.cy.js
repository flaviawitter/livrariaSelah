describe('Compra e Devolução de livro', () => {
  it('Deve permitir que o cliente realize o processo de compra e devolução', () => {
    cy.visit('http://localhost:3000/login');
    
    cy.get('#login-email').clear().type('teste');
    cy.get('#login-senha').clear().type('123');
    cy.get('#login-botaoEntrar').click();

    cy.wait(1500);
    cy.visit('http://localhost:3000/livro/1');
    cy.wait(1500);
    cy.get('.sc-jgbSNz').click();
    cy.wait(1500);
    cy.get('[href="/carrinho"] > .sc-hKMtZM > img').click();
    cy.get('.sc-jgbSNz').click();
    cy.wait(1500);
    cy.get('.sc-liHMlC > :nth-child(3) > .sc-fThYeS > :nth-child(2) > input').click();
    cy.wait(1500);
    cy.get(':nth-child(1) > .sc-fjqEFS > input').click();
    cy.get('.sc-gicCDI').clear().type('47.94');
    cy.wait(1500);
    cy.get('.sc-jgbSNz').click();

    cy.wait(1500);
    cy.visit('http://localhost:3000/login');
    cy.get('a > .sc-HzFiz').click();
    cy.get('[href="/pedidosadm"] > .sc-eXBvqI').click();
    cy.wait(1500);
    cy.get(':nth-child(27) > .sc-cwpsFg > .sc-gSAPjG').click();
    
    cy.wait(1500);
    cy.visit('http://localhost:3000/login');
    cy.wait(1500);
    cy.get('#login-email').clear().type('teste');
    cy.get('#login-senha').clear().type('123');
    cy.get('#login-botaoEntrar').click();
    cy.wait(1500);
    cy.get('[href="/pedidoscliente"] > .sc-gsnTZi').click();
    cy.wait(1500);
    cy.get(':nth-child(7) > :nth-child(7) > .sc-jgbSNz').click();

    cy.wait(1500);
    cy.visit('http://localhost:3000/login');
    cy.get('a > .sc-HzFiz').click();    
    cy.get('[href="/pedidosadm"] > .sc-eXBvqI').click();
    cy.get(':nth-child(8) > .sc-cwpsFg > .sc-gSAPjG').click();
  })
})