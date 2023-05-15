// ChangePassword.js
import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StyledButton from "../components/styledButton";
import logo from '../logo.png';
import { getAuth, updatePassword, EmailAuthProvider, reauthenticateWithCredential} from "firebase/auth";
import { firebaseConfig } from "../firebase-config/firebase";
import { useNavigate} from "react-router-dom";
import ReactDOM from 'react-dom';
//import {auth} from "firebase";

// Check for 1 lowercase, 1 uppercase, 1 number and 1 special character; Must be between 8 and 24 characters.
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const StyledForm = styled.form`
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Container = styled.div`
    padding: 150px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;
const StyledInput = styled.input`
    display: flex;
    background: #e4e4e4;
    border-radius: 10px;
    border: 0;
    width: 250px;
    box-sizing: border-box;
    padding 15px 0 15px 10px;
    margin-bottom: 20px;
`;

const StyledHeader = styled.h1`
    padding: 20px;
    font-size: 1.5rem;
    font-weight: bold;
`;

const ChangePassword = () => {

    //const pwdRef = useRef();
    const errRef = useRef();

    const [oldPwd,setOldPwd] = useState('');
    const [validOldPwd, setValidOldPwd] = useState(false);
    const [oldPwdFocus, setOldPwdFocus] = useState(false);

    const [pwd,setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd,setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg,setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // useEffect Hook: Used to set focus to password input.
    //useEffect(() => {
    //    pwdRef.current.focus();
    //}, [])

    // useEffect Hook: Validate password against PWD_REGEX. Checks every time 'pwd' or 'matchPwd' changes.
    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        // Compare the password to the matchPassword. IE: See if the password confirmation is correct.
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    // Clear error message every time user, pwd or matchPwd is changed (to account for the user fixing the error).
    useEffect(() => {
        setErrMsg('');
    }, [oldPwd, pwd, matchPwd])

    // Goes below the final useEffect().
    const auth = getAuth();
    const user = auth.currentUser;

    // Reauthenticate function. Checks the parameter currentPassword against the user's password on Firebase.
    const reauthenticate = currentPassword => {
        const cred = EmailAuthProvider.credential(
            user.email, currentPassword);
            console.log(user.email);
        return reauthenticateWithCredential(user, cred);
    }
    // HERE RUBEN!!!! HERE!!!!!!!!!
    // SCRAP THE LITTLE TICK AND CROSS ON CHARACTER UPDATE. CHECK ONLY LATER. BY THE TIME YOU FINISH TYPING, YOU'VE GOT 8 INVALID AUTH-
    // -ATTEMPTS. SO VALIDATION ISN'T POSSIBLE.
    // Tries the reauthenticate function, returning true if it is successful (correct password), and false otherwise.
    const booleanOld = async (oldPassword) => {
        try {
            //return false;
            // ERROR IS HERE. "THIS" IS UNDEFINED. NEED TO CHANGE REAUTHENTICATE FUNCTION.
            await reauthenticate(oldPassword);
            console.log('boolOld: True');
            return true;
        }
        catch (err){
            //return false;
            console.log(err);
            return false;
        }
        //return false;
    }

    // useEffect Hook: Validate password against booleanOld. Checks every time 'oldPwd' changes.
    useEffect(() => {
        //let result = booleanOld(oldPwd);
        //console.log(result);
        const result = PWD_REGEX.test(oldPwd);
        console.log(result);
        console.log(oldPwd);
        setValidOldPwd(result);
    }, [oldPwd])

    const navigate = useNavigate();
    // Handles the submitting of the form.
    const handleSubmit = async (e) => {

        e.preventDefault();
        // In case user enables the submit button via JS hack:
        const v1 = PWD_REGEX.test(pwd);
        const v2 = booleanOld(oldPwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        } // End of precaution.
        
        const changePassword = async (oldPassword, newPassword) => {
            const user = auth().currentUser
            try {
                // Calling the reauthenticate function, parsing in the oldPwd field (to check if the user authentication is valid).
                // ERROR IS HERE. "THIS" IS UNDEFINED. NEED TO CHANGE REAUTHENTICATE FUNCTION.
                await reauthenticate(oldPassword); 
                // Updating the password to be the pwd field, changing it on Firebase.
                await user.updatePassword(newPassword);
                console.log('Sucess')
                navigate("/profilePage");
            } catch(err){
                console.log(err);
                setErrMsg("Invalid Entry");
             }
        }
        setSuccess(true);
    }

    
    

    return (

        <Container>
            <p ref={errRef} style={errMsg ? {} : {display: "none"}} aria-live="assertive">{errMsg}</p>
            <p ref={errRef} style={errMsg ? {} : {display: "none"}} aria-live="assertive">{errMsg}</p>
            <img style = {{ width : 90, height: 90 }}src = {logo} alt = "logo" />
            <StyledHeader>Change Password</StyledHeader>
            
            <StyledForm onSubmit={handleSubmit}>
                <label htmlFor="old_pwd">
                    Current Password: 
                    <span style={validOldPwd ? {} : {display: "none"}}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span style={!validOldPwd ? {} : {display: "none"}}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <StyledInput 
                    type="password"
                    id="old_pwd"
                    onChange={(e) => setOldPwd(e.target.value)}
                    value={oldPwd}
                    required
                    aria-invalid={validOldPwd ? "false" : "true"}
                    aria-describedby="oldnote"
                    onFocus={() => setOldPwdFocus(true)}
                    onBlur={() => setOldPwdFocus(false)}
                />

                <label htmlFor="password">
                    New Password: 
                    <span style={validPwd ? {} : {display: "none"}}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span style={!validPwd ? {} : {display: "none"}}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <StyledInput 
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                <p id="pwdnote" style={pwdFocus && !validPwd ? {} : {display: "none"}}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters. <br />
                    Must include uppercase and lowercase letters, a number and a special character. <br />
                    Special characters allowed: 
                    <span aria-label="exclamation mark"> !</span>
                    <span aria-label="at symbol">@</span>
                    <span aria-label="hashtag">#</span>
                    <span aria-label="dollar sign">$</span>
                    <span aria-label="percent">%</span>
                </p>

                <label htmlFor="confirm_pwd">
                    Confirm New Password: 
                    <span style={validMatch && matchPwd ? {} : {display: "none"}}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span style={!validPwd || !matchPwd ? {} : {display: "none"}}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <StyledInput 
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                <p id="confirmnote" style={matchFocus && !validMatch ? {} : {display: "none"}}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input.
                </p>

            <StyledButton disabled={!validOldPwd || !validPwd || !validMatch ? true : false}>
                Change Password
            </StyledButton>
            </StyledForm>
        </Container>

    )

}

export default ChangePassword;