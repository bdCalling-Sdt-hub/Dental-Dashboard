/* eslint-disable react/prop-types */
import { Input } from 'antd';
import { GoSearch } from 'react-icons/go';
import Person from "../../assets/person.png";
import { useDispatch, useSelector } from 'react-redux';
import { getPatientChat } from "../../redux/apiSlice/Chat/getPatientChatSlice"
import { useEffect } from 'react';
import { ImageConfig } from '../../redux/api/baseApi';


const Inbox = ({setPartnerId, setPartner}) => {
    const dispatch = useDispatch();
    const {patients} = useSelector(state=> state?.getPatientChat);

    useEffect(()=>{
        dispatch(getPatientChat());
    }, [dispatch])
    return (
        <div>
            <Input
                prefix={<GoSearch color="#B6C0C8" size={16} />}
                placeholder="Enter Search..."
                style={{
                    width: "100%",
                    height: 40,
                    border: "1px solid #E7EBED",
                    outline: "none",
                    borderRadius: 8
                }}
                className="poppins-regular text-[#B6C0C8] text-[14px] leading-5"
            />

                <div className='mt-[14px] grid grid-cols-1 gap-1'>
                    {
                        patients?.map((patient, index)=>{
                            return (
                                <div onClick={()=> (setPartnerId(patient?._id), setPartner(patient) )} key={index} className={`flex cursor-pointer items-center gap-[10px] ${(index + 1) % 2 !== 0 ? "bg-[#E7EBED]" : "bg-[#FDFDFD]"}  rounded-lg p-2`}>
                                    <img 
                                        src={  patient?.participants?.patient?.profile.startsWith("https") ? patient?.participants?.patient?.profile  :    `${ImageConfig}${patient?.participants?.patient?.profile}`} 
                                        style={{width: 56, height: 56, borderRadius: "100%", border: "2px solid #92A2AE"}} 
                                        alt=""
                                    />
                                    <div className='w-full'>
                                        <div className='flex items-center justify-between pb-[6px]'>
                                            <h1 className='text-[#12354E] poppins-medium  text-sm leading-5'>{patient?.participants?.patient?.name}</h1>
                                            <p className='text-[#8B8B8B] poppins-regular  text-sm leading-5'>3:00 PM</p>
                                        </div>
                                        <p className='text-[#8B8B8B] poppins-regular  text-sm leading-5'>{patient?.participants?.email}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
        </div>
    )
}

export default Inbox