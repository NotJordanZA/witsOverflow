import styled from "styled-components";
import { useState } from "react";
import CommentsArea from '../components/commentsArea';
import upArrow from '../arrow-up.png';
import downArrow from '../arrow-down.png';
import { useEffect } from "react";
import { db } from '../firebase-config/firebase';
import { getDocs, collection, addDoc } from 'firebase/firestore';

const Container = styled.div`
    padding: 25px 150px;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const AnswerAreaComponent = styled.div`
    display: flex;
    flex-direction: row;
    box-shadow: 0 1px 2px rgba(0,0,0,.2);
`;
const AnswerBodyArea = styled.div`
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
const VoteNumber = styled.p`
    font-size: 1.1rem;
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

function AnswerArea({questionID, answerID, answerText, votes}) {
    //returns a formatted answer to a question
    const commentCollectionRef = collection(db, "questions" , questionID, "Answers", answerID, "Comments");
    const [commentList, setCommentList] = useState([]);
    const [comment, setComment] = useState(''); 
    const comments1 = [];
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        await addDoc(commentCollectionRef, {
            comment: comment,
            name: "name",
        })
        console.log(comment);
    }
    
    useEffect(()=> {
        const getCommentList = async () => {
            try {
                
                const data = await getDocs(commentCollectionRef);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setCommentList(filteredData);
            } catch (error) {
                console.error(error)
            }
        };
        getCommentList();
    }, [])

    {commentList.map((aComment) => (
        comments1.push(aComment.comment)
    ))}
    const commentsComponents = [];
    for (let i = 0; i < comments1.length; i++)
    {
        commentsComponents.push(
            <Comment>{comments1[i]}</Comment>
        );
    }

    return (
        <Container>
            <AnswerAreaComponent>
                <VotesArea>
                    <a><img style = {{ width : 50, height: 50 }}src = {upArrow} alt = "upArrow" onClick = ""/></a>
                    <VoteNumber>{votes}</VoteNumber>
                    <a><img style = {{ width : 50, height: 50 }}src = {downArrow} alt = "downArrow" onClick = ""/></a>
                </VotesArea>
                <AnswerBodyArea>
                    <BodyText readOnly>
                        {answerText}
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
                </AnswerBodyArea>
            </AnswerAreaComponent>
        </Container>
    )
}

export default AnswerArea;