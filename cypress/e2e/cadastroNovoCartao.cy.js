describe('Cadastrar Novo Cartão', () => {

  it('Adicionar um novo usuário e depois adicionar campos de "Adicionar Cartão" e cadastrá-lo', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[href="/dados"] > .sc-hKMtZM > img').click();

    //Preenchendo usuário
    cy.get('#cliente-nome').type('F Witter');
    cy.get('#cliente-email').type('flavia@email.com');
    cy.get('#cliente-cpf').type('147196303758');
    cy.get('#cliente-senha').type('Senha123');
    cy.get('#cliente-nascimento').type('1996-01-27');
    cy.get('#cliente-genero').select('Feminino');
    cy.get('#cliente-tipoTelefone').select('Celular');    
    cy.get('#cliente-ddd').type('11'); 
    cy.get('#cliente-numero').type('985868386');

    cy.get('#enderecoEntrega-cidade').select('Mogi Das Cruzes');    
    cy.get('#enderecoEntrega-tpLogradouro').select('Rua');  
    cy.get('#enderecoEntrega-logradouro').type('Anita Costa Leite');
    cy.get('#enderecoEntrega-numero').type('297');
    cy.get('#enderecoEntrega-bairro').type('Mogi Moderno');
    cy.get('#enderecoEntrega-cep').type('08717300'); 
    cy.get('#enderecoEntrega-tpResidencia').select('Casa');

    cy.get('#enderecoCobranca-cidade').select('Mogi Das Cruzes');
    cy.get('#enderecoCobranca-tpLogradouro').select('Rua');
    cy.get('#enderecoCobranca-logradouro').type('Anita Costa Leite');
    cy.get('#enderecoCobranca-numero').type('297');
    cy.get('#enderecoCobranca-bairro').type('Mogi Moderno'); 
    cy.get('#enderecoCobranca-cep').type('08717300');    
    cy.get('#enderecoCobranca-tpResidencia').select('Casa'); 

    cy.get('#cartao-apelido').type('Cartao 1');
    cy.get('#cartao-numero').type('1234567891234567');
    cy.get('#cartao-codSeguranca').type('123');
    cy.get('#cartao-validade').type('12/24');
    cy.get('#cartao-nomeTitular').type('Flávia Witter');
    cy.get('#cartao-bandeira').select('Visa');

    //salvando usuário
    cy.get('#dados-botaoSalvar').click();

    //abrindo modal novo cartão
    cy.get('#dados-botaoAdicionarCartao').click();

    //preenchendo novo cartão
    cy.get('#modal-apelidoCartao').clear().type('Cartao 2');
    cy.get('#modal-numeroCartao').clear().type('1234567891234567');
    cy.get('#modal-codSegCartao').clear().type('123');
    cy.get('#modal-validadeCartao').clear().type('12/24');
    cy.get('#modal-nomeTitularCartao').clear().type('João Silva');
    cy.get('#modal-bandeiraCartao').select('Visa');

    //salvando novo cartão
    cy.get('#modal-botaoCartaoCadastrar').click();
    
  });
});
