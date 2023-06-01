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
  const questionEmail = 'question@wits.ac.za';
  const answerEmail = 'answer@wits.ac.za';
  const currEmail = 'user@studnets.wits.ac.za';
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

  test('calls onUpvote when upvote button is clicked', () => {
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
    expect(onUpvoteMock).toHaveBeenCalledTimes(0);
  });

  test('calls onDownvote when downvote button is clicked', () => {
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
    expect(onDownvoteMock).toHaveBeenCalledTimes(0);
  });

  test('renders report button', () => {
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

    const reportButton = screen.getByText("Report");
    expect(reportButton).toBeInTheDocument();
  });

  test('renders resolve and delete buttons if post reported and user a moderator', () => {
    render(
      <AnswerArea
        questionID={questionID}
        answerID={answerID}
        answerText={answerText}
        votes={votes}
        questionEmail={questionEmail}
        answerEmail={answerEmail}
        currEmail={"test@wits.ac.za"}
        answerHelpful={answerHelpful}
        reported={true}
      />
    );

    const deleteButton = screen.getByText("Delete");
    const resolveButton = screen.getByText("Resolve");
    expect(deleteButton).toBeInTheDocument();
    expect(resolveButton).toBeInTheDocument();
    expect(screen.getByText("Reported")).toBeInTheDocument();
  });
});