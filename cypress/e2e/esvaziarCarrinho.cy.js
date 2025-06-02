describe('Esvaziar carrinho', () => {
  it('Deve esvaziar o carrinho após 3min e exibir um aviso para o usuário', () => {
    cy.visit('http://localhost:3000/');
    cy.visit('http://localhost:3000/livro/8');
    cy.get('.sc-jgbSNz').click();
    cy.wait(1200);
    cy.get('#carrinho-vazio').should('contain', 'O carrinho foi limpo após 3 minutos de inatividade.');
    cy.get('[href="/carrinho"] > .sc-hKMtZM > img').click();
  })
})