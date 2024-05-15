/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa6';
import { FaTrash } from "react-icons/fa6";
import { FaRegQuestionCircle } from "react-icons/fa";
import { Button, Form, Input, message, Modal } from 'antd';
import Heading from '../../components/Heading';
import MetaTag from '../../components/MetaTag';
import { HiOutlinePlusSm } from 'react-icons/hi';
import Swal from 'sweetalert2';

const FAQ = () => {
    const [open, setOpen] = useState(false);
    const handleSubmit=async()=>{}

    const handleDelete=()=>{
        Swal.fire({
            title: "Are Your Sure ?",
            html: `Do you want to  delete your FAQ ?`,
            confirmButtonText: 'Confirm',
            customClass: {
              confirmButton: 'custom-send-button',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(result)
            }
        });
    }
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 h-[86vh] overflow-auto">
            <MetaTag title="FAQ" />

            <div className='mb-6 flex items-center justify-between gap-6'>
                <Heading title={"FAQ"}/>
                <Button
                        onClick={() => setOpen(true)}
                        style={{
                            background: "#12354E",
                            width: 134,
                            height: 40,
                            border: "none",
                            outline: "none",
                            color: "#FCFCFC",
                            borderRadius: 8,
                        }}
                        className='roboto-regular text-[14px] leading-[17px] flex items-center justify-center'
                        icon={<HiOutlinePlusSm color="#FCFCFC" size={20} />}
                >
                    Add Faq
                </Button>
            </div>

            <div>
                {
                    [...Array(3)].map((item, index)=>{
                        return(
                            <div key={index} className='mb-6 flex gap-6'>
                                <FaRegQuestionCircle size={28} color='#12354E' />
                                <div className='w-full'>
                                    {/* question  */}
                                    <div 
                                        className='p-4 rounded-lg text-[#707070] leading-6 text-[16px] font-medium mb-4'
                                        style={{boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'}}
                                    >
                                        <p className='text-[#575757] text-base leading-6 poppins-medium '>What is an affiliate e-commerce website?</p>
                                    </div>

                                    {/* answer */}
                                    <div 
                                        className='p-4 rounded-lg text-[#707070] text-base leading-6 poppins-regular  '
                                        style={{boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'}}
                                    >
                                        {"convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet, Donec tincidunt efficitur. in In ipsum Cras turpis viverra laoreet ullamcorper placerat diam sed leo. faucibus vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa urna at "}
                                    </div>
                                </div>
                                <div onClick={handleDelete} className='w-10 cursor-pointer h-10 border border-[#E6E5F1] rounded-lg flex items-center justify-center'>
                                    <FaTrash  size={20} color='#B6C0C8' />
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <Modal
                centered 
                title={<p className='text-[#262727] poppins-medium pl-4 text-[20px] leading-[30px]'>Create FAQ</p>}
                open={open} 
                onCancel={()=>setOpen(false)}
                footer={false}
            >
                <Form onFinish={handleSubmit} className='p-4'>
                    <label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 8, display: "block"}}>Question</label>
                    <Form.Item 
                        name="questions"
                        rules={[
                            {
                                required: true,
                                message: "Please enter Question!"
                            }
                        ]}
                    >
                        <Input 
                            style={{
                                width: "100%",
                                height: "42px",
                                border: "1px solid #DCDDDE",
                                borderRadius: "8px",
                                padding : "16px",
                                color: "black",
                                outline: "none"
                            }}
                            type="text" 
                            placeholder="Enter Asnwer"
                        />
                    </Form.Item>


                    <label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 8, display: "block"}}>Answer</label>
                    <Form.Item 
                        name="answer"
                        rules={[
                            {
                                required: true,
                                message: "Please enter Answer!"
                            }
                        ]}
                    >
                        <Input.TextArea
                            style={{
                                width: "100%",
                                height: 200,
                                border: "1px solid #DCDDDE",
                                borderRadius: "8px",
                                padding : "16px",
                                color: "black",
                                outline: "none",
                                resize:"none"
                            }}
                            type="text" 
                            placeholder="Enter Asnwer"
                        />
                    </Form.Item>

                    <Form.Item
                        style={{display: "flex", width: "100%", marginBottom: 0, alignItems: "center", justifyContent: "center"}}
                    >
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
                            className='roboto-medium-italic text-[14px] leading-[17px]'
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default FAQ;