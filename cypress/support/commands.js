Cypress.Commands.add('fillMandatoryFieldsAndSubmit' , function() {
    cy.get('#firstName').type("Dg")
    cy.get('#lastName').type("costa")
    cy.get('#email').type('diegocosta@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('.button').click()

   
})