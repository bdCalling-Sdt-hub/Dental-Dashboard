/* eslint-disable react/prop-types */
import React from 'react';
import { RiDeleteBin6Line, RiEdit2Line } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { Empty, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import { ImageConfig } from '../../redux/api/baseApi';
import { useDispatch } from 'react-redux';
import { deleteArticle } from '../../redux/apiSlice/Article/deleteArticleSlice';

const ArticleTable = ({data, name, page, setPage, setRefresh, pagination}) => {
    const dispatch = useDispatch();

    const handleDelete=(id)=>{


        Swal.fire({
            title: "Are Your Sure ?",
            html: `Do you want to  delete This Article ? <br> Only Super admin can delete Article`,
            confirmButtonText: 'Confirm',
            customClass: {
              confirmButton: 'custom-send-button',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteArticle(id)).then((response)=>{
                    if(response.type === "deleteArticle/fulfilled"){
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: response?.payload,
                            showConfirmButton: false,
                            timer: 1500
                        }).then(()=>{
                            setRefresh("done")
                        })
                    }
                })
                console.log(result)
            }
        });
    }

    
    const handlePageChange = (page) => {
        setPage(page);
        const params = new URLSearchParams(window.location.search);
        params.set('page', page);
        window.history.pushState(null, "", `?${params.toString()}`);
    };

    return (
        <div>
            <table
                className={`w-full table ${data?.length === 0 ? "hidden" : "block"}`}
            >
                <thead>
                    <tr className="text-left w-full bg-[#E7EBED] custom-table-list">
                        {
                            ["S.ID ", "Thumbnail image", "Article Name", "Patient Category", "Actions"].map((item, index)=>{
                                return (
                                    <th 
                                        key={index} 
                                        className={`text-[#575757] poppins-medium text-[18px] leading-7`}
                                        style={{
                                            display: name !== "Patient Care" && item === "Patient Category" ? "none" : "table-cell"
                                        }}
                                        colSpan={name !== "Patient Care" && item === "Patient Category" ? 0 : 1}
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
                        data?.map((item, index)=>
                        <React.Fragment key={index}>
                            <tr className={`${(index + 1) % 2 === 0 ? 'bg-[#FCF8F9]' : 'bg-white'} w-full`}>
                                <td>#123{index}</td>
                                <td >
                                    <div className="h-[60px] flex items-center justify-between">
                                        <img 
                                            style={{
                                                height: 50, 
                                                width: 80,
                                                objectFit: "contain"
                                            }}  
                                            src={`${ImageConfig}${item?.buttonImage}`} alt="" />
                                    </div>
                                </td>

                                <td className="text-[#707070] h-[60px]  roboto-regular text-base ">{item?.articleName}</td>
                                {

                                    name === "Patient Care" && <td className="text-[#707070] h-[60px]  roboto-regular text-base ">{item?.patientCategory}</td>
                                }

                                <td>
                                    <div className="flex items-center gap-2 h-[60px]">
                                        <Link to={`/create-article/${name}?id=${item?._id}`}>
                                            <div onClick={()=>localStorage.setItem("article", JSON.stringify(item))} className="flex  cursor-pointer items-center border w-10 h-10 rounded-lg border-[#E6E5F1] justify-center">
                                                <RiEdit2Line size={18} color="#B6C0C8" />
                                            </div>
                                        </Link>

                                        <div onClick={()=>handleDelete(item._id)} className="flex cursor-pointer items-center border w-10 h-10 rounded-lg border-[#E6E5F1] justify-center">
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

            <div className={`${data?.length > 0 ? "hidden" : "flex"} items-center justify-center w-full h-[50vh]`   }>
                <div className='w-fit h-fit'>
                    <Empty/>
                </div>
            </div>

            <div className={`${data?.length === 0 ? "hidden" : "flex"} items-center justify-center relative mt-6 `}>
                <Pagination  
                    total={pagination?.total}
                    defaultCurrent={parseInt(page)} 
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

export default ArticleTable