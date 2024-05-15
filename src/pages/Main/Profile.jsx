/* eslint-disable no-unused-vars */
import { Button, Form, Input } from 'antd'
import React, { useState } from 'react';
import { CiEdit } from "react-icons/ci";
import MetaTag from '../../components/MetaTag';


const Profile = () => {
    const [imgURL, setImgURL] = useState();
    const [image, setImage] = useState();

    const [tab, setTab] = useState(new URLSearchParams(window.location.search).get('tab') || "profile");

    const handlePageChange = (tab) => {
        setTab(tab);
        const params = new URLSearchParams(window.location.search);
        params.set('tab', tab);
        window.history.pushState(null, "", `?${params.toString()}`);
    };

    const handleChange=(e)=>{
        const file= e.target.files[0];
        setImage(file)
        const imgUrl = URL.createObjectURL(file);
        setImgURL(imgUrl);
    }
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 h-[86vh] overflow-auto">
            <MetaTag title={"Profile"} />


            <div className='w-[841px] mx-auto'>

                <div className='bg-[#F9F9F9] flex items-center justify-center rounded-lg p-6'>
                    <input type="file" onChange={handleChange} id='img' style={{display : "none"}} />
                    <div className="w-[198px]">
                        <div className='relative w-fit mx-auto'>
                            <img 
                                style={{width: 120, height: 120, borderRadius: "100%", margin: "0 auto"}} 
                                src={`${imgURL ? imgURL : "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"}`}
                                alt="" 
                            />
                            <label 
                                htmlFor="img" 
                                className='
                                    absolute top-1/2 -right-2 
                                    bg-white 
                                    rounded-full 
                                    w-6 h-6 
                                    flex items-center justify-center 
                                    cursor-pointer
                                '
                            >
                                <CiEdit />
                            </label>
                        </div>

                        <p className='mt-4 text-center text-[#262727] text-[32px] leading-[48px] poppins-medium '>Asad Admin</p>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-6 my-5">
                    <p 
                        onClick={()=>handlePageChange("profile")}
                        className={`
                            ${tab === "profile" ? "border-[#E2BCC1] border-b-2" : "border-b-2 border-transparent" }
                            pb-2 cursor-pointer text-base leading-[18px] roboto-bold text-[#415D71]
                        `}
                    >
                        Edit Profile
                    </p>
                    <p 
                        onClick={()=>handlePageChange("change-password")} 
                        className={`
                            ${tab === "change-password" ? "border-[#E2BCC1] border-b-2" : "border-b-2 border-transparent" }
                            pb-2 cursor-pointer text-base leading-[18px] roboto-bold text-[#415D71]
                        `}
                    >
                        Change Password
                    </p>
                </div>


                {
                    tab === "profile"
                    ?
                    <div className='bg-[#F9F9F9] flex items-center justify-center rounded-lg p-6'>
                        <div className="w-[481px]">
                            <h1 className='text-center text-[#262727] leading-6 text-2xl font-medium'>Edit Profile</h1>

                            <Form
                                layout="vertical"
                            >
                                
                                    <Form.Item 
                                        name="fullName"
                                        label={<p className="text-[#415D71] text-sm leading-5 poppins-semibold">Full Name</p>}
                                    >
                                        <Input 
                                            style={{
                                                width: "100%",
                                                height: "42px",
                                                border: "1px solid #DCDDDE",
                                                borderRadius: "8px",
                                                padding : "16px",
                                                color: "black",
                                                outline: "none",

                                            }}
                                            type="text" 
                                            placeholder="Enter User Name"
                                        />
                                    </Form.Item>

                                
                                    <Form.Item 
                                        name="email"
                                        label={<p className="text-[#415D71] text-sm leading-5 poppins-semibold">Email</p>}
                                    >
                                        <Input 
                                            style={{
                                                width: "100%",
                                                height: "42px",
                                                border: "1px solid #DCDDDE",
                                                borderRadius: "8px",
                                                padding : "16px",
                                                color: "black",
                                                outline: "none",

                                            }}
                                            type="text" 
                                            placeholder="Enter Email"
                                        />
                                    </Form.Item>

                                    <Form.Item 
                                        name="mobileNumber"
                                        label={<p className="text-[#415D71] text-sm leading-5 poppins-semibold">Mobile Number</p>}
                                    >
                                        <Input 
                                            style={{
                                                width: "100%",
                                                height: "42px",
                                                border: "1px solid #DCDDDE",
                                                borderRadius: "8px",
                                                padding : "16px",
                                                color: "black",
                                                outline: "none",

                                            }}
                                            type="text" 
                                            placeholder="Enter Contact Number"
                                        />
                                    </Form.Item>

                                    <Form.Item 
                                        name="address"
                                        label={<p className="text-[#415D71] text-sm leading-5 poppins-semibold">Address</p>}
                                    >
                                        <Input 
                                            style={{
                                                width: "100%",
                                                height: "42px",
                                                border: "1px solid #DCDDDE",
                                                borderRadius: "8px",
                                                padding : "16px",
                                                color: "black",
                                                outline: "none",

                                            }}
                                            type="text" 
                                            placeholder="Enter Address"
                                        />
                                    </Form.Item>

                                <Form.Item 
                                    style={{marginBottom: 0, display: "flex", alignItems: "center", justifyContent: "center"}}
                                >
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        block
                                        style={{
                                            width : 158,
                                            height: 48,
                                            fontWeight: "400px",
                                            background: "#12354E",
                                            color: "#FCFCFC"
                                        }}
                                        className='roboto-medium  text-sm leading-4'
                                    >
                                        Save & Change
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                    :
                    <div className='bg-[#F9F9F9] flex items-center justify-center rounded-lg p-6'>
                        <div className="w-[481px]">
                            <h1 className='text-center text-[#262727] leading-6 text-2xl font-medium'>Change Password</h1>

                            <Form
                                layout='vertical'
                            >
                                    <Form.Item 
                                        name="current_password"
                                        label={<p className="text-[#415D71] text-sm leading-5 poppins-semibold">Current Password</p>}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please Enter Current Password!"
                                            }
                                        ]}
                                    >
                                        <Input.Password 
                                            style={{
                                                width: "100%",
                                                height: "42px",
                                                border: "1px solid #DCDDDE",
                                                borderRadius: "8px",
                                                color: "black",
                                                outline: "none",

                                            }}
                                            type="text" 
                                            placeholder="Enter Current Password"
                                        />
                                    </Form.Item>


                                    <Form.Item
                                        name="new_password"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please Enter New Password!"
                                            }
                                        ]}
                                        label={<p className="text-[#415D71] text-sm leading-5 poppins-semibold">New Password</p>}
                                    >
                                        <Input.Password 
                                            style={{
                                                width: "100%",
                                                height: "42px",
                                                border: "1px solid #DCDDDE",
                                                borderRadius: "8px",
                                                color: "black",
                                                outline: "none",

                                            }}
                                            type="text" 
                                            placeholder="Enter New Password"
                                        />
                                    </Form.Item>

                                    <Form.Item 
                                        label={<p className="text-[#415D71] text-sm leading-5 poppins-semibold">Confirm Password</p>}
                                        name="confirm_password"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please Enter Confirm Password!"
                                            }
                                        ]}
                                    >
                                        <Input.Password 
                                            style={{
                                                width: "100%",
                                                height: "42px",
                                                border: "1px solid #DCDDDE",
                                                borderRadius: "8px",
                                                color: "black",
                                                outline: "none",

                                            }}
                                            type="text" 
                                            placeholder="Enter Confirm Password"
                                        />
                                    </Form.Item>

                                <Form.Item 
                                    style={{marginBottom: 0, display: "flex", alignItems: "center", justifyContent: "center"}}
                                >
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        block
                                        style={{
                                            width : 158,
                                            height: 48,
                                            fontWeight: "400px",
                                            background: "#12354E",
                                            color: "#FCFCFC"
                                        }}
                                        className='roboto-medium  text-sm leading-4'
                                    >
                                        Save & Change
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                }
                
            </div>
        </div>
    )
}

export default Profile