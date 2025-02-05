import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import blogService from '../services/blogs'


//VIttu
vi.mock('../services/blogs', () => ({
  default: {
      like: vi.fn().mockResolvedValue({ title: 'TestTitle', author: 'TestAuthor', url: 'TestUrl', user:{id:123}, id: 1, likes: 1 })
  }
}))




test('shows only author when rendered for the first time', () => {

  const blog = { title: 'TestTitle', author: 'TestAuthor', url: 'TestUrl' }

  const { container } = render(<Blog blog={blog} />)
  const title = screen.getByTestId('title')
  const details = screen.getByTestId('details')
  expect(title).toBeVisible()
  expect(details).not.toBeVisible()

})

test('shows details when button is pressed', async () => {

  const blog = { title: 'TestTitle', author: 'TestAuthor', url: 'TestUrl' }

  const { container } = render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('show')
  await user.click(button)

  const title = screen.getByTestId('title')
  const details = screen.getByTestId('details')
  expect(title).toBeVisible()
  expect(details).toBeVisible()

})

test('pressing the like button calls the handler', async () => {
  const blog = { title: 'TestTitle', author: 'TestAuthor', url: 'TestUrl', user: { id: '123' },likes:0 }

  const mock = vi.fn()
  const { container } = render(<Blog blog={blog} setBlogs={mock} allBlogs={[{ title: 'TestTitle', author: 'TestAuthor', url: 'TestUrl', user:{id:123}, id: 1, likes: 1 }]} />)

  const user = userEvent.setup()
  const showButton = screen.getByText('show')
  await user.click(showButton)

  const likeButton = screen.getByTestId('likeButton')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mock).toHaveBeenCalledTimes(2)

})

