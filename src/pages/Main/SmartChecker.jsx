import MetaTag from '../../components/MetaTag'
import Heading from '../../components/Heading'
import { useState } from 'react';
import SmartCheckerTableList from '../../components/SmartCheckerTableList';
import { Button } from 'antd';
import { HiOutlinePlusSm } from 'react-icons/hi';
import SmartCheckerModal from '../../components/Modal/SmartCheckerModal';

const SmartChecker = () => {
    const [open, setOpen] = useState(false);
    const [refresh, setRefresh] = useState("");
    const [value, setValue] = useState(null)
    if(refresh){
        setTimeout(()=>{
            setRefresh("")
        }, 1500)
    }
    
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 h-[86vh] overflow-y-scroll">

            {/* helmet */}
            <MetaTag title={"Smart Checker"}/>

            <div className='flex items-center justify-between mb-6'>
                <Heading title={"Smart Checker"} style={""} />
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
                    Add Smart Checker
                </Button>
            </div>


            <SmartCheckerTableList setValue={setValue}  refresh={refresh}/>
            <SmartCheckerModal value={value} setValue={setValue} setRefresh={setRefresh} setOpen={setOpen} open={open} />

        </div>
    )
}

export default SmartChecker