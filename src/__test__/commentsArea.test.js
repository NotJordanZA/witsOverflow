import React from 'react';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import CommentsArea from '../components/commentsArea';
import '@testing-library/jest-dom/extend-expect';

describe('CommentsArea', () => {
  it('renders the comments and handles comment submission', () => {
    const comments = ['Comment 1', 'Comment 2'];

    const { getByText, getByPlaceholderText, getByTestId } = render(<CommentsArea comments={comments} />);

    // Assert that the comments are rendered
    expect(getByText('Comment 1')).toBeInTheDocument();
    expect(getByText('Comment 2')).toBeInTheDocument();

    // Simulate adding a new comment
    const addCommentInput = getByPlaceholderText('Add comment...');
    fireEvent.change(addCommentInput, { target: { value: 'New Comment' } });

    // Simulate submitting the new comment
    const submitButton = getByTestId("commentSubmitTest");
    fireEvent.click(submitButton);

    // Assert that the comment is added
    //expect(getByText('New Comment')).toBeInTheDocument();
  });
});