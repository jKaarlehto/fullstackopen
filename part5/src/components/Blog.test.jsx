import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

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
