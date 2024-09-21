/* eslint-disable no-unused-vars */
import { Button, Form, Input } from 'antd';
import Heading from '../../components/Heading';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from "../../redux/apiSlice/Authentication/forgotPasswordSlice"
import Swal from 'sweetalert2';

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const {loading} = useSelector(state=> state?.forgotPassword)
    const navigate = useNavigate();
    
    const handleSubmit=(values)=>{
        dispatch(forgotPassword(values)).then((response)=>{
            console.log(response)
            if(response?.type === "forgotPassword/fulfilled"){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: response?.payload,
                    showConfirmButton: false,
                    timer: 1500
                }).then((response)=>{
                    navigate(`/auth/verify-otp/${values?.email}`)
                })
            }
        })
    }
    
    return (
        <div>
            <Heading title={"Forgot Password"} style="mb-6" />
            <Form onFinish={handleSubmit}>
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

                <Form.Item style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Button
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
                        { loading ? "Loading" : "Send code"}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ForgotPassword;