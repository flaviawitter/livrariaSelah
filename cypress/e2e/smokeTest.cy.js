describe('Compra e Devolução de livro', () => {
  it('Deve permitir que o cliente realize o processo de compra e devolução', () => {
    cy.visit('http://localhost:3000/login');
    
    cy.get('#login-email').clear().type('teste');
    cy.get('#login-senha').clear().type('123');
    cy.get('#login-botaoEntrar').click();

    cy.wait(1500);
    cy.visit('http://localhost:3000/livro/1');
    cy.wait(1500);
    cy.get('#livro-adicionar').click();
    cy.wait(1500);
    cy.get('[href="/carrinho"] > .sc-hKMtZM > img').click();
    cy.get('#carrinho-irEntrega').click();
    cy.wait(1500);
    cy.get(':nth-child(1) > #carrinho-endereco').click();
    cy.wait(1500);
    cy.get(':nth-child(1) > .sc-lgVVsH > #carrinho-cartao').click();
    cy.get('#carrinho-valorCartao').clear().type('47.94');
    cy.wait(1500);
    cy.get('#carrinho-finalizar').click();

    cy.wait(1500);
    cy.visit('http://localhost:3000/login');
    cy.get('#login-adm').click();
    cy.get('[href="/pedidosadm"] > .sc-eXBvqI').click();
    cy.wait(1500);
    cy.get(':nth-child(1) > :nth-child(8) > #adm-aprovarPedido').click();
    
    cy.wait(5000);
    cy.visit('http://localhost:3000/login');
    cy.wait(1500);
    cy.get('#login-email').clear().type('teste');
    cy.get('#login-senha').clear().type('123');
    cy.get('#login-botaoEntrar').click();
    cy.wait(1500);
    cy.get('[href="/pedidoscliente"] > .sc-gsnTZi').click();
    cy.wait(1500);
    cy.get(':nth-child(1) > :nth-child(7) > #pedidos-solicitarDevolucao').click();

    cy.wait(3000);
    cy.visit('http://localhost:3000/login');
    cy.get('#login-adm').click();    
    cy.get('[href="/pedidosadm"] > .sc-eXBvqI').click();
    cy.get(':nth-child(1) > :nth-child(8) > #adm-aprovarDevolucao').click();

    cy.wait(1500);
    cy.visit('http://localhost:3000/livro/2');
    cy.wait(1500);
    cy.get('#livro-adicionar').click();
    cy.wait(1500);
    cy.get('[href="/carrinho"] > .sc-hKMtZM > img').click();
    cy.get('#carrinho-aumentarQuantidade').click();
    cy.get('#carrinho-irEntrega').click();
    cy.wait(1500);
    cy.get(':nth-child(2) > #carrinho-endereco').click();
    cy.wait(1500);
    cy.get(':nth-child(1) > .sc-lgVVsH > #carrinho-cartao').click();
    cy.get('#carrinho-valorCartao').clear().type('20.00');
    cy.get(':nth-child(2) > .sc-lgVVsH > #carrinho-cartao').click();
    cy.get(':nth-child(2) > .sc-lgVVsH > .sc-geuGuN > #carrinho-valorCartao').clear().type('20.00');
    cy.get(':nth-child(9) > #carrinho-cupom').click();
    cy.wait(1500);
    cy.get('#carrinho-finalizar').click();
  })
})