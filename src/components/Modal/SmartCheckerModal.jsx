/* eslint-disable react/prop-types */
import { Button, Form, Input, Modal } from 'antd'
import { useEffect, useState } from 'react'
import { RiImageAddLine } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { createSmartChecker } from "../../redux/apiSlice/SmartChecker/createSmartCheckerSlice";
import { updateSmartChecker } from "../../redux/apiSlice/SmartChecker/updateSmartCheckerSlice";
import { useDispatch, useSelector } from 'react-redux';
import { ImageConfig } from '../../redux/api/baseApi';

const SmartCheckerModal = ({open, setOpen, setRefresh, value, setValue}) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const {loading} = useSelector(state=> state.createSmartChecker)
    form.setFieldsValue();

    const [image, setimage] = useState();
    const [imageURL, setImageURL] = useState(null);

    const handleChange = (e)=>{
        const file = e.target.files[0];
        setimage(file);
        const url = URL.createObjectURL(file);
        setImageURL(url)
    }

    const handleClose=()=>{
        setValue(null)
        form.resetFields()
        setImageURL(null)
        setOpen(false)
    }

    useEffect(()=>{
        if(value){
            const data = value?.smartCheckLink
            form.setFieldsValue({ api_link: data})
            setImageURL(`${ImageConfig}${value?.smartCheckImage}`)
        }
    } ,[form, value])



    const handleSubmit=(values)=>{

        const link = values?.api_link
        const formData = new FormData();
        formData.append("data", JSON.stringify({ smartCheckLink: link}))
        formData.append("smartCheckImage", image)
        if(value){
            dispatch(updateSmartChecker( {id: value?._id, data : formData})).then((response)=>{
                if(response.type === "updateSmartChecker/fulfilled"){
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: response?.payload,
                        showConfirmButton: false,
                        timer: 1500
                    }).then(()=>{
                        handleClose();
                        setRefresh("done")
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
        }else{
            dispatch(createSmartChecker(formData)).then((response)=>{
                if(response.type === "createSmartChecker/fulfilled"){
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: response?.payload,
                        showConfirmButton: false,
                        timer: 1500
                    }).then(()=>{
                        setRefresh("done")
                        setOpen(false)
                        form.resetFields()
                        setImageURL(null)
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
    }
    return (
        <Modal
            centered
            open={open || value}
            onOk={false}
            onCancel={handleClose}
            width={550}
            footer={false}
            title={<p className='text-[#262727] pl-4 poppins-medium text-[20px] leading-[30px]'>  {"Create Smart Cheker"}  </p>}
        >
            <Form
                className='px-4 mt-6'
                layout="vertical"
                onFinish={handleSubmit}
                form={form}
            >
                <Form.Item
                    name={"api_link"}
                    label={<p className="text-[#415D71] text-sm leading-5 poppins-semibold">API Link</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Enter API Link"
                        }
                    ]}
                >
                    <Input
                        placeholder="Enter API Link"
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
                    name={"image"}
                    label={<p className="text-[#415D71] text-sm leading-5 poppins-semibold">Image</p>}
                >
                    <Input
                        onChange={handleChange}
                        id='img'
                        type='file'
                        style={{
                            display: "none"
                        }}
                    />

                    <label 
                        htmlFor="img"
                        style={{
                            backgroundImage: `url(${imageURL})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center" 
                        }}
                        className={`
                            w-full
                            h-[139px]
                            cursor-pointer  
                            border border-[#929394]  border-dashed
                            flex 
                            flex-col items-center justify-center 
                            rounded-lg 
                        `}
                    >
                        <RiImageAddLine color='#607888' size={38} /> 
                        <h3 className="text-[#12354E] text-[14px] leading-5 poppins-light ">Browse Photo</h3>
                    </label>
                </Form.Item>

                <Form.Item style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Button
                        htmlType='submit'
                        style={{
                            background: "#12354E",
                            width: 171,
                            height: 48,
                            border: "1px solid #E0E0E0",
                            outline: "none",
                            margin: "0 auto",
                            color: "white",
                            borderRadius: 8
                        }}
                        className='roboto-medium-italic text-[14px] leading-[17px]'
                    >
                        {loading ? "Loading..." : "Save & Change"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default SmartCheckerModal