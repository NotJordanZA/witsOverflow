//profile page
import styled from "styled-components";
import Avatar from "../avatar.svg"
import {useNavigate, useLocation} from "react-router-dom";
//import UserData from "../context/userData";
import { getAuth, signOut } from "firebase/auth";
import React, { useState } from "react";
import { getDoc , doc} from "firebase/firestore";
import { db } from '../firebase-config/firebase';

const Container = styled.div`
    padding: 50px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
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
    padding: 10px 20px;
    position: absolute;
    align-items: center;
    justify-content: center;
    bottom: 10px;
    right: 0;
    left:0;
`;

const StyledButton = styled.button`
    display: inline-block;
    border: 0px;
    border-radius: 10px;
    background: #475be8;
    padding: 15px 45px;
    color: white;
`;

function Profile(){
    //used for allowing a button to change the path
    let navigate = useNavigate();
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
    const location = useLocation();
    const email = location.state;
    const userDocRef = doc(db, "users", email);
    // For fetching all user info
    const [userInfoList, setUserInfoList] = useState([]);
    const getUserInfoList = async () => {
        try {
            const data = await getDoc(userDocRef);
            const filteredData = data.data();
            setUserInfoList(filteredData);
            console.log(userInfoList);
        } catch (error) {
            console.error(error)
        }
    };

    getUserInfoList();
    const UserData = [
    {
        email: email,
        name: userInfoList.name,
        bio: userInfoList.bio,
        pronouns: userInfoList.pronouns,
        qualifications: userInfoList.qualifications,
    }
    ];
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
            <PassRow>
                    <h1> </h1>
                    <StyledButton onClick={routeChangePass}>Change&nbsp;Password</StyledButton>
            </PassRow>
        </main>
    )
}

export default Profile;