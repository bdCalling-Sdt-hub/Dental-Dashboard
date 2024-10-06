/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Form, Input, Modal } from 'antd';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import {createAdmin} from "../../redux/apiSlice/Admin/createAdminSlice"
const MakeAdminModal = ({open, setOpen, setRefresh}) => {
    const dispatch = useDispatch();
    const {loading} = useSelector(state=> state?.createAdmin);
    const [form] = Form.useForm();

    form.setFieldsValue();

    const handleMakeAdmin=(values)=>{
        dispatch(createAdmin(values)).then((response)=>{
            if(response.type === "createAdmin/fulfilled"){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: response?.payload,
                    showConfirmButton: false,
                    timer: 1500
                }).then(()=>{
                    setOpen(false);
                    setRefresh("done");
                    form.resetFields();
                })
            }else{
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: response?.payload,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
        

    }
    return (
        <>
            <Modal
                centered
                open={open}
                onOk={false}
                onCancel={() => ( form.resetFields() ,setOpen(false))}
                width={500}
                footer={false}
                title={<p className='text-[#262727] pl-4 poppins-medium text-[20px] leading-[30px]'>Add Team</p>}
            >
                <div className='p-4'>

                    <Form onFinish={handleMakeAdmin} form={form} layout='vertical'>

                        <Form.Item
                            name={"name"}
                            rules={[
                                {
                                    required: true,
                                    message: "Enter User Name"
                                }
                            ]}
                            label={<label className="text-[#6A6D7C] block text-base leading-6 poppins-regular" htmlFor="">Full Name</label>}
                        >
                            <Input
                                placeholder="Enter User Name"
                                style={{
                                    width: "100%",
                                    height: 48,
                                    border: "1px solid #E7EBED",
                                    outline: "none",
                                    borderRadius: 8
                                }}
                                className="poppins-regular text-[#6A6A6A] text-[14px] leading-5"
                            />
                        </Form.Item>


                        <Form.Item
                            name={"email"}
                            rules={[
                                {
                                    required: true,
                                    message: "Enter User Email"
                                }
                            ]}
                            label={<label className="text-[#6A6D7C] block text-base leading-6 poppins-regular" htmlFor="">Email</label>}
                        >
                            <Input
                                placeholder="Enter User Email"
                                style={{
                                    width: "100%",
                                    height: 48,
                                    border: "1px solid #E7EBED",
                                    outline: "none",
                                    borderRadius: 8
                                }}
                                className="poppins-regular text-[#6A6A6A] text-[14px] leading-5"
                            />
                        </Form.Item>


                        <Form.Item
                            name={"password"}
                            rules={[
                                {
                                    required: true,
                                    message: "Enter User Password"
                                }
                            ]}
                            label={<label className="text-[#6A6D7C] block text-base leading-6 poppins-regular" htmlFor="">Password</label>}
                        >
                            <Input.Password
                                placeholder="Enter User Password"
                                style={{
                                    width: "100%",
                                    height: 48,
                                    border: "1px solid #E7EBED",
                                    outline: "none",
                                    borderRadius: 8
                                }}
                                className="poppins-regular text-[#6A6A6A] text-[14px] leading-5"
                            />
                        </Form.Item>



                        <Form.Item
                            style={{display: "flex", marginBottom: 0, alignItems: "center", justifyContent: "center"}}
                        >
                            <Button
                                htmlType='submit'
                                style={{
                                    background: "#12354E",
                                    width: 134,
                                    height: 48,
                                    border: "none",
                                    outline: "none",
                                    color: "#FCFCFC",
                                    borderRadius: 8,
                                }}
                                className='roboto-regular text-[14px] leading-[17px] flex items-center justify-center'
                            >
                                {loading ? "Loading" : "Submit"}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    )
}

export default MakeAdminModal