/* eslint-disable no-unused-vars */
import { useState } from "react"
import MetaTag from "../../components/MetaTag"
import OfferTableList from "../../components/OfferTableList"
import OfferModal from "../../components/Modal/OfferModal"
import { HiOutlinePlusSm } from "react-icons/hi"
import { Button } from "antd"
import Heading from "../../components/Heading"


const Offer = () => {
    const [open, setOpen] = useState(false);
    const [refresh, setRefresh] = useState("");
    const [value, setValue] = useState(null);
    if(refresh){
        setTimeout(()=>{
            setRefresh("")
        }, 1500)
    }
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 h-[86vh] overflow-auto"> 
            <MetaTag title={"Offer Slider"} />

            <div className='flex items-center justify-between mb-6'>
                <Heading title={"Offer Slider"} style={""} />
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
                    Create Offer
                </Button>
            </div>


            <OfferTableList refresh={refresh} setValue={setValue} />

            <OfferModal open={open} setRefresh={setRefresh} value={value} setValue={setValue} setOpen={setOpen} />

        </div>
    )
}

export default Offer