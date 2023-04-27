import styled from "styled-components";
import upArrow from '../arrow-up.png';
import downArrow from '../arrow-down.png';
import CommentsArea from '../components/commentsArea';
import { useState } from "react";
import { db } from '../firebase-config/firebase';
import { collection, addDoc } from 'firebase/firestore';

const Container = styled.div`
    padding: 25px 150px;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const QuestionArea = styled.div`
    display: flex;
    flex-direction: row;
    box-shadow: 0 1px 2px rgba(0,0,0,.2);
`;
const BodyText = styled.textarea`
    display: flex;
    background: #e4e4e4;
    border-radius: 10px;
    border: 0;
    font-size: 1rem;
    width: 100%;
    box-sizing: border-box;
    padding: 15px 0 15px 10px;
    min-height: 200px;
    min-width: 100%;
`;
const QuestionBodyArea = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;
const VotesArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: top;
    flex-direction: column;
    padding: 0 10px;
`;
const Title = styled.header`
    font-size: 1.5rem;
    color: #000;
    b{
        font-weight:bold;
    }
    padding: 0 0 0 0;
`;
const TitleArea = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 0 10px 0;
`;
const QuestionStat = styled.div`
   // text-align: center;
    display: inline-block;
    padding: 5px;
    font-size: 0.9rem;
    color: #808191;
    margin-top: 7px;
    span{
        font-size: .7rem;
        display: block;
        font-weight: 300;
        margin-top: 4px;
    }
`;
const QuestionStatArea = styled.div`
    display: flex;
    flex-direction: row;
`;
const VoteNumber = styled.p`
    font-size: 1.1rem;
`;

const CommentsAreaContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
`;
const Comment = styled.text`
    border: 0;
    font-size: 0.85rem;
    padding: 5px 0 0 0;
    box-shadow: 0 1px 2px rgba(0,0,0,.2);
`;
const AddComment = styled.input`
    border: 0;
    font-size: 0.85rem;
    margin-top: 5px;
    //padding: 5px 0 0 0;
`;
const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    width:100%;
`;

const HiddenButton = styled.button`
    display: none;
`;

function SingleQuestionPageQuestion({questionID, questionTitle, questionText, votes, viewCount, timeAsked, firstName, comments}) {
    const commentsComponents = [];
    for (let i = 0; i < comments.length; i++)
    {
        commentsComponents.push(
            <Comment>{comments[i]}</Comment>
        );
    }

    const [comment, setComment] = useState(''); 
    //const commentCollectionRef = collection(db, path);
    //event handlers
    const commentCollectionRef = collection(db, "questions" , questionID, "Comments")
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        console.log(comment);
        console.log();
        await addDoc(commentCollectionRef, {
            comment: comment,
            name: "name",
        })
        console.log(comment);
    }
    //just a container that contains all of the question data displayed on the single question page
    return (
        <Container>
            <TitleArea>
                <Title><b>{questionTitle}</b></Title>
                <QuestionStatArea>
                    <QuestionStat>Asked {timeAsked} by {firstName}</QuestionStat>
                    <QuestionStat>{viewCount} Views</QuestionStat>
                </QuestionStatArea>
            </TitleArea>
            <QuestionArea>
                <VotesArea>
                    <a><img style = {{ width : 50, height: 50 }}src = {upArrow} alt = "upArrow" onClick = ""/></a>
                    <VoteNumber>{votes}</VoteNumber>
                    <a><img style = {{ width : 50, height: 50 }}src = {downArrow} alt = "downArrow" onClick = ""/></a>
                </VotesArea>
                <QuestionBodyArea>
                    <BodyText readOnly>
                        {questionText}
                    </BodyText>
                    <CommentsAreaContainer>
                    <StyledForm onSubmit={handleCommentSubmit}>
                        {commentsComponents}
                        <AddComment
                        placeholder="Add comment..."
                        value = {comment}
                        onChange={(e) => setComment(e.target.value)}
                        />
                        <HiddenButton type= "submit"></HiddenButton>
                    </StyledForm>
                </CommentsAreaContainer>
                </QuestionBodyArea>
            </QuestionArea>
        </Container>

    )
}

export default SingleQuestionPageQuestion;