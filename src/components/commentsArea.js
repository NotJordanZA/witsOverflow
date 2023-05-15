import { useState } from "react";
import styled from "styled-components";
import { db } from '../firebase-config/firebase';
import { collection, addDoc } from 'firebase/firestore';

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

function CommentsArea({comments, path}) {

    const [comment, setComment] = useState(''); 
    //const commentCollectionRef = collection(db, path);
    //event handlers
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        console.log(comment);
        console.log(path);
        // await addDoc(commentCollectionRef, {
        //     comment: comment,
        //     name: "name",
        // })
        console.log(comment);
    }

    //create variable number of comment components using the inputted String[] array of comment texts
    const commentsComponents = [];
    for (let i = 0; i < comments.length; i++)
    {
        commentsComponents.push(
            <Comment>{comments[i]}</Comment>
        );
    }

    //displays all Comment components
    return (
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
    )
}

export default CommentsArea;