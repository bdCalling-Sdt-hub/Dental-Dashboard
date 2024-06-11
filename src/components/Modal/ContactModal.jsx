/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Form, Input, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { updateContact } from "../../redux/apiSlice/Contact/updateContactSlice"
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'


const ContactModal = ({open, setOpen, setRefresh}) => {
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    

    useEffect(()=>{
        if(open){
            form.setFieldsValue(open)
        }
    }, [form, open])


    const handleSubmit=(values)=>{
        dispatch(updateContact({id: open?._id, data: values})).then((response)=>{
            if(response.type === "updateContact/fulfilled"){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: response?.payload,
                    showConfirmButton: false,
                    timer: 1500
                }).then(()=>{
                    setOpen(null)
                    setRefresh("done")
                })
            }
        })
    }

    


    return (
        <Modal
            title={<p className='text-[#262727] poppins-medium text-[20px] pl-4 leading-[30px]'>Edit Contact</p>}
            centered
            open={open} 
            onOk={()=>setOpen(null)} 
            onCancel={()=>setOpen(null)} 
            footer={false}
            closeIcon={true}
            width={519}
        >
            <Form
                layout='vertical'
                form={form}
                className='p-4'
                onFinish={handleSubmit}
            >
                <Form.Item
                    name={"email"}
                    label={<p className="text-[#415D71] text-sm leading-5 poppins-semibold">Email</p>}
                >
                    <Input
                        placeholder="Enter Email"
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
                    name={"contact"}
                    label={<p className="text-[#415D71] text-sm leading-5 poppins-semibold">Contact</p>}
                >
                    <Input
                        placeholder="Enter Contact"
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

                <Button
                    htmlType='submit'
                    style={{
                        background: "#12354E",
                        width: "100%",
                        height: 48,
                        border: "1px solid #E0E0E0",
                        outline: "none",
                        margin: "0 auto",
                        color: "white",
                        borderRadius: 8,
                        marginTop: 24
                    }}
                    className='roboto-medium-italic text-[14px] leading-[17px]'
                >
                    Save & Change
                </Button>
            </Form>
        </Modal>
    )
}

export default ContactModal