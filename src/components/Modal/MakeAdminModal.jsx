/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Form, Input, Modal } from 'antd';
import React from 'react'
import Swal from 'sweetalert2';

const MakeAdminModal = ({open, setOpen, setRefresh}) => {

    const handleMakeAdmin=async()=>{
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Created Make Admin Successfully",
            showConfirmButton: false,
            timer: 1500
        }).then(()=>{
            setOpen(false);
            setRefresh("done");
        })

    }
    return (
        <>
            <Modal
                centered
                open={open}
                onOk={false}
                onCancel={() => setOpen(false)}
                width={500}
                footer={false}
                title={<p className='text-[#262727] poppins-medium text-[20px] leading-[30px]'>Make Admin</p>}
            >
                <div className='p-4'>
                    {/* <h1 style={{marginBottom: "12px"}}>Make Admin</h1> */}
                    <Form onSubmit={handleMakeAdmin} initialValues={{userType: "ADMIN"}}>

                        <label className="text-[#6A6D7C] text-base leading-6 poppins-regular" htmlFor="" style={{marginBottom: 8, display: "block"}}>Full Name</label>
                        <Form.Item
                            name={"full_name"}
                            rules={[
                                {
                                    required: true,
                                    message: "Enter User Name"
                                }
                            ]}
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


                        <label className="text-[#6A6D7C] text-base leading-6 poppins-regular" htmlFor="" style={{marginBottom: 8, display: "block"}}>Email</label>
                        <Form.Item
                            name={"email"}
                            rules={[
                                {
                                    required: true,
                                    message: "Enter User Email"
                                }
                            ]}
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


                        <label className="text-[#6A6D7C] text-base leading-6 poppins-regular" htmlFor="" style={{marginBottom: 8, display: "block"}}>Password</label>
                        <Form.Item
                            name={"password"}
                            rules={[
                                {
                                    required: true,
                                    message: "Enter User Password"
                                }
                            ]}
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


                        <label className="text-[#6A6D7C] text-base leading-6 poppins-regular" htmlFor="" style={{marginBottom: 8, display: "block"}}>User Type</label>
                        <Form.Item
                            name={"userType"}
                            rules={[
                                {
                                    required: true,
                                    message: "Enter User Type"
                                }
                            ]}
                        >
                            <Input
                                placeholder="Enter User Type"
                                style={{
                                    width: "100%",
                                    height: 48,
                                    border: "1px solid #E7EBED",
                                    outline: "none",
                                    borderRadius: 8
                                }}
                                readOnly
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
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    )
}

export default MakeAdminModal