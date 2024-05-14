import { useState } from 'react'
import MetaTag from '../../components/MetaTag'
import { Button, Form, Input, Modal } from 'antd'
import { FaCircleCheck } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import Swal from 'sweetalert2';

const Package = () => {
    const [open, setOpen] = useState(false);
    const [keyword, setKeyword] = useState("")
    const [data, setData] = useState(["data", "data", "data", "data", "Data"])

    const handleSubmit=(values)=>{
        console.log("Recieved Values", values)
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Updated Profile Successfully",
            showConfirmButton: false,
            timer: 1500
        })
    }

    const initialValues = {
        name: "Membership Package",
        feature : data
    }
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 h-[86vh] overflow-hidden">

            {/* helmet */}
            <MetaTag title={"Manage Package"}/>
            <h1 className={`text-[#12354E] text-base leading-8 poppins-semibold text-left mb-5 `}>Manage Package</h1>

            <Form
                onFinish={handleSubmit}
                initialValues={initialValues}
            >
                <label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 8, display: "block"}}>Name</label>
                <Form.Item
                    name={"name"}
                >
                    <Input
                        placeholder="Enter Package Name"
                        style={{
                            width: 407,
                            height: 48,
                            border: "1px solid #E7EBED",
                            outline: "none",
                            borderRadius: 8
                        }}
                        className="poppins-regular text-[#6A6A6A] text-[14px] leading-5"
                    />
                </Form.Item>
                
                <div className='w-[407px]'>
                    <div className='flex items-center justify-between mb-2'>
                        <label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 8, display: "block"}}>Package Details</label>
                        <div onClick={()=>setOpen(true)} className='w-8 h-8 cursor-pointer bg-[#12354E] shadow-lg rounded-lg flex items-center justify-center'>
                            <FaPlus size={16} color='white' />
                        </div>
                    </div>
                    <Form.Item
                        name="feature"
                        style={{ border: "1px solid #E7EBED", borderRadius: 8, padding: " 11px 24px "}}
                    >
                        {
                            data?.map((item, index)=>{
                                return (
                                    <div key={index} className='flex items-center gap-2'>
                                        <FaCircleCheck size={20} color='#12354E' />
                                        <p className='text-[#415D71] roboto-regular text-sm leading-10'>{item}</p>
                                    </div>
                                )
                            })
                        }
                    </Form.Item>
                </div>

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
                        Confirm Package
                    </Button>
                </Form.Item>
            </Form>

            <Modal
                title="Add Feature"
                centered
                open={open} 
                onOk={()=>setOpen(false)} 
                onCancel={()=>setOpen(false)} 
                footer={false}
                closeIcon={false}
                width={519}
            >
                <Input
                    placeholder="Enter Package Feature"
                    style={{
                        width: "100%",
                        height: 48,
                        border: "1px solid #E7EBED",
                        outline: "none",
                        borderRadius: 8
                    }}
                    onChange={(e)=>setKeyword(e.target.value)}
                    className="poppins-regular text-[#6A6A6A] text-[14px] leading-5"
                />

                <Button
                    onClick={()=>( (setData([...data, keyword])), setOpen(false))}
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
                    Add
                </Button>
            </Modal>
            
        </div>
    )
}

export default Package