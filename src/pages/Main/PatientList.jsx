import PatientDetailsModal from "../../components/Modal/PatientDetailsModal";
import { MdOutlineArrowOutward } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import { Empty, Input, Pagination, Select } from "antd";
import { GoSearch } from "react-icons/go";
import MetaTag from "../../components/MetaTag";
import { useDispatch, useSelector } from "react-redux";
import { getPatient } from "../../redux/apiSlice/Patient/getPatientSlice";
import { getCategory } from "../../redux/apiSlice/Category/getCategorySlice";
import { IoClose } from "react-icons/io5";
import { deletePatient } from "../../redux/apiSlice/Patient/deletePatientSlice";
import { ImageConfig } from "../../redux/api/baseApi";
import ForgotPasswordModal from "../../components/Modal/ForgotPassword";

const { Option } = Select;

const PatientList = () => {
    const [detailsModal, setDetailsModal] = useState(null);
    const dispatch = useDispatch();
    const {patients, pagination} = useSelector(state=>state.getPatient);
    const [keyword, setKeyword] = useState(null)
    const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 1);
    const {categories} = useSelector(state=> state.getCategory);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [forgotPassword, setForgotPassword] = useState(null)

    const handlePageChange = (page) => {
        setPage(page);
        const params = new URLSearchParams(window.location.search);
        params.set('page', page);
        window.history.pushState(null, "", `?${params.toString()}`);
    };

    useEffect(()=>{
        dispatch(getCategory())
    }, [dispatch])

    useEffect(()=>{
        dispatch(getPatient({ search: keyword, page, category : selectedCategory}))
    }, [dispatch, keyword, selectedCategory, page]) 


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
        <div>
            <MetaTag title={"Patient List"}/>
            {/* header section */}
            <div className='flex items-center justify-between'>
                <Heading title={"Patient List"}/>
                <div className="flex items-center gap-6">
                    <Input
                        onChange={(e)=>setKeyword(e.target.value)}
                        prefix={<GoSearch color="#B6C0C8" size={16} />}
                        suffix={<IoClose onClick={()=>setKeyword(null)} style={{display: keyword ?  "block" : "none"}} color="#B6C0C8" size={16} />}
                        placeholder="Enter Search..."
                        style={{
                            width: 320,
                            height: 48,
                            border: "1px solid #E7EBED",
                            outline: "none",
                            borderRadius: 8
                        }}
                        value={keyword}
                        type="search"
                        className="poppins-regular text-[#B6C0C8] text-[14px] leading-5"
                    />

                    <Select
                        style={{
                            width: 250,
                            height: 48,
                            border: "1px solid #E7EBED",
                            outline: "none",
                            borderRadius: 8
                        }}
                        className="poppins-regular text-[#6A6A6A] text-[14px] leading-5"
                        placeholder="Select Category"
                        onChange={(e)=>setSelectedCategory(e)}
                    >
                        <Option  value={""} >All</Option>
                        {
                            categories?.map((category, index)=>{
                                return(
                                    <Option key={index} value={category?.categoryName} >{category?.categoryName}</Option>
                                )
                            })
                        }
                    </Select>
                </div>
            </div>

            {/* table container start here */}
            <table className="w-full table my-5">
                <thead>
                    <tr className="text-left w-full bg-[#E7EBED] custom-table-list">
                        {
                        ["S.ID ", "Patient", "Email", "Contact", "P. Plan", "Actions"].map((item, index)=>
                            <th key={index} className="text-[#575757] poppins-medium text-[18px] leading-7">
                                {item}
                            </th>
                        )
                        }
                    </tr>
                </thead>
                {
                    patients?.length > 0
                    ?
                

                <tbody  >
                    {
                        patients?.map((patient, index)=>
                        <React.Fragment key={index}>
                            <tr className={`${(index + 1) % 2 === 0 ? 'bg-[#FCF8F9]' : 'bg-white'}`}>
                                <td>{index + 1}</td>
                                <td >
                                    <div className="flex items-center h-[60px]  justify-start gap-2">
                                        <img  
                                            style={{
                                                width: 40, 
                                                height: 40,
                                                clipPath: "circle()",
                                                objectFit: "contain"
                                            }} 
                                            src={`${patient?.patient?.profile?.startsWith("https") ?  patient?.patient?.profile : `${ImageConfig}${patient?.patient?.profile}` }`} alt="" />
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
                                        <div
                                            onClick={()=>setForgotPassword(patient)}
                                            className="flex cursor-pointer items-center px-2 border w-fit h-10 rounded-lg border-[#E6E5F1] justify-center"
                                        >
                                            Reset Password
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </React.Fragment>
                        )
                    }
                </tbody>
                :
                <tbody className="w-full h-[30vh] relative">
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-[50%] -translate-y-[50%]">
                        <Empty/>
                    </div>
                </tbody>
                }

            </table>
            {/* table container end here */}

            {/* pagination */}
            <div className={` ${patients?.length > 0 ? "flex" : "hidden"}   items-center justify-center relative`}>
                <Pagination 
                    defaultCurrent={parseInt(page)} 
                    total={pagination?.total}
                    onChange={handlePageChange}
                    showTotal={(total, range) => 
                        <span className="text-[#607888] roboto-regular text-base leading-[18px] absolute top-[25%] left-0">
                            {`Showing ${range[0]}-${range[1]} of ${total} items`}
                        </span>
                    }
                />
            </div>
            <PatientDetailsModal open={detailsModal} setOpen={setDetailsModal} />
            <ForgotPasswordModal open={forgotPassword} setOpen={setForgotPassword} />
        </div>
    )
}

export default PatientList