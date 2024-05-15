/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import Swal from "sweetalert2";
import Slider from "../../assets/offer_slider.png"
import EditBannerModal from "../Modal/EditBannerModal";


const BannerTableList = ({keyword}) => {
    const [open, setOpen] = useState(false);
    const handleDelete=()=>{
        Swal.fire({
            title: "Are Your Sure !",
            html: `Do you want to  delete This Banner `,
            confirmButtonText: 'Confirm',
            customClass: {
              confirmButton: 'custom-send-button',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(result)
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
                        [...Array(2)].map((item, index)=>
                        <React.Fragment key={index}>
                            <tr className={`${(index + 1) % 2 === 0 ? 'bg-[#FCF8F9]' : 'bg-white'} w-full`}>
                                <td>#123{index}</td>
                                <td>
                                    <div className="h-[60px]">
                                        <img src={Slider} alt="" />
                                    </div>
                                </td>
                                <td className="text-[#707070] h-[60px]  roboto-regular text-base ">Hospital{index + 1 }</td>

                                <td>
                                    <div className="flex items-center gap-2 h-[60px]">
                                        <div onClick={()=>setOpen(true)} className="flex  cursor-pointer items-center border w-10 h-10 rounded-lg border-[#E6E5F1] justify-center">
                                            <RiEdit2Line size={18} color="#B6C0C8" />
                                        </div>

                                        <div onClick={handleDelete} className="flex cursor-pointer items-center border w-10 h-10 rounded-lg border-[#E6E5F1] justify-center">
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


            <EditBannerModal open={open} setOpen={setOpen} />
        </div>
    )
}

export default BannerTableList