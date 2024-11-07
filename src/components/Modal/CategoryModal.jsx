/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Form, Input, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createCategory } from "../../redux/apiSlice/Category/createCategorySlice"
import Swal from 'sweetalert2';
import { updateCategory } from '../../redux/apiSlice/Category/updateCategorySlice';

const CategoryModal = ({open, handleClose, value, setValue, setRefresh}) => {

    const dispatch = useDispatch();
    const {loading} = useSelector(state=> state.createCategory);
    const [form] = Form.useForm();
    form.setFieldsValue()

    const handleCloseModal=()=>{
        handleClose();
        form.resetFields();
        setValue(null)
    }

    useEffect(()=>{
        if(value){
            form.setFieldsValue(value)
        }
    }, [form, value])

    const handleSubmit=(values)=>{
        
        if(value){
            const data = {
                id: value?._id,
                data:values
            }
            dispatch(updateCategory(data)).then((response)=>{
                if(response?.type === "updateCategory/fulfilled"){
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: response?.payload,
                        showConfirmButton: false,
                        timer: 1500
                    }).then(()=>{
                        handleCloseModal()
                        setRefresh("done")
                        form.resetFields()
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
            });
        }else{
            dispatch(createCategory(values)).then((response)=>{
                if(response?.type === "createCategory/fulfilled"){
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: response?.payload,
                        showConfirmButton: false,
                        timer: 1500
                    }).then(()=>{
                        handleClose()
                        setRefresh("done")
                        form.resetFields()
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
            });
        }
    }

    return (
        <Modal
            title={<p className='text-[#262727] poppins-medium pl-4 text-[20px] leading-[30px]'>{value ? "Edit Plan" : "Add Plan"}</p>}
            centered
            open={open || value}  
            onCancel={handleCloseModal} 
            footer={false}
            closeIcon={true}
            width={519}
        >
            <div className='p-4'>
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    layout='vertical'
                >
                    <Form.Item
                        name={"categoryName"}
                        label={<label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 0, display: "block"}}>Plan Name</label>}
                        rules={[
                            {
                                required: true,
                                message: "Please Enter Category Name!"
                            }
                        ]}
                    >
                        <Input
                            placeholder="Plan"
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
                        { loading ? "Loading..." : "Confirm" }
                    </Button>
                </Form>
            </div>
        </Modal>
    )
}

export default CategoryModal