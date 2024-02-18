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
  title: '1 Understanding version control and mastering git - Branches and more...!!',
  author: 'Nandan Kumar',
  url: 'https://blog.nandan.dev/understanding-version-control-and-mastering-git-branches-and-more'
}

const secondBlog = {
  title: '2 RegExr: Learn, Build, & Test RegEx',
  author: 'gskinner',
  url: 'https://regexr.com/'
}

const thirdBlog = {
  title: '3 Gleb Bahmutov PhD blog',
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
      cy.createBlog(firstBlog)
      cy.createBlog(secondBlog)
      cy.createBlog(thirdBlog)
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

    it('the user who created a blog can delete it', function() {
      cy.get('.view-button:first').click()
      cy.get('.remove-button:first').click()

      cy.get('html').should('not.contain', firstBlog.title)
      cy.get('html').should('contain', secondBlog.title)
    })


    it('the creator can see the delete button of a blog, not anyone else', function() {
      cy.get('.view-button:eq(1)').click()
      cy.get('.remove-button:eq(1)')
      cy.get('.view-button:eq(1)').click()

      cy.get('.view-button:first').click()
      cy.get('.remove-button:first')
      cy.get('.view-button:first').click()

      cy.login(testUser2)

      cy.get('.view-button:eq(1)').click()
      cy.get('.remove-button:eq(1)').should('not.exist')
      cy.get('.view-button:eq(1)').click()

      cy.get('.view-button:first').click()
      cy.get('.remove-button:first').should('not.exist')
      cy.get('.view-button:first').click()

    })

    it.only('the blogs are descending ordered according to likes ', function() {
      // get 3rd blog and tap a like,  3rd == 1
      cy.get('.view-button:eq(2)').click()
      cy.get('.like-button:eq(2)').click()
      cy.get('.blog:first').find('div:eq(0)').should('contain', thirdBlog.title)

      // get original 1st blog and tap a like will stay in place, 1st ==1
      cy.get('.view-button:eq(1)').click()
      cy.get('.like-button:eq(1)').click()
      cy.get('.blog:eq(1)').find('div:eq(0)').should('contain', firstBlog.title)

      // stay on 2nd order blog, the original 1st blog, will move it to 1st, 1st == 2
      cy.get('.like-button:eq(1)').click()
      cy.get('.blog:eq(0) div:eq(0)').should('contain', firstBlog.title)

      cy.login(testUser2)

      // get 2nd order blog, the original 3rd blog, will stay in place, 3rd ==2
      cy.get('.view-button:eq(1)').click()
      cy.get('.like-button:eq(1)').click()
      cy.get('.blog:eq(0) div:eq(0)').should('contain', firstBlog.title)
      cy.get('.blog:eq(1) div:eq(0)').should('contain', thirdBlog.title)

      // get 3rd blog, stay open,  will come in 1st, 3rd == 3
      cy.get('.like-button:eq(1)').click()
      cy.get('.blog:eq(0) div:eq(0)').should('contain', thirdBlog.title)
      cy.get('.likes:eq(0)').should('contain', '3')

    })

  })

})