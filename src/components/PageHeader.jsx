/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import Heading from './Heading'
import { Button, Input } from 'antd'
import { GoSearch } from 'react-icons/go'
import { IoClose } from 'react-icons/io5'
import { HiOutlinePlusSm } from 'react-icons/hi'

const PageHeader = ({title, buttonName, keyword, setKeyword, setOpen}) => {
    return (
        <div className='flex items-center justify-between mb-6'>
                <Heading title={`${title}`} style={""} />
                <div className='flex items-center gap-4'>
                    <Input
                        onChange={(e)=>setKeyword(e.target.value)}
                        prefix={<GoSearch color="#B6C0C8" size={16} />}
                        placeholder="Search..."
                        style={{
                            width: 353,
                            height: 40,
                            border: "1px solid #E7EBED",
                            outline: "none",
                            borderRadius: 8
                        }}
                        value={keyword}
                        suffix={<IoClose onClick={()=>setKeyword("")} className={`${keyword ? "block" : "hidden"} cursor-pointer`} color="#B6C0C8" size={16} />}
                        className="poppins-regular text-[#B6C0C8] text-[14px] leading-5"
                    />
                    <Button
                        onClick={() => setOpen(true)}
                        style={{
                            background: "#12354E",
                            width: "fit-content",
                            height: 40,
                            border: "none",
                            outline: "none",
                            color: "#FCFCFC",
                            borderRadius: 8,
                        }}
                        className='roboto-regular text-[14px] leading-[17px] flex items-center justify-center'
                        icon={<HiOutlinePlusSm color="#FCFCFC" size={20} />}
                    >
                        Add {buttonName}
                    </Button>
                </div>
            </div>
    )
}

export default PageHeader