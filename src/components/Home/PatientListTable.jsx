import { Link } from "react-router-dom"
import Heading from "../Heading"
import React, { useEffect, useState } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import PatientDetailsModal from "../Modal/PatientDetailsModal";
import { useDispatch, useSelector } from "react-redux";
import { getPatient } from "../../redux/apiSlice/Patient/getPatientSlice";
import { ImageConfig } from "../../redux/api/baseApi";
import { deletePatient } from "../../redux/apiSlice/Patient/deletePatientSlice";


const PatientListTable = () => {
    const [detailsModal, setDetailsModal] = useState(false);
    const {patients} = useSelector(state=>state.getPatient);
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getPatient({}))
    }, [dispatch]) 

    // delete patient function
    const handleDelete=(id)=>{
        Swal.fire({
            title: "Are Your Sure ?",
            html: `Do you want to  delete Patient?`,
            confirmButtonText: 'Confirm',
            customClass: {
              confirmButton: 'custom-send-button',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deletePatient(id)).then((response)=>{
                    if(response.type === "deletePatient/fulfilled"){
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: response?.payload,
                            showConfirmButton: false,
                            timer: 1500
                        }).then(()=>{
                            dispatch(getPatient({}))
                        })
                    }else{
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: response?.payload,
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
            }
        });
    }
    return (
        <>
            <div className='flex items-center justify-between p-4'>
                <Heading title={"Patient List"}/>
                <Link className='underline poppins-regular text-[#707070] text-[12px] leading-[18px] pb-[4px]' to={"/patient-list"}>View All</Link>
            </div>
                
            <table className="w-full table">
                <thead>
                    <tr className="text-left w-full bg-[#E7EBED] custom-table-list">
                        {
                        ["S.ID ", "Patient", "Email", "Contact", "P. Category", "Actions"].map((item, index)=>
                            <th key={index} className="text-[#575757] poppins-medium text-[18px] leading-7">
                                {item}
                            </th>
                        )
                        }
                    </tr>
                </thead>

                <tbody>
                    {
                        patients?.slice(0, 4).map((patient, index)=>
                            <React.Fragment key={index}>
                                <tr className={`${(index + 1) % 2 === 0 ? 'bg-[#FCF8F9]' : 'bg-white'}`}>
                                    <td>{index + 1}</td>
                                    <td >
                                        <div className="flex items-center h-[60px]  justify-start gap-2">
                                            <img  style={{width: 40, height: 40}} src={`${patient?.patient?.profile?.startsWith("https") ?  patient?.patient?.profile : `${ImageConfig}${patient?.patient?.profile}` }`} alt="" />
                                            <p className="text-[#707070] roboto-regular text-base leading-[21px] ">{patient?.patient?.name}</p>
                                        </div>
                                    </td>

                                    <td className="text-[#707070] h-[60px]  roboto-regular text-base ">{patient?.email}</td>
                                    <td className="text-[#707070] h-[60px]  roboto-regular text-base ">{patient?.patient?.contactNo}</td>
                                    <td className="text-[#707070] h-[60px]  roboto-regular text-base "> {patient?.patient?.category}</td>

                                    <td >
                                        <div className="flex items-center gap-2 h-[60px]">
                                            <div onClick={()=>setDetailsModal(patient)} className="flex cursor-pointer items-center border w-10 h-10 rounded-lg border-[#E6E5F1] justify-center">
                                                <MdOutlineArrowOutward size={18} color="#B6C0C8" />
                                            </div>

                                            <div onClick={()=>handleDelete(patient?._id)} className="flex cursor-pointer items-center border w-10 h-10 rounded-lg border-[#E6E5F1] justify-center">
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

            <PatientDetailsModal open={detailsModal} setOpen={setDetailsModal} />
        </>
    )
}

export default PatientListTable;