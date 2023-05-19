import { render, screen, fireEvent } from '@testing-library/react';
import AnswerArea from "../components/answerArea";
import '@testing-library/jest-dom/extend-expect';

describe('AnswerArea', () => {
  const questionID = 'question123';
  const answerID = 'answer456';
  const answerText = 'This is a test answer';
  const votes = 10;
  const questionEmail = 'question@example.com';
  const answerEmail = 'answer@example.com';
  const currEmail = 'user@example.com';
  const answerHelpful = true;

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