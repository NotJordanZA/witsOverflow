import { render, fireEvent, screen } from "@testing-library/react";
import SingleQuestionPage from "../pages/singleQuestionPage";
import AnswerArea from "../components/answerArea";
import '@testing-library/jest-dom/extend-expect';

import React from 'react';

// describe("Answer Screen", () => {
//   it.skip("should display the Answer title", () => {
//     render(<SingleQuestionPage />);
//     const title = screen.getAllByTitle("Your");

//     expect(title).toBeInTheDocument();

//   });

//   it.skip("should submit the form when valid entries are submitted", () => {
//     render(<AnswerArea />);
//     const checkbox = screen.getByLabelText("checkbox");
//     expect(checkbox).toBeInTheDocument();

//     const AnswerAreaComment=screen.getAllByPlaceholderText("Add comment...");
//     expect(AnswerAreaComment).toBeInTheDocument();

//     // const submitButton = screen.getByRole("button", { name: "Submit" });

//    // fireEvent.change(AnswerAreaComment, { target: { value: "nice" } });


//     //const successMessage = screen.getByText("Success!");
//     //expect(successMessage).toBeInTheDocument();
//   });
// });
describe('AnswerComponent', () => {
  const answerText = 'This is an answer to a question';
  const votes = 0;
  const email = "testing@wits.ac.za";
  const handleCommentSubmit = jest.fn();
  const OnUpvote = jest.fn();
  const OnDownvote = jest.fn();
  const OnEditButtonClick = jest.fn();
  const answerHelpful = true;

  beforeEach(() => {
    render(
      <AnswerArea
        questionID={"tOIElsnKFuVeAIHv7UKg"}
        answerID={"yIeFPmy1WjzSfYgDook0"}
        answerText={answerText}
        votes={votes}
        questionEmail={email}
        answerHelpful={answerHelpful}
      />
    );
  });

  it.skip('should display answer text', () => {
    expect(screen.getByText(answerText)).toBeInTheDocument();
  });

  it.skip('should display the number of votes', () => {
    expect(screen.getByText(votes.toString())).toBeInTheDocument();
  });

  it.skip('should call OnUpvote when the upvote arrow is clicked', () => {
    fireEvent.click(screen.getByAltText('upArrow'));
    expect(OnUpvote).toHaveBeenCalled();
  });

  it.skip('should call OnDownvote when the downvote arrow is clicked', () => {
    fireEvent.click(screen.getByAltText('downArrow'));
    expect(OnDownvote).toHaveBeenCalled();
  });

  it.skip('should call OnEditButtonClick when the edit button is clicked', () => {
    fireEvent.click(screen.getByText('Edit'));
    expect(OnEditButtonClick).toHaveBeenCalled();
  });

  it.skip('should display "Marked helpful by author" when answerHelpful is true', () => {
    expect(screen.getByText('Marked helpful by author')).toBeInTheDocument();
  });

  it.skip('should not display "Marked helpful by author" when answerHelpful is false', () => {
    render(
      <AnswerArea
        answerText={answerText}
        votes={votes}
        handleCommentSubmit={handleCommentSubmit}
        OnUpvote={OnUpvote}
        OnDownvote={OnDownvote}
        OnEditButtonClick={OnEditButtonClick}
        answerHelpful={false}
      />
    );
    expect(screen.queryByText('Marked helpful by author')).toBeNull();
  });

  it.skip('should call handleCommentSubmit when a comment is submitted', () => {
    const commentInput = screen.getByPlaceholderText('Add comment...');
    const commentButton = screen.getByText('Add Comment');
    fireEvent.change(commentInput, { target: { value: 'This is a comment' } });
    fireEvent.click(commentButton);
    expect(handleCommentSubmit).toHaveBeenCalled();
  });
});
