describe('Cadastrar Novo Cartão', () => {

  
  it('Adicionar um novo usuário e depois adicionar campos de "Adicionar Cartão" e cadastrá-lo', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[href="/dados"] > .sc-hKMtZM > img').click();

    //Preenchendo usuário
    cy.get('#cliente-nome').type('Bruna Faria');
    cy.get('#cliente-email').type('bruna.faria@email.com');
    cy.get('#cliente-cpf').type('11223344556');
    cy.get('#cliente-senha').type('senha5678');
    cy.get('#cliente-nascimento').type('1995-08-10');
    cy.get('#cliente-genero').select('Feminino');
    cy.get('#cliente-tipoTelefone').select('Celular');    
    cy.get('#cliente-ddd').type('31'); 
    cy.get('#cliente-numero').type('987654321');

    cy.get('#enderecoEntrega-cidade').select('Mogi Das Cruzes');    
    cy.get('#enderecoEntrega-tpLogradouro').select('Rua');  
    cy.get('#enderecoEntrega-logradouro').type('da Liberdade');
    cy.get('#enderecoEntrega-numero').type('789');
    cy.get('#enderecoEntrega-bairro').type('Centro');
    cy.get('#enderecoEntrega-cep').type('30100300'); 
    cy.get('#enderecoEntrega-tpResidencia').select('Apartamento');

    cy.get('#enderecoCobranca-cidade').select('Mogi Das Cruzes');
    cy.get('#enderecoCobranca-tpLogradouro').select('Avenida');
    cy.get('#enderecoCobranca-logradouro').type('Brasil');
    cy.get('#enderecoCobranca-numero').type('258');
    cy.get('#enderecoCobranca-bairro').type('Centro'); 
    cy.get('#enderecoCobranca-cep').type('30100300');    
    cy.get('#enderecoCobranca-tpResidencia').select('Casa'); 

    cy.get('#cartao-apelido').type('Cartao 1');
    cy.get('#cartao-numero').type('1234567891234567');
    cy.get('#cartao-codSeguranca').type('123');
    cy.get('#cartao-validade').type('12/28');
    cy.get('#cartao-nomeTitular').type('Bruna Faria');
    cy.get('#cartao-bandeira').select('Visa');

    //salvando usuário
    cy.get('#dados-botaoSalvar').click();

    cy.wait(2000);

    //abrindo modal novo cartão
    cy.get('#dados-botaoAdicionarCartao').click();

    //preenchendo novo cartão
    cy.get('#modal-apelidoCartao').clear().type('Cartao 2');
    cy.get('#modal-numeroCartao').clear().type('9874563210257896');
    cy.get('#modal-codSegCartao').clear().type('369');
    cy.get('#modal-validadeCartao').clear().type('12/29');
    cy.get('#modal-nomeTitularCartao').clear().type('Bruna Faria');
    cy.get('#modal-bandeiraCartao').select('Elo');

    //salvando novo cartão
    cy.get('#modal-botaoCartaoCadastrar').click();
    
  });
});
