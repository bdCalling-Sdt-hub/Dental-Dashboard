import { useLocation, useNavigate, useParams } from 'react-router-dom';
import MetaTag from '../../components/MetaTag';
import { GoArrowLeft } from 'react-icons/go';
import Heading from '../../components/Heading';
import { useEffect, useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import { RiImageAddLine } from 'react-icons/ri';
import { Button, Form, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createArticle } from '../../redux/apiSlice/Article/createArticleSlice';
import { getArticleDetails } from '../../redux/apiSlice/Article/getArticleDetailsSlice';
import Swal from 'sweetalert2';
import { ImageConfig } from '../../redux/api/baseApi';
import { updateArticle } from '../../redux/apiSlice/Article/updateArticleSlice';

const CreateArticle = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imageList, setImageList] = useState([]);
    const [imageURL, setImageURL] = useState(null);
    const [imageURLList, setImageURLList] = useState([]);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const id = query.get('id');
    const { details } = useSelector(state=> state.getArticleDetails)

    useEffect(()=>{
        dispatch(getArticleDetails(id))
    },[dispatch, id]);


    useEffect(() => {
        if (details) {
            form.setFieldsValue(details);
            setImageURLList(details?.articleSlider)
            setImageURL(`${ImageConfig}${details?.buttonImage}`)
            setContent(details?.articleDetails)
        }
    }, [form, details]);

    const handleChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        const url = URL.createObjectURL(file);
        setImageURL(url);
    };

    const handleSliderChange = (e) => {
        const file = e.target.files[0];
        const newImageList = [...imageList, file];
        setImageList(newImageList);
        const url = URL.createObjectURL(file);
        setImageURLList([...imageURLList, url]);
    };

    const handleSubmit = (values) => {
        const data = {
            articleName: values?.articleName,
            patientCategory: values?.patientCategory,
            articleCategory: name,
            articleDetails: content
        };

        const formData = new FormData();
        if (image) {
            formData.append("buttonImage", image);
        }

        formData.append("data", JSON.stringify(data));

        for (const img of imageList) {
            formData.append("articleSlider", img);
        }

        if(details){
            dispatch(updateArticle({ id: details?._id, data: formData })).then((response) => {
                if (response.type === "updateArticle/fulfilled") {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: response?.payload,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            });
        }else{
            dispatch(createArticle(formData)).then((response) => {
                if (response.type === "createArticle/fulfilled") {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: response?.payload,
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        form.resetFields();
                        setImageURLList([]);
                        setImageList([]);
                        setImage(null)
                    });
                }
            });
        }

        
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 h-[86vh] overflow-auto">
            <MetaTag title={`${id ? "Edit Article" : "Create Article"}`} />
            <div className='flex items-center gap-3 mb-6'>
                <div
                    onClick={() => navigate(`/article-details/${name}`)}
                    className="w-10 h-10 cursor-pointer rounded-lg border shadow-md flex items-center justify-center"
                >
                    <GoArrowLeft size={24} color='#12354E' />
                </div>
                <Heading title={`${id ? "Edit Article" : "Create Article"}`}  style={""} />
            </div>

            <Form onFinish={handleSubmit} form={form}>
                <div className='flex gap-[60px]'>
                    <div className='w-[334px]'>
                        <label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{ marginBottom: 8, display: "block" }}>Article Name</label>
                        <Form.Item name={"articleName"}>
                            <Input
                                placeholder='Enter Article Name'
                                style={{
                                    background: "transparent",
                                    width: "100%",
                                    height: 50,
                                    border: "1px solid #E0E0E0",
                                    outline: "none"
                                }}
                            />
                        </Form.Item>

                        <label
                            className="text-[#415D71] text-sm leading-5 poppins-semibold"
                            htmlFor=""
                            style={{
                                marginBottom: 8,
                                display: name === "Patient Care" ? "block" : "none"
                            }}
                        >
                            Patient Category
                        </label>
                        <Form.Item
                            name={"patientCategory"}
                            style={{
                                display: name === "Patient Care" ? "block" : "none",
                                marginBottom: 0
                            }}
                        >
                            <Select
                                style={{
                                    width: "100%",
                                    height: 48,
                                    border: "1px solid #E7EBED",
                                    outline: "none",
                                    borderRadius: 8
                                }}
                                className="poppins-regular text-[#6A6A6A] text-[14px] leading-5"
                                defaultValue={name}
                            >
                            </Select>
                        </Form.Item>
                    </div>

                    <div>
                        <label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{ marginBottom: 8, display: "block" }}>Article Image</label>
                        <input onChange={handleChange} type="file" id="img" style={{ display: "none" }} />
                        <label
                            htmlFor="img"
                            style={{
                                backgroundImage: `url(${imageURL})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center"
                            }}
                            className={`
                                w-[170px] 
                                h-[150px]
                                cursor-pointer  
                                border border-[#929394]  border-dashed
                                flex 
                                flex-col items-center justify-center 
                                rounded-lg 
                            `}
                        >
                            <RiImageAddLine color='#607888' size={38} />
                            <h3 className="text-[#12354E] text-[14px] leading-5 poppins-light ">Browse Photo</h3>
                            <h3 className="text-[#12354E] text-[14px] leading-5 poppins-light ">Size 345x250px </h3>
                        </label>
                    </div>
                </div>

                <hr className='my-[30px]' />

                <section>
                    <label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{ marginBottom: 8, display: "block" }}>Article Slider Image</label>

                    <div className=' border rounded-lg p-6 flex items-center gap-[14px] w-fit'>
                        {
                            imageURLList && imageURLList?.map((item, index) => {
                                return (
                                    <img 
                                        key={index} 
                                        src={item?.startsWith("/images") ? `${ImageConfig}${item}` : item } 
                                        style={{ width: 162, height: 102, borderRadius: 8 }} 
                                        alt=""
                                    />
                                )
                            })
                        }

                        {
                            imageURLList?.length > 2
                                ? null
                                : (
                                    <div>
                                        <input onChange={handleSliderChange} type="file" id="imgList" style={{ display: "none" }} />
                                        <label
                                            htmlFor="imgList"
                                            className={`
                                                w-[162px] 
                                                h-[102px]
                                                cursor-pointer  
                                                border border-[#929394]  border-dashed
                                                flex 
                                                flex-col items-center justify-center 
                                                rounded-lg 
                                            `}
                                        >
                                            <RiImageAddLine color='#607888' size={38} />
                                            <h3 className="text-[#12354E] text-[14px] leading-5 poppins-light ">Browse Slider Photo</h3>
                                            <h3 className="text-[#12354E] text-[14px] leading-5 poppins-light ">Size 1200x576 </h3>
                                        </label>
                                    </div>
                                )
                        }
                    </div>
                </section>

                <section className="my-[30px]">
                    <label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{ marginBottom: 8, display: "block" }}>Article Details</label>
                    <JoditEditor
                        ref={editor}
                        value={content}
                        tabIndex={1}
                        onBlur={newContent => setContent(newContent)}
                    />
                </section>

                <Form.Item
                    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                    <Button
                        htmlType='submit'
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
                </Form.Item>
            </Form>
        </div>
    )
};

export default CreateArticle;
