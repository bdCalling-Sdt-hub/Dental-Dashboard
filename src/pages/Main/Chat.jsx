import { useState } from 'react'
import MetaTag from '../../components/MetaTag';
import Person from "../../assets/person3.png";
import Inbox from '../../components/Chat/Inbox';
import Unread from '../../components/Chat/Unread';

const Chat = () => {
    const [tab, setTab] = useState(new URLSearchParams(window.location.search).get('tab') || "inbox");

    const handleTab=(value)=>{
        setTab(value)
        const params = new URLSearchParams(window.location.search);
        params.set('tag', value);
        window.history.pushState(null, "", `?${params.toString()}`);

    }
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 h-[86vh] overflow-hidden">

            {/* helmet */}
            <MetaTag title={"Patient Msssage"}/>
            <h1 className={`text-[#12354E] text-base leading-8 poppins-semibold text-left mb-5 `}>Patient Msssage</h1>

            {/* message read and unread section */}

            <div className='flex items-center gap-6'>
                <h1 
                    onClick={()=>handleTab("inbox")} 
                    className={`
                        text-[#12354E] w-fit  
                        cursor-pointer text-base leading-8 
                         
                        ${tab === "inbox" ? "poppins-semibold border-[#E2BCC1] " :  "poppins-regular border-transparent "}
                        border-b-[2px] 
                        pb-[4px] 
                    `}
                >
                    All Msssage
                </h1>
                <h1 
                    onClick={()=>handleTab("unread")} 
                    className={`
                        text-[#12354E] w-fit  
                        cursor-pointer text-base leading-8 
                         
                        ${tab === "unread" ? "poppins-semibold border-[#E2BCC1] " :  "poppins-regular border-transparent "}
                        border-b-[2px] 
                        pb-[4px] 
                    `}
                >
                    Unread
                </h1>
            </div>

            {/* message container */}

            <div className='grid grid-cols-12 gap-3 mt-4 h-[69vh] '>

                <div className="col-span-5 w-full bg-[#FCFCFC] shadow-lg rounded-lg p-4 overflow-y-scroll scroll-bar">
                    {
                        tab === "inbox"
                        ?
                        <Inbox/>
                        :
                        <Unread/>
                    }
                </div>

                <div className="col-span-7 border w-full h-full p-6 overflow-y-scroll scroll-bar relative">

                    <div className='grid grid-cols-1 gap-4'>
                        {
                            [...Array(15)].map((item, index)=>{
                                return (
                                    <div key={index} className={`flex ${ (index + 1) % 2 !== 0 ? "items-start justify-start" : "  items-end justify-end" }`}>
                                        {
                                            index === 0
                                            ?
                                            <div className='bg-[#E5E5E5] rounded-lg p-4'>
                                                <img style={{width: 201, height: 155, borderRadius: 8}} src={Person} alt="" />
                                                <p className='text-[#8B8B8B] poppins-regular mt-3 text-sm leading-4 text-right'>20-Apr-2024</p>
                                            </div>
                                            :
                                            <div className={`border rounded-t-lg rounded-bl-lg p-4 w-[50%] ${ (index + 1) % 2 !== 0 ? " bg-[#E5E5E5]" : " bg-white" }`}>
                                                <p className='text-[#6A6A6A] poppins-regular  text-sm leading-5'>Dont warry, the pain will pass soon</p>
                                                <p className='text-[#8B8B8B] poppins-regular  text-sm leading-4 text-right'>20-Apr-2024</p>
                                            </div>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                    
                    <div className='absolute w-full h-[48px] border  bottom-0 left-0 bg-white px-6'>
                        <div>
                            <input type="text" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat; 