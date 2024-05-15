/* eslint-disable no-unused-vars */
import Heading from '../../components/Heading';
import patient1 from "../../assets/patient_care.png"
import patient2 from "../../assets/dental.png"
import patient3 from "../../assets/skin.png"
import patient4 from "../../assets/medical.png"
import { Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import MetaTag from '../../components/MetaTag';
import { RiEdit2Line, RiImageAddLine } from 'react-icons/ri';
import { useState } from 'react';

const Article = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
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

    const [image, setimage] = useState();
    const [imageURL, setImageURL] = useState();


    const handleChange = (e)=>{
        const file = e.target.files[0];
        setimage(file);
        const url = URL.createObjectURL(file);
        setImageURL(url)
    }
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 h-[86vh] overflow-auto">
            <Heading title={"Article"} style={"text-left mb-6"} />
            <MetaTag title="Article" />

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {
                    artical?.map((item, index)=>{
                        return (
                            <div key={index} className='relative'>
                                <div onClick={()=>setOpen(true)} className='absolute top-2 right-2 cursor-pointer w-10 h-10 border border-[#E6E5F1] rounded-lg flex items-center justify-center'>
                                    <RiEdit2Line size={24} color="#B6C0C8" />
                                </div>
                                <div className='border shadow-lg rounded-lg p-6'>
                                    <img src={item?.image} style={{width: 63, height: 63, margin: "0 auto"}} alt="" />
                                    <p className='text-[#415D71] poppins-regular text-center text-sm leading-5 mt-10'>{item?.name}</p>
                                </div>
                                <Button
                                    onClick={()=>navigate(`/article-details/${item?.name}`)} 
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

            <Modal
                centered 
                title={"Edit Article Image"}
                open={open} 
                onOk={()=>setOpen(false)} 
                onCancel={()=>setOpen(false)}
                width={510}
                footer={false}
            >
                <div className='p-4'>
                    <label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 8, display: "block"}}>Thumbnail Image</label>
                    <div>
                        <input onChange={handleChange} type="file" id="img" style={{display: "none"}} />
                        <label 
                            htmlFor="img"
                            style={{
                                backgroundImage: `url(${imageURL})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center" 
                            }}
                            className={`
                                w-full 
                                h-[139px]
                                cursor-pointer  
                                border border-[#929394]  border-dashed
                                flex 
                                flex-col items-center justify-center 
                                rounded-lg 
                            `}
                        >
                            <RiImageAddLine color='#607888' size={38} /> 
                            <h3 className="text-[#12354E] text-[14px] mt-[4px] leading-5 poppins-light ">Browse Thumbnail Photo</h3>
                        </label>
                    </div>

                    <div
                        style={{display: "flex", marginTop: 40, alignItems: "center", justifyContent: "center"}}
                    >
                        <Button
                            onClick={()=>setOpen(false)}
                            style={{
                                background: "#12354E",
                                width: 134,
                                height: 48,
                                border: "none",
                                outline: "none",
                                color: "#FCFCFC",
                                borderRadius: 8,
                            }}
                            className='roboto-regular text-[14px] leading-[17px] flex items-center justify-center'
                        >
                            Save & Change
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Article;