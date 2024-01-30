describe('blog app', function(){
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.visit('')
  })

  it('login form is shown', function() {
    cy.visit('')
    cy.get('button').contains(/login/i)
    cy.get('[name="Username"]')
    cy.get('[name="Password"]')
  })


})