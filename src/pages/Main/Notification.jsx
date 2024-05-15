import React, { useState } from 'react'
import { PiTrash } from 'react-icons/pi';
import { Pagination } from 'antd'
import Swal from 'sweetalert2';
import MetaTag from '../../components/MetaTag';
import Heading from '../../components/Heading';

const Notification = () => {
    const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 1);

    const handlePageChange = (page) => {
        setPage(page);
        const params = new URLSearchParams(window.location.search);
        params.set('page', page);
        window.history.pushState(null, "", `?${params.toString()}`);
    };

    const handleDelete=()=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 h-[86vh] overflow-auto">
            <MetaTag title={"Notification"} />
            <Heading title={"Notifications"} style={"mb-6 text-left"} />

            <table className="w-full table">
                        <thead>
                            <tr className="text-left w-full ">
                                {
                                    ["Name", "Notification", "Time", "Actions"].map((item, index)=>
                                        <th className={`${index === 0 ? "pl-4" : "0"}`}   key={index} >
                                            {item}
                                        </th>
                                    )
                                }
                            </tr>
                        </thead>

                        <tbody>
                            {
                                [...Array(11)].map((item, index)=>{
                                    return (
                                        <React.Fragment key={index} >
                                            <tr className='border-b-[1px] border-[#E0E0E0] h-[50px]'>
                                                <td className='pl-4 poppins-regular text-base leading-[21px] py-4'>{"Lulu"}</td>
                                                <td className='text-[#707070] poppins-regular text-base leading-[21px]'>{"Register Account"}</td>
                                                <td className='text-[#707070] poppins-regular text-base leading-[21px]'>{"8:38 AM"}</td>
                                                <td >
                                                    <PiTrash onClick={handleDelete} size={20} color='#607888' className='cursor-pointer' />
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
                    total={50}
                    onChange={handlePageChange}
                    showTotal={(total, range) => 
                        <span className="text-[#607888] roboto-regular text-base leading-[18px] absolute top-[25%] left-0">
                            {`Showing ${range[0]}-${range[1]} of ${total} items`}
                        </span>
                    }
                />
            </div>
        </div>
    )
}

export default Notification