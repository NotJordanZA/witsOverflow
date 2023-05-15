//houses all the different entries for the sidebar and the elements that makeup the entries
import  * as FaIcons from "react-icons/fa";
import  * as AiIcons from "react-icons/ai";
import  * as IoIcons from "react-icons/io";

export const NavbarData = [
    {
        title: "Home",
        path: "/",
        icon: <AiIcons.AiFillHome />,
        cName: "nav-text",
    },
    {
        title: "Questions",
        path: "/questionsPage",
        icon: <IoIcons.IoIosPaper />,
        cName: "nav-text",
    },
    {
        title: "Users",
        path: "/usersPage",
        icon: <IoIcons.IoMdPeople />,
        cName: "nav-text",
    },
    {
        title: "Rewards",
        path: "/rewardsPage",
        icon: <IoIcons.IoMdPeople />,
        cName: "nav-text",
    },
    {
        title: "Profile",
        path: "/profilePage",
        icon: <IoIcons.IoMdPeople />,
        cName: "nav-text",
    },
];

export default NavbarData;