describe('Página de Cadastro', () => {
  it('Deve preencher os campos do formulário corretamente para cadastrar um novo usuário', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[href="/dados"] > .sc-hKMtZM > img').click();

    //Preenchendo usuário
    cy.get('#cliente-nome').type('Paulo Andrade'); 
    cy.get('#cliente-email').type('paulo.andrade@email.com');
    cy.get('#cliente-cpf').type('33445566778');
    cy.get('#cliente-senha').type('senha9876');
    cy.get('#cliente-nascimento').type('1988-06-22');
    cy.get('#cliente-genero').select('Masculino');
    cy.get('#cliente-tipoTelefone').select('Celular');    
    cy.get('#cliente-ddd').type('11'); 
    cy.get('#cliente-numero').type('999887766');

    cy.get('#enderecoEntrega-cidade').select('Cotia');    
    cy.get('#enderecoEntrega-tpLogradouro').select('Rua');  
    cy.get('#enderecoEntrega-logradouro').type('dos Pinheiros');
    cy.get('#enderecoEntrega-numero').type('456');
    cy.get('#enderecoEntrega-bairro').type('Granja Viana');
    cy.get('#enderecoEntrega-cep').type('06714360'); 
    cy.get('#enderecoEntrega-tpResidencia').select('Casa');

    cy.get('#enderecoCobranca-cidade').select('Cotia');
    cy.get('#enderecoCobranca-tpLogradouro').select('Avenida');
    cy.get('#enderecoCobranca-logradouro').type('São Camilo');
    cy.get('#enderecoCobranca-numero').type('789');
    cy.get('#enderecoCobranca-bairro').type('Jardim da Glória'); 
    cy.get('#enderecoCobranca-cep').type('06714360');    
    cy.get('#enderecoCobranca-tpResidencia').select('Apartamento'); 

    cy.get('#cartao-apelido').type('Cartão Paulo');
    cy.get('#cartao-numero').type('9876543210987654');
    cy.get('#cartao-codSeguranca').type('321');
    cy.get('#cartao-validade').type('07/29');
    cy.get('#cartao-nomeTitular').type('Paulo Andrade');
    cy.get('#cartao-bandeira').select('MasterCard');

    //Salvar usuário
    cy.get('#dados-botaoSalvar').click();

    cy.wait(15000);
    
    //Deletar usuário
    cy.get('#dados-botaoExcluir').click();

  })
})