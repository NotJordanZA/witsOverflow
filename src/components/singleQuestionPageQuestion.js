import styled from "styled-components";
import upArrow from '../arrow-up.png';
import downArrow from '../arrow-down.png';
import {useNavigate} from "react-router-dom";
import { useState } from "react";
import { db } from '../firebase-config/firebase';
import { collection, addDoc, updateDoc, setDoc, doc, getDocs, deleteDoc} from 'firebase/firestore';
import { useEffect, useLayoutEffect } from "react";
import Comment from "./Comment";

//css for the container for the question
const QuestionArea = styled.div`
    display: flex;
    flex-direction: row;
    box-shadow: 0 1px 2px rgba(0,0,0,.2);
`;
//css for the text area for the question body
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
//css for the container for the body of the question
const QuestionBodyArea = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;
//css for the container for the voting elements
const VotesArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: top;
    flex-direction: column;
    padding: 0 10px;
`;
//css for the title of the question
const Title = styled.header`
    font-size: 1.5rem;
    color: #000;
    b{
        font-weight:bold;
    }
    padding: 0 0 0 0;
`;
//css for the area for the question title
const TitleArea = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 0 10px 0;
`;
//css for the statistics of the question
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
//css for the area for the question stats
const QuestionStatArea = styled.div`
    display: flex;
    flex-direction: row;
`;
//css for the number of votes
const VoteNumber = styled.p`
    font-size: 1.1rem;
`;
//css for the container for the comments
const CommentsAreaContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
`;
//css for the new comment input
const AddComment = styled.input`
    border: 0;
    font-size: 0.85rem;
    margin-top: 5px;
    //padding: 5px 0 0 0;
`;
//css for form for submitting comments
const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    width:100%;
`;
//css for the hidden button used for comment submission purposes
const HiddenButton = styled.button`
    display: none;
`;
//css for the link to the user who authored the question
const UserLink = styled.a`
    color: #808191;
`;
//css for displaying if the question is reported
const ReportedTag = styled.a`
    text-decoration: none;
    color: #C21807;
    font-weight: bold;
    font-size: 1.05rem;
    display: block;
    margin-bottom: 7px;
`;
const StyledButton = styled.button`
    display: flex !important; 
    justify-content: left !important;
    border: 0px solid #fff;
    border-radius: 10px;
    background: #475be8;
    color: white;
`;
//main function of the component
function SingleQuestionPageQuestion({questionID, questionTitle, questionText, votes, viewCount, timeAsked, firstName, comments, currEmail, currVoted, currVote, reported}) {
    let navigate = useNavigate();
    const voteDocRef = doc(db, "questions", questionID, "Votes", currEmail);//reference for the vote collection
    let commentDocPath = "questions/" + questionID + "/Comments";//path to the comments of the question, for firebase
    const [votes1, setVotes1] = useState(votes);//stores the votes and allows you to set the votes

    const [upOpacity, setUpOpacity] = useState(0.4);//stores the opacity of the upvote button
    const [downOpacity, setDownOpacity] = useState(0.4);//stores the opacity of the downvote button
    const checkVoted = async () => {//a function which checks if the current user has voted
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

    const [commentList, setCommentList] = useState([]);//stores the comments as fetched from the database
    useEffect(()=> {//fetches the comments
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

    useEffect(() => {//runs everytime the vote count changes to check if the current user has voted and to make sure the vote count is current
        checkVoted();
        setVotes1(votes);
      }, [votes]);

    const commentsComponents = [];
    const mapComments = commentList.map((aComment) => {//makes an array of comments
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
    })
    let doThis = mapComments;

    const [comment, setComment] = useState('');//for a potential new comment
    const commentCollectionRef = collection(db, "questions" , questionID, "Comments")//reference for adding a new comment
    const handleCommentSubmit = async (e) => {//runs when a comment is submitted and updates the database
        e.preventDefault();
        let tempComment = comment;
        setComment("");
        await addDoc(commentCollectionRef, {
            comment: tempComment,
            name: currEmail,
        })
        window.location.reload(false);
    }

    const OnUpvote = async() => {//handles updating the database and the components when the upvote button is clicked
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

    const OnDownvote = async() => {//handles updating the database and the components when the downvote button is clicked
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

    const routeChangeToProfile = (email) => {//routes the user to the profile page of the email cliecked
        let path= '/profilePage';
        navigate(path, {state : email});
    }

    const OnDeleteButtonClick = async() => {
        await deleteDoc(doc(db, "questions", questionID));
        navigate("/reportsPage");
    }

    const OnResolveButtonClick = async() => {
        await updateDoc(doc(db, "questions", questionID), {
            reported: false
          });
          navigate("/reportsPage");
          window.location.reload(false);
    }
    
    //renders the component
    if(reported){
        if(currEmail.indexOf("student") === -1){
            return (
                <div>
                    <TitleArea>
                        <Title><b>{questionTitle}</b></Title>
                        <ReportedTag>Reported</ReportedTag>
                        <QuestionStatArea>
                            <QuestionStat>Asked by <UserLink onClick={() => routeChangeToProfile(firstName)}> {firstName} </UserLink></QuestionStat>
                            <QuestionStat>{viewCount} Views</QuestionStat>
                        </QuestionStatArea>
                    </TitleArea>
                    <QuestionArea>
                        <VotesArea>
                            <a><img style = {{opacity: upOpacity, width : 50, height: 50 }}src = {upArrow} alt = "upArrow" onClick = {OnUpvote}/></a>
                            <VoteNumber>{votes1}</VoteNumber>
                            <a><img style = {{opacity: downOpacity, width : 50, height: 50 }}src = {downArrow} alt = "downArrow" onClick = {OnDownvote}/></a>
                            <StyledButton style = {{padding: "8px 14px"}} onClick={OnDeleteButtonClick}>Delete</StyledButton>
                            <a style = {{padding: "1px"}}> </a>
                            <StyledButton style = {{padding: "8px 10px"}} onClick={OnResolveButtonClick}>Resolve</StyledButton>
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
        }else{
            return (
                <div>
                    <TitleArea>
                        <Title><b>{questionTitle}</b></Title>
                        <ReportedTag>Reported</ReportedTag>
                        <QuestionStatArea>
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
    }else{
        return (
            <div>
                <TitleArea>
                    <Title><b>{questionTitle}</b></Title>
                    <QuestionStatArea>
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
    
}

export default SingleQuestionPageQuestion;