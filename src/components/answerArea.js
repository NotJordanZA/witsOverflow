import styled from "styled-components";
import { useState } from "react";
import Comment from "./Comment";
import upArrow from '../arrow-up.png';
import downArrow from '../arrow-down.png';
import {useNavigate} from "react-router-dom";
import { db } from '../firebase-config/firebase';
import { collection, addDoc, updateDoc, setDoc, doc, getDocs, deleteDoc, arrayUnion, arrayRemove, getDoc} from 'firebase/firestore';
import { useEffect } from "react";

//CSS Component: Area for Entire Answer Containing All Elements
const AnswerAreaComponent = styled.div`
    display: flex;
    flex-direction: row;
    box-shadow: 0 1px 2px rgba(0,0,0,.2);
    margin: 10px;
`;
//CSS Component: Area for Body of Answer and Comments
const AnswerBodyArea = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;
//CSS Component: Area for Votes
const VotesArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: top;
    flex-direction: column;
    padding: 0 10px;
`;
//CSS Component: Number of Votes
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
//CSS Component: Area for Text in Answer Body
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
//CSS Component: Container for Comments Area
const CommentsAreaContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
`;
//CSS Component: Add Comment Section
const AddComment = styled.input`
    border: 0;
    font-size: 0.85rem;
    margin-top: 5px;
    //padding: 5px 0 0 0;
`;
//CSS Component: Form for Submitting Comment
const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    width:100%;
`;
//CSS Component: Button with No Display for Submission Using Enter
const HiddenButton = styled.button`
    display: none;
`;
//CSS Component: Button
const StyledButton = styled.button`
    display: flex !important; 
    justify-content: left !important;
    border: 0px solid #fff;
    border-radius: 10px;
    background: #475be8;
    color: white;
