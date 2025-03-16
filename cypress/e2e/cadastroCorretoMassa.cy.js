import { usuarios } from '../fixtures/usuarios.json'

describe('Página de Cadastro em Massa', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.get('[href="/dados"] > .sc-hKMtZM > img').click();
  })
  
  usuarios.forEach(usuario => {
    it('Deve preencher os campos do formulário corretamente para cadastrar uma massa de usuários', () => {
   
      cy.get('#cliente-nome').type(usuario.nome);
      cy.get('#cliente-email').type(usuario.email);
      cy.get('#cliente-cpf').type(usuario.cpf);
      cy.get('#cliente-senha').type(usuario.senha);
      cy.get('#cliente-nascimento').type(usuario.nascimento);
      cy.get('#cliente-genero').select(usuario.sexo);
      cy.get('#cliente-tipoTelefone').select(usuario.tipoTelefone);    
      cy.get('#cliente-ddd').type(usuario.ddd); 
      cy.get('#cliente-numero').type(usuario.numeroTelefone);
      
      cy.get('#enderecoEntrega-cidade').select(usuario.cidadeEntrega); 
      cy.get('#enderecoEntrega-tpLogradouro').select(usuario.tpLogradouroEntrega);  
      cy.get('#enderecoEntrega-logradouro').type(usuario.logradouroEntrega);
      cy.get('#enderecoEntrega-numero').type(usuario.numeroEnderecoEntrega);
      cy.get('#enderecoEntrega-bairro').type(usuario.bairroEntrega);
      cy.get('#enderecoEntrega-cep').type(usuario.cepEntrega); 
      cy.get('#enderecoEntrega-tpResidencia').select(usuario.tpResidenciaEntrega);   
      
      cy.get('#enderecoCobranca-cidade').select(usuario.cidadeCobranca);   
      cy.get('#enderecoCobranca-tpLogradouro').select(usuario.tpLogradouroCobranca); 
      cy.get('#enderecoCobranca-logradouro').type(usuario.logradouroCobranca);
      cy.get('#enderecoCobranca-numero').type(usuario.numeroEnderecoCobranca);
      cy.get('#enderecoCobranca-bairro').type(usuario.bairroCobranca);
      cy.get('#enderecoCobranca-cep').type(usuario.cepCobranca); 
      cy.get('#enderecoCobranca-tpResidencia').select(usuario.tpResidenciaCobranca); 
      
      cy.get('#cartao-apelido').type(usuario.apelidoCartao);
      cy.get('#cartao-numero').type(usuario.numeroCartao);
      cy.get('#cartao-codSeguranca').type(usuario.codSeguranca);
      cy.get('#cartao-validade').type(usuario.validade);
      cy.get('#cartao-nomeTitular').type(usuario.nomeTitular);
      cy.get('#cartao-bandeira').select(usuario.bandeiraCartao);
      
    
        cy.get('#dados-botaoSalvar').should('be.visible').click();
        cy.wait(1000);
  })
  
  })
})