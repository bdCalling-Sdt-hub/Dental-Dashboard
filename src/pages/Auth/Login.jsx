import { Button, Checkbox, Form, Input } from 'antd';
import { useState } from 'react';
import Heading from "../../components/Heading";

const Login = () => {
    const [checked, setChecked] = useState(false);
    const handleSubmit=(values)=>{
        console.log("Received Values", values)
    }
    return (
        <div>
            <Heading title={"Login to Account"} />
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
                        <Checkbox onChange={(e)=>setChecked(e.target.checked)} className='poppins-regular text-base leading-6' style={{color: "#6A6D7C"}}>Remember me</Checkbox>
                    </Form.Item> 
                    <a
                        className="poppins-medium text-base leading-6"
                        style={{ color: "#F16365" }}
                        href="/auth/forgot-password"
                    >
                        Forgot password
                    </a>
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