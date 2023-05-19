import { render, screen, fireEvent } from '@testing-library/react';
import QuestionRow from "../components/QuestionRow";
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
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

describe('QuestionRow', () => {
  const question = {
    questionID: 1,
    questionTitle: 'Test Question',
    questionText: 'This is a test question.',
    votes: 0,
    answerCount: 0,
    viewCount: 0,
    timeAsked: '2022-05-13T08:00:00.000Z',
    firstName: 'John',
    tags: ['test', 'react'],
    answers: [],
    comments: [],
    currEmail: null,
  };
  const email = 'test@wits.ac.za.com';

  it('renders question stats and title', () => {
    render(<QuestionRow {...question} currEmail={email} />);
    expect(screen.getByTestId("votesTest")).toBeInTheDocument();
    expect(screen.getByTestId("answerCountTest")).toBeInTheDocument();
    expect(screen.getByTestId("viewsTest")).toBeInTheDocument();
    expect(screen.getByText(question.questionTitle)).toBeInTheDocument();
  });

  it('renders who asked the question', () => {
    render(<QuestionRow {...question} currEmail={email} />);
    expect(screen.getByTestId("authorEmailTest")).toBeInTheDocument();
  });

  it('renders tags', () => {
    render(<QuestionRow {...question} currEmail={email} />);
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('react')).toBeInTheDocument();
  });

  it('navigates to the singleQuestion page when question title is clicked', () => {
    const { container } = render(
      <MemoryRouter>
        <QuestionRow {...question} currEmail={email}/>
      </MemoryRouter>
    );
    const questionLink = container.querySelector('a');
    fireEvent.click(questionLink);
    expect(navigate).toHaveBeenCalledWith('/question', { state: question });
  });
});
