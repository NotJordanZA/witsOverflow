import styled from "styled-components";
import { useState } from "react";
import Comment from "./Comment";
import upArrow from '../arrow-up.png';
import downArrow from '../arrow-down.png';
import {useNavigate} from "react-router-dom";
import { db } from '../firebase-config/firebase';
import { collection, addDoc, updateDoc, setDoc, doc, getDocs, deleteDoc, arrayUnion, arrayRemove, getDoc} from 'firebase/firestore';
import { useEffect } from "react";

const AnswerAreaComponent = styled.div`
    display: flex;
    flex-direction: row;
    box-shadow: 0 1px 2px rgba(0,0,0,.2);
    margin: 10px;
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
const StyledReportButton = styled.button`
    display: inline-block;
    border: 0px solid #fff;
    border-radius: 10px;
    width: fit-content;
    height: fit-content;
    padding: 10px;
    background: #475be8;
    color: white;
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

const StyledButton = styled.button`
    display: flex !important; 
    justify-content: left !important;
    border: 0px solid #fff;
    border-radius: 10px;
    background: #475be8;
    color: white;
`;

const EditAnswerTextArea = styled.textarea`
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

const EditButtonsArea = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;
`;

const Title = styled.header`
    font-size: 1.2rem;
    color: #000;
    padding: 10px 0 10px 0;
`;

const ReportedTag = styled.a`
    text-decoration: none;
    color: #C21807;
    font-weight: bold;
    font-size: 1.05rem;
    display: block;
    margin-bottom: 7px;
`;

