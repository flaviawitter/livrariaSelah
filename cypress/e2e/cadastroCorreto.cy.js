describe('Página de Cadastro', () => {
  it('Deve preencher os campos do formulário corretamente para cadastrar um novo usuário', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[href="/dados"] > .sc-hKMtZM > img').click();

    cy.get('.sc-himrzO > :nth-child(1) > .sc-gicCDI').type('Flávia Witter');
    cy.get('.sc-himrzO > :nth-child(2) > .sc-gicCDI').type('flavia@email.com');
    cy.get('.sc-himrzO > :nth-child(3) > .sc-gicCDI').type('147896302758');
    cy.get('.sc-himrzO > :nth-child(4) > .sc-gicCDI').type('Senha123');
    cy.get('.sc-himrzO > :nth-child(5) > .sc-gicCDI').type('1996-01-27');
    cy.get('.sc-himrzO > :nth-child(6) > .sc-ezWOiH').select('Feminino');
    cy.get(':nth-child(7) > .sc-ezWOiH').select('Celular');    
    cy.get('.sc-himrzO > :nth-child(8) > .sc-gicCDI').type('11'); 
    cy.get(':nth-child(9) > .sc-gicCDI').type('985868386');

    cy.get(':nth-child(3) > .sc-ezWOiH').select('Mogi Das Cruzes');    
    cy.get(':nth-child(4) > .sc-ezWOiH').select('Rua');  
    cy.get('.sc-jdAMXn > :nth-child(5) > .sc-gicCDI').type('Anita Costa Leite');
    cy.get(':nth-child(6) > .sc-gicCDI').type('297');
    cy.get(':nth-child(7) > .sc-gicCDI').type('Mogi Moderno');
    cy.get('.sc-jdAMXn > :nth-child(8) > .sc-gicCDI').type('08717300'); 
    cy.get(':nth-child(9) > .sc-ezWOiH').select('Casa');

    cy.get(':nth-child(14) > .sc-ezWOiH').select('Mogi Das Cruzes');
    cy.get(':nth-child(15) > .sc-ezWOiH').select('Rua');
    cy.get(':nth-child(16) > .sc-gicCDI').type('Anita Costa Leite');
    cy.get(':nth-child(17) > .sc-gicCDI').type('297');
    cy.get(':nth-child(18) > .sc-gicCDI').type('Mogi Moderno'); 
    cy.get(':nth-child(19) > .sc-gicCDI').type('08717300');    
    cy.get(':nth-child(20) > .sc-ezWOiH').select('Casa'); 

    cy.get('.sc-cTQhss > :nth-child(1) > .sc-gicCDI').type('Cartao 1');
    cy.get('.sc-cTQhss > :nth-child(2) > .sc-gicCDI').type('1234567891234567');
    cy.get('.sc-cTQhss > :nth-child(3) > .sc-gicCDI').type('123');
    cy.get('.sc-cTQhss > :nth-child(4) > .sc-gicCDI').type('12/24');
    cy.get('.sc-cTQhss > :nth-child(5) > .sc-gicCDI').type('Flávia Witter');
    cy.get('.sc-cTQhss > :nth-child(6) > .sc-ezWOiH').select('Visa');

    cy.get('.sc-hTtwUo').click();
  })
})