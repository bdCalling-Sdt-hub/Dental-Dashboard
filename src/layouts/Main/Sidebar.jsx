import { RxDashboard } from "react-icons/rx";
import { FaUserGroup } from "react-icons/fa6";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import Logo from "../../assets/logo.png";
import { RiUserAddFill } from "react-icons/ri";
import { IoChatbubbles } from "react-icons/io5";
import { MdCategory } from "react-icons/md";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { FiPlusSquare } from "react-icons/fi";
import { RiListSettingsFill } from "react-icons/ri";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from '../../provider/User';
import { BiSolidCategoryAlt } from "react-icons/bi";

const { SubMenu } = Menu;

const Sidebar = () => {
    const [active, setActive] = useState(false)
    const navigate = useNavigate();
    const {user, socket} = useContext(UserContext);

    const menuItems = [
        {
            id: 1,
            title: "Dashboard",
            icon: <RxDashboard size={24}  />,
            path: "/"
        },
        {
            id: 2,
            title: "Create Patient Profile",
            icon: <RiUserAddFill size={24} />,
            path: "/create-patient-profile"
        },
        {
            id: 3,
            title: "Patient List",
            icon: <FaUserGroup size={24} />,
            path: "/patient-list"
        },
        {
            id: 4,
            title: "Patients Chat",
            icon: <IoChatbubbles size={24} />,
            path: "/chat"
        },
        {
            id: 5,
            title: "Patient Plan",
            icon: <BiSolidCategoryAlt size={24}  />,
            path: "/category"
        },
        {
            id: 6,
            title: "Contact",
            icon: <IoIosHelpCircleOutline size={24} />,
            path: "/contact"
        },
        {
            id: 7,
            title: "Manage Perks",
            icon: <MdCategory size={24} />,
            path: "/package"
        },
        {
            id: 8,
            title: "Post Article",
            icon: <FiPlusSquare size={24} />,
            path: "/article"

        },
        {
            id: 9,
            title: "Settings",
            icon: < RiListSettingsFill size={24} />,
            path: "/settings",
            subMenu: [
                {
                    id: 1,
                    title: "Banner",
                    path: "/banner"
                },
                {
                    id: 2,
                    title: "Offer Slider",
                    path: "/offer-slider"
                },
                {
                    id: 3,
                    title: "FAQ",
                    path: "/faq"
                },
                {
                    id: 4,
                    title: "About Us",
                    path: "/about-us"
                },
                {
                    id: 5,
                    title: "Terms & Conditions",
                    path: "/terms-condition"
                },
                {
                    id: 6,
                    title: "Privacy Policy",
                    path: "/privacy-policy"
                },
                {
                    id: 7,
                    title: "Smart Check",
                    path: "/smart-checker"
                },

            ]
        },
        
        {
            id: 10,
            title: "Add Team",
            icon: <MdOutlineAdminPanelSettings size={24} />,
            path: "/make-admin"

        }
    ]

    

    const handleLogOut = ()=>{
        navigate("/auth/login")
        localStorage.removeItem("token")
    }

    console.log(active);
    
    const handleRefreshConnection = useCallback(() => {
        setActive(true)
    }, []);

    useEffect(() => {
        const event = `chat-list-update`;
        socket.on(event, handleRefreshConnection);
        return () => {
            socket.off(event, handleRefreshConnection);
        };
    }, [socket, handleRefreshConnection]);


    return (
        <div className=''>
            
            <div className='pt-5 pb-[50px]'>
                <Link to="/">
                    <img src={Logo} style={{width: 78, height: 82, margin: "0 auto"}} alt="" />
                </Link>
            </div>

            <Menu
                mode="inline"
                defaultSelectedKeys={["item-0"]}
            >
                {
                    menuItems.map((item, index) =>
                        item.subMenu 
                        ?
                        <SubMenu
                            key={`sub-${index}`}
                            icon={item.icon}
                            title={item.title}
                            style={{
                                color: "#575757",
                                fontSize: "16px",
                                marginBottom: "10px",
                            }}
                        >
                            {   
                                item.subMenu.map((subItem, subIndex) => (
                                <Menu.Item
                                    key={`sub-${index}-${subIndex}`}
                                    icon={subItem.icon}
                                    style={{
                                        color: "#415D71",
                                        fontSize: "16px",
                                        marginBottom: "10px",
                                    }}
                                >
                                    <Link to={`${subItem.path}`} className="poppins-regular text-[14px] leading-[21px]">
                                        {subItem.title}
                                    </Link>
                                </Menu.Item>
                                ))
                            }
                        </SubMenu>
                        : 
                        <Menu.Item
                            key={`item-${index}`}
                            icon={item.icon}
                            style={{
                                width: "100%",
                                color: "#415D71",
                                fontSize: "16px",
                                marginBottom: "10px",
                                display: user?.role === "admin" && item.path === "/make-admin"  ? "none" : "block"
                            }}
                        >
                            <Link 
                                to={item.path} 
                                className="poppins-regular text-[14px] leading-[21px] relative w-full"
                            >
                                <span>{item.title}</span>
                                {
                                    item.path === "/chat" && active ?
                                    <span className="w-2 h-2 rounded-full bg-green-500 absolute -right-12 -top-1"></span>
                                    :
                                    null
                                }
                            </Link>
                        </Menu.Item>
                    )
                }
            </Menu>

            <div 
                onClick={handleLogOut}
                className="flex text-[#415D71] items-center gap-3 cursor-pointer px-6 hover:bg-gray-200 py-2 mx-2 rounded-lg transition-all"
            >
                <CiLogout size={24} color="#415D71"  />
                Logout
            </div>


        </div>
    )
}

export default Sidebar