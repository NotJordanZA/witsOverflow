// import  SideNav, {Toggle, NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
// import styled from "styled-components";
// import usersIcon from "../users.svg"

// import "@trendmicro/react-sidenav/dist/react-sidenav.css"
// import { useNavigate } from "react-router-dom";

// const StyledSideNav = styled(SideNav)`
//     background-color: #ffffff;
// `;

// const StyledNavText = styled(NavText)`
//     color: #000000;
// `;

// function MySideNav() {
//     const navigate = useNavigate();
//     return(
//         <StyledSideNav
//         onSelect={(selected)=>{
//             console.log(selected);
//             navigate('/' +selected);
//         }}
//         >
//             <SideNav.Toggle />
//             <SideNav.Nav defaultSelected = "home">
//                 <NavItem eventKey = "questionsPage">
//                     <NavIcon style = {{padding : "5px"}}><i className='fa fa-fw fa-home' style = {{fontSize: "1.5rem" }}/></NavIcon>
//                     <NavText style = {{color: 'black'}}>Home</NavText>    
//                 </NavItem>
//                 <NavItem eventKey = "questions">
//                     <NavIcon style = {{padding : "5px"}}><i className='fa fa-fw fa-message' style = {{fontSize: "1.5rem" }}/></NavIcon>
//                     <NavText style = {{color: 'black'}}>Questions</NavText>    
//                 </NavItem>
//                 <NavItem eventKey = "users">
//                     <NavIcon style = {{padding : "7px"}}><img style = {{ width : 25, height: 25 }}src = {usersIcon} alt = "usersIcon" /></NavIcon>
//                     <NavText style = {{color: 'black'}}>Users</NavText>    
//                 </NavItem>
//                 <NavItem eventKey = "rewards">
//                     <NavIcon style = {{padding : "5px"}}><i className='fa fa-fw fa-star' style = {{fontSize: "1.5rem" }}/></NavIcon>
//                     <NavText style = {{color: 'black'}}>Rewards</NavText>    
//                 </NavItem>
//                 <NavItem eventKey = "profile">
//                     <NavIcon style = {{padding : "5px"}}><i className='fa fa-fw fa-avatar' style = {{fontSize: "1.5rem" }}/></NavIcon>
//                     <NavText style = {{color: 'black'}}>My Profile</NavText>    
//                 </NavItem>
//             </SideNav.Nav>
//         </StyledSideNav>
//         );
// }

// export default MySideNav;