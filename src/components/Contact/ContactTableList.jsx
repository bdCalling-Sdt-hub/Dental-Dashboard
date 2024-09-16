/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { RiEdit2Line } from 'react-icons/ri';
import ContactModal from '../Modal/ContactModal';
import { useDispatch, useSelector } from 'react-redux';
import {getContact} from "../../redux/apiSlice/Contact/getContactSlice"


const ContactTableList = () => {
    const dispatch = useDispatch();
    const { contact } = useSelector(state=> state?.getContact)
    const [refresh, setRefresh] = useState("");

    useEffect(()=>{
        dispatch(getContact());
    }, [dispatch, refresh])

    if(refresh){
        setTimeout(()=>{
            setRefresh("")
        }, 1500)
    }


    const [open, setOpen] = useState(null);
    
    return (
        <div>
            <table className="w-full table">
                <thead>
                    <tr className="text-left w-full bg-[#E7EBED] custom-table-list">
                        {
                            ["S.ID ", "Email", "Contact Number", "Actions"].map((item, index)=>{
                                return (
                                    <th 
                                        key={index} 
                                        className={`text-[#575757] poppins-medium text-[18px] leading-7`}
                                        style={{
                                            display: name !== "Patient care" && item === "Patient Category" ? "none" : "table-cell"
                                        }}
                                        colSpan={name !== "Patient care" && item === "Patient Category" ? 0 : 1}
                                    >
                                        {item}
                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>

                <tbody>
                    {
                        [...Array(1)].map((item, index)=>
                        <React.Fragment key={index}>
                            <tr className={`${(index + 1) % 2 === 0 ? 'bg-[#FCF8F9]' : 'bg-white'} w-full`}>
                                <td>#123{index}</td>

                                <td className="text-[#707070] h-[60px]  roboto-regular text-base ">{contact?.email}</td>
                                <td className="text-[#707070] h-[60px]  roboto-regular text-base ">{contact?.contact}</td>

                                <td>
                                    <div className="flex items-center h-[60px]">
                                        <div onClick={()=>setOpen(contact)} className="flex  cursor-pointer items-center border w-10 h-10 rounded-lg border-[#E6E5F1] justify-center">
                                            <RiEdit2Line size={18} color="#B6C0C8" />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </React.Fragment>
                        )
                    }
                </tbody>
            </table>


            <ContactModal setRefresh={setRefresh} open={open} setOpen={setOpen} />
        </div>
    )
}

export default ContactTableList