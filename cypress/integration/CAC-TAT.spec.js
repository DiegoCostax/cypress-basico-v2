/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(() => {
        cy.visit('./src/index.html')
    })
        
  

    it('verifica o título da aplicação', function() {
       
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

    })
    it('Preenche os campos obrigatorios e envia o formulario', () => {
        const longText = ',teste, teste,,teste, teste,,teste, teste,,teste, teste,,teste, teste,,teste, teste,,teste, teste,,teste, teste,'
        cy.get('#firstName').type("Dg")
        cy.get('#lastName').type("costa")
        cy.get('#email').type('dgcosta@gmail.com')
        cy.get('#open-text-area').type(longText, { delay: 0})
        cy.get('.button').click()

        cy.get('.success').should('be.visible')
    });
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type("Dg")
        cy.get('#lastName').type("costa")
        cy.get('#email').type('dgcosta@gmail,com')
        cy.get('#open-text-area').type('teste')
        cy.get('.button').click()

        cy.get('.error').should('be.visible')
    });
    it('Validação do numero', () => {
        cy.get('#phone').type('xgduet')
        cy.get('#phone').should("have.value", "")
  })
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#phone-checkbox').check()
    cy.get('#firstName').type("Dg")
    cy.get('#lastName').type("costa")
    cy.get('#email').type('dgcosta@gmail,com')
    cy.get('#open-text-area').type('teste')
    cy.get('.button').click()


    cy.get('.error').should('be.visible')
  });  
  it(' preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
    .type("Dg")
    .should("have.value", "Dg")

     cy.get('#firstName')
     .clear()
     .should("have.value", "")

    cy.get('#lastName')
    .type("costa")
    .should('have.value', 'costa')
    cy.get('#lastName')
    .clear()
    .should('have.value', '')

    cy.get('#email').type('dgcosta@gmail,com')
    cy.get('#open-text-area').type('teste')
    cy.get('.button').click()
  });
   it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('.button').click()
    cy.get('.error').should('be.visible')
    
  });
  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  });
  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube')

    cy.get('#product').should('have.value', 'youtube')
    
  });
  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
    .select('mentoria')
    .should('have.value', 'mentoria')
  });
  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
    .select(1)
    .should('have.value','blog')
  });
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get(':nth-child(4) > input')
    .check()
    .should('to.be.checked')

  });
  it('marca cada tipo de atendimento', () => {
    cy.get('#support-type > :nth-child(2) > input')
    .check()
    .should('be.checked')

    cy.get(':nth-child(3) > input')
    .check()
    .should('to.be.checked')

    cy.get(':nth-child(4) > input')
    .check()
    .should('to.be.checked')

  });
  it('marca ambos checkboxes, depois desmarca o último', () => {
      cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')      
  });

  it('seleciona um arquivo da pasta fixtures', () => {
      cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json')
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })

  });
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
    .should(function($input){
      expect($input[0].files[0].name).to.equal('example.json')
    })

  });
  

});