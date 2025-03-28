describe('Página de Cadastro', () => {
  it('Deve preencher os campos do formulário corretamente para cadastrar um novo usuário', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[href="/dados"] > .sc-hKMtZM > img').click();

    cy.get('#cliente-nome').type('Flávia Witter');
    cy.get('#cliente-email').type('flavia@email.com');
    cy.get('#cliente-cpf').type('147126302758');
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

    cy.get('#dados-botaoSalvar').click();
  })
})