import React from 'react';
import { screen, render, fireEvent, waitFor, getByTestId } from '@testing-library/react';
import SingleQuestionPage from '../pages/singleQuestionPage';
import * as router from 'react-router-dom';
import '@testing-library/jest-dom';

// Mock the dependencies
jest.mock('../firebase-config/firebase', () => ({
    db: {},
  }));

jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    doc: jest.fn(),
    getDocs: jest.fn(),
    addDoc: jest.fn(),
    updateDoc: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
    useLocation: jest.fn(),
}));

const navigate = jest.fn();

beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
})

describe('SingleQuestionPage', () => {
  it('renders the page correctly', () => {
    // Mock the data for the location state
    const question = {
      questionID: '1',
      questionTitle: 'Question Title',
      questionText: 'Question Text',
      answerCount: 0,
      viewCount: 0,
      timeAsked: '2023-05-17',
      firstName: 'test@wits.ac.za',
      currEmail: 'notthesame@wits.ac.za'
    };

    // Mock the useLocation hook
    jest.spyOn(require('react-router-dom'), 'useLocation').mockReturnValue({ state: question });

    // Render the component
    render(<SingleQuestionPage />);

    // Assert that the question details are rendered
    expect(screen.getByText('Question Title')).toBeInTheDocument();
    expect(screen.getByText('Question Text')).toBeInTheDocument();
    expect(screen.getByText('test@wits.ac.za')).toBeInTheDocument();

    // Assert that the answer area is rendered
    expect(screen.getByText('Your Answer')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('submits an answer', async () => {
    // Mock the data for the location state
    const question = {
      questionID: '1',
      questionTitle: 'Question Title',
      questionText: 'Question Text',
      answerCount: 0,
      viewCount: 0,
      timeAsked: '2023-05-17',
      firstName: 'John',
    };

    // Mock the useLocation hook
    jest.spyOn(require('react-router-dom'), 'useLocation').mockReturnValue({ state: question });

    // Render the component
    render(<SingleQuestionPage />);

    // Fill the answer textarea
    const answerTextarea = screen.getByTestId("answerAreaTest");
    fireEvent.change(answerTextarea, { target: { value: 'Test answer' } });

    // Submit the answer
    const postAnswerButton = screen.getByRole('button');
    fireEvent.click(postAnswerButton);

    // Assert that the answer is added
    await waitFor(() => {
      expect(screen.getByText('Test answer')).toBeInTheDocument();
    });
  });
});