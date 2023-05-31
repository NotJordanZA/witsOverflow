// CommunityPage.js
import styled from 'styled-components'
import CommunityRow from '../components/CommunityRow';
import { useState } from 'react';
import { useEffect } from 'react';
import { db } from '../firebase-config/firebase';
import { getDocs, collection } from 'firebase/firestore';

//CSS Component: Header
const StyledHeader = styled.h1`
    font-size: 1.5rem;
    color: #000;
    font-weight:bold;
    padding: 10px 0;
`;

//CSS Component: Row for Header
const HeaderRow = styled.div`
    display: grid;
    grid-template-columns: 1fr min-content;
    padding: 10px 20px;
`;

function CommunityPage(){
    //Const for userList array
    const [userList, setUserList] = useState([]);
    //Const for reference to users collection
    const userCollectionRef = collection(db, "users")

    //Fetch the collection of users from the Firestore database
    useEffect(() => {
        const getUserList = async () => {
            try {
                {/* Get the docs for the users from the database */}
                const data = await getDocs(userCollectionRef);
                {/* Map the data of the users to a usable format */}
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                //Set the userList to the array of all mapped usable user data
                setUserList(filteredData);
            } catch (error) {
                console.error(error)
            }
        };
        //Call above function
        getUserList();
    }, []);
    

    //Const for userComponents, an array of CommunityRow objects
    const userComponents = [];
    //Map the elements of userList onto CommunityRow components and push them to an array
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
            {/* Render the Header */}
            <HeaderRow>
                <StyledHeader> Community </StyledHeader>
            </HeaderRow>
            {/* Render the array of CommunityRow components */}
            {userComponents}
        </main>
    );
}

export default CommunityPage;