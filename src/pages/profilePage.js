//profile page
import styled from "styled-components";
import Avatar from "../avatar.svg"
import {useNavigate, useLocation} from "react-router-dom";
//import UserData from "../context/userData";
import { getAuth, signOut } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { getDoc , doc, getDocs, collection} from "firebase/firestore";
import { db } from '../firebase-config/firebase';
import QuestionRow from '../components/QuestionRow';

const ProfileStat = styled.div`
    text-align: center;
    width: 37px;
    display: inline-block;
    font-size: 1.2rem;
    color: #808191;
    grid-row: 1;
    span{
        font-size: .7rem;
        display: block;
        font-weight: 300;
        margin-top: 4px;
        text-align: center;
    }
`;

const StatsRow = styled.div`
    display: grid;
    grid-gap: 10px;
`;

const StyledHeader = styled.h1`
  font-size: 1.5rem;
  color: #000;
  font-weight:bold;
  padding: 10px 0;
  `;

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 2fr min-content;
  padding: 10px 20px;
  align-items: center;
  `;

const AchievementRow = styled.div`
    display: grid;
    grid-gap: 5px;
    padding-left: 22px;
    box-shadow: 0 2px 2px rgba(0,0,0,.1);
    padding-bottom: 20px;
`;

const AchievementBody = styled.text`
    font-size = 1rem;
    column-row: 1;
`;


const Container = styled.div`
    padding: 50px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-shadow: 0 2px 2px rgba(0,0,0,.1);
`;

const Name = styled.text`
    padding:10px 0 0 0;
    font-size: 1.2rem;
    font-weight: bold;
`;

const Pronouns = styled.text`
    color: #a1a1a1;
    font-size: 1rem;
`;

const Qualifications = styled.text`
    padding: 0 0 10px;
`;

const Bio = styled.text`
    display: inline-block;
    box-sizing: border-box;
    width: 50%;
    border: 0px solid #fff;
    border-radius: 10px;
    background: #e4e4e4;
    padding: 10px;
    // padding: 0 500px;
    // background: #e4e4e4;
    h{
        font-weight: bold;
        font-size: 1.2rem;
    }
`;

const PassRow = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-top: 1px solid #555;
`;

const StyledButton = styled.button`
    display: inline-block;
    border: 0px;
    border-radius: 10px;
    margin-top: 8px;
    background: #475be8;
    padding: 15px 45px;
    color: white;
`;

