import styled from "styled-components";
import { useState } from "react";
import CommentsArea from '../components/commentsArea';
import upArrow from '../arrow-up.png';
import downArrow from '../arrow-down.png';
import { db } from '../firebase-config/firebase';
import { collection, addDoc, updateDoc, setDoc, doc, getDocs} from 'firebase/firestore';
import { useEffect } from "react";

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

function AnswerArea({questionID, answerID, answerText, votes, questionEmail, currEmail, answerHelpful}) {
    const voteDocRef = doc(db, "questions", questionID, "Answers", answerID, "Votes", currEmail);
    //returns a formatted answer to a question
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
        })
    }

    const votesCollectionRef = collection(db, "questions", questionID, "Answers", answerID, "Votes");
    const [votesList, setVotesList] = useState([]);
    let voted = false;
    let vote = "";
    let votes1 = 0;
    let currVote ="";

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
    }, []);

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
    const [upOpacity, setUpOpacity] = useState(0.4);
    const [downOpacity, setDownOpacity] = useState(0.4);
    useEffect(() => {
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
        checkVoted();
    }, []);
    

    const OnUpvote = async() => {
        if(upOpacity === 1){
            await updateDoc(voteDocRef, {
                voteType: "",
                voted: false
              });
            setDownOpacity(0.4);
            setUpOpacity(0.4);
        }else if (downOpacity===1){
            await updateDoc(voteDocRef, {
                voteType: "up",
                voted: true
              });
            setUpOpacity(1);
            setDownOpacity(0.4);
        }else{
            const data = {
                voted: true,
                voteType: "up"
            };
            await setDoc(voteDocRef, data);
            setUpOpacity(1);
            setDownOpacity(0.4);
        }
    }

    const OnDownvote = async() => {
        if(downOpacity === 1){
            await updateDoc(voteDocRef, {
                voteType: "",
                voted: false
              });
            setUpOpacity(0.4);
            setDownOpacity(0.4);
        }else if (upOpacity === 1){
            await updateDoc(voteDocRef, {
                voteType: "down",
                voted: true
              });
            setDownOpacity(1);
            setUpOpacity(0.4);
        }else{
            const data = {
                voted: true,
                voteType: "down"
            };
            await setDoc(voteDocRef, data);
            setDownOpacity(1);
            setUpOpacity(0.4);
        }
    }
    if (currEmail != questionEmail){
        return (
            <div>
                {answerHelpful ? (
                    <a style={{padding: "10px 0 10px 0", marginTop: "5px", color: "#475be8"}}>Marked helpful by author</a>
                ):(<a></a>)}
                <AnswerAreaComponent>
                    <VotesArea>
                        <a><img style = {{opacity: upOpacity, width : 50, height: 50 }}src = {upArrow} alt = "upArrow" onClick = {OnUpvote}/></a>
                        <VoteNumber>{votes1}</VoteNumber>
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
                        <VoteNumber>{votes1}</VoteNumber>
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
    }
}

export default AnswerArea;