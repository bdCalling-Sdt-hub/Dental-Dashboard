/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { RiDeleteBin6Line, RiEdit2Line } from 'react-icons/ri';
import Swal from 'sweetalert2';
import EditCategoryModal from '../Modal/EditCategoryModal';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../../redux/apiSlice/Category/getCategorySlice';
import { deleteCategory } from '../../redux/apiSlice/Category/deleteCategorySlice';

const CategoryTableList = ({refresh, setValue }) => {
    const dispatch = useDispatch()
    const {categories} = useSelector(state=> state.getCategory);

    useEffect(()=>{
        dispatch(getCategory())
    }, [dispatch, refresh])

    const [open, setOpen] = useState(false);




    const handleDelete=(id)=>{
        Swal.fire({
            title: "Are Your Sure ?",
            html: `Do you want to  delete This Category ? <br> Only Super admin can delete Category`,
            confirmButtonText: 'Confirm',
            customClass: {
              confirmButton: 'custom-send-button',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteCategory(id)).then((response)=>{
                    console.log(response)
                    if(response.type === "deleteCategory/fulfilled"){
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: response?.payload,
                            showConfirmButton: false,
                            timer: 1500
                        }).then(()=>{
                            dispatch(getCategory())
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
                            ["S.ID ", "Category Name", "Actions"].map((item, index)=>{
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
                        categories?.map((item, index)=>{
                            return(
                                <React.Fragment key={index}>
                                    <tr className={`${(index + 1) % 2 === 0 ? 'bg-[#FCF8F9]' : 'bg-white'} w-full`}>
                                        <td>#123{index}</td>

                                        <td className="text-[#707070] h-[60px]  roboto-regular text-base ">{item?.categoryName}</td>

                                        <td>
                                            <div className="flex items-center gap-2 h-[60px]">
                                                <div onClick={()=>setValue(item)} className="flex  cursor-pointer items-center border w-10 h-10 rounded-lg border-[#E6E5F1] justify-center">
                                                    <RiEdit2Line  size={18} color="#B6C0C8" />
                                                </div>

                                                <div onClick={()=>handleDelete(item?._id)} className="flex cursor-pointer items-center border w-10 h-10 rounded-lg border-[#E6E5F1] justify-center">
                                                    <RiDeleteBin6Line size={18} color="#B6C0C8" />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            )
                        })
                    }
                </tbody>
            </table>

            <EditCategoryModal open={open} setOpen={setOpen} />
        </div>
    )
}

export default CategoryTableList