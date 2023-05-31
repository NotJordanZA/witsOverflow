import { useState } from "react";
import styled from "styled-components";

//CSS Component: Area for Comments
const CommentsAreaContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
`;
//CSS Component: Comment
const Comment = styled.text`
    border: 0;
    font-size: 0.85rem;
    padding: 5px 0 0 0;
    box-shadow: 0 1px 2px rgba(0,0,0,.2);
`;
//CSS Component: Add a Comment
const AddComment = styled.input`
    border: 0;
    font-size: 0.85rem;
    margin-top: 5px;
    //padding: 5px 0 0 0;
`;
//CSS Component: Form
const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    width:100%;
`;
//CSS Component: Invisible Button
const HiddenButton = styled.button`
    display: none;
`;

function CommentsArea({comments, path}) {

    const [comment, setComment] = useState(''); 
    //Const for Handling Submission of Comment
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        console.log(comment);
        console.log(path);
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
                <HiddenButton type= "submit" data-testid = "commentSubmitTest"></HiddenButton>
            </StyledForm>
        </CommentsAreaContainer>
    )
}

export default CommentsArea;