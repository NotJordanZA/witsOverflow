import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import QuestionsPage from '../pages/questionsPage';
import '@testing-library/jest-dom/extend-expect';
import * as router from 'react-router-dom';

const navigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

beforeEach(() => {
  jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
})

describe('QuestionsPage', () => {
  it('renders the title and handles navigation to ask page', () => {
   

    const { getByText } = render(<QuestionsPage/>);

    //Check that title is rendered
    expect(getByText('Top Questions')).toBeInTheDocument();


    // Simulate clicking the "Ask Question" button
    const askQuestionButton = getByText('Ask Question');
    expect(askQuestionButton).toBeInTheDocument
    fireEvent.click(askQuestionButton);

    //checking if navigate is called
    expect(navigate).toHaveBeenCalledWith('/askPage', { state: null });
  });
});