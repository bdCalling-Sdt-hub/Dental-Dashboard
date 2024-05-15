import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Heading from '../../components/Heading';
import MetaTag from '../../components/MetaTag';
import { GoArrowLeft, GoSearch } from "react-icons/go";
import ArticleTable from '../../components/Article/ArticleTable';
import { Button, Input } from 'antd';
import { HiOutlinePlusSm } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

const ArticleDetails = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("")

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
                </div>
            </div>
            <MetaTag title={`${name} Articles`} />

            {/* article table */}
            <div>
                <ArticleTable name={name} />
            </div>
        </div>
    )
}

export default ArticleDetails