import Heading from '../../components/Heading';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { resetPassword } from "../../redux/apiSlice/Authentication/resetPasswordSlice"
import { useDispatch, useSelector } from 'react-redux';

const ResetPassword = () => {
    const navigate = useNavigate();
    const dispatch =useDispatch();
    const {loading} = useSelector(state=> state?.resetPassword) 

    const handleSubmit=(values)=>{
        console.log(values)
        dispatch(resetPassword(values)).then((response)=>{
            console.log(response)
            if(response?.type === "resetPassword/fulfilled"){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Password Reset Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                }).then(()=>{
                    localStorage.removeItem("rToken")
                    navigate(`/auth/login`)
                })
            }else{
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: response?.payload,
                    showConfirmButton: false,
                    timer: 1500,
                })
            }
        })
    }

    return (
        <div>
            <Heading title={"Set New Password"} style="mb-6 text-center" />
            <p className='poppins-regular text-base leading-6 text-center' style={{width: "320px", color: "#929394",  margin: "0 auto 30px auto"}}>
                Create a new password. Ensure it differs from previous ones for security
            </p>

            <Form onFinish={handleSubmit}>
                <label className='block mb-[5px]'>New Password</label>
                <Form.Item
                    style={{marginBottom: 24}}
                    name={"newPassword"}
                    rules={[
                        {
                            required: true,
                            message: "Please Enter New Password"
                        }
                    ]}
                    label={<p>New Password</p>}
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
                    name={"confirmPassword"}
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Confirm Password"
                        }
                    ]}
                    label={<p>Confirm Password</p>}
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
                        {loading ? "Loading..." : "Update password"}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ResetPassword