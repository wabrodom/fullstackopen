import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: "Think again",
  author: "adamgrant",
  url: "https://adamgrant.net/",
  likes: 7,
  user: {
    username: "Bom",
    name: "bombom",
    id: "65a090a1d58e164b0b72dba0"
  },
  id: "65a1f836276b19bec039a885"
}

const user ={ id: "65a090a1d58e164b0b72dba0" }


describe('a blog info renders the Blog component'  , () => {
  let container

  beforeEach(() => {
    const likeABlog = jest.fn()
    const removeAblog = jest.fn()
    
    container = render(
        <Blog 
          key={blog.id}
          blog={blog}
          handleLike={likeABlog}
          handleDelete={removeAblog}
          currentUser={user.id}
        />
      ).container
  })

  test(`the blog's title and author by default`, () => {
    const titleDiv = container.querySelector('.showByDefaultContent > div:nth-child(1)')
    const authorDiv = container.querySelector('.showByDefaultContent > div:nth-child(2)')
    
    expect(titleDiv).toHaveTextContent('Think again')
    expect(authorDiv).toHaveTextContent('adamgrant')
    
    
  })
  
  test('the another section is hide', () => {
    const sectionBelow = container.querySelector('section:nth-Child(2)')
    expect(sectionBelow).toHaveStyle('display: none')
  })

})

describe('when click view or hide button', () => {
  let container

  beforeEach(() => {
    const likeABlog = jest.fn()
    const removeAblog = jest.fn()
    
    container = render(
        <Blog 
          key={blog.id}
          blog={blog}
          handleLike={likeABlog}
          handleDelete={removeAblog}
          currentUser={user.id}
        />
      ).container
  })


  test('clicking the button will show url and likes', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const section = container.querySelector('section:nth-child(2)')
    expect(section).not.toHaveStyle('display: none')

    const likesDiv = screen.getByText(/likes/i)
    expect(likesDiv).toHaveTextContent(/likes/i)

    const urlAHref = screen.getByRole('link')
    expect(urlAHref).not.toBeDisabled()

    const sameUrl = await screen.findByRole('link')
    expect(sameUrl).toBeEnabled()
  })

  test('click the button again will hide url and likes', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    
    const hideButton = screen.getByText('hide')
    await user.click(hideButton)

    const section = container.querySelector('section:nth-child(2)')
    expect(section).toHaveStyle('display: none')

  })

})


describe('like a blog', ()=> { 
  test('if the like button is clicked twice, the event handler is called twice', async () => {
    const likeABlog = jest.fn()
    const removeAblog = jest.fn()
    
    render(
        <Blog 
          key={blog.id}
          blog={blog}
          handleLike={likeABlog}
          handleDelete={removeAblog}
          currentUser={user.id}
        />
      )

    const currentUser = userEvent.setup()
    const viewButton = await screen.findByRole('button', {name: /view/i})
    await currentUser.click(viewButton)

    const likeButton = screen.getByRole('button', {name: /like/i})
    await currentUser.click(likeButton)
    await currentUser.click(likeButton)

    expect(likeABlog.mock.calls).toHaveLength(2)
  })
})
