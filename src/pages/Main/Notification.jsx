import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { PiTrash } from 'react-icons/pi';
import { Empty, Pagination } from 'antd'
import MetaTag from '../../components/MetaTag';
import Heading from '../../components/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications } from "../../redux/apiSlice/Notifications/getNotificationSlice"
import moment from 'moment';
import { readNotification } from '../../redux/apiSlice/Notifications/readNotificationSlice';
import { deleteNotification } from '../../redux/apiSlice/Notifications/deleteNotificationSlice';
import { useNavigate } from 'react-router-dom';

const Notification = () => {
    const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 1);
    const dispatch = useDispatch()
    const {notifications , pagination } = useSelector(state=> state.getNotifications);
    const navigate = useNavigate();

    console.log(notifications)

    const handlePageChange = (page) => {
        setPage(page);
        const params = new URLSearchParams(window.location.search);
        params.set('page', page);
        window.history.pushState(null, "", `?${params.toString()}`);
    };

    const handleNavigate = (value)=>{
        if(value.type === "profile"){
            navigate("/patient-list")
        }

        if(value.type === "chat"){
            navigate(`/chat?chatId=${value?.chatId}` )
        }
    }

    useEffect(()=>{
        dispatch(getNotifications(page))
    }, [dispatch, page])

    

    const handleDelete=(id)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteNotification(id)).then((response)=>{
                    if(response.type === "deleteNotification/fulfilled"){
                        Swal.fire({
                            title: "Deleted!",
                            text: "Notification Has been Deleted",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500
                        }).then(()=>{
                            dispatch(getNotifications(page))
                        })
                    }
                })
                
            }
        });
    }

    useEffect(()=>{
        dispatch(readNotification()).then((response)=>{
            if(response.type === "readNotification/fulfilled"){
                dispatch(getNotifications(page))
            }
        })
    }, [dispatch, page])
    

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 h-[86vh] overflow-auto">
            <MetaTag title={"Notification"} />
            <Heading title={"Notifications"} style={"mb-6 text-left"} />

            <div style={{display: notifications?.length > 0 ? "block" : "none"}}>
                <table className="w-full table">
                            <thead>
                                <tr className="text-left w-full ">
                                    {
                                        ["Notification", "Time", "Actions"].map((item, index)=>
                                            <th className={`${index === 0 ? "pl-4" : "0"}`}   key={index} >
                                                {item}
                                            </th>
                                        )
                                    }
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    notifications?.map((item, index)=>{
                                        return (
                                            <React.Fragment key={index} >
                                                <tr  className={`border-b-[1px] border-[#E0E0E0] h-[50px] ${ item?.read === false ? "bg-[#FCF8F9]" : null} `}>
                                                    <td className='cursor-pointer' onClick={()=>handleNavigate(item)} >
                                                        <div className=' poppins-regular text-base leading-[21px]' dangerouslySetInnerHTML={{__html: item?.message}} />
                                                    </td>
                                                    <td className='text-[#707070] poppins-regular text-base leading-[21px]'>{moment(item?.createdAt).format('LT')}</td>
                                                    <td >
                                                        <PiTrash onClick={()=>handleDelete(item._id)} size={20} color='red' className='cursor-pointer' />
                                                    </td>
                                                </tr>
                                            </React.Fragment>
                                        )
                                    })
                                }
                            </tbody>
                </table>

                <div className="flex items-center justify-center relative mt-6">
                    <Pagination 
                        defaultCurrent={page} 
                        total={pagination?.total}
                        onChange={handlePageChange}
                        showTotal={(total, range) => 
                            <span className="text-[#607888] roboto-regular text-base leading-[18px] absolute top-[25%] left-0">
                                {`Showing ${range[0]}-${range[1]} of ${total} items`}
                            </span>
                        }
                    />
                </div>
            </div>
            <div style={{display: notifications?.length > 0 ? "none" : "block"}} className='w-fit h-fit absolute top-1/2 left-1/2'> 
                <Empty/>
            </div>
        </div>
    )
}

export default Notification