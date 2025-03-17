describe('Trocar senha', () => {

  
  it('Adicionar um novo usuário e depois trocar sua senha', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[href="/dados"] > .sc-hKMtZM > img').click();

    //Preenchendo usuário
    cy.get('#cliente-nome').type('Luciana Peres');
    cy.get('#cliente-email').type('luciana.peres@email.com');
    cy.get('#cliente-cpf').type('98762462100');
    cy.get('#cliente-senha').type('senha4321');
    cy.get('#cliente-nascimento').type('1992-03-15');
    cy.get('#cliente-genero').select('Feminino');
    cy.get('#cliente-tipoTelefone').select('Celular');    
    cy.get('#cliente-ddd').type('11'); 
    cy.get('#cliente-numero').type('991234567');

    cy.get('#enderecoEntrega-cidade').select('Poa');    
    cy.get('#enderecoEntrega-tpLogradouro').select('Rua');  
    cy.get('#enderecoEntrega-logradouro').type('das Acácias');
    cy.get('#enderecoEntrega-numero').type('123');
    cy.get('#enderecoEntrega-bairro').type('Jardim Imperador');
    cy.get('#enderecoEntrega-cep').type('08551000'); 
    cy.get('#enderecoEntrega-tpResidencia').select('Casa');

    cy.get('#enderecoCobranca-cidade').select('Poa');
    cy.get('#enderecoCobranca-tpLogradouro').select('Avenida');
    cy.get('#enderecoCobranca-logradouro').type('Brasil');
    cy.get('#enderecoCobranca-numero').type('321');
    cy.get('#enderecoCobranca-bairro').type('Centro'); 
    cy.get('#enderecoCobranca-cep').type('08551000');    
    cy.get('#enderecoCobranca-tpResidencia').select('Apartamento'); 

    cy.get('#cartao-apelido').type('Cartão Luciana');
    cy.get('#cartao-numero').type('4567891234567890');
    cy.get('#cartao-codSeguranca').type('456');
    cy.get('#cartao-validade').type('08/27');
    cy.get('#cartao-nomeTitular').type('Luciana Peres');
    cy.get('#cartao-bandeira').select('MasterCard');


    //salvando usuário
    cy.get('#dados-botaoSalvar').click();

    cy.wait(15000);

    //preenchendo nova senha
    cy.get('#senha-atual').clear().type('senha4321');
    cy.get('#senha-nova').clear().type('4321senha');
    cy.get('#senha-repetirNova').clear().type('4321senha');

    //salvando nova senha
    cy.get('#senha-botaoAtualizar').click();
    
  });
});
