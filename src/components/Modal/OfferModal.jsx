/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Form, Input, Modal } from 'antd'
import { useEffect, useState } from 'react'
import { RiImageAddLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { createOffer } from "../../redux/apiSlice/Offer/createOfferSlice";
import { updateOffer } from "../../redux/apiSlice/Offer/updateOfferSlice";
import Swal from 'sweetalert2';
import { ImageConfig } from '../../redux/api/baseApi';
import { CiCircleMinus } from 'react-icons/ci';
import { GoPlusCircle } from 'react-icons/go';
import { FaCircleCheck } from 'react-icons/fa6';


const AddOfferSliderModal = ({open, setOpen, setValue, setRefresh, value}) => {
    const dispatch = useDispatch();
    const {loading} = useSelector(state=> state.createBanner)
    const [image, setimage] = useState();
    const [imageURL, setImageURL] = useState();
    const [form] = Form.useForm();
    form.setFieldsValue()

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
            form.setFieldsValue(value)
            setImageURL(`${ImageConfig}${value?.offerImage}`)
        }
    } ,[form, value])


    const handleSubmit=(values)=>{
        const data = {
            offerTitle: values?.offerTitle,
            offerDetails: values?.offerDetails
        }

        const formData = new FormData();
        formData.append("data", JSON.stringify(data))
        formData.append("offerImage", image)

        if(value){
            dispatch(updateOffer({ id: value?._id,  data: formData})).then((response)=>{
                if(response.type === "updateOffer/fulfilled"){
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
            dispatch(createOffer(formData)).then((response)=>{
                if(response.type === "createOffer/fulfilled"){
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
            title={<p className='text-[#262727] poppins-medium text-[20px] pl-4 leading-[30px]'> {value ? "Edit Offer" : "Create Offer"}  </p>}
            centered
            open={open || value} 
            onCancel={handleClose} 
            footer={false}
            closeIcon={true}
            width={519}
        >
            <Form
                layout="vertical"
                onFinish={handleSubmit}
                className='p-4'
                form={form}
            >
                
                <Form.Item
                    name={"offerTitle"}
                    label={<p className="text-[#415D71] text-sm leading-5 poppins-semibold">Offer Name</p>}
                >
                    <Input
                        placeholder="Enter Offer Name"
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
                    label={<p className="text-[#415D71] text-sm leading-5 poppins-semibold">Offer Image</p>}
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
                            w-full
                            h-[180px]
                            cursor-pointer  
                            border border-[#929394]  border-dashed
                            flex 
                            flex-col items-center justify-center 
                            rounded-lg 
                        `}
                    >
                        <RiImageAddLine style={{fontWeight: value ? 700 : 400, color: value ? "white" : "#12354E" }} size={38} /> 
                        <h3 style={{fontWeight: value ? 700 : 400}} className={` ${value ? "text-white" : "text-[#12354E]" }  text-[14px] leading-5 poppins-light`}>Browse Photo</h3>
                        <h3 style={{fontWeight: value ? 700 : 400}} className={` ${value ? "text-white" : "text-[#12354E]" }  text-[14px] leading-5 poppins-light`}>Size: 540 x 860</h3>
                    </label>
                </Form.Item>
                
                <Form.Item
                    name={"offerDetails"}
                    label={<p className="text-[#415D71] text-sm leading-5 poppins-semibold">Offer Details</p>}
                >
                    <Form.List
                        name="offerDetails" 
                        initialValue={[""]}
                    >
                        {
                            (fields, { add, remove }) => (
                                <>
                                    {fields.map((field, index) => (
                                        <Form.Item
                                            required={false}
                                            key={index}
                                            className="w-full"
                                            style={{ marginBottom: 0 }}
                                        >
                                            <div className="flex items-center mb-2 gap-[30px] w-full">
                                                <Form.Item
                                                    {...field}
                                                    validateTrigger={['onChange', 'onBlur']}
                                                    style={{ marginBottom: 0 }}
                                                    className='w-full'
                                                >
                                                    <Input
                                                        style={{
                                                            width: "100%",
                                                            height: 40,
                                                            border: "1px solid #E7EBED",
                                                            background: "transparent",
                                                            borderRadius: "none",
                                                            outline: "none",
                                                            color: "#415D71",
                                                        }}
                                                        placeholder='Enter Offer Details'
                                                        className='roboto-regular text-sm leading-5'
                                                        prefix={<FaCircleCheck size={20} style={{ marginRight: 5 }} color='#12354E' />}
                                                    />
                                                </Form.Item>
                                                <div className='flex items-center gap-4'>
                                                    {fields.length > 1 && (
                                                        <CiCircleMinus
                                                            size={30}
                                                            className="dynamic-delete-button cursor-pointer text-[#D7263D]"
                                                            onClick={() => remove(field.name)}
                                                        />
                                                    )}
                                                    <GoPlusCircle
                                                        size={30}
                                                        color='#12354E'
                                                        className='cursor-pointer'
                                                        onClick={() => add()}
                                                    />
                                                </div>
                                            </div>
                                        </Form.Item>
                                    ))}
                                </>
                            )
                        }
                    </Form.List>
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

export default AddOfferSliderModal