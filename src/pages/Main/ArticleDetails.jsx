import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Heading from '../../components/Heading';
import MetaTag from '../../components/MetaTag';
import { GoArrowLeft, GoSearch } from "react-icons/go";
import ArticleTable from '../../components/Article/ArticleTable';
import { Button, Input } from 'antd';
import { HiOutlinePlusSm } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import  article1 from "../../assets/article1.png"
import  article2 from "../../assets/article2.png"
import  article3 from "../../assets/article3.png"
import  article4 from "../../assets/article4.png"
import  article5 from "../../assets/article5.png"
import  article6 from "../../assets/article6.png"

const ArticleDetails = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("")

    const data = [
        {
            name: "Checkups",
            image: article1
        },
        {
            name: "Invisalign",
            image: article2
        },
        {
            name: "Smile Design",
            image: article3
        },
        {
            name: "Orthodontics",
            image: article4
        },{
            name: "Hygienist",
            image: article5
        },
        {
            name: "Composite Bonding",
            image: article6
        },
    ]

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 h-[86vh] overflow-auto">

            <div className='flex items-center justify-between mb-6'>
                <div className='flex items-center gap-3'>
                    <div onClick={()=>navigate(`/article`)}  className="w-10 h-10 cursor-pointer rounded-lg border shadow-md flex items-center justify-center">
                        <GoArrowLeft   size={24} color='#12354E' />
                    </div>
                    <Heading title={`${name} Articles`} style={""} />
                </div>
                <div className='flex items-center gap-4'>
                    <Input
                        onChange={(e)=>setKeyword(e.target.value)}
                        prefix={<GoSearch color="#B6C0C8" size={16} />}
                        placeholder="Search..."
                        style={{
                            width: 353,
                            height: 40,
                            border: "1px solid #E7EBED",
                            outline: "none",
                            borderRadius: 8
                        }}
                        value={keyword}
                        suffix={<IoClose onClick={()=>setKeyword("")} className={`${keyword ? "block" : "hidden"} cursor-pointer`} color="#B6C0C8" size={16} />}
                        className="poppins-regular text-[#B6C0C8] text-[14px] leading-5"
                    />
                    <Link to={`/create-article/${name}`}>
                        <Button
                            style={{
                                background: "#12354E",
                                width: 134,
                                height: 40,
                                border: "none",
                                outline: "none",
                                color: "#FCFCFC",
                                borderRadius: 8,
                            }}
                            className='roboto-regular text-[14px] leading-[17px] flex items-center justify-center'
                            icon={<HiOutlinePlusSm color="#FCFCFC" size={20} />}
                        >
                            Add Article
                        </Button>
                    </Link>
                </div>
            </div>
            <MetaTag title={`${name} Articles`} />

            {/* article table */}
            <div>
                <ArticleTable data={data} name={name} />
            </div>
        </div>
    )
}

export default ArticleDetails