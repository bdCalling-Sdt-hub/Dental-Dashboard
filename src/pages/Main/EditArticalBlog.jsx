/* eslint-disable no-unused-vars */
import { useNavigate, useParams } from 'react-router-dom'
import Heading from '../../components/Heading';
import { GoArrowLeft } from 'react-icons/go';
import MetaTag from '../../components/MetaTag';
import { Button, Form, Input, Select } from 'antd';
import { RiImageAddLine } from 'react-icons/ri';
const { Option } = Select;
import { useState, useRef, useEffect, } from 'react';
import JoditEditor from 'jodit-react';
import { useDispatch, useSelector } from 'react-redux';

const EditArticalBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const editor = useRef(null)
    const [content, setContent] = useState('Youcome soon enough. Meanwhile, it can help to rinse your mouth with warm water, floss to remove food caught between teeth, and take an over-the-counter pain reliever. If you notice swelling or pus around the tooth, or if you have a fever, that could be a sign that you have an abscess, a more serious problem. See your dentist as soon as possible. You may need antibiotics as well as other treatments.');
    const [image, setimage] = useState();
    const [imageList, setimageList] = useState([]);
    const [imageURL, setImageURL] = useState();
    const [imageURLList, setImageURLList] = useState([]);
    const dispatch = useDispatch()
    const {details} = useSelector(state=>state.getArticleDetails)
    const [form] = Form.useForm()

    useEffect(()=>{
        if(details){
            form.setFieldsValue()
        }
    }, [form, details])

    const handleChange = (e)=>{
        const file = e.target.files[0];
        setimage(file);
        const url = URL.createObjectURL(file);
        setImageURL(url)
    }

    const handleSliderChange = (e)=>{
        const file = e.target.files[0];
        setimageList([...imageList, file]);
        const url = URL.createObjectURL(file);
        setImageURLList([...imageURLList, url])
    }
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 h-[86vh] overflow-auto">
            <MetaTag title={"Edit Article"} />
            <div className='flex items-center gap-3 mb-6'>
                <div 
                    onClick={()=>navigate(`/article-details/Patient care`)}   
                    className="w-10 h-10 cursor-pointer rounded-lg border shadow-md flex items-center justify-center"
                >
                    <GoArrowLeft   size={24} color='#12354E' />
                </div>
                <Heading title={`Edit Article`} style={""} />
            </div>

            <Form >
                <div className='flex gap-[60px]'>

                    {/* name and category input container */}
                    <div className='w-[334px]'>
                        <label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 8, display: "block"}}>Article Name</label>
                        <Form.Item
                            name={"article_name"}
                        >
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
                                display: id === "Patient care" ? "block" : "none"
                            }}
                        >
                            Patient Category
                        </label>
                        <Form.Item
                            name={"patient_category"}
                            style={{
                                display: id === "Patient care" ? "block" : "none",
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
                                defaultValue={"Gum"}
                            >
                                <Option value="gum">Gum</Option>
                                <Option value="cavities">Cavities</Option>
                            </Select>
                        </Form.Item>
                    </div>

                    {/* thubnail image container */}
                    <div>
                        <label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 8, display: "block"}}>Article Image</label>
                        <input onChange={handleChange} type="file" id="img" style={{display: "none"}} />
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
                            <h3 className="text-[#12354E] text-[14px] leading-5 poppins-light ">Pixel Size: 345 x 250 </h3>
                        </label>
                    </div>
                </div>

                <hr className='my-[30px]' />
                
                {/* slider image contianer list */}
                <section>
                    <label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 8, display: "block"}}>Article Slider Image</label>
                    
                    {/* image container */}
                    <div className=' border rounded-lg p-6 flex items-center gap-[14px] w-fit'>
                        {
                            imageURLList?.map((item, index)=>{
                                return (
                                    <img key={index} src={item} style={{width: 162, height: 102, borderRadius: 8}} alt="" />
                                )
                            })
                        }

                        {
                            imageURLList?.length > 2
                            ?
                            null
                            :
                            <div>
                                <input onChange={handleSliderChange} type="file" id="imgList" style={{display: "none"}} />
                                <label 
                                    htmlFor="imgList"
                                    style={{
                                        backgroundImage: `url(${imageURL})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center" 
                                    }}
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
                                    <h3 className="text-[#12354E] text-[14px] leading-5 poppins-light ">Size 1200x576</h3>
                                </label>
                            </div>
                            
                        }
                    </div>
                </section>
                
                {/* jodit editor contect edit container */}
                <section className="my-[30px]">
                    <label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 8, display: "block"}}>Article Details</label>
                    <JoditEditor
                        ref={editor}
                        value={content}
                        tabIndex={1}
                        onBlur={newContent => setContent(newContent)} 
                    />
                </section>

                <Form.Item
                    style={{display: "flex", alignItems: "center", justifyContent: "center"}}
                >
                    <Button
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
}

export default EditArticalBlog