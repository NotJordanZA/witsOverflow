//header class thats persistent accross all pages
import styled from "styled-components";
import logo from '../logo.png';
import users from '../users.png';
import avatar from '../avatar.svg';
import { Outlet } from "react-router-dom";


//container for header elements
const StyledHeader = styled.header`
  display:grid;
  grid-template-columns: 30px 200px 1fr 50px 50px 200px;
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

  //styling for the search bar
  const SearchInput = styled.input`
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  border: 0px solid #fff;
  border-radius: 100px;
  background: #e4e4e4;
  padding: 9px 15px;
  margin-top: 17px;
  `;

  //styling for the bell link
  const UsersLink = styled.a`
  display: inline-block;
  padding: 20px 10px 0 10px;
  opacity: 0.8;
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
  padding: 27px 0px;
  color:#000000;
  `;

//function handling the entire heading area and changing the header based on whether the user is logged
function Header(){
  const email = sessionStorage.getItem('userEmail');
  if (sessionStorage.getItem('userEmail') == null){//checks if on the login or registration page
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
  }
  return(
    <main>
      <StyledHeader>
        <LogoLink href="/questionsPage" className="logo">
            <img style = {{ width : 50, height: 50 }}src = {logo} alt = "logo" />
        </LogoLink>
        <LogoLinkTitle href="/questionsPage" className="title">
            <span><b>wits overflow</b></span>
        </LogoLinkTitle>
        <form action="" className="search">
          <SearchInput type="text" placeholder="Search..." className="searchBar" data-testid = "headerSearch"/>
        </form>
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

export default Header;