// QuestionsPage.js
import styled from 'styled-components'
import CommunityRow from '../components/CommunityRow';
import StyledButton from '../components/styledButton';
import {commUser} from '../components/commUser';
import {Link, useNavigate, useLocation} from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import { db } from '../firebase-config/firebase';
import { getDocs, collection } from 'firebase/firestore';

const StyledHeader = styled.h1`
    font-size: 1.5rem;
    color: #000;
    font-weight:bold;
    padding: 10px 0;
`;

const HeaderRow = styled.div`
    display: grid;
    grid-template-columns: 1fr min-content;
    padding: 10px 20px;
`;

//dummy data to use to populate questions page. Stored as an array to ensure conciseness

// let questionIDs = [0, 1, 2, 3];
// let questionTitles = ["Conditional joining of dataframes", "How to find similarity between two vectors?","Spring stub returns incorrect response on GET endp with different number of parameters sent", "How to solve a homogeneuos linear differential equation"];
// let questionTexts = ["Howdy partner 1", "Howdy partner 2", "Howdy partner 3", "Howdy partner 4"];
// let voteCounts = [0, 1, 0, 7];
// let answerCounts = [0, 1, 0, 3];
// let viewCounts = [4, 5, 2, 27];
// let timesAsked = ["3 min ago", "1 hr ago", "17 min ago", "1 day ago"];
// let firstNames = ["Jordan", "Ndivhuwo", "Troy", "Ruben"];

function CommunityPage(){
    let navigate = useNavigate();
    const location = useLocation();
    const email = sessionStorage.getItem('userEmail');

    const [userList, setUserList] = useState([]);
    const userCollectionRef = collection(db, "users")

    useEffect(() => {
        const getUserList = async () => {
            try {
                const data = await getDocs(userCollectionRef);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setUserList(filteredData);
                //console.log(data);
            } catch (error) {
                console.error(error)
            }
        };

        getUserList();
        //console.log(userList);
    });
    

    // Using map from QuestionRow, altering it to fit the data of the users.
    const userComponents = [];
    let i = 0;
    {userList.map((dbUser) => (
        userComponents.push(
            <CommunityRow 
                commEmail = {dbUser.id}
                commName = {dbUser.name}
                commPronouns = {dbUser.pronouns}
            />
            
        )
    ))}
    

    //in future, we use firebase to populate each of these arrays
    
    const routeChangeToProfile = (clickedEmail) => {
        let path= '/profilePage';
        navigate(path, {state : clickedEmail});
    }

    return (
        <main>
            <HeaderRow>
                <StyledHeader> Community </StyledHeader>
                {
                    //<StyledButton onClick={routeChangeToAskQuestion}> Ask&nbsp;Question </StyledButton>
                }
            </HeaderRow>
            {userComponents}
        </main>
    );
}

export default CommunityPage;