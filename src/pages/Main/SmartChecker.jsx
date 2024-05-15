import Swal from 'sweetalert2'
import MetaTag from '../../components/MetaTag'
import Heading from '../../components/Heading'
import { Button, Form, Input } from 'antd'
import { useState } from 'react'
import { RiImageAddLine } from 'react-icons/ri'

const SmartChecker = () => {
    const [image, setimage] = useState();
    const [imageURL, setImageURL] = useState();

    const handleChange = (e)=>{
        const file = e.target.files[0];
        setimage(file);
        const url = URL.createObjectURL(file);
        setImageURL(url)
    }



    const handleSubmit=(values)=>{
        console.log("Recieved Values", values, image)
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Updated Profile Successfully",
            showConfirmButton: false,
            timer: 1500
        })
    }
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 h-[86vh] overflow-y-scroll">

            {/* helmet */}
            <MetaTag title={"Smart Checker"}/>
            <Heading title={"Smart Checker"} style={"mb-6"}/>

            <Form
                layout="vertical"
                onFinish={handleSubmit}
                style={{width: 506}}
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

                <Form.Item>
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

        </div>
    )
}

export default SmartChecker