`;
//CSS Component: Area for Editing Answer
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
//CSS Component: Area for Edit Buttons
const EditButtonsArea = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;
`;
//CSS Component: Text for Append Instructions
const Title = styled.header`
    font-size: 1.2rem;
    color: #000;
    padding: 10px 0 10px 0;
`;
//CSS Component: Tag for Reported Answer
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
  
    //Const for Reference to Answers in Database
    const voteDocRef = doc(db, "questions", questionID, "Answers", answerID, "Votes", currEmail);

    //useState for Opacity of Votes
    const [upOpacity, setUpOpacity] = useState(0.4);
    const [downOpacity, setDownOpacity] = useState(0.4);
    //Check Vote
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

    //Returns a formatted answer to a question
    let commentDocPath = "questions/" + questionID + "/Answers/" + answerID + "/Comments";
    const commentCollectionRef = collection(db, "questions" , questionID, "Answers", answerID, "Comments");
    //Const for List of Comments
    const [commentList, setCommentList] = useState([]);
    //Const for Specific Comment
    const [comment, setComment] = useState(''); 
    const comments1 = [];
    //Const for Handling Submission of Comment
    const handleCommentSubmit = async (e) => {
        let tempComment = comment;
        setComment("");
        e.preventDefault();
        //Adds Comment to Database
        await addDoc(commentCollectionRef, {
            comment: tempComment,
            name: currEmail,
            deleted: false,
        })
        window.location.reload(false);
    }

    //Const for Reference to Votes
    const votesCollectionRef = collection(db, "questions", questionID, "Answers", answerID, "Votes");
    //Const for List of Votes
    const [votesList, setVotesList] = useState([]);
    

    let voted = false;
    let vote = "";
    let votes1 = 0;
    let currVote ="";
    
    const [votes2, setVotes2] = useState(votes1);

    //Fetch the List of Votes from the Database
    useEffect(() => {
        const getVotesList = async () => {
            try {
                //Fetch Documents for Votes Collection
                const data = await getDocs(votesCollectionRef);
                //Filter the Data into a Usable Format
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setVotesList(filteredData);
            } catch (error) {
                console.error(error)
            }
        };
        //Call Above Function
        getVotesList();
    }, [votes2]);

        //Count the Votes and Check if Current User has Voted
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
    
    //Update Any Time Votes Updated and Update Vote Count
    useEffect(() => {
        checkVoted();
        setVotes2(votes1);
      }, [votesList,votes1,votes2]);

    //Const for Reference to Answers
    const answerRef = doc(db, "questions", questionID, "Answers", answerID)
    //Update Votes in Database
    updateDoc(answerRef, {
        votes: votes1
      });
     
    //Const for if Answer is Helpful
    const [helpful, setHelpful] = useState(!answerHelpful);
    //Update Helpful When Changed
    const onHelpfulChange= async (e) => {
        setHelpful(!helpful);
        console.log(helpful);
        updateDoc(answerRef, {
            helpful: helpful
        });
    }
    
    //Fetch List of Comments from Database
    useEffect(()=> {
        const getCommentList = async () => {
            try {
                //Const for Reference to Comments Collection
                const data = await getDocs(commentCollectionRef);
                //Filter Data into Usable Format
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setCommentList(filteredData);
            } catch (error) {
                console.error(error)
            }
        };
        //Call Above Function
        getCommentList();
    }, [])

    const commentsComponents = [];
    //Map the Comments to an Array
    const mapComments = commentList.map((aComment) => {
        let author = false;
        if (aComment.name === currEmail){
            author = true;
        }
        //Push Comments in a Comment Components to Array
        commentsComponents.push(
            <Comment
            author = {author}
            deleted = {aComment.deleted}
            body = {aComment.comment}
            commentPath = {commentDocPath+"/"+aComment.id}
            />
        );
    })
    //Ensure Mapping of Comments
    let doThis = mapComments;
    
    //Const for When Answer Upvoted
    const OnUpvote = async() => {
        //Remove Upvote
        if(upOpacity === 1){
            //Update Database with Vote
            await updateDoc(voteDocRef, {
                voteType: "",
                voted: false
              });
            setUpOpacity(0.4);
            setVotes2(votes2 - 1);
        }else if (downOpacity===1){ //Remove Downvote
            //Update Database with Vote
            await updateDoc(voteDocRef, {
                voteType: "up",
                voted: true
              });
            setUpOpacity(1);
            setDownOpacity(0.4);
            setVotes2(votes2 + 2);
        }else{ //Upvote
            const data = {
                voted: true,
                voteType: "up"
            };
            await setDoc(voteDocRef, data);
            setUpOpacity(1);
            setVotes2(votes2 + 1);
        }
    }

    //Const for When User Downvoted
    const OnDownvote = async() => {
        //Remove Downvote
        if(downOpacity === 1){
            //Update Votes in Database
            await updateDoc(voteDocRef, {
                voteType: "",
                voted: false
              });
            setDownOpacity(0.4);
            setVotes2(votes2 + 1);
        }else if (upOpacity === 1){ //Remove Upvote
            //Update Votes in Database
            await updateDoc(voteDocRef, {
                voteType: "down",
                voted: true
              });
            setDownOpacity(1);
            setUpOpacity(0.4);
            setVotes2(votes2 - 2);
        }else{ //Downvote
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

    //Handler for Clicking Edit Button
    const OnEditButtonClick = async => {
        setEditing(!editing);
    }

    //Const for Completing Edit
    const OnEditComplete = async => {
        answerText += "\n\nEdit:\n" + editedAnswer;
        console.log(editedAnswer);
        updateDoc(answerRef, {
            answer: answerText
          });
        setEditing(false);
        window.location.reload(false);
    }

    //Const for Cancelling Edit
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

    if(reported){//If Post is Reported
        if(currEmail.indexOf("student") === -1){//Render One Way if Question is User's
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
                    {/* Answer Area */}
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
        }else if(answerEmail === currEmail){ //Render One Way if Answer is User's
            if(editing === false){//If Not Editing
                return (
                    <div>
                        {answerHelpful ? (
                            <a style={{padding: "10px 0 10px 0", marginTop: "5px", color: "#475be8"}}>Marked helpful by author</a>
                        ):(<a></a>)}
                        <ReportedTag>Reported</ReportedTag>
                        {/* Answer Area */}
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
            }else{ //If Editing
                return (
                    <div>
                        {answerHelpful ? (
                            <a style={{padding: "10px 0 10px 0", marginTop: "5px", color: "#475be8"}}>Marked helpful by author</a>
                        ):(<a></a>)}
                        <ReportedTag>Reported</ReportedTag>
                        {/* Answer Area */}
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
                    {/* Answer Area */}
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
        if (currEmail === questionEmail){ //If Question Asked By User
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
                    {/* Answer Area */}
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
        }else if(answerEmail === currEmail){ //If Answer is Current User's
            if(editing === false){//If Not Editing
                return (
                    <div>
                        {answerHelpful ? (
                            <a style={{padding: "10px 0 10px 0", marginTop: "5px", color: "#475be8"}}>Marked helpful by author</a>
                        ):(<a></a>)}
                        {/* Answer Area */}
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
            }else{ //If Editing
                return (
                    <div>
                        {answerHelpful ? (
                            <a style={{padding: "10px 0 10px 0", marginTop: "5px", color: "#475be8"}}>Marked helpful by author</a>
                        ):(<a></a>)}
                        {/* Answer Area */}
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
        }else{ //If Question/Answer Not User's
            return (
                <div>
                    {answerHelpful ? (
                        <a style={{padding: "10px 0 10px 0", marginTop: "5px", color: "#475be8"}}>Marked helpful by author</a>
                    ):(<a></a>)}
                    {/* Answer Area */}
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