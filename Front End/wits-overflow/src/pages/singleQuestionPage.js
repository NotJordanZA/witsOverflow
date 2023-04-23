import styled from "styled-components";
import { useState } from "react";
import SingleQuestionPageQuestion from "../components/singleQuestionPageQuestion";
import {Answer} from '../components/Answer';
import {Comment as CommentText} from '../components/Comment';
import AnswerArea from '../components/answerArea';
import {useLocation} from 'react-router-dom';


const Title = styled.header`
    font-size: 1.5rem;
    color: #000;
    b{
        font-weight:bold;
    }
    padding: 0 0 0 0;
`;
const StyledButton = styled.button`
    display: flex !important; 
    justify-content: left !important;
    border: 0px solid #fff;
    border-radius: 10px;
    background: #475be8;
    padding: 15px 45px;
    color: white;
`;
const UserAnswerArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 10px
`;
const UserAnswerTextArea = styled.textarea`
    display: flex;
    background: #e4e4e4;
    border-radius: 10px;
    border: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 15px 0 15px 10px;
    margin-bottom: 20px;
    min-height: 200px;
    min-width: 100%;
`;


//maybe add passing of comments and answers to props later?
export default function SingleQuestionPage() {
    const [answer, setAnswer] = useState('');

    const location = useLocation();
    //console.log(location.state);

    //const question1 = question;
    const question = location.state;
    console.log(question);

    //containers to temporarily hold the data
    const allAnswerComments = [];
    const allQuestionComments = [];
    const allAnswers = [];
    const commentsForQuestion = [];

    const commentIDs = [0, 1, 2, 3, 4];
    const commentAnswerIDs = [0, 0, 1, 3, 3];
    const commentTexts = ["Good question!", "Interesting question!", "WRONG!!!", "Wow what a great answer!", "Correct."];
    const deletionTracker = [false, false, false, false, false];
    const commentUserEmails = ["ndivhuwo@wits.ac.za", "jordan@wits.ac.za", "ruben@wits.ac.za", "dumisani@wits.ac.za", "troy@wits.ac.za"];
    //create comments using hardcoded data
    for (let i = 0; i < commentIDs.length; i++)
    {
        let commentID = commentIDs[i];
        let commentAnswerID = commentAnswerIDs[i];
        let commentText = commentTexts[i];
        let isDeleted = deletionTracker[i];
        let userEmail = commentUserEmails[i];
        const comment = new CommentText(commentID, commentAnswerID, commentText, isDeleted, userEmail);
        if (comment.answerID !== 0)
        {
            allAnswerComments.push(comment);
        }
        else
        {
            allQuestionComments.push(comment);
            commentsForQuestion.push(commentText);
        }
    }

    //console.log(allAnswerComments[0]);
    //console.log(allAnswerComments[0].getCommentID());

    const answerIDs = [1, 2, 3];
    const userEmails = ["troy@wits.ac.za", "jordan@wits.ac.za", "dumisani@wits.ac.za"];
    const firstNames = ["Troy", "Jordan", "Dumisani"];
    const answerTexts = ["x = 1", "pi is irrational", "Easy: x = 3"];
    const voteCounts = [2, 3, 9];
    //create questions using hardcoded data
    for (let i = 0; i < answerIDs.length; i++)
    {
        let answerID = answerIDs[i];
        let userEmail = userEmails[i];
        let firstName = firstNames[i];
        let answerText = answerTexts[i];
        let votes = voteCounts[i];
        const comments = [];
        for (let j = 0; j < allAnswerComments.length; j++)
        {
            let tempAnswerID = allAnswerComments[j].getAnswerID();
            if (tempAnswerID === answerID)
            {
                const tempComment = allAnswerComments[j];
                console.log(tempComment);
                comments.push(tempComment);
            }
        }
        const answer = new Answer(answerID, userEmail, firstName, answerText, votes, comments);
        allAnswers.push(answer);
    }
    //console.log(allAnswers[0]);

    //create components
    const answerAreaComponents = [];
    for (let i = 0; i < allAnswers.length; i++)
    {
        let answerText1 = allAnswers[i].getAnswerText();
        let votes1 = allAnswers[i].getVotes();
        const commentTexts = [];
        for (let j = 0; j < allAnswers[i].getComments().length; j++)
        {
            let commentText = allAnswers[i].getComment(j).getCommentText();
            commentTexts.push(commentText);
        }
        answerAreaComponents.push(
            <AnswerArea
                answerText = {answerText1}
                votes = {votes1}
                comments1 = {commentTexts}
            />
        );
    }

    const handleAnswerSubmit = async (e) => {
        e.preventDefault();
        console.log(answer);
    }

    //dummy question data
    // let questionID1 = question.getQuestionID();
    // let questionTitle1 = question.getQuestionTitle();
    // let questionText1 = question.getQuestionText();
    // let votes1 = question.getVotes();
    // let answerCount1 = question.getAnswerCount();
    // let viewCount1 = question.getViewCount();
    // let timeAsked1 = question.getTimeAsked();
    // let firstName1 = question.getFirstName();
    // let tags = question.getTags();
    let questionID1 = question.questionID;
    let questionTitle1 = question.questionTitle;
    let questionText1 = question.questionText;
    let votes1 = question.votes;
    let answerCount1 = question.answerCount;
    let viewCount1 = question.viewCount;
    let timeAsked1 = question.timeAsked;
    let firstName1 = question.firstName;
    let tags = question.tags;
    // let questionID1 = question.getQuestionID();
    // let questionTitle1 = "Solve for x : 2x - 3 = x";
    // let questionText1 = "Do as the title suggests. I'm really struggling with this one.";
    // let votes1 = 4;
    // let answerCount1 = allAnswers.length;
    // let viewCount1 = 5;
    // let timeAsked1 = "1 hr ago";
    // let firstName1 = "Troy";
    // let tags1 = ["a", "b"];

    return(
        <main>
            <SingleQuestionPageQuestion
                questionTitle = {questionTitle1}
                questionText = {questionText1}
                votes = {votes1}
                viewCount = {viewCount1}
                timeAsked = {timeAsked1}
                firstName = {firstName1}
                comments = {commentsForQuestion}
            />
            {answerAreaComponents}
            <UserAnswerArea>
                    <Title>Your Answer</Title>
                    <form onSubmit={handleAnswerSubmit}>
                        <UserAnswerTextArea
                            value = { answer }
                            onChange={(e) => setAnswer(e.target.value)}
                            required
                        />
                        <StyledButton type = 'submit'>Post&nbsp;Answer</StyledButton>
                    </form>
                </UserAnswerArea>
        </main>
    )
}