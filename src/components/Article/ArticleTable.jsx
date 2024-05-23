/* eslint-disable react/prop-types */
import React from 'react';
import thubmnail from "../../assets/thubnail.png"
import { RiDeleteBin6Line, RiEdit2Line } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';


const data = [
    {
        name: "Dental Hygiene & The Role of Regular Visits at Banning Dental Group",
        detetails: `Maintaining oral health is a critical component of overall wellbeing. Regular visits to a dental hygienist, like those provided by the Banning Dental Group, offer comprehensive care that goes beyond just keeping your teeth clean. These appointments are crucial for preventing dental issues and ensuring long-term dental health.
        When you visit a dental hygienist, you receive thorough cleanings that remove plaque and tartar buildup. Such accumulations, if left unchecked, can lead to gum disease and tooth decay—common conditions that can be both painful and expensive to treat. The hygienist's specialized tools clean areas of your mouth that regular brushing and flossing might miss.
        Moreover, dental hygienists are pivotal in spotting early signs of oral problems. Early detection can lead to simpler and less costly treatments. Dental hygienists can also offer tailored advice for at-home care, including brushing techniques and suitable products, ensuring your personal routine is as effective as possible.
        Education is another significant aspect of a dental hygienist's role. Understanding the effects of diet, lifestyle choices, and other factors on oral health can empower you to make better decisions for your teeth and gums. For example, learning about the impact of smoking or sugar on oral health can motivate behavior change for enhanced overall health.
        At Banning Dental Group, consistency in visiting dental hygienists ensures that any changes in your oral health are recorded and monitored. This way, the hygienist and dentist can work together to adjust treatment plans promptly, maintaining optimal oral health.
        In short, dental hygienists are essential allies in the fight against gum disease, tooth decay, and other oral conditions. Their expertise contributes to a healthier smile and a healthier you. Regular appointments at Banning Dental Group can save you from future discomfort and expensive dental procedures, while also providing a foundation for a lifetime of healthy smiles.
        `
    },
    {
        name: "",
        detetails: ""
    },
    {
        name: "",
        detetails: ""
    },
    {
        name: "",
        detetails: ""
    },
    {
        name: "",
        detetails: ""
    },
    {
        name: "",
        detetails: ""
    },
    {
        name: "",
        detetails: ""
    },
    {
        name: "",
        detetails: ""
    }
]


const ArticleTable = ({data, name}) => {
    const handleDelete=()=>{
        Swal.fire({
            title: "Are Your Sure ?",
            html: `Do you want to  delete This Article ? <br> Only Super admin can delete Article`,
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
        <div>
            <table className="w-full table">
                <thead>
                    <tr className="text-left w-full bg-[#E7EBED] custom-table-list">
                        {
                            ["S.ID ", "Thumbnail image", "Article Name", "Patient Category", "Actions"].map((item, index)=>{
                                return (
                                    <th 
                                        key={index} 
                                        className={`text-[#575757] poppins-medium text-[18px] leading-7`}
                                        style={{
                                            display: name !== "Patient care" && item === "Patient Category" ? "none" : "table-cell"
                                        }}
                                        colSpan={name !== "Patient care" && item === "Patient Category" ? 0 : 1}
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
                                    <div className="h-[60px]">
                                        <img  src={item?.image} alt="" />
                                    </div>
                                </td>

                                <td className="text-[#707070] h-[60px]  roboto-regular text-base ">{item?.name}</td>
                                {

                                    name === "Patient care" && <td className="text-[#707070] h-[60px]  roboto-regular text-base ">Gum</td>
                                }

                                <td>
                                    <div className="flex items-center gap-2 h-[60px]">
                                        <Link to={`/edit-article-blog/${name}`}>
                                            <div onClick={()=>localStorage.setItem("article", JSON.stringify(item))} className="flex  cursor-pointer items-center border w-10 h-10 rounded-lg border-[#E6E5F1] justify-center">
                                                <RiEdit2Line size={18} color="#B6C0C8" />
                                            </div>
                                        </Link>

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

            <div className="flex items-center justify-center relative mt-6">
                <Pagination 
                    defaultCurrent={1} 
                    total={50}
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