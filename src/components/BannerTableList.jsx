/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { ImageConfig } from '../redux/api/baseApi';
import { useDispatch, useSelector } from 'react-redux';
import { getBanner } from "../redux/apiSlice/Banner/getBannerSlice";
import { deleteBanner } from "../redux/apiSlice/Banner/deleteBannerSlice"

const BannerTableList = ({refresh, setValue}) => {
    const dispatch = useDispatch();
    const {banners} = useSelector(state=> state.getBanner);

    useEffect(()=>{
        dispatch(getBanner())
    }, [dispatch, refresh]);


    const handleDelete=(id)=>{
        Swal.fire({
            title: "Are Your Sure ?",
            html: `Do you want to  This Banner?`,
            confirmButtonText: 'Confirm',
            customClass: {
              confirmButton: 'custom-send-button',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteBanner(id)).then((response)=>{
                    if(response?.type === "deleteBanner/fulfilled"){
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: response?.payload,
                            showConfirmButton: false,
                            timer: 1500
                        }).then(()=>{
                            dispatch(getBanner())
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
                            ["S.ID ", "Banner", "Article Name", "Actions"].map((item, index)=>{
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
                        banners?.map((banner, index)=>
                        <React.Fragment key={index}>
                            <div className='mt-2'></div>
                            <tr className={`${(index + 1) % 2 === 0 ? 'bg-[#FCF8F9]' : 'bg-white'} w-full`}>
                                <td>#123{index}</td>
                                <td>
                                    <div className="w-fit h-[60px]">
                                        <img 
                                            style={{
                                                height: 60, 
                                                width: 250,
                                                objectFit: "contain"
                                            }}  
                                            src={`${ImageConfig}${banner?.bannerImage}`} 
                                            alt="" 
                                        />
                                    </div>
                                </td>
                                <td className="text-[#707070] h-[60px]  roboto-regular text-base ">{banner?.bannerTitle}</td>

                                <td>
                                    <div className="flex items-center gap-2 h-[60px]">
                                        <div onClick={()=>setValue(banner)} className="flex  cursor-pointer items-center border w-10 h-10 rounded-lg border-[#E6E5F1] justify-center">
                                            <RiEdit2Line size={18} color="#B6C0C8" />
                                        </div>

                                        <div onClick={()=>handleDelete(banner?._id)} className="flex cursor-pointer items-center border w-10 h-10 rounded-lg border-[#E6E5F1] justify-center">
                                            <RiDeleteBin6Line size={18} color="#B6C0C8" />
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

export default BannerTableList