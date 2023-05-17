// QuestionsPage.js
import styled from 'styled-components'
import CommunityRow from '../components/CommunityRow';
import {useNavigate, useLocation} from "react-router-dom";
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

function CommunityPage(){
    let navigate = useNavigate();

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
    }, []);
    

    // Using map from QuestionRow, altering it to fit the data of the users.
    const userComponents = [];
    {userList.map((dbUser) => (
        userComponents.push(
            <CommunityRow 
                userEmail = {dbUser.id}
                userName = {dbUser.name}
                userPronouns = {dbUser.pronouns}
            />
            
        )
    ))}

    return (
        <main>
            <HeaderRow>
                <StyledHeader> Community </StyledHeader>
            </HeaderRow>
            {userComponents}
        </main>
    );
}

export default CommunityPage;