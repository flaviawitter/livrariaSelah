describe('Compra de livro', () => {
  it('Deve permitir que o cliente realize o processo de compra completo', () => {
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
  })
})