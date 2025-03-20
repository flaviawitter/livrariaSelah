describe('Página de Cadastro - Alteração', () => {
  it('Deve alterar corretamente o dado de um novo usuário', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[href="/dados"] > .sc-hKMtZM > img').click();

    cy.get('#cliente-nome').type('Rapael Gomez');
    cy.get('#cliente-email').type('raphael.gomezz@email.com');
    cy.get('#cliente-cpf').type('11263354966');
    cy.get('#cliente-senha').type('senha5678');
    cy.get('#cliente-nascimento').type('1995-08-10');
    cy.get('#cliente-genero').select('Masculino');
    cy.get('#cliente-tipoTelefone').select('Celular');    
    cy.get('#cliente-ddd').type('31'); 
    cy.get('#cliente-numero').type('987654321');

    // Endereço de entrega
    cy.get('#enderecoEntrega-cidade').select('Mogi Das Cruzes');    
    cy.get('#enderecoEntrega-tpLogradouro').select('Rua');  
    cy.get('#enderecoEntrega-logradouro').type('da Liberdade');
    cy.get('#enderecoEntrega-numero').type('789');
    cy.get('#enderecoEntrega-bairro').type('Centro');
    cy.get('#enderecoEntrega-cep').type('30100300'); 
    cy.get('#enderecoEntrega-tpResidencia').select('Apartamento');

    // Endereço de cobrança
    cy.get('#enderecoCobranca-cidade').select('Mogi Das Cruzes');
    cy.get('#enderecoCobranca-tpLogradouro').select('Avenida');
    cy.get('#enderecoCobranca-logradouro').type('Brasil');
    cy.get('#enderecoCobranca-numero').type('258');
    cy.get('#enderecoCobranca-bairro').type('Centro'); 
    cy.get('#enderecoCobranca-cep').type('30100300');    
    cy.get('#enderecoCobranca-tpResidencia').select('Casa');

    // Cartão de crédito
    cy.get('#cartao-apelido').type('Cartao 1');
    cy.get('#cartao-numero').type('1234567891234567');
    cy.get('#cartao-codSeguranca').type('123');
    cy.get('#cartao-validade').type('12/28');
    cy.get('#cartao-nomeTitular').type('Raphael Gomez');
    cy.get('#cartao-bandeira').select('Visa');

    //Salvar dados
    cy.get('#dados-botaoSalvar').click();

    cy.wait(15000);

    //Alteração dos dados
    cy.get('#cliente-nome').clear().type('Raphael Gomez');
    cy.get('#cliente-email').clear().type('raphael.gomez@email.com');

    cy.get('#dados-botaoAtualizarDados').click();
  })
})