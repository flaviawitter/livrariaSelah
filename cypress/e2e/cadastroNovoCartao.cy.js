describe('Cadastrar Novo Cartão', () => {

  it('Adicionar um novo usuário e depois adicionar campos de "Adicionar Cartão" e cadastrá-lo', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[href="/dados"] > .sc-hKMtZM > img').click();

    // Preenchendo o formulário do usuário
    cy.get('.sc-himrzO > :nth-child(1) > .sc-gicCDI').type('Flávia Witter');
    cy.get('.sc-himrzO > :nth-child(2) > .sc-gicCDI').type('flavia@email.com');
    cy.get('.sc-himrzO > :nth-child(3) > .sc-gicCDI').type('127876202758');
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

    // Preenchendo o cartão
    cy.get('.sc-dvwKko > :nth-child(1) > .sc-gicCDI').type('Cartao 1');
    cy.get('.sc-cTQhss > :nth-child(2) > .sc-gicCDI').type('1234567891234567');
    cy.get('.sc-cTQhss > :nth-child(3) > .sc-gicCDI').type('123');
    cy.get('.sc-cTQhss > :nth-child(4) > .sc-gicCDI').type('12/24');
    cy.get('.sc-cTQhss > :nth-child(5) > .sc-gicCDI').type('Flávia Witter');
    cy.get('.sc-cTQhss > :nth-child(6) > .sc-ezWOiH').select('Visa');

    // Enviar o formulário
    cy.get('.sc-hTtwUo').click();

    cy.wait(2000); 
    cy.get('.sc-ZyCDH > :nth-child(5)').click();



  });
});
