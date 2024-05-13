import Heading from '../../components/Heading';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdatePassword = () => {
    const navigate = useNavigate();

    const handleSubmit=(values)=>{
        console.log("Received Values", values);
        Swal.fire({
            title: "Congratulations",
            html: "Your password has been successfully reset. click confirm to set a new password",
            confirmButtonText: 'Continue',
            customClass: {
              confirmButton: 'custom-send-button',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/auth")
            }
        });
    }

    return (
        <div>
            <Heading title={"Set New Password"} style="mb-6" />
            <p className='poppins-regular text-base leading-6 text-center' style={{width: "320px", color: "#929394",  margin: "0 auto 30px auto"}}>
                Create a new password. Ensure it differs from previous ones for security
            </p>

            <Form onFinish={handleSubmit}>
                <label className='block mb-[5px]'>New Password</label>
                <Form.Item
                    style={{marginBottom: 24}}
                    name={"new_password"}
                    rules={[
                        {
                            required: true,
                            message: "Please Enter New Password"
                        }
                    ]}
                >
                    <Input.Password 
                        placeholder='Enter Your New Password'
                        style={{
                            background: "transparent",
                            width: "100%",
                            height: 50,
                            border: "1px solid #E0E0E0",
                            outline: "none"
                        }}
                    />
                </Form.Item>

                <label className='block mb-[5px]'>Confirm Password</label>
                <Form.Item
                    style={{marginBottom: 24}}
                    name={"confirm_password"}
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Confirm Password"
                        }
                    ]}
                >
                    <Input.Password 
                        placeholder='Enter Your Confirm Password'
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
                        Update password
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default UpdatePassword