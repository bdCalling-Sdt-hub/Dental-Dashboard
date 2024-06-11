/* eslint-disable no-unused-vars */
import { Button, Checkbox, Form, Input } from 'antd';
import { useState } from 'react';
import Heading from "../../components/Heading";
import { login } from "../../redux/apiSlice/Authentication/loginSlice"
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSubmit=(values)=>{
        dispatch(login(values)).then((res)=>{
            if(res?.type === "login/fulfilled"){
                localStorage.setItem("token", JSON.stringify(res?.payload))
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Logged In Successfully",
                    showConfirmButton: false,
                    timer: 1500
                }).then(()=>{
                    navigate("/")
                    window.location.reload();
                })
            }else{
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: res?.payload,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }
    return (
        <div>
            <Heading title={"Login to Account"} style="mb-6" />
            <p className='text-[#607888] text-sm leading-[21px] poppins-regular text-center'>Please enter your email and password to continue</p>

            <Form onFinish={handleSubmit} className='mt-6'>
                <label className='block mb-[5px]'>Email</label>
                <Form.Item
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Email"
                        }
                    ]}
                    name={"email"}
                >
                    <Input
                        placeholder='Enter Your Email'
                        style={{
                            background: "transparent",
                            width: "100%",
                            height: 50,
                            border: "1px solid #E0E0E0",
                            outline: "none"
                        }}
                    />
                </Form.Item>

                <label className='block mb-[5px]'>Password</label>
                <Form.Item
                    style={{marginBottom: 24}}
                    name={"password"}
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Password"
                        }
                    ]}
                >
                    <Input.Password 
                        placeholder='Enter Your Password'
                        style={{
                            background: "transparent",
                            width: "100%",
                            height: 50,
                            border: "1px solid #E0E0E0",
                            outline: "none"
                        }}
                    />
                </Form.Item>

                <div className="flex items-center justify-between mb-10">
                    <Form.Item name="remember" noStyle>
                        <Checkbox checked={checked} onChange={(e)=>setChecked(e.target.checked)} className='poppins-regular text-base leading-6' style={{color: "#6A6D7C"}}>Remember me</Checkbox>
                    </Form.Item> 
                    <p
                        className="poppins-medium text-base leading-6 cursor-pointer"
                        style={{ color: "#F16365" }}
                        onClick={()=>navigate("/auth/forgot-password")}
                    >
                        Forgot password
                    </p>
                </div>

                <Form.Item style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Button
                        disabled={!checked}
                        htmlType='submit'
                        style={{
                            background: "#12354E",
                            width: 171,
                            height: 50,
                            border: "1px solid #E0E0E0",
                            outline: "none",
                            margin: "0 auto",
                            color: "white",
                            borderRadius: 8
                        }}
                        className='roboto-medium-italic text-[14px] leading-[17px]'
                    >
                        Sign In
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login;