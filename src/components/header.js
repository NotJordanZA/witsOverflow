//header class thats persistent accross all pages
import styled from "styled-components";
import logo from '../logo.png';
import users from '../users.png';
import avatar from '../avatar.svg';
import reports from '../reports.png';
import { Outlet } from "react-router-dom";


//container for header elements
const StyledHeader = styled.header`
  display:grid;
  grid-template-columns: 30px 200px 1fr 50px 50px 50px min-content;
  box-shadow: 0 2px 2px rgba(0,0,0,.1);
  `;

//link styling for the icon
const LogoLink = styled.a`
  color:#000000
  text-decoration: none;
  display: inline-block;
  line-height: 15px;
  padding: 10px 10px;
  svg{
    margin-top: 10px;
    display: inline-block;
    floatleft;
  }
  span{
    display:inline-block;
    padding: 0px 0px 0px 0px
  }
  b{
    font-weight: bold;
  }
  `;

  //link stylying for the title text
  const LogoLinkTitle = styled.a`
  text-decoration: none;
  display: inline-block;
  line-height: 15px;
  padding: 27px 12px;
  span{
    color:#000000;
    display:inline-block;
    padding: 0px 0px 0px 18px;
    font-size: 1.5rem;
  }
  b{
    font-weight: bold;
  }
  `;

  const EmptyPadding = styled.a`
  display: inline-block;
  `;

  //styling for the community link
  const UsersLink = styled.a`
  display: inline-block;
  padding: 20px 10px 0 10px;
  opacity: 0.8;
  `;

   //styling for the reports link
   const ReportsLink = styled.a`
   display: inline-block;
   padding: 10px 10px 0 10px;
   opacity: 0.9;
   `;

  //styling for the profile photo link
  const ProfileLinkAvi = styled.a`
  display: inline-block;
  padding: 17px 5px;
  `;

  //styling for the username link
  const ProfileLinkName = styled.a`
  text-decoration: none;
  display: inline-block;
  line-height: 15px;
  padding: 27px 10px 0px 0px;
  color:#000000;
  `;

//function handling the entire heading area and changing the header based on whether the user is logged
function Header(){
  const email = sessionStorage.getItem('userEmail');
  if (sessionStorage.getItem('userEmail') == null){//checks if on the login or registration page
    //renders the header with only the logo and website name
    return(
      <main>
        <StyledHeader>
          <LogoLink href="" className="logo">
              <img style = {{ width : 50, height: 50 }}src = {logo} alt = "logo" />
          </LogoLink>
          <LogoLinkTitle href="" className="title">
              <span><b>wits overflow</b></span>
          </LogoLinkTitle>
        </StyledHeader>
        <Outlet/>
      </main>
    );
  }else if(email.indexOf("student") === -1){
    return(
      <main>
        <StyledHeader>
          <LogoLink href="/questionsPage" className="logo">
              <img style = {{ width : 50, height: 50 }}src = {logo} alt = "logo" />
          </LogoLink>
          <LogoLinkTitle href="/questionsPage" className="title">
              <span><b>wits overflow</b></span>
          </LogoLinkTitle>
          <EmptyPadding> </EmptyPadding>
          <ReportsLink href="/reportsPage">
            <img style = {{ width : 50, height: 50 }}src = {reports} alt = "reports" />
          </ReportsLink>
          <UsersLink href="/communityPage" className="users">
              <img style = {{ width : 35, height: 28 }}src = {users} alt = "users" />
          </UsersLink>
          <ProfileLinkAvi href="/profilePage" className="profile">
            <img style = {{ width : 35, height: 35 }} src = {avatar} alt = "avatar"/>
          </ProfileLinkAvi>
          <ProfileLinkName href="/profilePage" className="profile">{email}</ProfileLinkName>
      </StyledHeader>
      <Outlet/>
      </main>
    );
  }else{
    //renders the header with the logo, name, community page icon, profile icon, and user email
    return(
      <main>
        <StyledHeader>
          <LogoLink href="/questionsPage" className="logo">
              <img style = {{ width : 50, height: 50 }}src = {logo} alt = "logo" />
          </LogoLink>
          <LogoLinkTitle href="/questionsPage" className="title">
              <span><b>wits overflow</b></span>
          </LogoLinkTitle>
          <EmptyPadding> </EmptyPadding>
          <EmptyPadding> </EmptyPadding>
          <UsersLink href="/communityPage" className="users">
              <img style = {{ width : 35, height: 28 }}src = {users} alt = "users" />
          </UsersLink>
          <ProfileLinkAvi href="/profilePage" className="profile">
            <img style = {{ width : 35, height: 35 }} src = {avatar} alt = "avatar"/>
          </ProfileLinkAvi>
          <ProfileLinkName href="/profilePage" className="profile">{email}</ProfileLinkName>
      </StyledHeader>
      <Outlet/>
      </main>
    );
  }
}

export default Header;