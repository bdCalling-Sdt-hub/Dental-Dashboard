/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Button, Form, Input, Modal, Table } from 'antd';
import { GoSearch } from 'react-icons/go';
import Heading from '../../components/Heading';
import { IoClose } from 'react-icons/io5';
import { HiOutlinePlusSm } from 'react-icons/hi';
import MetaTag from '../../components/MetaTag';
import AdminTable from '../../components/Admin/AdminTable';
import MakeAdminModal from '../../components/Modal/MakeAdminModal';

const MakeAdmin = () => {
    const [open, setOpen] = useState(false);
    const [refresh, setRefresh] = useState("");
    if(refresh){
        setTimeout(()=>{
            setRefresh("")
        }, 1500)
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 h-[86vh] overflow-auto">

            <div className='flex items-center justify-between mb-6'>
                <Heading title={`Make Admin`} style={""} />
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
                    Add Admin
                </Button>
            </div>
            <MetaTag title={`Make Admin`} />

            <AdminTable refresh={refresh} />
            <MakeAdminModal open={open} setOpen={setOpen} setRefresh={setRefresh} />
        </div>
    )
}

export default MakeAdmin