import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase-config/firebase';
import AskPage from '../pages/askPage';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
    useLocation: jest.fn(),
    useNavigate: jest.fn(),
  }));

jest.mock('../firebase-config/firebase', () => ({
  db: {},
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
}));

describe('AskPage', () => {
  beforeEach(() => {
    collection.mockClear();
    addDoc.mockClear();
  });

  test('renders AskPage correctly', () => {
    render(<AskPage />, { wrapper: MemoryRouter });

    const titleLabel = screen.getByText('Title');
    const titleInput = screen.getByTestId('questionTitleInput');
    const bodyLabel = screen.getByText('Body');
    const bodyTextArea = screen.getByTestId('questionBodyInput');
    const postButton = screen.getByText('Post Question');

    expect(titleLabel).toBeInTheDocument();
    expect(titleInput).toBeInTheDocument();
    expect(bodyLabel).toBeInTheDocument();
    expect(bodyTextArea).toBeInTheDocument();
    expect(postButton).toBeInTheDocument();
  });

  test.skip('handles form submission', async () => {
    render(<AskPage />, { wrapper: MemoryRouter });

    const titleInput = screen.getByTestId('questionTitleInput');
    const bodyTextArea = screen.getByTestId('questionBodyInput');
    const postButton = screen.getByText('Post Question');

    const mockQuestion = {
      title: 'Test Title',
      questionBody: 'Test Body',
      votes: 0,
      answerCount: 0,
      views: 0,
      name: 'test@example.com',
    };

    fireEvent.change(titleInput, { target: { value: mockQuestion.title } });
    fireEvent.change(bodyTextArea, { target: { value: mockQuestion.questionBody } });
    fireEvent.click(postButton);

    expect(addDoc).toHaveBeenCalledTimes(1);
    //expect(useNavigate).toHaveBeenCalledWith('/questionsPage', { state: 'test@example.com' });
  });
});