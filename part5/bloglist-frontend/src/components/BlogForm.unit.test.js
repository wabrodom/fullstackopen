import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'


describe('BlogForm component', () => {

  const blogData = {
    title: 'test by react-testing library',
    author: 'wabrodom',
    url: 'https://fullstackopen.com/en/part5'
  }
  

  test('the form calls the event handler it received as props, with the right details', async () => {
    const addBlog = jest.fn()
    const user = userEvent.setup()
  
    render(<BlogForm handleAddBlog={addBlog} />)
  
   
    const inputTitle = screen.getByRole('textbox', {name: /title/i})
    const inputAuthor = screen.getByRole('textbox', {name: /author/i})
    const inputUrl = screen.getByRole('textbox', {name: /url/i})
    const createButton = screen.getByRole('button', {name: /create/i})
    
    await user.type(inputTitle, blogData.title)
    await user.type(inputAuthor, blogData.author)
    await user.type(inputUrl, blogData.url)
    
    await user.click(createButton)
    
    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe(blogData.title)
    expect(addBlog.mock.calls[0][0].author).toBe(blogData.author)
    expect(addBlog.mock.calls[0][0].url).toBe(blogData.url)
  })

})