function AnswerArea({questionID, answerID, answerText, votes, questionEmail, answerEmail, currEmail, answerHelpful, reported}) {
    let navigate = useNavigate();

    const voteDocRef = doc(db, "questions", questionID, "Answers", answerID, "Votes", currEmail);

    const [upOpacity, setUpOpacity] = useState(0.4);
    const [downOpacity, setDownOpacity] = useState(0.4);
    const checkVoted = async () => {
         if(voted){
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

    //returns a formatted answer to a question
    let commentDocPath = "questions/" + questionID + "/Answers/" + answerID + "/Comments";
    const commentCollectionRef = collection(db, "questions" , questionID, "Answers", answerID, "Comments");
    const [commentList, setCommentList] = useState([]);
    const [comment, setComment] = useState(''); 
    const comments1 = [];
    const handleCommentSubmit = async (e) => {
        let tempComment = comment;
        setComment("");
        e.preventDefault();
        await addDoc(commentCollectionRef, {
            comment: tempComment,
            name: currEmail,
            deleted: false,
        })
        window.location.reload(false);
    }

    const votesCollectionRef = collection(db, "questions", questionID, "Answers", answerID, "Votes");
    const [votesList, setVotesList] = useState([]);
    

    let voted = false;
    let vote = "";
    let votes1 = 0;
    let currVote ="";

    const [votes2, setVotes2] = useState(votes1);

    useEffect(() => {
        const getVotesList = async () => {
            try {
                const data = await getDocs(votesCollectionRef);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setVotesList(filteredData);
            } catch (error) {
                console.error(error)
            }
        };
        getVotesList();
    }, [votes2]);

        for (let i = 0; i < votesList.length; i++){
            if (votesList[i].id == currEmail){
                voted = true;
                currVote = votesList[i].voteType;
            }
            vote = votesList[i].voteType;
            if(vote === "up"){
                votes1 += 1;
            }else if(vote === "down"){
                votes1 -= 1;
            }
        }

    useEffect(() => {
        checkVoted();
        setVotes2(votes1);
      }, [votesList,votes1,votes2]);

    const answerRef = doc(db, "questions", questionID, "Answers", answerID)
    updateDoc(answerRef, {
        votes: votes1
      });
     

    const [helpful, setHelpful] = useState(!answerHelpful);
    const onHelpfulChange= async (e) => {
        setHelpful(!helpful);
        console.log(helpful);
        updateDoc(answerRef, {
            helpful: helpful
        });
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
    })
    let doThis = mapComments;
    
    const OnUpvote = async() => {
        if(upOpacity === 1){
            await updateDoc(voteDocRef, {
                voteType: "",
                voted: false
              });
            setUpOpacity(0.4);
            setVotes2(votes2 - 1);
        }else if (downOpacity===1){
            await updateDoc(voteDocRef, {
                voteType: "up",
                voted: true
              });
            setUpOpacity(1);
            setDownOpacity(0.4);
            setVotes2(votes2 + 2);
        }else{
            const data = {
                voted: true,
                voteType: "up"
            };
            await setDoc(voteDocRef, data);
            setUpOpacity(1);
            setVotes2(votes2 + 1);
        }
    }

    const OnDownvote = async() => {
        if(downOpacity === 1){
            await updateDoc(voteDocRef, {
                voteType: "",
                voted: false
              });
            setDownOpacity(0.4);
            setVotes2(votes2 + 1);
        }else if (upOpacity === 1){
            await updateDoc(voteDocRef, {
                voteType: "down",
                voted: true
              });
            setDownOpacity(1);
            setUpOpacity(0.4);
            setVotes2(votes2 - 2);
        }else{
            const data = {
                voted: true,
                voteType: "down"
            };
            await setDoc(voteDocRef, data);
            setDownOpacity(1);
            setVotes2(votes2 - 1);
        }
    }

    const [editing, setEditing] = useState(false);
    const [editedAnswer, setEditedAnswer] = useState('')

    const OnEditButtonClick = async => {
        setEditing(!editing);
    }

    const OnEditComplete = async => {
        answerText += "\n\nEdit:\n" + editedAnswer;
        console.log(editedAnswer);
        updateDoc(answerRef, {
            answer: answerText
          });
        setEditing(false);
        window.location.reload(false);
    }

    const OnEditCancel = async => {
        setEditing(!editing);
    }

    const reportsDocRef = doc(db, "reports", questionID);
    const reportAnswer = async() => {
        const data = {
            answerID: [answerID]
        };
        const docSnap = await getDoc(reportsDocRef);
        if(docSnap.exists()){
            await updateDoc(reportsDocRef,{
                answerID: arrayUnion(answerID)
            });
        }else{
            setDoc(reportsDocRef, data)
        }
        await updateDoc(answerRef, {
            reported: true
        });
        window.location.reload(false);
    }
    
    const OnDeleteButtonClick = async() => {
        await deleteDoc(doc(db, "questions", questionID, "Answers", answerID));
        await updateDoc(reportsDocRef,{
            answerID: arrayRemove(answerID)
        });
        navigate("/reportsPage");
    }

    const OnResolveButtonClick = async() => {
        await updateDoc(doc(db, "questions", questionID, "Answers", answerID), {
            reported: false
        });
        await updateDoc(reportsDocRef,{
            answerID: arrayRemove(answerID)
        });
          navigate("/reportsPage");
          window.location.reload(false);
    }

    if(reported){
        if(currEmail.indexOf("student") === -1){
            return (
                <div>
                    {answerHelpful ? (
                        <a style={{padding: "10px 0 10px 0", marginTop: "5px", color: "#475be8"}}>Marked helpful by author</a>
                    ):(<a></a>)}
                    <ReportedTag>Reported</ReportedTag>
                    <AnswerAreaComponent>
                        <VotesArea>
                            <a><img style = {{opacity: upOpacity, width : 50, height: 50 }}src = {upArrow} alt = "upArrow" onClick = {OnUpvote}/></a>
                            <VoteNumber>{votes2}</VoteNumber>
                            <a><img style = {{opacity: downOpacity, width : 50, height: 50 }}src = {downArrow} alt = "downArrow" onClick = {OnDownvote}/></a>
                            <StyledButton style = {{padding: "8px 14px"}} onClick={OnDeleteButtonClick}>Delete</StyledButton>
                            <a style = {{padding: "1px"}}> </a>
                            <StyledButton style = {{padding: "8px 10px"}} onClick={OnResolveButtonClick}>Resolve</StyledButton>
                        </VotesArea>
                        <AnswerBodyArea>
                            <BodyText readOnly>
                                {answerText}
                            </BodyText>
                            
                            <CommentsAreaContainer>
                            <StyledForm onSubmit={handleCommentSubmit}>
                                {commentsComponents}
                                <HiddenButton type= "submit"></HiddenButton>
                            </StyledForm>
                            </CommentsAreaContainer>
                        </AnswerBodyArea>
                    </AnswerAreaComponent>
                </div>
            )
        }
        else if (currEmail === questionEmail){
            return (
                <div>
                    <label>
                        <input
                            type = "checkbox"
                            checked = {!helpful}
                            value = {helpful}
                            onChange = {onHelpfulChange}
                            style={{padding: "10px 0 10px 0", marginTop: "5px"}}
                        />
                        Helpful?
                    </label>
                    <ReportedTag>Reported</ReportedTag>
                    <AnswerAreaComponent>
                        <VotesArea>
                            <a><img style = {{opacity: upOpacity, width : 50, height: 50 }}src = {upArrow} alt = "upArrow" onClick = {OnUpvote}/></a>
                            <VoteNumber>{votes2}</VoteNumber>
                            <a><img style = {{opacity: downOpacity, width : 50, height: 50 }}src = {downArrow} alt = "downArrow" onClick = {OnDownvote}/></a>
                            <StyledReportButton onClick={reportAnswer}>Report</StyledReportButton>
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
                </div>
            )
        }else if(answerEmail === currEmail){ //is user that gave the answer - can't report
            if(editing === false){
                return (
                    <div>
                        {answerHelpful ? (
                            <a style={{padding: "10px 0 10px 0", marginTop: "5px", color: "#475be8"}}>Marked helpful by author</a>
                        ):(<a></a>)}
                        <ReportedTag>Reported</ReportedTag>
                        <AnswerAreaComponent>
                            <VotesArea>
                                <a><img style = {{opacity: upOpacity, width : 50, height: 50 }}src = {upArrow} alt = "upArrow" onClick = {OnUpvote}/></a>
                                <VoteNumber>{votes2}</VoteNumber>
                                <a><img style = {{opacity: downOpacity, width : 50, height: 50 }}src = {downArrow} alt = "downArrow" onClick = {OnDownvote}/></a>
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
                    </div>
                )
            }else{
                return (
                    <div>
                        {answerHelpful ? (
                            <a style={{padding: "10px 0 10px 0", marginTop: "5px", color: "#475be8"}}>Marked helpful by author</a>
                        ):(<a></a>)}
                        <ReportedTag>Reported</ReportedTag>
                        <AnswerAreaComponent>
                            <VotesArea>
                                <a><img style = {{opacity: upOpacity, width : 50, height: 50 }}src = {upArrow} alt = "upArrow" onClick = {OnUpvote}/></a>
                                <VoteNumber>{votes2}</VoteNumber>
                                <a><img style = {{opacity: downOpacity, width : 50, height: 50 }}src = {downArrow} alt = "downArrow" onClick = {OnDownvote}/></a>
                            </VotesArea>
                            <AnswerBodyArea>
                                <BodyText readOnly>
                                    {answerText}
                                </BodyText>
                                
                                <CommentsAreaContainer>
                                <StyledForm onSubmit={handleCommentSubmit}>
                                    {commentsComponents}
                                    <HiddenButton type= "submit"></HiddenButton>
                                </StyledForm>
                                </CommentsAreaContainer>
                                <Title>Append to your answer:</Title>
                                    <EditAnswerTextArea
                                        value = { editedAnswer }
                                        onChange={(e) => setEditedAnswer(e.target.value)}
                                        required
                                    />
                                <EditButtonsArea>
                                    <StyledButton style = {{ padding: "15px 45px"}} onClick = {OnEditComplete}>Edit</StyledButton>
                                    <StyledButton style = {{ padding: "15px 38px"}} onClick = {OnEditCancel}>Cancel</StyledButton>
                                </EditButtonsArea>
                            </AnswerBodyArea>
                        </AnswerAreaComponent>
                    </div>
                )
            }
        }else{ //is user that neither asked question nor gave answer - can report
            return (
                <div>
                    {answerHelpful ? (
                        <a style={{padding: "10px 0 10px 0", marginTop: "5px", color: "#475be8"}}>Marked helpful by author</a>
                    ):(<a></a>)}
                    <ReportedTag>Reported</ReportedTag>
                    <AnswerAreaComponent>
                        <VotesArea>
                            <a><img style = {{opacity: upOpacity, width : 50, height: 50 }}src = {upArrow} alt = "upArrow" onClick = {OnUpvote}/></a>
                            <VoteNumber>{votes2}</VoteNumber>
                            <a><img style = {{opacity: downOpacity, width : 50, height: 50 }}src = {downArrow} alt = "downArrow" onClick = {OnDownvote}/></a>
                            <StyledReportButton onClick={reportAnswer}>Report</StyledReportButton>
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
                </div>
            )
        }
    }else{ //answer has not been reported
        if (currEmail === questionEmail){ //is user that asked the question this answer is for - can report
            return (
                <div>
                    <label>
                        <input
                            type = "checkbox"
                            checked = {!helpful}
                            value = {helpful}
                            onChange = {onHelpfulChange}
                            style={{padding: "10px 0 10px 0", marginTop: "5px"}}
                        />
                        Helpful?
                    </label>
                    <AnswerAreaComponent>
                        <VotesArea>
                            <a><img style = {{opacity: upOpacity, width : 50, height: 50 }}src = {upArrow} alt = "upArrow" onClick = {OnUpvote}/></a>
                            <VoteNumber>{votes2}</VoteNumber>
                            <a><img style = {{opacity: downOpacity, width : 50, height: 50 }}src = {downArrow} alt = "downArrow" onClick = {OnDownvote}/></a>
                            <StyledReportButton onClick={reportAnswer}>Report</StyledReportButton>
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
                </div>
            )
        }else if(answerEmail === currEmail){ //is user that gave the answer - can't report
            if(editing === false){
                return (
                    <div>
                        {answerHelpful ? (
                            <a style={{padding: "10px 0 10px 0", marginTop: "5px", color: "#475be8"}}>Marked helpful by author</a>
                        ):(<a></a>)}
                        <AnswerAreaComponent>
                            <VotesArea>
                                <a><img style = {{opacity: upOpacity, width : 50, height: 50 }}src = {upArrow} alt = "upArrow" onClick = {OnUpvote}/></a>
                                <VoteNumber>{votes2}</VoteNumber>
                                <a><img style = {{opacity: downOpacity, width : 50, height: 50 }}src = {downArrow} alt = "downArrow" onClick = {OnDownvote}/></a>
                                <StyledButton style = {{padding: "15px 10px"}} onClick={OnEditButtonClick}>Edit</StyledButton>
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
                    </div>
                )
            }else{
                return (
                    <div>
                        {answerHelpful ? (
                            <a style={{padding: "10px 0 10px 0", marginTop: "5px", color: "#475be8"}}>Marked helpful by author</a>
                        ):(<a></a>)}
                        <AnswerAreaComponent>
                            <VotesArea>
                                <a><img style = {{opacity: upOpacity, width : 50, height: 50 }}src = {upArrow} alt = "upArrow" onClick = {OnUpvote}/></a>
                                <VoteNumber>{votes2}</VoteNumber>
                                <a><img style = {{opacity: downOpacity, width : 50, height: 50 }}src = {downArrow} alt = "downArrow" onClick = {OnDownvote}/></a>
                            </VotesArea>
                            <AnswerBodyArea>
                                <BodyText readOnly>
                                    {answerText}
                                </BodyText>
                                
                                <CommentsAreaContainer>
                                <StyledForm onSubmit={handleCommentSubmit}>
                                    {commentsComponents}
                                    <HiddenButton type= "submit"></HiddenButton>
                                </StyledForm>
                                </CommentsAreaContainer>
                                <Title>Append to your answer:</Title>
                                    <EditAnswerTextArea
                                        value = { editedAnswer }
                                        onChange={(e) => setEditedAnswer(e.target.value)}
                                        required
                                    />
                                <EditButtonsArea>
                                    <StyledButton style = {{ padding: "15px 45px"}} onClick = {OnEditComplete}>Edit</StyledButton>
                                    <StyledButton style = {{ padding: "15px 38px"}} onClick = {OnEditCancel}>Cancel</StyledButton>
                                </EditButtonsArea>
                            </AnswerBodyArea>
                        </AnswerAreaComponent>
                    </div>
                )
            }
        }else{ //is user that neither asked question nor gave answer - can report
            return (
                <div>
                    {answerHelpful ? (
                        <a style={{padding: "10px 0 10px 0", marginTop: "5px", color: "#475be8"}}>Marked helpful by author</a>
                    ):(<a></a>)}
                    <AnswerAreaComponent>
                        <VotesArea>
                            <a><img style = {{opacity: upOpacity, width : 50, height: 50 }}src = {upArrow} alt = "upArrow" onClick = {OnUpvote}/></a>
                            <VoteNumber>{votes2}</VoteNumber>
                            <a><img style = {{opacity: downOpacity, width : 50, height: 50 }}src = {downArrow} alt = "downArrow" onClick = {OnDownvote}/></a>
                            <StyledReportButton onClick={reportAnswer}>Report</StyledReportButton>
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
                </div>
            )
        }
    }
}

export default AnswerArea;