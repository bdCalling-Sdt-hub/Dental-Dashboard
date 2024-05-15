/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Form, Input, Modal } from 'antd'
import { useState } from 'react'
import { RiImageAddLine } from 'react-icons/ri';

const EditBannerModal = ({open, setOpen}) => {
    
    const [image, setimage] = useState();
    const [imageURL, setImageURL] = useState();

    const handleChange = (e)=>{
        const file = e.target.files[0];
        setimage(file);
        const url = URL.createObjectURL(file);
        setImageURL(url)
    }

    const handleSubmit=(values)=>{
        console.log(values)
    }

    return (
        <Modal
            title={<p className='text-[#262727] poppins-medium text-[20px] pl-4 leading-[30px]'>Edit Banner</p>}
            centered
            open={open} 
            onOk={()=>setOpen(false)} 
            onCancel={()=>setOpen(false)} 
            footer={false}
            closeIcon={true}
            width={519}
        >
            <Form
                layout="vertical"
                onFinish={handleSubmit}
                className='p-4'
            >
                

                <Form.Item
                    name={"banner"}
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
                        Save & Change
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default EditBannerModal