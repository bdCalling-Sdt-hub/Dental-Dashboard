/* eslint-disable no-unused-vars */
import Heading from '../../components/Heading';
import { Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import MetaTag from '../../components/MetaTag';
import { RiEdit2Line, RiImageAddLine } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  { getArticleCategory } from "../../redux/apiSlice/ArticleCategory/getArticleCategorySlice";
import  { updateArticleCategory } from "../../redux/apiSlice/ArticleCategory/updateArticleCategorySlice";
import { ImageConfig } from '../../redux/api/baseApi';
import Swal from 'sweetalert2';
const Article = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(null);
    const dispatch = useDispatch();
    const { articleCategory } = useSelector(state=> state?.getArticleCategory);
    const [image, setImage] = useState();
    const [imageURL, setImageURL] = useState(null);

    useEffect(()=>{
        dispatch(getArticleCategory())
    },[dispatch])

    const handleChange = (e)=>{
        const file = e.target.files[0];
        setImage(file);
        const url = URL.createObjectURL(file);
        setImageURL(url)
    }

    const handleSubmit=()=>{
        
        const formData = new FormData();
        
        formData.append("articleCategoryImage", image)
        formData.append("data", JSON.stringify({articleCategoryName: open?.articleCategoryName }))

        dispatch(updateArticleCategory({id: open._id, data : formData })).then((response)=>{
            if(response.type === "updateArticle/fulfilled"){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: response?.payload,
                    showConfirmButton: false,
                    timer: 1500
                }).then(()=>{
                    dispatch(getArticleCategory())
                    setImageURL(null)
                    setOpen(null)
                })
            }
        })
    }
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 h-[86vh] overflow-auto">
            <Heading title={"Article"} style={"text-left mb-6"} />
            <MetaTag title="Article" />

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {
                    articleCategory?.map((article, index)=>{
                        return (
                            <div key={index} className='relative'>
                                <div onClick={()=>setOpen(article)} className='absolute top-2 right-2 cursor-pointer w-10 h-10 border border-[#E6E5F1] rounded-lg flex items-center justify-center'>
                                    <RiEdit2Line size={24} color="#B6C0C8" />
                                </div>
                                <div className='border shadow-lg rounded-lg p-6'>
                                    <img 
                                        src={`${ImageConfig}${article?.articleCategoryImage}`}  
                                        style={{
                                            width: 60, 
                                            height: 60, 
                                            objectFit: "contain",
                                            margin: "0 auto"
                                        }} 
                                        alt="" 
                                    />
                                    <p className='text-[#415D71] poppins-regular text-center text-sm leading-5 mt-6'>{article?.articleCategoryName}</p>
                                </div>
                                <Button
                                    onClick={()=>navigate(`/article-details/${article?.articleCategoryName}`)} 
                                    style={{
                                        background: "#E5E5E5",
                                        width: "100%",
                                        height: 40,
                                        border: "none",
                                        outline: "none",
                                        color: "#12354E",
                                        borderRadius: 8,
                                        marginTop: 12
                                    }}
                                    className='roboto-regular text-[14px] leading-[17px]'
                                >
                                    Upload article
                                </Button>
                            </div>
                        )
                    })
                }
            </div>

            <Modal
                centered 
                title={<p className="text-[#415D71] text-[20px] leading-5 poppins-semibold pl-4 pt-4">{"Edit Article Image"}</p>}
                open={open} 
                onOk={()=>setOpen(null)} 
                onCancel={()=>setOpen(null)}
                width={510}
                footer={false}
            >
                <div className='p-4'>
                    <label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 8, display: "block"}}>Thumbnail Image</label>
                    <div>
                        <input onChange={handleChange} type="file" id="img" style={{display: "none"}} />
                        <label 
                            htmlFor="img"
                            style={{
                                backgroundImage: `url(${imageURL ? imageURL : `${ImageConfig}${open?.articleCategoryImage}`})`,
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center"
                            }}
                            className={`
                                w-full 
                                h-fit
                                cursor-pointer  
                                border border-[#929394]  border-dashed
                                flex 
                                flex-col items-center justify-center 
                                rounded-lg 
                            `}
                        >
                            <RiImageAddLine color='#607888' size={38} /> 
                            <h3 style={{fontWeight: open ? 700 : 400}} className="text-[#12354E] text-[14px] mt-[4px] leading-5 poppins-light ">Browse Thumbnail Photo</h3>
                            <h3 style={{fontWeight: open ? 700 : 400}} className="text-[#12354E] text-[14px] mt-[4px] leading-5 poppins-light ">Size : 63 x 63</h3>
                        </label>
                    </div>

                    <div
                        style={{display: "flex", marginTop: 40, alignItems: "center", justifyContent: "center"}}
                    >
                        <Button
                            onClick={handleSubmit}
                            style={{
                                background: "#12354E",
                                width: 134,
                                height: 48,
                                border: "none",
                                outline: "none",
                                color: "#FCFCFC",
                                borderRadius: 8,
                            }}
                            className='roboto-regular text-[14px] leading-[17px] flex items-center justify-center'
                        >
                            Save & Change
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Article;