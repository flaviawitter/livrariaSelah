describe('Compra de livro valor cobrado errado', () => {
  it('Deve informar ao cliente que o valor inserido no campo do cartão está incorreto e impedir a finalização do pedido', () => {
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
    cy.get(':nth-child(1) > .sc-fjqEFS > [type="checkbox"]').click();
    cy.get('.sc-gicCDI').clear().type('50');
    cy.wait(1500);
    cy.get('.sc-jgbSNz').click();
    cy.get('#resumo-soma-errada').should('contain', 'O valor total dos cartões deve ser');
  })
})