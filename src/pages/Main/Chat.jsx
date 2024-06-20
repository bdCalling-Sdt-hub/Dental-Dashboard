import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import MetaTag from '../../components/MetaTag';
import Person from "../../assets/person3.png";
import Inbox from '../../components/Chat/Inbox';
import Unread from '../../components/Chat/Unread';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages } from '../../redux/apiSlice/Chat/getMessageSlice';
import { ImageConfig } from '../../redux/api/baseApi';
import moment from 'moment';
import { GoArrowUpRight } from 'react-icons/go';
import { UserContext } from '../../provider/User';
import { sendMessage } from '../../redux/apiSlice/Chat/sendMessageSlice';
import { CiImageOn } from "react-icons/ci";

const Chat = () => {
    const [tab, setTab] = useState(new URLSearchParams(window.location.search).get('tab') || "inbox");
    const [partnerId, setPartnerId] = useState("");
    const scrollRef = useRef();
    const [keyword, setKeyword] = useState("");
    const {socket, user} = useContext(UserContext);
    const [image, setImage] = useState(null)
    const [imageURL, setImageURL] = useState(null)
    const [messageList, setMessageList] = useState([])
    const [partner, setPartner] = useState();

    const handleTab=(value)=>{
        setTab(value)
        const params = new URLSearchParams(window.location.search);
        params.set('tag', value);
        window.history.pushState(null, "", `?${params.toString()}`);
    }

    const dispatch = useDispatch();
    const {messages} = useSelector(state=> state?.getMessages);

    useEffect(()=>{
        if(messages?.length > 0){
            setMessageList([...messages]);
        }
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


    
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 h-[86vh] overflow-hidden">

            {/* helmet */}
            <MetaTag title={"Patient Message"}/>
            <h1 className={`text-[#12354E] text-base leading-8 poppins-semibold text-left mb-5 `}>Patient Message</h1>

            {/* message read and unread section */}

            

            {/* message container */}

            <div className='grid grid-cols-12 gap-6 mt-4 h-[76vh] '>

                <div className="col-span-3 w-full bg-[#FCFCFC]  rounded-lg p-4 overflow-y-scroll scroll-bar" style={{boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"}}>
                    
                    <Inbox setPartner={setPartner} setPartnerId={setPartnerId} />
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
                                            <div key={index} className={`flex mb-2  ${ message?.sender === user?.role ? "items-end justify-end" : "items-start justify-start" }`}>
                                                {
                                                    message?.messageType === "image"
                                                    &&
                                                    <div className='bg-[#E5E5E5] rounded-lg p-4'>
                                                        <img style={{width: 201, height: 155, borderRadius: 8}} src={`${ImageConfig}${message?.image}`} alt="" />
                                                        <p className='text-[#8B8B8B] poppins-regular mt-3 text-sm leading-4 text-right'>20-Apr-2024</p>
                                                    </div>
                                                }
                                                {
                                                    message?.messageType === "text"
                                                    &&
                                                    <div className={`border rounded-t-lg rounded-bl-lg p-4 w-[50%] ${ message?.sender === user?.role ? "  bg-white" : "bg-[#E5E5E5]" } `}>
                                                        <p className='text-[#6A6A6A] poppins-regular  text-sm leading-5'>{message?.text}</p>
                                                        <p className='text-[#8B8B8B] poppins-regular  text-sm leading-4 text-right'>{moment(message?.createdAt).format("LT")}</p>
                                                    </div>
                                                }

                                                {
                                                    message?.messageType === "both" &&
                                                    <div  className={`border rounded-t-lg rounded-bl-lg p-4 w-[50%] ${ message?.sender === user?.role ? "  bg-white" : "bg-[#E5E5E5]" }  `}>
                                                        <img style={{width: 201, height: 155, borderRadius: 8}} src={`${ImageConfig}${message?.image}`} alt="" />
                                                        <p className='text-[#6A6A6A] poppins-regular text-right my-2 text-sm leading-5'>{message?.text}</p>
                                                        <p className='text-[#8B8B8B] poppins-regular  text-sm leading-4 text-right'>{moment(message?.createdAt).format("LT")}</p>
                                                    </div>
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            {/* input section */}
                            <div className='w-full p-3 relative'>
                                <div style={{display: imageURL ? "block" : "none"}} className='absolute left-3 bottom-[70px]  w-full'>
                                    <img style={{width: 200 ,height: 200, }} src={imageURL} alt="" />
                                </div>
                                <div className='flex items-center gap-4 bg-white  rounded p-1' style={{boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"}}>
                                    <textarea 
                                        onChange={(e)=> setKeyword(e.target.value)} 
                                        value={keyword} 
                                        className='w-full resize-none bg-transparent font-normal h-10 px-3 outline-none text-black placeholder:text-black' 
                                        type="text"
                                         placeholder='Type Message'
                                    />
                                    <div className='flex items-center gap-4'>
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