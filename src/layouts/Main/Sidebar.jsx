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
import { BsDatabaseFillGear } from "react-icons/bs";
import { FiPlusSquare } from "react-icons/fi";
import { RiListSettingsFill } from "react-icons/ri";

const { SubMenu } = Menu;

const Sidebar = () => {
    const navigate = useNavigate();

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
            title: "Patients Massage",
            icon: <IoChatbubbles size={24} />,
            path: "/user-list"
        },
        {
            id: 5,
            title: "Manage Package",
            icon: <MdCategory size={24} />,
            path: "/user-list"
        },
        {
            id: 6,
            title: "Data Setting",
            icon: < BsDatabaseFillGear size={24} />,
            path: "/settings",
            subMenu: [
                {
                    id: 1,
                    title: "Contact Setting",
                    path: "/hero-slider"
                },
                {
                    id: 2,
                    title: "Maintain Patient Category",
                    path: "/second-slider"
                },

            ]
        },
        {
            id: 7,
            title: "Post Article",
            icon: <FiPlusSquare size={24} />,
            path: "/make-admin"

        },
        {
            id: 8,
            title: "Interface Setting",
            icon: < RiListSettingsFill size={24} />,
            path: "/settings",
            subMenu: [
                {
                    id: 1,
                    title: "1st Slider",
                    path: "/hero-slider"
                },
                {
                    id: 2,
                    title: "Offer Slider",
                    path: "/second-slider"
                },
                {
                    id: 3,
                    title: "FAQ",
                    path: "/brands"
                },
                {
                    id: 4,
                    title: "About Us",
                    path: "/about-us"
                },
                {
                    id: 5,
                    title: "Terms & Condition",
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
                    path: "/privacy-policy"
                },

            ]
        },
        
        {
            id: 9,
            title: "Make Admin",
            icon: <MdOutlineAdminPanelSettings size={24} />,
            path: "/make-admin"

        }
    ]

    const handleLogOut = ()=>{
        navigate("/")
        window.location.reload();
    }
    return (
        <div className=''>
            <div className='pt-5 pb-[50px]'>
                <img src={Logo} style={{width: 78, height: 82, margin: "0 auto"}} alt="" />
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
                                color: "#415D71",
                                fontSize: "16px",
                                marginBottom: "10px"
                            }}
                        >
                            <Link to={item.path} className="poppins-regular text-[14px] leading-[21px]">{item.title}</Link>
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