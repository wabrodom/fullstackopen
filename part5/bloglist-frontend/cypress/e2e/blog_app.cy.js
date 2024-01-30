describe('blogs app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    localStorage.removeItem('loggedBloglistUser')

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, newUser)
    cy.visit('')
  })

  it('login form is shown', function() {
    cy.contains(/login/i)
  })

  const newUser = {
    username: 'tester',
    name: 'test test',
    password: 'salainen',
  }

  describe('login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input[name="Username"]').type(newUser.username)
      cy.get('input[name="Password"]').type(newUser.password)
      cy.get('button[type="submit"]').click()
    })

    it('fails with wrong credentials', function() {
      cy.get('input[name="Username"]').type(newUser.username)
      cy.get('input[name="Password"]').type('wrong password')
      cy.get('#login-button').click()

      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })

  })


  describe('when logged in', function() {
    beforeEach(function() {
      cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
        username: newUser.username, password: newUser.password
      }).then(response => {
        localStorage.setItem('loggedBloglistUser', JSON.stringify(response.body))
        cy.visit('')
      })
    })

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
      createABlog(firstBlog)
      createABlog(secondBlog)
      createABlog(thirdBlog)
      checkDefaultShowContents(firstBlog)
      checkDefaultShowContents(secondBlog)
      checkDefaultShowContents(thirdBlog)
    })

    const getCurrentLikes = () => {
   
    }

    it.only('creator can like they blog', function() {
      createABlog(firstBlog)
      cy.get('button').contains(/view/i).click()

      cy.get('#current-likes').then($span => {
          const text = $span.text()
          const likesBefore = Number(text.split(' ')[1])
          console.log(likesBefore)

          cy.get('button').contains(/like/i)
            .click()
            .then(() => {
              const text2 = $span.text()
              const likesAfter = Number(text2.split(' ')[1])
              console.log(likesAfter)
              expect(likesAfter).to.eq(likesBefore + 1)
            })

      })
  


      
      
    })


  })

})