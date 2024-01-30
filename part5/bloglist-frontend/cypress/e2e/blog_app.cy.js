describe('blog app', function(){
  const newUser = {
    username: 'tester',
    name: 'test test',
    password: 'salainen',
  }

  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    localStorage.removeItem('loggedBloglistUser')

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, newUser)
    cy.visit('')
  })

  it('login form is shown', function() {
    cy.visit('')
    cy.get('button').contains(/login/i)
    cy.get('[name="Username"]')
    cy.get('[name="Password"]')
  })

  describe('login', function() {
    it('succeed with correct credentials', function() {
      cy.get('input[name="Username"]').type(newUser.username)
      cy.get('input[name="Password"]').type(newUser.password)
      cy.get('button[type="submit"]').click()
    })

    it('failed with wrong credentials', function() {
      cy.get('input[name="Username"]').type(newUser.username)
      cy.get('input[name="Password"]').type('wrong password')
      cy.get('#login-button').click()

      
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      

    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('input[name="Username"]').type(newUser.username)
      cy.get('input[name="Password"]').type(newUser.password)
      cy.get('button[type="submit"]').click()
    })

    const newBlog = {
      title: 'Understanding version control and mastering git - Branches and more...!!',
      author: 'Nandan Kumar',
      url: 'https://blog.nandan.dev/understanding-version-control-and-mastering-git-branches-and-more'
    }

    it('A blog can be created', function() {
      cy.get('button').contains('new blog').click()
      cy.get('#title').type(newBlog.title)
      cy.get('#author').type(newBlog.author)
      cy.get('#url').type(newBlog.url)
      cy.get('#create-blog').click()

      cy.get('.showByDefaultContent')
        .should('contain', newBlog.title)
        .and('contain', newBlog.author)
    })

    it('creator of blog can like a blog', function() {
      cy.get('button').contains(/view/i).click()
      cy.get('button').contains(/like/i).then(($like) => {
        const currLikeStr = cy.wrap($like).parent().get('span')
        const currLike = currLikeStr.split(' ')[1]

        cy.wrap($likeBt)
      })
    }) 


  })




})