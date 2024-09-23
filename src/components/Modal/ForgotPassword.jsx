/* eslint-disable react/prop-types */
import { Button, Form, Input, Modal } from "antd"
import { useState } from "react";
import { FaRandom } from "react-icons/fa";
import Swal from 'sweetalert2';
import { resetPassword } from "../../redux/apiSlice/Authentication/resetPasswordSlice"
import { useDispatch, useSelector } from 'react-redux';
import Spinner from "../Spinner";


const ForgotPasswordModal = ({open, setOpen}) => {
    const [randomPin, setRandomPin] = useState(null)
    const [randomPassword, setRandomPassword] = useState(null);
    const [form] = Form.useForm();
    const dispatch =useDispatch();
    const {loading} = useSelector(state=> state?.resetPassword) 

    form.setFieldsValue()

    const handleGeneratedPin=()=>{
        const randomNumber = Math.floor(Math.random() * 900000) + 100000;
        setRandomPin(randomNumber)
        form.setFieldsValue({ pin: randomNumber.toString() });
    }
    const handleGeneratePassword=()=>{
        const randomNumber = Math.floor(Math.random() * 900000) + 100000;
        setRandomPassword(randomNumber)
        form.setFieldsValue({ password: randomNumber.toString() });
    }

    const handleSubmit =(values)=>{
        const data = {
            email: open?.email,
            ...values
        }
        dispatch(resetPassword(data)).then((response)=>{
            if(response?.type === "resetPassword/fulfilled"){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Pin And Password Reset Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                }).then(()=>{
                    setOpen(null)
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
        <>
            <Modal
                centered 
                title={<p className="pl-4 font-semibold text-xl mt-[8px]">Patient Forgot Pin And Password</p>}
                open={open} 
                onOk={()=>setOpen(null)} 
                onCancel={()=>setOpen(null)} 
                footer={false}
                width={519}
            >
                <Form 
                    form={form}
                    layout="vertical" 
                    className="grid grid-cols-12 gap-4 mt-5 px-4"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        style={{
                            marginBottom: 0,
                            width: "100%"
                        }}
                        rules={[
                            {
                                required: true,
                                message: "Please Generate Random Pin"
                            }
                        ]}
                        name={"pin"}
                        className="col-span-12"
                        label={<label className="text-[#415D71] text-sm block leading-5 poppins-semibold" >Random Pin number</label>}
                    >
                            <div className="w-full flex items-center  gap-6">
                                <Input
                                    placeholder="Enter Patient Random Pin"
                                    style={{
                                        width: "100%",
                                        height: 48,
                                        border: "1px solid #E7EBED",
                                        outline: "none",
                                        borderRadius: 8
                                    }}
                                    value={randomPin}
                                    className="poppins-regular text-[#6A6A6A] text-[14px] leading-5"
                                />
                                <Button
                                    onClick={handleGeneratedPin}
                                    style={{
                                        width: "65%",
                                        height: 48,
                                        border: "1px solid #E7EBED",
                                        outline: "none",
                                        borderRadius: 8,
                                        color: "#12354E",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "4px"
                                    }}
                                    className="roboto-medium text-sm leading-4"
                                >
                                    Random Pin
                                    <FaRandom size={18} color="#12354E" />
                                </Button>
                            </div>
                    </Form.Item>

                    <Form.Item
                        style={{
                            marginBottom: 0,
                            width: "100%"
                        }}
                        rules={[
                            {
                                required: true,
                                message: "Please Generate Random Password"
                            }
                        ]}
                        className="col-span-12"
                        name={"password"}
                        label={ <label className="text-[#415D71] block text-sm leading-5 poppins-semibold" htmlFor="">Random Password</label>}
                    >
                        <div className="w-full flex items-center  gap-6">
                            <Input
                                placeholder="Enter Patient Random Password"
                                style={{
                                    width: "100%",
                                    height: 48,
                                    border: "1px solid #E7EBED",
                                    outline: "none",
                                    borderRadius: 8
                                }}
                                value={randomPassword}
                                className="poppins-regular text-[#6A6A6A] text-[14px] leading-5"
                            />
                            <Button
                                onClick={handleGeneratePassword}
                                style={{
                                    width: "60%",
                                    height: 48,
                                    border: "1px solid #E7EBED",
                                    outline: "none",
                                    borderRadius: 8,
                                    color: "#12354E",
                                    }}
                                    className="roboto-medium text-sm leading-4 flex items-center justify-center gap-4"
                            >
                                Random Password
                                <FaRandom size={18} color="#12354E" />
                            </Button>
                        </div>
                    </Form.Item>
                    
                    <Form.Item className="col-span-12" style={{display: "flex", width: "100%", marginBottom: 0, alignItems: "center", justifyContent: "center"}}>
                        <Button
                            htmlType='submit'
                            style={{
                                background: "#12354E",
                                width: 163,
                                height: 48,
                                border: "1px solid #E0E0E0",
                                outline: "none",
                                margin: "0 auto",
                                color: "white",
                                borderRadius: 8
                            }}
                            className='roboto-medium-italic flex items-center justify-center text-[14px] leading-[17px]'
                        >
                            {
                                loading
                                ?
                                <Spinner/>
                                :
                                "Send  & Change"
                            }
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default ForgotPasswordModal;