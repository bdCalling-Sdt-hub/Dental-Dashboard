/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { ImageConfig } from '../redux/api/baseApi';
import { useDispatch, useSelector } from 'react-redux';
import { getOffers } from "../redux/apiSlice/Offer/getOfferSlice";
import { deleteOffer } from "../redux/apiSlice/Offer/deleteOfferSlice";


const OfferTableList = ({ refresh, setValue }) => {
    const dispatch = useDispatch();
    const {offers} = useSelector(state=> state.getOffers);

    useEffect(()=>{
        dispatch(getOffers())
    }, [dispatch, refresh]);


    const handleDelete=(id)=>{
        Swal.fire({
            title: "Are Your Sure?",
            html: `Do you want to  delete This Offer`,
            confirmButtonText: 'Confirm',
            customClass: {
              confirmButton: 'custom-send-button',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteOffer(id)).then((response)=>{
                    if(response.type === "deleteOffer/fulfilled"){
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: response?.payload,
                            showConfirmButton: false,
                            timer: 1500
                        }).then(()=>{
                            dispatch(getOffers())
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
                            ["S.ID ", "Offer Image", "Offer Name", "Actions"].map((item, index)=>{
                                return (
                                    <th 
                                        key={index} 
                                        className={`text-[#575757] poppins-medium text-[18px] leading-7`}
                                        style={{
                                            display: name !== "Patient care" && item === "Patient Category" ? "none" : "table-cell"
                                        }}
                                        colSpan={name !== "Patient care" && item === "Patient Category" ? 0 : 1}
                                    >
                                        {item}
                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>

                <tbody>
                    {
                        offers?.map((offer, index)=>
                        <React.Fragment key={index}>
                            <div className="mt-2"></div>
                            <tr className={`${(index + 1) % 2 === 0 ? 'bg-[#FCF8F9]' : 'bg-white'} w-full`}>
                                <td>#123{index}</td>
                                <td>
                                    <div className="h-[60px]">
                                        <img 
                                            style={{
                                                height : 60, 
                                                width: 60,
                                                objectFit: 'contain'
                                            }} 
                                            src={`${ImageConfig}${offer?.offerImage}`} 
                                            alt="" 
                                        />
                                    </div>
                                </td>
                                <td className="text-[#707070] h-[60px]  roboto-regular text-base ">{offer?.offerTitle}</td>

                                <td>
                                    <div className="flex items-center gap-2 h-[60px]">
                                        <div onClick={()=>setValue(offer)}  className="flex  cursor-pointer items-center border w-10 h-10 rounded-lg border-[#E6E5F1] justify-center">
                                            <RiEdit2Line size={18} color="#B6C0C8" />
                                        </div>

                                        <div onClick={()=>handleDelete(offer?._id)} className="flex cursor-pointer items-center border w-10 h-10 rounded-lg border-[#E6E5F1] justify-center">
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

export default OfferTableList