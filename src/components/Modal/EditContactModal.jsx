/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Input, Modal } from 'antd'
import React, { useState } from 'react'

const EditContactModal = ({open, setOpen}) => {
    const [keyword, setKeyword] = useState("")
    return (
        <Modal
            title={<p className='text-[#262727] poppins-medium text-[20px] pl-4 leading-[30px]'>Edit Contact</p>}
            centered
            open={open} 
            onOk={()=>setOpen(false)} 
            onCancel={()=>setOpen(false)} 
            footer={false}
            closeIcon={true}
            width={519}
        >
            <div className='p-4'>
                <label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 8, display: "block"}}>Contact Number</label>
                <Input
                    placeholder="+5645644651"
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
                    onClick={()=>setOpen(false)}
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
            </div>
        </Modal>
    )
}

export default EditContactModal