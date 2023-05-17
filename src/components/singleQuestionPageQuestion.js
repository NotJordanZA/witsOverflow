import styled from "styled-components";
import upArrow from '../arrow-up.png';
import downArrow from '../arrow-down.png';
import {useNavigate} from "react-router-dom";
import { useState } from "react";
import { db } from '../firebase-config/firebase';
import { collection, addDoc, updateDoc, setDoc, doc, getDocs} from 'firebase/firestore';
import { useEffect } from "react";
import Comment from "./Comment";

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

const UserLink = styled.a`
    color: #808191;
`;

function SingleQuestionPageQuestion({questionID, questionTitle, questionText, votes, viewCount, timeAsked, firstName, comments, currEmail, currVoted, currVote}) {
    let navigate = useNavigate();
    const voteDocRef = doc(db, "questions", questionID, "Votes", currEmail);
    let commentDocPath = "questions/" + questionID + "/Comments";
    const [votes1, setVotes1] = useState(votes);

    const [upOpacity, setUpOpacity] = useState(0.4);
    const [downOpacity, setDownOpacity] = useState(0.4);
    const checkVoted = async () => {
        if(currVoted){
            if(currVote === "up"){
                setUpOpacity(1);
            }else if (currVote ==="down"){
                setDownOpacity(1);
            }else{
                setDownOpacity(0.4);
                setUpOpacity(0.4);
            }
        }
    };

    const [commentList, setCommentList] = useState([]);
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

    const [loopCount, setLoopCount] = useState(0);
    const [loopCount2, setLoopCount2] = useState(0);
    const commentsComponents = [];
    const mapComments = commentList.map((aComment) => {
        let author = false;
        if (aComment.name === currEmail){
            author = true;
        }
        commentsComponents.push(
            <Comment
            author = {author}
            deleted = {aComment.deleted}
            body = {aComment.comment}
            commentPath = {commentDocPath+"/"+aComment.id}
            />
        );
        if(currVoted && loopCount === 0){
            checkVoted();
            setLoopCount(1);
            setVotes1(votes);
        }
        if(loopCount2 === 0){
            setVotes1(votes);
            console.log(votes);
            setLoopCount2(1);
        }
    })
    let doThis = mapComments;

    const [comment, setComment] = useState(''); 
    //const commentCollectionRef = collection(db, path);
    //event handlers
    const commentCollectionRef = collection(db, "questions" , questionID, "Comments")
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        let tempComment = comment;
        setComment("");
        await addDoc(commentCollectionRef, {
            comment: tempComment,
            name: currEmail,
        })
        window.location.reload(false);
    }

    const OnUpvote = async() => {
        if(upOpacity === 1){
            await updateDoc(voteDocRef, {
                voteType: "",
                voted: false
              });
            setUpOpacity(0.4);
            setVotes1(votes1 - 1);
        }else if (downOpacity===1){
            await updateDoc(voteDocRef, {
                voteType: "up",
                voted: true
              });
            setUpOpacity(1);
            setDownOpacity(0.4);
            setVotes1(votes1 + 2);
        }else{
            const data = {
                voted: true,
                voteType: "up"
            };
            await setDoc(voteDocRef, data);
            setUpOpacity(1);
            setVotes1(votes1 + 1);
        }
    }

    const OnDownvote = async() => {
        if(downOpacity === 1){
            await updateDoc(voteDocRef, {
                voteType: "",
                voted: false
              });
            setDownOpacity(0.4);
            setVotes1(votes1 + 1);
        }else if (upOpacity === 1){
            await updateDoc(voteDocRef, {
                voteType: "down",
                voted: true
              });
            setDownOpacity(1);
            setUpOpacity(0.4);
            setVotes1(votes1 - 2);
        }else{
            const data = {
                voted: true,
                voteType: "down"
            };
            await setDoc(voteDocRef, data);
            setDownOpacity(1);
            setVotes1(votes1 - 1);
        }
    }

    const routeChangeToProfile = (email) => {
        let path= '/profilePage';
        navigate(path, {state : email});
    }
    
    //just a container that contains all of the question data displayed on the single question page
    return (
        <div>
            <TitleArea>
                <Title><b>{questionTitle}</b></Title>
                <QuestionStatArea>
                    {/* need to add timeAsked */}
                    <QuestionStat>Asked by <UserLink onClick={() => routeChangeToProfile(firstName)}> {firstName} </UserLink></QuestionStat>
                    <QuestionStat>{viewCount} Views</QuestionStat>
                </QuestionStatArea>
            </TitleArea>
            <QuestionArea>
                <VotesArea>
                    <a><img style = {{opacity: upOpacity, width : 50, height: 50 }}src = {upArrow} alt = "upArrow" onClick = {OnUpvote}/></a>
                    <VoteNumber>{votes1}</VoteNumber>
                    <a><img style = {{opacity: downOpacity, width : 50, height: 50 }}src = {downArrow} alt = "downArrow" onClick = {OnDownvote}/></a>
                </VotesArea>
                <QuestionBodyArea>
                    <BodyText readOnly>
                        {questionText}
                    </BodyText>
                    <CommentsAreaContainer>
                    <StyledForm onSubmit={handleCommentSubmit}>
                        {commentsComponents}
                        <AddComment
                        id = "commentInput"
                        placeholder="Add comment..."
                        value = {comment}
                        onChange={(e) => setComment(e.target.value)}
                        />
                        <HiddenButton type= "submit"></HiddenButton>
                    </StyledForm>
                </CommentsAreaContainer>
                </QuestionBodyArea>
            </QuestionArea>
        </div>
    )
}

export default SingleQuestionPageQuestion;