function Profile(){
    //used for allowing a button to change the path
    let navigate = useNavigate();
    var email = sessionStorage.getItem('userEmail');
    const communityEmail = useLocation().state;
    window.history.replaceState({}, document.title);
    console.log(communityEmail);
    const routeChangePass = () => {
        let path= '/changePassword';
        navigate(path);
    }
    const routeChangeLogOut = () => {
        let path= '/';
        const auth = getAuth();
        signOut(auth).then(() => {
        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
        });
        navigate(path);
    }

    let communityUserRef = "";

    if(communityEmail != null){
        communityUserRef = doc(db, "users", communityEmail);
    }

    const userDocRef = doc(db, "users", email);
    // For fetching all user info
    const [userInfoList, setUserInfoList] = useState([]);

    useEffect(() => {
        const getUserInfoList = async (docRef) => {
            try {
                const data = await getDoc(docRef);
                const filteredData = data.data();
                setUserInfoList(filteredData);
            } catch (error) {
                console.error(error)
            }
        };
        if(communityEmail != null){
            getUserInfoList(communityUserRef);
        }else{
            getUserInfoList(userDocRef);
        }
    }, []);

    const UserData = [
    {
        email: email,
        name: userInfoList.name,
        bio: userInfoList.bio,
        pronouns: userInfoList.pronouns,
        qualifications: userInfoList.qualifications,
    }
    ];

    const [questionList, setQuestionList] = useState([]);
    const questionCollectionRef = collection(db, "questions")

    useEffect(() => {
        const getQuestionList = async () => {
            try {
                const data = await getDocs(questionCollectionRef);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setQuestionList(filteredData);
            } catch (error) {
                console.error(error)
            }
        };

        getQuestionList();
    }, []);

    let questions = [];

    const mapQuestions = questionList.map((dbQuestion) => {
        if(communityEmail != null){
            if(dbQuestion.name === communityEmail){
                let question = {questionID : dbQuestion.id,
                    questionTitle : dbQuestion.title,
                    questionText : dbQuestion.questionBody,
                    votes : dbQuestion.votes,
                    answerCount : dbQuestion.answerCount,
                    viewCount : dbQuestion.views,
                    timeAsked : "time",
                    firstName : dbQuestion.name,
                    tags : ['a', 'b', 'c', 'd'],
                    currEmail : email};
                questions.push(question)
            }
        }else{
            if(dbQuestion.name === email){
                let question = {questionID : dbQuestion.id,
                    questionTitle : dbQuestion.title,
                    questionText : dbQuestion.questionBody,
                    votes : dbQuestion.votes,
                    answerCount : dbQuestion.answerCount,
                    viewCount : dbQuestion.views,
                    timeAsked : "time",
                    firstName : dbQuestion.name,
                    tags : ['a', 'b', 'c', 'd'],
                    currEmail : email};
                questions.push(question)
            }
        }
    })

    let doThis = mapQuestions;

    //DUMMY DATA
    // let userEmail = "2332763@students.wits.ac.za";
    // let userFirstName = "Troy";
    // let question1 = {questionID : "bz9ix0uKMRmfKRtOf65z", 
    //                 questionTitle : "How do I calculate the arc-length of a function?",
    //                 questionText : "Self-explanatory title",
    //                 votes : 4 ,
    //                 answerCount : 3,
    //                 viewCount : 17,
    //                 timeAsked : "time",
    //                 firstName : userFirstName,
    //                 tags : ['a', 'b', 'c', 'd'],
    //                 currEmail : userEmail};
    // let question2 = {questionID : "cz9ix0uKMRmfKRtOf65z", 
    //                 questionTitle : "What is the pseudocode for quicksort?",
    //                 questionText : "Self-explanatory title",
    //                 votes : 3 ,
    //                 answerCount : 1,
    //                 viewCount : 9,
    //                 timeAsked : "time",
    //                 firstName : userFirstName,
    //                 tags : ['a', 'b', 'c', 'e'],
    //                 currEmail : userEmail};  
    // let question3 = {questionID : "dz9ix0uKMRmfKRtOf65z", 
    //                 questionTitle : "How do I do Gaussian Elimination?",
    //                 questionText : "Self-explanatory title",
    //                 votes : 19 ,
    //                 answerCount : 1,
    //                 viewCount : 28,
    //                 timeAsked : "time",
    //                 firstName : userFirstName,
    //                 tags : ['a', 'b', 'd', 'e'],
    //                 currEmail : userEmail}; 
    // let question4 = {questionID : "dz9ix0uKMRmfKRtOf65z", 
    //     questionTitle : "How do I do backpropogation in neural networks?",
    //     questionText : "Self-explanatory title",
    //     votes : 12 ,
    //     answerCount : 4,
    //     viewCount : 16,
    //     timeAsked : "time",
    //     firstName : userFirstName,
    //     tags : ['a', 'b', 'd', 'e'],
    //     currEmail : userEmail}; 
    // let question5 = {questionID : "dz9ix0uKMRmfKRtOf65z", 
    //     questionTitle : "What is the meaning of life?",
    //     questionText : "Self-explanatory title",
    //     votes : 2 ,
    //     answerCount : 0,
    //     viewCount : 50,
    //     timeAsked : "time",
    //     firstName : userFirstName,
    //     tags : ['a', 'b', 'k', 'e'],
    //     currEmail : userEmail}; 
    // const questions = [question1, question2, question3, question4, question5];
    const achievements = ["Keyboard Warrior", "Inquisitive Mind", "Sage"];

    //STATISTICS TO BE FETCHED FROM DATABASE USING QUERY
    let totalVotes = 0;
    let totalViews = 0;
    let numQuestions = questions.length;
    for (let i = 0; i < questions.length; i++)
    {
        totalVotes += questions[i].votes;
        totalViews += questions[i].viewCount;
    }



    //WHERE ACTUAL WORK IS DONE
    //add question rows
    const questionRows = [];
    for (let q = 0; q < questions.length; q++)
    {
        let userQuestionID = questions[q].questionID;
        let userQuestionTitle = questions[q].questionTitle;
        let userQuestionText = questions[q].questionText;
        let userVotes = questions[q].votes;
        let userAnswerCount = questions[q].answerCount;
        let userViewCount = questions[q].viewCount;
        let userTimeAsked = "time";
        let userTags = questions[q].tags;
        questionRows.push(
            <QuestionRow 
                questionID = {userQuestionID}
                questionTitle = {userQuestionTitle}
                questionText = {userQuestionText}
                votes = {userVotes} 
                answerCount = {userAnswerCount}
                viewCount = {userViewCount}
                timeAsked = "time"
                firstName = {email}
                tags = {userTags}
                currEmail= {email}
                forProfilePage = {true}
            />
        )
    }
    //add achievement rows
    const achievementsDisplay = [];
    for (let a = 0; a < achievements.length; a++)
    {
        achievementsDisplay.push(
            <AchievementBody>{achievements[a]}</AchievementBody>
        );
    }
    
    if (communityEmail != null){
        if (communityEmail == email){
            return(
                <main>
                    <Container>
                    <img style = {{ width : 90, height: 90 }}src = {Avatar} alt = "avatar" />
                    <Name>{userInfoList.name}</Name>
                    {/*console.log(email,userInfoList.name)*/}
                    <Pronouns>{userInfoList.pronouns}</Pronouns>
                    <Qualifications>{userInfoList.qualifications}</Qualifications>
                    <Bio>{userInfoList.bio}</Bio>
                    <StyledButton onClick={routeChangeLogOut}>Log Out</StyledButton>
                    </Container>
                    <HeaderRow>
                        <StyledHeader>Achievements&nbsp;of&nbsp;User</StyledHeader>
                    </HeaderRow>
                    <AchievementRow>
                        {achievementsDisplay}
                    </AchievementRow>
                    <HeaderRow>
                        <StyledHeader>Questions&nbsp;from&nbsp;User</StyledHeader>
                        <StatsRow>
                            <ProfileStat>{totalViews} <span>total views</span></ProfileStat>
                            <ProfileStat>{totalVotes} <span>total votes</span></ProfileStat>
                            <ProfileStat>{numQuestions} <span>things asked</span></ProfileStat>
                        </StatsRow>
                    </HeaderRow>
                    {questionRows}
                    <PassRow>
                        <StyledButton onClick={routeChangePass}>Change&nbsp;Password</StyledButton>
                    </PassRow>
                </main>
            )
        }else{
            return(
                <main>
                    <Container>
                    <img style = {{ width : 90, height: 90 }}src = {Avatar} alt = "avatar" />
                    <Name>{userInfoList.name}</Name>
                    {/*console.log(email,userInfoList.name)*/}
                    <Pronouns>{userInfoList.pronouns}</Pronouns>
                    <Qualifications>{userInfoList.qualifications}</Qualifications>
                    <Bio>{userInfoList.bio}</Bio>
                    </Container>
                    <HeaderRow>
                        <StyledHeader>Achievements&nbsp;of&nbsp;User</StyledHeader>
                    </HeaderRow>
                    <AchievementRow>
                        {achievementsDisplay}
                    </AchievementRow>
                    <HeaderRow>
                        <StyledHeader>Questions&nbsp;from&nbsp;User</StyledHeader>
                        <StatsRow>
                            <ProfileStat>{totalViews} <span>total views</span></ProfileStat>
                            <ProfileStat>{totalVotes} <span>total votes</span></ProfileStat>
                            <ProfileStat>{numQuestions} <span>things asked</span></ProfileStat>
                        </StatsRow>
                    </HeaderRow>
                    {questionRows}
                </main>
            )
        }
    }else{
        return(
            <main>
                <Container>
                <img style = {{ width : 90, height: 90 }}src = {Avatar} alt = "avatar" />
                <Name>{userInfoList.name}</Name>
                {/*console.log(email,userInfoList.name)*/}
                <Pronouns>{userInfoList.pronouns}</Pronouns>
                <Qualifications>{userInfoList.qualifications}</Qualifications>
                <Bio>{userInfoList.bio}</Bio>
                <StyledButton onClick={routeChangeLogOut}>Log Out</StyledButton>
                </Container>
                <HeaderRow>
                    <StyledHeader>Achievements&nbsp;of&nbsp;User</StyledHeader>
                </HeaderRow>
                <AchievementRow>
                    {achievementsDisplay}
                </AchievementRow>
                <HeaderRow>
                    <StyledHeader>Questions&nbsp;from&nbsp;User</StyledHeader>
                    <StatsRow>
                        <ProfileStat>{totalViews} <span>total views</span></ProfileStat>
                        <ProfileStat>{totalVotes} <span>total votes</span></ProfileStat>
                        <ProfileStat>{numQuestions} <span>things asked</span></ProfileStat>
                    </StatsRow>
                </HeaderRow>
                {questionRows}
                <PassRow>
                    <StyledButton onClick={routeChangePass}>Change&nbsp;Password</StyledButton>
                </PassRow>
            </main>
        )
    }
}

export default Profile;