import styled from "styled-components";
import dustbin from '../dustbin.jpg';
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config/firebase";

//CSS Component: Body of Text for Comment
const CommentBody = styled.text`
    border: 0;
    font-size: 0.85rem;
    padding: 5px 0 0 0;
    b{box-shadow: 0 1px 2px rgba(0,0,0,.2)};
`;


//CSS Component: Area Where Comments Go
const CommentArea = styled.div`
display:grid;
grid-template-columns: 1fr 15px;
    box-shadow: 0 1px 2px rgba(0,0,0,.2);
`;

//Function for the Comment
function Comment({body, author, deleted, commentPath}){
    //Const for Reference to Comment Document in Database
    const commentDocRef = doc(db, commentPath)
    //OnClick Handler for the Bin (Delete)
    const onBinClick = async () =>{
        //Delete the Comment
        await updateDoc(commentDocRef, {
            deleted: true
          });
          window.location.reload(false);
    }

    //Check if the User is the Author of the Deleted Comment
    if(deleted && author){
        return(
            //Display Strikethrough Comment if User is Author
            <CommentArea>
                <CommentBody style ={{textDecorationLine: 'line-through'}}>{body}</CommentBody>
            </CommentArea>
            );
    }else if(deleted){
        //Display [Deleted] if User is Not Author
        let deletedBody = "[Deleted]";
        return(
            <CommentArea>
                <CommentBody>{deletedBody}</CommentBody>
            </CommentArea>
            );
    }else if (author){
        return(
            //Display Dustbin (Delete) Button if User is Author of Comment
            <CommentArea>
                <CommentBody>{body}</CommentBody>
                <img style = {{ width : 15, height: 18, opacity: 0.7, justifyContent: "right"}}src = {dustbin} alt = "dustbin" onClick={onBinClick}/>
            </CommentArea>
            );
    }else{
        return(
            //Display Comment if User is Not Author
            <CommentArea>
                <CommentBody>{body}</CommentBody>
            </CommentArea>
            );
    };
}
export default Comment;