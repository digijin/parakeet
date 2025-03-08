import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogPage from '../page'

describe('BlogPage', () => {
  it('renders the blog page with initial content', () => {
    render(<BlogPage />)
    
    // Check for main heading
    expect(screen.getByText('Blog')).toBeInTheDocument()
    
    // Check for "New Post" button
    expect(screen.getByText('New Post')).toBeInTheDocument()
    
    // Check for initial posts
    expect(screen.getByText('Getting Started with Our Platform')).toBeInTheDocument()
    expect(screen.getByText('New Features Released')).toBeInTheDocument()
    expect(screen.getByText('Best Practices Guide')).toBeInTheDocument()
  })

  it('opens the new post modal when clicking the New Post button', async () => {
    render(<BlogPage />)
    
    const newPostButton = screen.getByText('New Post')
    await userEvent.click(newPostButton)
    
    // Check if modal is opened
    expect(screen.getByText('New Post')).toBeInTheDocument()
    
    // Check for form fields
    expect(screen.getByLabelText('Title')).toBeInTheDocument()
    expect(screen.getByLabelText('Content')).toBeInTheDocument()
    expect(screen.getByLabelText('Excerpt')).toBeInTheDocument()
    expect(screen.getByLabelText('Author')).toBeInTheDocument()
  })

  it('filters posts based on search input', async () => {
    render(<BlogPage />)
    
    const searchInput = screen.getByPlaceholderText('Search posts...')
    await userEvent.type(searchInput, 'Getting Started')
    
    // Check if only matching posts are shown
    expect(screen.getByText('Getting Started with Our Platform')).toBeInTheDocument()
    expect(screen.queryByText('New Features Released')).not.toBeInTheDocument()
    expect(screen.queryByText('Best Practices Guide')).not.toBeInTheDocument()
  })

  it('filters posts based on status', async () => {
    render(<BlogPage />)
    
    const statusSelect = screen.getByLabelText('Status')
    await userEvent.selectOptions(statusSelect, 'published')
    
    // Check if only published posts are shown
    expect(screen.getByText('Getting Started with Our Platform')).toBeInTheDocument()
    expect(screen.queryByText('Best Practices Guide')).not.toBeInTheDocument()
  })

  it('allows editing an existing post', async () => {
    render(<BlogPage />)
    
    // Find and click the edit button for the first post
    const editButtons = screen.getAllByRole('button', { name: /edit/i })
    await userEvent.click(editButtons[0])
    
    // Check if modal is opened with post data
    expect(screen.getByText('Edit Post')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Getting Started with Our Platform')).toBeInTheDocument()
    
    // Update the title
    const titleInput = screen.getByLabelText('Title')
    await userEvent.clear(titleInput)
    await userEvent.type(titleInput, 'Updated Title')
    
    // Save the changes
    const saveButton = screen.getByText('Save')
    await userEvent.click(saveButton)
    
    // Check if the title was updated
    expect(screen.getByText('Updated Title')).toBeInTheDocument()
  })

  it('allows deleting a post', async () => {
    render(<BlogPage />)
    
    // Find and click the delete button for the first post
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
    await userEvent.click(deleteButtons[0])
    
    // Check if the post was removed
    expect(screen.queryByText('Getting Started with Our Platform')).not.toBeInTheDocument()
  })
}) 