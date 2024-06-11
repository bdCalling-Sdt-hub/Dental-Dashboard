/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { getAdmin } from "../../redux/apiSlice/Admin/getAdminSlice";
import { deleteAdmin } from "../../redux/apiSlice/Admin/deleteAdminSlice";

const AdminTable = ( {refresh} ) => {
    const dispatch = useDispatch();
    const { admins } = useSelector(state=>state.getAdmin);

    useEffect(()=>{
        dispatch(getAdmin())
    }, [dispatch, refresh])



    const handleDelete=(id)=>{
        Swal.fire({
            title: "Are Your Sure ?",
            html: `Do you want to  delete Admin profile ? <br> Only Super admin can delete Admin profile`,
            confirmButtonText: 'Confirm',
            customClass: {
              confirmButton: 'custom-send-button',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteAdmin(id)).then((response)=>{
                    if(response?.type === "deleteAdmin/fulfilled"){
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: response?.payload,
                            showConfirmButton: false,
                            timer: 1500
                        }).then(()=>{
                            dispatch(getAdmin())
                        })
                    }
                })
            }
        });
    }
    return (
        <div>
            <table className="w-full table">
                <thead>
                    <tr className="text-left w-full bg-[#E7EBED] custom-table-list">
                        {
                            ["S.ID ", "Name", "Email", "User Type", "Actions"].map((item, index)=>{
                                return (
                                    <th key={index} className={`text-[#575757] poppins-medium text-[18px] leading-7`}>
                                        {item}
                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>

                <tbody>
                    {
                        admins?.map((admin, index)=>
                        <React.Fragment key={index}>
                            <tr className={`${(index + 1) % 2 === 0 ? 'bg-[#FCF8F9]' : 'bg-white'} w-full`}>
                                <td>#123{index}</td>
                                <td>{admin?.admin?.name}</td>

                                <td className="text-[#707070] h-[60px]  roboto-regular text-base ">{admin?.email}</td>
                                <td className="text-[#707070] h-[60px]  roboto-regular text-base ">{admin?.admin?.role}</td>

                                <td>
                                    <div className="flex items-center  h-[60px]">
                                        <div onClick={()=>handleDelete(admin?._id)} className="flex cursor-pointer items-center border w-10 h-10 rounded-[6px] border-[#E6E5F1] justify-center">
                                            <RiDeleteBin6Line size={22} color="#B6C0C8" />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </React.Fragment>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AdminTable