import { useState } from 'react'
import MetaTag from '../../components/MetaTag'
import { Button, Form, Input, Modal } from 'antd'
import { FaCircleCheck } from "react-icons/fa6";
import Swal from 'sweetalert2';
import { CiCircleMinus } from 'react-icons/ci';
import { GoPlusCircle } from "react-icons/go";

const Package = () => {
    const [open, setOpen] = useState(false);
    const [keyword, setKeyword] = useState("")
    const [data, setData] = useState([
        "Complimentary Dental Examinations", 
        "Complimentary Hygienist Cleans", 
        "Complimentary Dental X-rays", 
        "Complimentary 3D in-mouth scans", 
        "Priority Appointments",
        "Discounted Routine Dental Treatments",
        "Free Private Prescriptions",
        "Free Referrals",
        "Fee Skin Consultations",
        "Cancer screening"
    ])

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
        <div className="bg-white shadow-lg rounded-lg p-6 h-[86vh] overflow-y-scroll">

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
                
                <div className='w-[407px] custom-input'>
                    <label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 8, display: "block"}}>Package Details</label>
                    
                    <Form.Item
                        name={"feature"}
                        style={{ border: "1px solid #E7EBED", borderRadius: 8, padding: " 16px 24px "}}
                    >
                        <Form.List name="feature">
                                    {
                                        (fields, { add, remove }) => (
                                            <>
                                                {
                                                    fields.map((field, index) => {
                                                        return(
                                                        <Form.Item
                                                            required={false}
                                                            key={index}
                                                            className="w-full"
                                                            style={{marginBottom : 0}}
                                                        >
                                                            <div  className='flex items-center mb-2 gap-[30px] w-full'>
                                                                <Form.Item
                                                                    name={field.name}
                                                                    fieldKey={field.fieldKey}
                                                                    validateTrigger={['onChange', 'onBlur']}
                                                                    style={{marginBottom : 0}}
                                                                    className='w-full'
                                                                >
                                                                    <Input
                                                                        style={{
                                                                            width:"100%",
                                                                            height: 40,
                                                                            border: "1px solid #E7EBED",
                                                                            background: "transparent",
                                                                            borderRadius: "none",
                                                                            outline: "none",
                                                                            color: "#415D71",
                                                                        }}
                                                                        placeholder='Enter Package Services'
                                                                        className='roboto-regular text-sm leading-5'
                                                                        prefix={<FaCircleCheck size={20} style={{marginRight: 5}} color='#12354E' />}
                                                                    />
                                                                </Form.Item>
                                                                <div>
                                                                    {
                                                                        fields.length > 0 ? (
                                                                            <CiCircleMinus
                                                                                size={30}
                                                                                className="dynamic-delete-button cursor-pointer text-[#D7263D]"
                                                                                onClick={() => remove(field.name)}
                                                                            />
                                                                        ) 
                                                                        : 
                                                                        null
                                                                    }
                                                                </div>
                                                            </div>
                                                        </Form.Item>
                                                    )})
                                                }

                                                <Form.Item 
                                                    style={{width: "100%", margin: 0, display: "flex", alignItems: "flex-end", justifyContent: "flex-end"}}
                                                >
                                                    <GoPlusCircle
                                                        size={30}
                                                        color='#12354E'
                                                        onClick={() => add()}
                                                    />
                                                </Form.Item>
                                            </>
                                        )
                                    }
                        </Form.List>
                    </Form.Item>
                </div>

                <Form.Item
                    style={{margin: 0}}
                >
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