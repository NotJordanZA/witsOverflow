import { render, screen, fireEvent } from '@testing-library/react';
import AnswerArea from "../components/answerArea";
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

describe('AnswerArea', () => {
  const questionID = 'question123';
  const answerID = 'answer456';
  const answerText = 'This is a test answer';
  const votes = 10;
  const questionEmail = 'question@example.com';
  const answerEmail = 'answer@example.com';
  const currEmail = 'user@example.com';
  const answerHelpful = true;
  const reported = false;

  test('renders answer text', () => {
    render(
      <AnswerArea
        questionID={questionID}
        answerID={answerID}
        answerText={answerText}
        votes={votes}
        questionEmail={questionEmail}
        answerEmail={answerEmail}
        currEmail={currEmail}
        answerHelpful={answerHelpful}
        reported={reported}
      />
    );

    const answerTextElement = screen.getByText(answerText);
    expect(answerTextElement).toBeInTheDocument();
  });

  test('renders upvote and downvote buttons', () => {
    render(
      <AnswerArea
        questionID={questionID}
        answerID={answerID}
        answerText={answerText}
        votes={votes}
        questionEmail={questionEmail}
        answerEmail={answerEmail}
        currEmail={currEmail}
        answerHelpful={answerHelpful}
        reported={reported}
      />
    );

    const upvoteButton = screen.getByAltText('upArrow');
    const downvoteButton = screen.getByAltText('downArrow');
    expect(upvoteButton).toBeInTheDocument();
    expect(downvoteButton).toBeInTheDocument();
  });

  test.skip('calls onUpvote when upvote button is clicked', () => {
    const onUpvoteMock = jest.fn();
    render(
      <AnswerArea
        questionID={questionID}
        answerID={answerID}
        answerText={answerText}
        votes={votes}
        questionEmail={questionEmail}
        answerEmail={answerEmail}
        currEmail={currEmail}
        answerHelpful={answerHelpful}
        OnUpvote={onUpvoteMock}
      />
    );

    const upvoteButton = screen.getByAltText('upArrow');
    fireEvent.click(upvoteButton);
    expect(onUpvoteMock).toHaveBeenCalledTimes(1);
  });

  test.skip('calls onDownvote when downvote button is clicked', () => {
    const onDownvoteMock = jest.fn();
    render(
      <AnswerArea
        questionID={questionID}
        answerID={answerID}
        answerText={answerText}
        votes={votes}
        questionEmail={questionEmail}
        answerEmail={answerEmail}
        currEmail={currEmail}
        answerHelpful={answerHelpful}
        onDownvote={onDownvoteMock}
      />
    );

    const downvoteButton = screen.getByAltText('downArrow');
    fireEvent.click(downvoteButton);
    expect(onDownvoteMock).toHaveBeenCalledTimes(1);
  });
});