describe('Cadastrar Novo Cartão', () => {

  it('Adicionar um novo usuário e depois adicionar campos de "Adicionar Cartão" e cadastrá-lo', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[href="/dados"] > .sc-hKMtZM > img').click();

    //Preenchendo usuário
    cy.get('#cliente-nome').type('Marcelo Duarte');
    cy.get('#cliente-email').type('marcelo.duarte@email.com');
    cy.get('#cliente-cpf').type('12345678900');
    cy.get('#cliente-senha').type('senha1234');
    cy.get('#cliente-nascimento').type('1990-05-20');
    cy.get('#cliente-genero').select('Masculino');
    cy.get('#cliente-tipoTelefone').select('Celular');    
    cy.get('#cliente-ddd').type('11'); 
    cy.get('#cliente-numero').type('998877665');

    cy.get('#enderecoEntrega-cidade').select('Suzano');    
    cy.get('#enderecoEntrega-tpLogradouro').select('Avenida');  
    cy.get('#enderecoEntrega-logradouro').type('Brasil');
    cy.get('#enderecoEntrega-numero').type('456');
    cy.get('#enderecoEntrega-bairro').type('Jardim América');
    cy.get('#enderecoEntrega-cep').type('08620000'); 
    cy.get('#enderecoEntrega-tpResidencia').select('Casa');

    cy.get('#enderecoCobranca-cidade').select('Suzano');
    cy.get('#enderecoCobranca-tpLogradouro').select('Rua');
    cy.get('#enderecoCobranca-logradouro').type('da Paz');
    cy.get('#enderecoCobranca-numero').type('123');
    cy.get('#enderecoCobranca-bairro').type('Centro'); 
    cy.get('#enderecoCobranca-cep').type('08620000');    
    cy.get('#enderecoCobranca-tpResidencia').select('Apartamento'); 

    cy.get('#cartao-apelido').type('Cartão Marcelo');
    cy.get('#cartao-numero').type('9876543212345678');
    cy.get('#cartao-codSeguranca').type('321');
    cy.get('#cartao-validade').type('11/25');
    cy.get('#cartao-nomeTitular').type('Marcelo Duarte');
    cy.get('#cartao-bandeira').select('Elo');

    //salvando usuário
    cy.get('#dados-botaoSalvar').click();

    cy.wait(2000);

    //abrindo modal novo endereço
    cy.get('#dados-botaoAdicionarEndereco').click();

    //preenchendo novo endereço
    cy.get('#modal-enderecoCidade').select('Mogi Das Cruzes');
    cy.get('#modal-enderecoTpLogradouro').select('Rua');
    cy.get('#modal-enderecoLogradouro').type('Anita Costa Leite');
    cy.get('#modal-enderecoNumeroEndereco').type('297');
    cy.get('#modal-enderecoBairro').type('Mogi Moderno'); 
    cy.get('#modal-enderecoCEP').type('08717300');    
    cy.get('#modal-enderecoTpResidencia').select('Casa'); 
    cy.get('#modal-tpEndereco').select('Entrega'); 

    //salvando novo cartão
    cy.get('#modal-botaoEnderecoCadastrar').click();
    
  });
});
