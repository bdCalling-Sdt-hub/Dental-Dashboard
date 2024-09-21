/* eslint-disable no-unused-vars */
import { useState } from 'react'
import MetaTag from '../../components/MetaTag'
import BannerTableList from '../../components/BannerTableList'
import Heading from '../../components/Heading'
import { Button } from 'antd'
import { HiOutlinePlusSm } from 'react-icons/hi'
import BannerModal from '../../components/Modal/BannerModal'

const Banner = () => {
    const [open, setOpen] = useState(false);
    const [refresh, setRefresh] = useState("");
    const [value, setValue] = useState(null)
    if(refresh){
        setTimeout(()=>{
            setRefresh("")
        }, 1500)
    }
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 h-[86vh] overflow-auto">
            <MetaTag title={"Banner"} />


            <div className='flex items-center justify-between mb-6'>
                <Heading title={"Banner"} style={""} />
                <Button
                    onClick={()=>setOpen(true)} 
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
                    Create Banner
                </Button>
            </div>
            <BannerTableList setValue={setValue}  refresh={refresh} />

            <BannerModal value={value} setValue={setValue} setRefresh={setRefresh} setOpen={setOpen} open={open} />
            
        </div>
    )
}

export default Banner