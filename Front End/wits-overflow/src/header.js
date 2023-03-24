import styled from "styled-components";
import logo from './logo.png';
import bell from './bell2.png';
import avatar from './avatar.svg';

const StyledHeader = styled.header`
  display:grid;
  grid-template-columns: 30px 200px 1fr 50px 50px 150px;
  box-shadow: 0 2px 2px rgba(0,0,0,.1);
  `;

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

  const BellLink = styled.a`
  display: inline-block;
  padding: 22px 15px;
  `;

  const ProfileLinkAvi = styled.a`
  display: inline-block;
  padding: 17px 0px;
  `;

  const ProfileLinkName = styled.a`
  text-decoration: none;
  display: inline-block;
  line-height: 15px;
  padding: 27px 0px;
  span{
    color:#000000;
    display:inline-block;
    padding: 0px 0px 0px 18px;
    font-size: 1rem;
  }
  b{
    font-weight: bold;
  }
  `;

function Header(){
    return(
        <StyledHeader>
        <LogoLink href="" className="logo">
            <img style = {{ width : 50, height: 50 }}src = {logo} alt = "logo" />
        </LogoLink>
        <LogoLinkTitle href="" className="title">
            <span><b>wits overflow</b></span>
        </LogoLinkTitle>
        <form action="" className="search">
          <SearchInput type="text" placeholder="Search..."/>
        </form>
        <BellLink href="" className="bell">
            <img style = {{ width : 25, height: 25 }}src = {bell} alt = "bell" />
        </BellLink>
        <ProfileLinkAvi
         href="" className="profile">
          <img style = {{ width : 35, height: 35 }} src = {avatar} alt = "avatar"/></ProfileLinkAvi>
        <ProfileLinkName
         href="" className="profile">Jordan Bareiss</ProfileLinkName> 
      </StyledHeader>
    );
}

export default Header;