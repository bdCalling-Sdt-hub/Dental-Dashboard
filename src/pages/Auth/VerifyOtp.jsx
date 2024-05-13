import Heading from '../../components/Heading';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
    const navigate = useNavigate();

    const onChange = (text) => {
        console.log('onChange:', text);
    };

    const sharedProps = {
        onChange,
    };

    const handleSubmit=(values)=>{
        console.log("Received Values", values);
        navigate("/auth/update-password")
    }

    return (
        <div>
            <Heading title={"Verify OTP"} />
            <p className='poppins-regular text-base leading-6' style={{width: "380px", color: "#929394",  margin: "0 auto 30px auto"}}>
                We sent a reset link to <span style={{color: "#545454"}}> contact@dscode...com </span>
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
                        length={5} 
                        {...sharedProps} 
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
            </Form>
        </div>
    )
}

export default VerifyOtp