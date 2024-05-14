import { Link } from "react-router-dom"
import Heading from "../Heading"
import React, { useState } from "react";
import person from "../../assets/person.png";
import { MdOutlineArrowOutward } from "react-icons/md";
import { RiEdit2Line } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import UserEditModal from "../Modal/UserEditModal";
import UserDetailsModal from "../Modal/UserDetailsModal";


const UserlistTable = () => {
    const [detailsModal, setDetailsModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const handleDelete=()=>{
        Swal.fire({
            title: "Are Your Sure ?",
            html: `Do you want to  delete your patients profile ? <br> Only Super admin can delete patients profile.`,
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
        <>
            <div className='flex items-center justify-between p-4'>
                <Heading title={"User Details List"}/>
                <Link className='underline poppins-regular text-[#707070] text-[12px] leading-[18px] pb-[4px]' to={"/product-list"}>View All</Link>
            </div>
                
            <table className="w-full table">
                <thead>
                    <tr className="text-left w-full bg-[#E7EBED] custom-table-list">
                        {
                        ["S.ID ", "User", "Email", "Contact", "P. Category", "Actions"].map((item, index)=>
                            <th key={index} className="text-[#575757] poppins-medium text-[18px] leading-7">
                                {item}
                            </th>
                        )
                        }
                    </tr>
                </thead>

                <tbody>
                    {
                        [...Array(5)].map((item, index)=>
                        <React.Fragment key={index}>
                            <tr className={`${(index + 1) % 2 === 0 ? 'bg-[#FCF8F9]' : 'bg-white'}`}>
                                <td>{index + 1}</td>
                                <td >
                                    <div className="flex items-center h-[60px]  justify-start gap-2">
                                        <img  src={person} alt="" />
                                        <p className="text-[#707070] roboto-regular text-base leading-[21px] ">Nadir</p>
                                    </div>
                                </td>

                                <td className="text-[#707070] h-[60px]  roboto-regular text-base "> mahmud@gmail.com</td>
                                <td className="text-[#707070] h-[60px]  roboto-regular text-base "> +919355574544</td>
                                <td className="text-[#707070] h-[60px]  roboto-regular text-base "> Cavities</td>

                                <td >
                                    <div className="flex items-center gap-2 h-[60px]">
                                        <div onClick={()=>setDetailsModal(true)} className="flex cursor-pointer items-center border w-10 h-10 rounded-lg border-[#E6E5F1] justify-center">
                                            <MdOutlineArrowOutward size={18} color="#B6C0C8" />
                                        </div>

                                        <div onClick={()=>setEditModal(true)} className="flex  cursor-pointer items-center border w-10 h-10 rounded-lg border-[#E6E5F1] justify-center">
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

            <UserEditModal editModal={editModal} setEditModal={setEditModal} />
            <UserDetailsModal open={detailsModal} setOpen={setDetailsModal} />

            

        </>
    )
}

export default UserlistTable;