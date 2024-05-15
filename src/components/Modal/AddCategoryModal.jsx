/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Input, Modal } from 'antd'
import React, { useState } from 'react'

const AddCategoryModal = ({open, setOpen}) => {
    const [keyword, setKeyword] = useState("")

    return (
        <Modal
            title={<p className='text-[#262727] poppins-medium pl-4 text-[20px] leading-[30px]'>Add Category</p>}
            centered
            open={open} 
            onOk={()=>setOpen(false)} 
            onCancel={()=>setOpen(false)} 
            footer={false}
            closeIcon={true}
            width={519}
        >
            <div className='p-4'>
                <label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 8, display: "block"}}>Category Name</label>
                <Input
                    placeholder="Gum"
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
                    Confirm 
                </Button>
            </div>
        </Modal>
    )
}

export default AddCategoryModal