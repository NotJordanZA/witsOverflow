import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';
import AskPage from "../pages/askPage";
import '@testing-library/jest-dom';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  addDoc: jest.fn(),
}));

describe('AskPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the page with inputs and button', () => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter initialEntries={['/ask']}>
        <Route path="/ask">
          <AskPage />
        </Route>
      </MemoryRouter>
    );

    expect(getByLabelText('Title')).toBeInTheDocument();
    expect(getByLabelText('Body')).toBeInTheDocument();
    expect(getByText('Post Question')).toBeInTheDocument();
  });

  it('should submit the form with the entered title and body', async () => {
    const mockAddDoc = jest.fn();
    addDoc.mockImplementationOnce(() => mockAddDoc);
    useLocation.mockImplementation(() => ({ state: 'test@example.com' }));
    useNavigate.mockImplementation(() => mockNavigate);
    const { getByLabelText, getByText } = render(
      <MemoryRouter initialEntries={['/ask']}>
        <Route path="/ask">
          <AskPage />
        </Route>
      </MemoryRouter>
    );

    fireEvent.change(getByLabelText('Title'), { target: { value: 'Test Title' } });
    fireEvent.change(getByLabelText('Body'), { target: { value: 'Test Body' } });
    fireEvent.click(getByText('Post Question'));

    expect(addDoc).toHaveBeenCalledWith(expect.anything(), {
      title: 'Test Title',
      questionBody: 'Test Body',
      votes: 0,
      answerCount: 0,
      views: 0,
      name: 'test@example.com',
    });
    expect(mockAddDoc).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/questionsPage', { state: 'test@example.com' });
  });
});
