/* eslint-disable no-unused-vars */
import { Button, Form, Input, Select } from 'antd'
import React, { useContext, useEffect, useState } from 'react';
import { CiEdit } from "react-icons/ci";
import MetaTag from '../../components/MetaTag';
import { UserContext } from '../../provider/User';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from "../../redux/apiSlice/Profile/updateProfileSlice";
import { changePassword } from "../../redux/apiSlice/Authentication/changePasswordSlice";
import { getProfile } from "../../redux/apiSlice/Profile/getProfileSlice";
import Swal from 'sweetalert2';
import { ImageConfig } from '../../redux/api/baseApi';
const {Option} = Select


const Profile = () => {
    const [imgURL, setImgURL] = useState();
    const [image, setImage] = useState();
    const [form] = Form.useForm();
    const {user} = useContext(UserContext)
    const dispatch = useDispatch()
    const {loading} = useSelector(state=> state.updateProfile);
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

    useEffect(()=>{
        if(user){
            const data = {
                name: user?.admin?.name,
                contactNo: user?.admin?.contactNo ? user?.admin?.contactNo : "No Data Found",
                gender: user?.admin?.gender ? user?.admin?.gender : "Choose Your Gender",
                email: user?.email
            }
            const src = user?.admin?.profile?.startsWith("https") ? user?.admin?.profile : `${ImageConfig}/${user?.admin?.profile}`
            setImgURL(src)
            form.setFieldsValue(data)
        }
    }, [form, user])

    const handleSubmit=(values)=>{
        const formData = new FormData();
        if(image){
            formData.append("profile", image);
        }
        Object.keys(values).forEach((key)=>{
            formData.append(key, values[key])
        })

        dispatch(updateProfile(formData)).then((response)=>{
            if (response?.type === "updateProfile/fulfilled") {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: response?.payload,
                    showConfirmButton: false,
                    timer: 1500
                }).then(()=>{
                    dispatch(getProfile())
                })
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: response?.payload,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
    }

    const [newPassError, setNewPassError] = useState("");
    const [conPassError, setConPassError] = useState("");

    const validatePasswordChange = (values) => {
        let errors = {};
    
        if (values?.currentPassword === values.newPassword) {
            errors.newPassError = "The New password is similar to the old Password";
            setNewPassError(errors.newPassError);
        } else {
            setNewPassError("");
        }
    
        if (values?.newPassword !== values.confirmPassword) {
            errors.conPassError = "New Password and Confirm Password Don't Match";
            setConPassError(errors.conPassError);
        } else {
            setConPassError("");
        }
    
        return errors;
    };

    const handleChangePassword = (values) => {
        let errors = validatePasswordChange(values);
    
        if (Object.keys(errors).length === 0) {
            dispatch(changePassword(values)).then((response) => {
                if (response?.type === "changePassword/fulfilled") {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Password Updated Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: response?.payload,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
        }
    };



    return (
        <div className="bg-white shadow-lg rounded-lg p-6 h-[86vh] overflow-auto">
            <MetaTag title={"Profile"} />


            <div className='w-[841px] mx-auto'>

                <div className='bg-[#F9F9F9] flex items-center justify-center rounded-lg p-6'>
                    <input type="file" onChange={handleChange} id='img' style={{display : "none"}} />
                    <div className="w-[250px]">
                        <div className='relative w-fit mx-auto' >
                            <img 
                                style={{width: 120, height: 120, borderRadius: "100%", margin: "0 auto"}} 
                                src={`${imgURL ? imgURL : "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"}`}
                                alt="" 
                            />
                            <label 
                                htmlFor="img" 
                                style={{display : tab === "profile" ? "flex" : "none"}}
                                className='
                                    absolute top-1/2 -right-2 
                                    bg-white 
                                    rounded-full 
                                    w-6 h-6 
                                     items-center justify-center 
                                    cursor-pointer
                                '
                            >
                                <CiEdit />
                            </label>
                        </div>

                        <p className='mt-4 text-center text-[#262727] text-[32px] leading-[48px] poppins-medium '>{user?.admin?.name}</p>
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
                                form={form}
                                onFinish={handleSubmit}
                            >
                                
                                    <Form.Item 
                                        name="name"
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
                                        name="contactNo"
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
                                        name="gender"
                                        label={<p className="text-[#415D71] text-sm leading-5 poppins-semibold">Gender</p>}
                                    >
                                        <Select
                                            style={{
                                                width: "100%",
                                                height: "42px",
                                                border: "1px solid #DCDDDE",
                                                borderRadius: "8px",
                                                color: "black",
                                                outline: "none"
                                            }}
                                        >
                                            <Option value="male">Male</Option>
                                            <Option value="female">Female</Option>
                                        </Select>
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
                                        {loading ? "Loading": "Save & Change"}  
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
                                // form={form}
                                onFinish={handleChangePassword}
                            >
                                    <Form.Item 
                                        name="currentPassword"
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
                                        name="newPassword"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please Enter New Password!"
                                            }
                                        ]}
                                        label={<p className="text-[#415D71] text-sm leading-5 poppins-semibold">New Password</p>}
                                        style={{ marginBottom: newPassError ? 0 : null }}
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
                                    { newPassError && <label style={{display: "block", color: "red"}} htmlFor="error">{newPassError}</label>}

                                    <Form.Item 
                                        label={<p className="text-[#415D71] text-sm leading-5 poppins-semibold">Confirm Password</p>}
                                        name="confirmPassword"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please Enter Confirm Password!"
                                            }
                                        ]}
                                        style={{ marginBottom: conPassError ? 0 : null }}
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
                                    { conPassError && <label style={{display: "block", color: "red"}} htmlFor="error">{conPassError}</label>}

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