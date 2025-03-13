import { usuarios } from '../fixtures/usuarios.json'

describe('Página de Cadastro em Massa', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.get('[href="/dados"] > .sc-hKMtZM > img').click();
  })
  
  usuarios.forEach(usuario => {
    it('Deve preencher os campos do formulário corretamente para cadastrar uma massa de usuários', () => {
   
      cy.get('.sc-himrzO > :nth-child(1) > .sc-gicCDI').type(usuario.nome);
      cy.get('.sc-himrzO > :nth-child(2) > .sc-gicCDI').type(usuario.email);
      cy.get('.sc-himrzO > :nth-child(3) > .sc-gicCDI').type(usuario.cpf);
      cy.get('.sc-himrzO > :nth-child(4) > .sc-gicCDI').type(usuario.senha);
      cy.get('.sc-himrzO > :nth-child(5) > .sc-gicCDI').type(usuario.nascimento);
      cy.get('.sc-himrzO > :nth-child(6) > .sc-ezWOiH').select(usuario.sexo);
      cy.get(':nth-child(7) > .sc-ezWOiH').select(usuario.tipoTelefone);    
      cy.get('.sc-himrzO > :nth-child(8) > .sc-gicCDI').type(usuario.ddd); 
      cy.get(':nth-child(9) > .sc-gicCDI').type(usuario.numeroTelefone);
      
      cy.get(':nth-child(3) > .sc-ezWOiH').select(usuario.cidadeEntrega); 
      cy.get(':nth-child(4) > .sc-ezWOiH').select(usuario.tpLogradouroEntrega);  
      cy.get('.sc-jdAMXn > :nth-child(5) > .sc-gicCDI').type(usuario.logradouroEntrega);
      cy.get(':nth-child(6) > .sc-gicCDI').type(usuario.numeroEnderecoEntrega);
      cy.get(':nth-child(7) > .sc-gicCDI').type(usuario.bairroEntrega);
      cy.get('.sc-jdAMXn > :nth-child(8) > .sc-gicCDI').type(usuario.cepEntrega); 
      cy.get(':nth-child(9) > .sc-ezWOiH').select(usuario.tpResidenciaEntrega);   
      
      cy.get(':nth-child(14) > .sc-ezWOiH').select(usuario.cidadeCobranca);   
      cy.get(':nth-child(15) > .sc-ezWOiH').select(usuario.tpLogradouroCobranca); 
      cy.get(':nth-child(16) > .sc-gicCDI').type(usuario.logradouroCobranca);
      cy.get(':nth-child(17) > .sc-gicCDI').type(usuario.numeroEnderecoCobranca);
      cy.get(':nth-child(18) > .sc-gicCDI').type(usuario.bairroCobranca);
      cy.get(':nth-child(19) > .sc-gicCDI').type(usuario.cepCobranca); 
      cy.get(':nth-child(20) > .sc-ezWOiH').select(usuario.tpResidenciaCobranca); 
      
      cy.get('.sc-cTQhss > :nth-child(1) > .sc-gicCDI').type(usuario.apelidoCartao);
      cy.get('.sc-cTQhss > :nth-child(2) > .sc-gicCDI').type(usuario.numeroCartao);
      cy.get('.sc-cTQhss > :nth-child(3) > .sc-gicCDI').type(usuario.codSeguranca);
      cy.get('.sc-cTQhss > :nth-child(4) > .sc-gicCDI').type(usuario.validade);
      cy.get('.sc-cTQhss > :nth-child(5) > .sc-gicCDI').type(usuario.nomeTitular);
      cy.get('.sc-cTQhss > :nth-child(6) > .sc-ezWOiH').select(usuario.bandeiraCartao);
      
    
        cy.get('.sc-hTtwUo').click();
  })
  
  })
})