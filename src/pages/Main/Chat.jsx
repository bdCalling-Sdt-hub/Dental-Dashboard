import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import MetaTag from '../../components/MetaTag';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages } from '../../redux/apiSlice/Chat/getMessageSlice';
import { ImageConfig } from '../../redux/api/baseApi';
import moment from 'moment';
import { GoArrowUpRight, GoSearch } from 'react-icons/go';
import { UserContext } from '../../provider/User';
import { sendMessage } from '../../redux/apiSlice/Chat/sendMessageSlice';
import { CiImageOn } from "react-icons/ci";
import { getPatientChat } from '../../redux/apiSlice/Chat/getPatientChatSlice';
import { Input } from 'antd';
import EmojiPicker from 'emoji-picker-react';
import { MdOutlineEmojiEmotions } from 'react-icons/md';

const Chat = () => {
    const dispatch = useDispatch();
    const [partnerId, setPartnerId] = useState(new URLSearchParams(window.location.search).get('chatId'));
    const scrollRef = useRef();
    const [keyword, setKeyword] = useState("");
    const {socket} = useContext(UserContext);
    const [image, setImage] = useState(null)
    const [imageURL, setImageURL] = useState(null)
    const [partner, setPartner] = useState();
    const {messages} = useSelector(state=> state?.getMessages);
    const {patients} = useSelector(state=> state?.getPatientChat);
    const [emoji, setEmoji] = useState(false)
    const [messageList, setMessageList] = useState([]);


    useEffect(()=>{
        dispatch(getPatientChat());
    }, [dispatch])

    useEffect(()=>{
        setMessageList([...messages]);
    }, [messages])

    useEffect(()=>{
        if(partnerId){
            dispatch(getMessages(partnerId));
        }
    }, [dispatch, partnerId])

    const handleSubmit=()=>{
        const formData = new FormData();
        formData.append("text", keyword)
        formData.append("chatId", partnerId)
        if(image){
            formData.append("image", image)
        }
        
        dispatch(sendMessage(formData)).then((response)=>{
            if(response.type === "sendMessage/fulfilled"){
                setKeyword("")
                setImage(null)
                setImageURL(null)
                setEmoji(false)
            }
        })
    }

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messageList]);

    const handleConnection = useCallback((data) => {
        setMessageList([...messageList, data])
    }, [messageList]);
    
    useEffect(() => {
        const event = `message::${partnerId}`;
        socket.on(event, handleConnection);
        return () => {
            socket.off(event, handleConnection);
        };
    }, [partnerId, socket, handleConnection]);



    const handleChange = (e)=>{
        const file = e.target.files[0];
        setImage(file)
        const url = URL.createObjectURL(file);
        setImageURL(url)
    }

    const handlePartner=(patient)=>{
        setPartner(patient);
        setPartnerId(patient?._id);
        const params = new URLSearchParams(window.location.search);
        params.set('chatId', patient?._id);
        window.history.pushState(null, "", `?${params.toString()}`);
    }


    
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 h-[86vh] overflow-hidden">

            {/* helmet */}
            <MetaTag title={"Patient Message"}/>
            <h1 className={`text-[#12354E] text-base leading-8 poppins-semibold text-left mb-5 `}>Patient Message</h1>

            {/* message read and unread section */}

            

            {/* message container */}

            <div className='grid grid-cols-12 gap-6 mt-4 h-[76vh] '>

                <div className="col-span-3 w-full bg-[#FCFCFC]  rounded-lg p-4 overflow-y-scroll scroll-bar" style={{boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"}}>
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
                                        <div onClick={()=> handlePartner(patient)} key={index} className={`flex cursor-pointer items-center gap-[10px] ${patient?._id === partnerId ? "bg-[#E7EBED]" : "bg-[#FDFDFD]"}  rounded-lg p-2`}>
                                            <img 
                                                src={  patient?.participants?.patient?.profile.startsWith("https") ? patient?.participants?.patient?.profile  :    `${ImageConfig}${patient?.participants?.patient?.profile}`} 
                                                style={{width: 56, height: 56, borderRadius: "100%", border: "2px solid #92A2AE"}} 
                                                alt=""
                                            />
                                            <div className='w-full'>
                                                <div className='flex items-center justify-between pb-[6px]'>
                                                    <h1 className='text-[#12354E] poppins-medium  text-sm leading-5'>{patient?.participants?.patient?.name}</h1>
                                                    {/* <p className='text-[#8B8B8B] poppins-regular  text-sm leading-5'>3:00 PM</p> */}
                                                </div>
                                                <p className='text-[#8B8B8B] poppins-regular  text-sm leading-5'>{patient?.participants?.email}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

                
                <div className='col-span-9 relative h-[76vh]  bg-[#FCF8F9]' style={{boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"}}>
                    {partnerId ? (
                        <div className='flex flex-col h-full'>

                            {/* chat head */}
                            <div className='flex items-center gap-3 border-b-[1px] border-gray-200 p-2'>
                                <img 
                                    src={  partner?.participants?.patient?.profile?.startsWith("https") ? partner?.participants?.patient?.profile  :    `${ImageConfig}${partner?.participants?.patient?.profile}`} 
                                    style={{width: 56, height: 56, borderRadius: "100%", border: "2px solid #92A2AE"}} 
                                    alt=""
                                />
                                <div>
                                    <h1 className='text-[#12354E] poppins-medium  text-sm leading-5'>{partner?.participants?.patient?.name}</h1>
                                    <h1 className='text-[#12354E] poppins-medium  text-sm leading-5'>{partner?.participants?.email}</h1>
                                </div>
                            </div>

                            {/* message container */}
                            <div className='flex-1 overflow-y-auto px-3 pt-3' ref={scrollRef}>
                                {
                                    messageList?.map((message, index)=>{
                                        return (
                                            <div key={index} className={`flex mb-2  ${ message?.sender === "support"   ? "items-end justify-end" : "items-start justify-start" }`}>
                                                {
                                                    message?.messageType === "image"
                                                    &&
                                                    <div className='bg-[#E5E5E5] rounded-lg p-4'>
                                                        <img style={{width: 201, height: 155, borderRadius: 8}} src={`${ImageConfig}${message?.image}`} alt="" />
                                                        <p className='text-[#8B8B8B] poppins-regular mt-3 text-sm leading-4 text-right'>{moment(message?.createdAt).format("LT")}</p>
                                                    </div>
                                                }
                                                {
                                                    message?.messageType === "text"
                                                    &&
                                                    <div className={`border rounded-t-lg rounded-bl-lg p-4 w-[50%] ${ message?.sender === "support" ? "  bg-white" : "bg-[#E5E5E5]" } `}>
                                                        <p className='text-[#6A6A6A] poppins-regular  text-sm leading-5'>{message?.text}</p>
                                                        <p className='text-[#8B8B8B] poppins-regular  text-sm leading-4 text-right'>{moment(message?.createdAt).format("LT")}</p>
                                                    </div>
                                                }

                                                {
                                                    message?.messageType === "both" &&
                                                    <div  className={`border rounded-t-lg rounded-bl-lg p-4 w-[50%] ${ message?.sender === "support"  ? "  bg-white" : "bg-[#E5E5E5]" }  `}>
                                                        <img style={{width: 201, height: 155, borderRadius: 8}} src={`${ImageConfig}${message?.image}`} alt="" />
                                                        <p className='text-[#6A6A6A] poppins-regular text-right my-2 text-sm leading-5'>{message?.text}</p>
                                                        <p className='text-[#8B8B8B] poppins-regular  text-sm leading-4 text-right'>{moment(message?.createdAt).format("LT")}</p>
                                                    </div>
                                                }
                                            </div>
                                        )
                                    })
                                }
                                <div 
                                    style={{display: messageList?.length > 0 ? "none" : "flex"}} 
                                    className='items-end justify-end'
                                >
                                    <div className='border rounded-t-lg rounded-bl-lg p-4 w-[50%]'>
                                        <p className='text-[#6A6A6A] poppins-regular  text-sm leading-5'>Welcome To Smile Club</p>
                                        <p className='text-[#6A6A6A] poppins-regular  text-sm leading-5'>Need Help? Just send us a message, and we&apos;ll be right with you!</p>
                                    </div>
                                </div>
                            </div>

                            {/* input section */}
                            <div className='w-full p-3 relative'>
                                <div style={{display: imageURL ? "block" : "none"}} className='absolute left-3 bottom-[70px]  w-full'>
                                    <img style={{width: 200 ,height: 200, }} src={imageURL} alt="" />
                                </div>

                                <div style={{display: emoji ? "block" : "none"}} className='absolute right-3 bottom-[70px]  w-fit'>
                                    <EmojiPicker onEmojiClick={(event)=> setKeyword(prevInput => prevInput + event.emoji)} />
                                </div>
                                <div className='flex items-center gap-4 bg-white  rounded p-1' style={{boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"}}>
                                    <Input 
                                        onChange={(e)=> setKeyword(e.target.value)} 
                                        value={keyword} 
                                        style={{
                                            width: "100%",
                                            border: "none",
                                            outline: "none",
                                            boxShadow: "none"
                                        }}
                                        className='w-full resize-none bg-transparent font-normal h-10 px-3 outline-none text-black placeholder:text-black' 
                                        type="text"
                                        placeholder='Type Message'
                                    />
                                    <div className='flex items-center gap-4'>
                                        <MdOutlineEmojiEmotions onClick={()=>setEmoji(!emoji)} className='cursor-pointer' size={24} />
                                        <div>
                                            <input type="file" onChange={handleChange} id='img' style={{display: "none"}} />
                                            <label htmlFor="img">
                                                <CiImageOn color='#607888'  className='cursor-pointer' size={24} />
                                            </label>
                                        </div>
                                        <div onClick={handleSubmit} className='cursor-pointer bg-[#12354E] w-10 h-10 rounded-[4px] m-[2px] flex items-center justify-center'>
                                            <GoArrowUpRight color='white' size={24} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='flex items-center justify-center h-full'>
                            <h1 className='text-black font-normal text-[20px]'>Start Chats...</h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Chat; 