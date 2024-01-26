import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test(`a blog renders the blog's title and author by default, the others section is hide`, () => {
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

  const likeABlog = jest.fn()
  const removeAblog = jest.fn()

  const { container } = render(
    <Blog 
      key={blog.id}
      blog={blog}
      handleLike={likeABlog}
      handleDelete={removeAblog}
      currentUser={user.id}
    />
  )

  const titleDiv = container.querySelector('.showByDefaultContent > div:nth-child(1)')
  const authorDiv = container.querySelector('.showByDefaultContent > div:nth-child(2)')

  expect(titleDiv).toHaveTextContent('Think again')
  expect(authorDiv).toHaveTextContent('adamgrant')

  const sectionBelow = container.querySelector('section:nth-Child(2)')
  expect(sectionBelow).toHaveStyle('display: none')

})