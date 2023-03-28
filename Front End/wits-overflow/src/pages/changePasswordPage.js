// ChangePassword.js
import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StyledButton from "../components/styledButton";
import logo from '../logo.png';

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
    // Handles the submitting of the form.
    const handleSubmit = async (e) => {
        e.preventDefault();
        // In case user enables the submit button via JS hack:
        const v1 = PWD_REGEX.test(pwd);
        if (!v1) {
            setErrMsg("Invalid Entry");
            return;
        } // End of precaution.
        console.log(pwd);
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
                    Old Password: 
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
                    <span className={validPwd || !matchPwd ? {} : {display: "none"}}>
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