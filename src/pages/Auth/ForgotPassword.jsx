import { Button, Form, Input } from 'antd';
import Heading from '../../components/Heading';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const handleSubmit=(values)=>{
        console.log("Received Values", values);
        navigate("/auth/verify-otp")
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
                        Send code
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ForgotPassword;