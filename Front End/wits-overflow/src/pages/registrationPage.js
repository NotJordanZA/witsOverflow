import { useRef, useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import styled from "styled-components";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StyledButton from "../components/styledButton";
import logo from '../logo.png';
import {getAuth,createUserWithEmailAndPassword} from "firebase/auth";
// Check for one instance before @; Check for @; Check for "wits.ac.za" or "students.wits.ac.za".
//const USER_REGEX = /^[a-zA-Z0-9_.+-]{1,64}+@(students\.)?wits\.ac\.za$/; //Not functional yet.
const USER_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]+$/; //Temporary. Works with any email.
// Check for 1 lowercase, 1 uppercase, 1 number and 1 special character; Must be between 8 and 24 characters.
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

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
    padding: 15px 0 15px 10px;
    margin-bottom: 20px;
`;
const StyledHeader = styled.h1`
    padding: 20px;
    font-size: 1.5rem;
    font-weight: bold;
`;
const StyledForm = styled.form`
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const StyledLink = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #475be8;
`;


const Register = () => {
    
    const userRef = useRef();
    const errRef = useRef();

    const [user,setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd,setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd,setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg,setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // useEffect Hook: Used to set focus to username input.
    useEffect(() => {
        userRef.current.focus();
    }, [])

    // useEffect Hook: Validate username via USER_REGEX. Checks every time 'user' changes.
    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

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
    }, [user, pwd, matchPwd])

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        // In case user enables the submit button via JS hack:
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);

        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        } // End of precaution.
        console.log(user, pwd);
        await createUserWithEmailAndPassword(getAuth(),user,pwd);
        navigate("/questionsPage");
        setSuccess(true);
    }
    
    return (
        <Container>
            <p ref={errRef} style={errMsg ? {} : {display: "none"}} aria-live="assertive">{errMsg}</p>
            <img style = {{ width : 90, height: 90 }}src = {logo} alt = "logo" />
            <StyledHeader>Register</StyledHeader>
            <StyledForm onSubmit={handleSubmit}>
                <label htmlFor="username">
                    Email: 
                    <span style={validName ? {} : {display: "none"}}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span style={!validName || !user ? {} : {display: "none"}}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <StyledInput 
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                <p id="uidnote" style={userFocus && user && !validName ? {} : {display: "none"}}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Only wits emails allowed. <br />
                    Must begin with a letter or number. <br />
                    Letter, numbers, special characters and dots allowed.
                </p>

                <label htmlFor="password">
                    Password: 
                    <span style={validPwd ? {} : {display: "none"}}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span style={!validPwd || !pwd ? {} : {display: "none"}}>
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
                    Confirm Password: 
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

            <StyledButton disabled={!validName || !validPwd || !validMatch || getAuth().currentUser==null? true : false}>
                Sign Up
            </StyledButton>

            </StyledForm>

            <p>
                Already registered?<br />
                <span className="line">
                    {/*Put router link here to login*/}
                    <StyledLink href="/">Sign In</StyledLink>
                </span>
            </p>
        </Container>
        // Ruben, you need to fix the hiding of the icons and info text.
        // I don't know how you will do this, but use your future knowledge.
        // Try get better at googling or sumn idk.
    )
}

export default Register