/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Form, Input, Modal } from 'antd'
import { useEffect, useState } from 'react'
import { RiImageAddLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { createBanner } from "../../redux/apiSlice/Banner/createBannerSlice";
import { updateBanner } from "../../redux/apiSlice/Banner/updateBannerSlice";
import Swal from 'sweetalert2';
import { ImageConfig } from '../../redux/api/baseApi';

const BannerModal = ({open, setOpen, value, setValue, setRefresh}) => {
    const dispatch = useDispatch();
    const {loading} = useSelector(state=> state.createBanner)
    const [image, setImage] = useState();
    const [imageURL, setImageURL] = useState();
    const [form] = Form.useForm();
    form.setFieldsValue()

    const handleChange = (e)=>{
        const file = e.target.files[0];
        setImage(file);
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
            form.setFieldsValue({ name: value?.bannerTitle})
            setImageURL(`${ImageConfig}${value?.bannerImage}`)
        }
    } ,[form, value])


    const handleSubmit=(values)=>{

        const formData = new FormData();
        formData.append("data", JSON.stringify({ bannerTitle: values?.name}))
        formData.append("bannerImage", image)

        if(value){
            dispatch(updateBanner({ id: value?._id,  data: formData})).then((response)=>{
                if(response.type === "updateBanner/fulfilled"){
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: response?.payload,
                        showConfirmButton: false,
                        timer: 1500
                    }).then(()=>{
                        handleClose()
                        setRefresh("done")
                    })
                }
            })
        }else{
            dispatch(createBanner(formData)).then((response)=>{
                if(response.type === "createBanner/fulfilled"){
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: response?.payload,
                        showConfirmButton: false,
                        timer: 1500
                    }).then(()=>{
                        handleClose()
                        setRefresh("done")
                    })
                }
            })
        }
    }

    return (
        <Modal
            title={<p className='text-[#262727] poppins-medium text-[20px] pl-4 leading-[30px]'>Add Banner</p>}
            centered
            open={open || value} 
            onCancel={handleClose} 
            footer={false}
            closeIcon={true}
            width={900}
        >
            <Form
                layout="vertical"
                onFinish={handleSubmit}
                className='p-4'
                form={form}
            >
                

                <Form.Item
                    name={"name"}
                    label={<p className="text-[#415D71] text-sm leading-5 poppins-semibold">Name</p>}
                >
                    <Input
                        placeholder="Enter Name"
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
                    label={<p className="text-[#415D71] text-sm leading-5 poppins-semibold">Banner Image</p>}
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
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center" 
                        }}
                        className={`
                            w-[840px]
                            h-[300px]
                            cursor-pointer  
                            border border-[#929394]  border-dashed
                            flex 
                            flex-col items-center justify-center 
                            rounded-lg 
                        `}
                    >
                        <RiImageAddLine color='#607888' size={38} /> 
                        <h3 className="text-[#12354E] text-[14px] leading-5 poppins-light ">Browse Photo</h3>
                        <h3 className="text-[#12354E] text-[14px] leading-5 poppins-light ">Size: 840 x 300</h3>
                    </label>
                </Form.Item>

                <Form.Item style={{width: "100%", display: "flex", marginBottom: 0, alignItems: "center", justifyContent: "center"}}>
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

export default BannerModal