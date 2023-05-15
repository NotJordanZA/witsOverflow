import styled from "styled-components";
import dustbin from '../dustbin.jpg';
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config/firebase";

const CommentBody = styled.text`
    border: 0;
    font-size: 0.85rem;
    padding: 5px 0 0 0;
    b{box-shadow: 0 1px 2px rgba(0,0,0,.2)};
`;

// const CommentArea = styled.div`
//     display: flex;
//     flex-direction: row;
//     box-shadow: 0 1px 2px rgba(0,0,0,.2);
// `;

const CommentArea = styled.div`
display:grid;
grid-template-columns: 1fr 15px;
    box-shadow: 0 1px 2px rgba(0,0,0,.2);
`;

function Comment({body, author, deleted, commentPath}){
    const commentDocRef = doc(db, commentPath)
    const onBinClick = async () =>{
        await updateDoc(commentDocRef, {
            deleted: true
          });
          window.location.reload(false);
    }

    if(deleted && author){
        return(
            <CommentArea>
                <CommentBody style ={{textDecorationLine: 'line-through'}}>{body}</CommentBody>
            </CommentArea>
            );
    }else if(deleted){
        let deletedBody = "[Deleted]";
        return(
            <CommentArea>
                <CommentBody>{deletedBody}</CommentBody>
            </CommentArea>
            );
    }else if (author){
        return(
            <CommentArea>
                <CommentBody>{body}</CommentBody>
                <img style = {{ width : 15, height: 18, opacity: 0.7, justifyContent: "right"}}src = {dustbin} alt = "dustbin" onClick={onBinClick}/>
            </CommentArea>
            );
    }else{
        return(
            <CommentArea>
                <CommentBody>{body}</CommentBody>
            </CommentArea>
            );
    };
}
export default Comment;