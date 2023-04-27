import styled from "styled-components";
import { useState } from "react";
import SingleQuestionPageQuestion from "../components/singleQuestionPageQuestion";
import {Answer} from '../components/Answer';
import {Comment as CommentText} from '../components/Comment';
import AnswerArea from '../components/answerArea';
import {useLocation} from 'react-router-dom';
import { useEffect } from 'react';
import { db } from '../firebase-config/firebase';
import { doc, getDocs, collection, addDoc, updateDoc} from 'firebase/firestore';


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
    padding: 25px 150px;
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

    //receive data from previous page. Stores as a generic object, not as a Question object. Needs to be accessed using <Question>.<property>
    const location = useLocation();
    const question = location.state;
    console.log(question);

    let questionID1 = question.questionID;
    let questionTitle1 = question.questionTitle;
    let questionText1 = question.questionText;
    let votes1 = question.votes;
    let answerCount1 = question.answerCount;
    let viewCount1 = question.viewCount;
    let timeAsked1 = question.timeAsked;
    let firstName1 = question.firstName;
    let tags = question.tags;

    //containers to temporarily hold the data
    const allAnswerComments = [];
    const allQuestionComments = [];
    const allAnswers = [];
    const commentsForQuestion = [];

    //dummy comments data
    const commentIDs = [0, 1, 2, 3, 4];
    const commentAnswerIDs = [0, 0, 1, 3, 3];
    const commentTexts = ["Good question!", "Interesting question!", "WRONG!!!", "Wow what a great answer!", "Correct."];
    const deletionTracker = [false, false, false, false, false];
    const commentUserEmails = ["ndivhuwo@wits.ac.za", "jordan@wits.ac.za", "ruben@wits.ac.za", "dumisani@wits.ac.za", "troy@wits.ac.za"];

    const [questionCommentList, setQuestionCommentList] = useState([]);
    const questionCommentCollectionRef = collection(db, "questions" , questionID1, "Comments")
    const questionDocRef = doc(db, "questions", questionID1)

    useEffect(() => {
        const getQuestionCommentList = async () => {
            try {
                const data = await getDocs(questionCommentCollectionRef);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setQuestionCommentList(filteredData);
            } catch (error) {
                console.error(error)
            }
        };
        getQuestionCommentList();
    }, []);

    {questionCommentList.map((qComment) => (
        commentsForQuestion.push(qComment.comment)
    ))}

    //create comments using hardcoded data
    for (let i = 0; i < commentIDs.length; i++)
    {
        let commentID = commentIDs[i];
        let commentAnswerID = commentAnswerIDs[i];
        let commentText = commentTexts[i];
        let isDeleted = deletionTracker[i];
        let userEmail = commentUserEmails[i];
        const comment = new CommentText(commentID, commentAnswerID, commentText, isDeleted, userEmail);
        if (comment.answerID !== 0) //if the comment is for an answer
        {
            allAnswerComments.push(comment);
        }
        else
        {
            allQuestionComments.push(comment);
            //commentsForQuestion.push(commentText);
        }
    }


    const [answerList, setAnswerList] = useState([]);
    const answerCollectionRef = collection(db, "questions" , questionID1, "Answers")
    const answerAreaComponents = [];

    useEffect(() => {
        const getAnswerList = async () => {
            try {
                const data = await getDocs(answerCollectionRef);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setAnswerList(filteredData);
            } catch (error) {
                console.error(error)
            }
        };
        getAnswerList();
    }, []);

    {answerList.map((dbAnswer) => (
        
        answerAreaComponents.push(
            <AnswerArea
                questionID = {questionID1}
                answerID={dbAnswer.id}
                answerText = {dbAnswer.answer}
                votes = {dbAnswer.votes}
            />
        )
    ))}

    //dummy answer data
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

    //create components
    //const answerAreaComponents = [];
    // for (let i = 0; i < allAnswers.length; i++)
    // {
    //     let answerText1 = allAnswers[i].getAnswerText();
    //     let votes1 = allAnswers[i].getVotes();
    //     const commentTexts = [];
    //     for (let j = 0; j < allAnswers[i].getComments().length; j++)
    //     {
    //         let commentText = allAnswers[i].getComment(j).getCommentText();
    //         commentTexts.push(commentText);
    //     }
    //     answerAreaComponents.push(
    //         <AnswerArea
    //             answerText = {answerText1}
    //             votes = {votes1}
    //             comments1 = {commentTexts}
    //         />
    //     );
    // }

    const handleAnswerSubmit = async (e) => {
        e.preventDefault();
        await addDoc(answerCollectionRef, {
            answer: answer,
            votes: 0,
            name: "name",
        })
        await updateDoc(questionDocRef, {
            answerCount: answerCount1+1
          });
        console.log(answer);
    }

    return(
        <main>
            <SingleQuestionPageQuestion
                questionID = {questionID1}
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