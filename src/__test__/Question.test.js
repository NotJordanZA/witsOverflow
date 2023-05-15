import { render, screen, fireEvent } from '@testing-library/react';
import QuestionRow from "../components/QuestionRow";

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
  };
  const email = 'john@example.com';

  it.skip('renders question stats and title', () => {
    render(<QuestionRow {...question} currEmail={email} />);
    expect(screen.getByText(`${question.votes} votes`)).toBeInTheDocument();
    expect(screen.getByText(`${question.answerCount} answers`)).toBeInTheDocument();
    expect(screen.getByText(`${question.viewCount} views`)).toBeInTheDocument();
    expect(screen.getByText(question.questionTitle)).toBeInTheDocument();
  });

  it.skip('renders who asked the question', () => {
    render(<QuestionRow {...question} currEmail={email} />);
    expect(screen.getByText(`Asked by ${question.firstName}`)).toBeInTheDocument();
  });

  it.skip('renders tags', () => {
    render(<QuestionRow {...question} currEmail={email} />);
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('react')).toBeInTheDocument();
  });

  it.skip('navigates to the singleQuestion page when question title is clicked', () => {
    const navigate = jest.fn();
    const { container } = render(
      <QuestionRow {...question} currEmail={email} navigate={navigate} />
    );
    const questionLink = container.querySelector('a');
    fireEvent.click(questionLink);
    expect(navigate).toHaveBeenCalledWith('/question', { state: question });
  });
});
