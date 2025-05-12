describe('Compra de livro indisponível', () => {
  it('Deve alertar o cliente que o livro não está disponível e não permitir que o livro seja adicionado ao carrinho', () => {
    cy.visit('http://localhost:3000/');
    cy.visit('http://localhost:3000/livro/9');
    cy.get('.sc-jgbSNz').click();
    cy.get('#livro-sem-estoque').should('contain', 'Este livro não consta em estoque :(');


  })
})