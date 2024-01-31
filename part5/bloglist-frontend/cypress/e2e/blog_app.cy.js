const testUser1 = {
  username: 'tester1',
  name: 'tester1',
  password: 'salainen',
}

const testUser2 = {
  username: 'tester2',
  name: 'tester2',
  password: 'salainen2',
}


const firstBlog = {
  title: 'Understanding version control and mastering git - Branches and more...!!',
  author: 'Nandan Kumar',
  url: 'https://blog.nandan.dev/understanding-version-control-and-mastering-git-branches-and-more'
} 

const secondBlog = {
  title: 'RegExr: Learn, Build, & Test RegEx',
  author: 'gskinner',
  url: 'https://regexr.com/'
}

const thirdBlog = {
  title: 'Gleb Bahmutov PhD blog',
  author: 'Dr. Gleb Bahmutov',
  url: 'https://glebbahmutov.com/blog/'
}



describe('blogs app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    localStorage.removeItem('loggedBloglistUser')

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, testUser1)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, testUser2)
    cy.visit('')
  })

  it('login form is shown', function() {
    cy.contains(/login/i)
  })


  describe('login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input[name="Username"]').type(testUser1.username)
      cy.get('input[name="Password"]').type(testUser1.password)
      cy.get('button[type="submit"]').click()
    })

    it('fails with wrong credentials', function() {
      cy.get('input[name="Username"]').type(testUser1.username)
      cy.get('input[name="Password"]').type('wrong password')
      cy.get('#login-button').click()

      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })

  })


  describe.only('when logged in', function() {
    beforeEach(function() {
      cy.login(testUser1)
    })


    const createABlog = (obj) => {
      cy.get('button').contains(/new blog/i).click()

      cy.get('#title').type(obj.title)
      cy.get('#author').type(obj.author)
      cy.get('#url').type(obj.url)
      cy.get('#create-blog').click()
    }
    const checkDefaultShowContents = (obj) => {
      cy.get('.showByDefaultContent').contains(obj.title)
      cy.get('.showByDefaultContent').contains(obj.author)
    }


    it('A blog can be created', function() {
      createABlog(firstBlog)
      checkDefaultShowContents(firstBlog)
    })

    it('3 blog can be created', function() {
      cy.createBlog(firstBlog)
      cy.createBlog(secondBlog)
      cy.createBlog(thirdBlog)
      checkDefaultShowContents(firstBlog)
      checkDefaultShowContents(secondBlog)
      checkDefaultShowContents(thirdBlog)
    })


    it('users can like a blog', function() {
      cy.createBlog(firstBlog)
      cy.get('.view-button:first').click()

      cy.get('.likes:first').then(($span) => {
          const textBefore = $span.text()
          const likesBefore = parseInt($span.text())

          cy.get('.like-button:first').click()
          cy.get('.likes:first').invoke('text').should('not.equal', textBefore)
            .then(() => {
              const likesAfter = parseInt($span.text())

              expect(likesAfter).to.eq(likesBefore + 1)
            })
      })

      cy.login(testUser2)

      cy.get('.view-button:first').click()

      cy.get('.likes:first').then(($span) => {
          const textBefore = $span.text()
          const likesBefore = parseInt($span.text())

          cy.get('.like-button:first').click()
          cy.get('.likes:first').invoke('text').should('not.equal', textBefore)
            .then(() => {
              const likesAfter = parseInt($span.text())

              expect(likesAfter).to.eq(likesBefore + 1)
            })
      })

    })

    it.only('the user who created a blog can delete it', function() {
      cy.createBlog(firstBlog)
      cy.createBlog(secondBlog)
      cy.get('.view-button:first').click()
      cy.get('.remove-button:first').click()

      cy.get('html').should('not.contain', firstBlog.title)
      cy.get('html').should('contain', secondBlog.title)
    })
    




  })

})