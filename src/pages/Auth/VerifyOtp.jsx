import Heading from '../../components/Heading';
import { Button, Form, Input } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { verifyOtp } from "../../redux/apiSlice/Authentication/verifyOtpSlice"
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../redux/apiSlice/Authentication/forgotPasswordSlice';
import Swal from 'sweetalert2';

const VerifyOtp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { email } = useParams();

    

    const handleSubmit=(values)=>{
        const data = {
            email: email,
            otp: values?.otp
        }
        dispatch(verifyOtp(data)).then((response)=>{
            if(response?.type === "verifyOtp/fulfilled"){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "OTP Verified Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                    width: 550,
                }).then(()=>{
                    localStorage.setItem("rToken", response?.payload)
                    navigate(`/auth/update-password`)
                })
            }
        })
    }


    const handleResentEmail=()=>{
        dispatch(forgotPassword({email: email})).then((response)=>{
            if(response?.type === "forgotPassword/fulfilled"){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: response?.payload,
                    showConfirmButton: false,
                    timer: 1500,
                    width: 550,
                })
            }
        })
    }

    return (
        <div>
            <Heading title={"Verify OTP"}  style="mb-6 text-center" />
            <p className='poppins-regular text-base leading-6' style={{width: "360px", color: "#929394",  margin: "0 auto 30px auto"}}>
                We sent a reset link to <span style={{color: "#545454"}}> {email?.slice(0, 2)+ "..@gmail.com"} </span>
                enter 6 digit code that mentioned in the email
            </p>
            <Form onFinish={handleSubmit}>
                <Form.Item
                    style={{display: "flex", alignItems: "center", justifyContent: 'center'}}
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Valid OTP"
                        }
                    ]}
                    name={"otp"}
                >
                    <Input.OTP 
                        length={4} 
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
                        Verity Code
                    </Button>
                </Form.Item>

                <p onClick={handleResentEmail} className='poppins-regular text-[16px] leading-6 text-center'>You have not received the email?  <span className='text-[#7CC84E] cursor-pointer' >Resend</span> </p>
            </Form>
        </div>
    )
}

export default VerifyOtp