import React from 'react'
import Heading from '../../components/Heading';
import patient1 from "../../assets/patient_care.png"
import patient2 from "../../assets/dental.png"
import patient3 from "../../assets/skin.png"
import patient4 from "../../assets/medical.png"
import { Button } from 'antd';

const Artical = () => {
    const artical = [
        {
            name: "Patient care",
            image: patient1
        },
        {
            name: "Dental Condition",
            image: patient2
        },
        {
            name: "Skin Condition",
            image: patient3
        },
        {
            name: "Medical Condition",
            image: patient4
        },
    ]
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 h-[86vh] overflow-auto">
            <Heading title={"Artical"} style={"text-left mb-6"} />

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {
                    artical?.map((item, index)=>{
                        return (
                            <div key={index} >
                                <div className='border shadow-lg rounded-lg p-6'>
                                    <img src={item?.image} style={{width: 63, height: 63, margin: "0 auto"}} alt="" />
                                    <p className='text-[#415D71] poppins-regular text-center text-sm leading-5 mt-10'>{item?.name}</p>
                                </div>
                                <Button 
                                    style={{
                                        background: "#E5E5E5",
                                        width: "100%",
                                        height: 40,
                                        border: "none",
                                        outline: "none",
                                        color: "#12354E",
                                        borderRadius: 8,
                                        marginTop: 8
                                    }}
                                    className='roboto-regular text-[14px] leading-[17px]'
                                >
                                    Upload article
                                </Button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Artical