/* eslint-disable react/prop-types */
import { Modal } from "antd"
import { IoClose } from "react-icons/io5";
import { ImageConfig } from "../../redux/api/baseApi";


const UserDetailsModal = ({open, setOpen}) => {
    return (
        <>
            <Modal
                centered 
                title={false}
                open={open} 
                onOk={()=>setOpen(null)} 
                onCancel={()=>setOpen(null)} 
                footer={false}
                closeIcon={false}
                width={519}
            >
                <div className="">
                    <header className="w-full relative h-[238px] flex items-center justify-center bg-[#12354E] rounded-lg">
                        <img  style={{width: 144, height: 144, borderRadius: "100%", border: "2px solid white"}} src={`${open?.patient?.profile?.startsWith("https") ?  open?.patient?.profile : `${ImageConfig}${open?.patient?.profile}` }`} alt="" />

                        <IoClose onClick={()=>setOpen(false)} className="cursor-pointer absolute top-4 right-4" size={25} color="white" />
                    </header>

                    <div className="grid grid-cols-1 gap-3 mt-6 px-2">
                        <div className="">
                            <label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 8, display: "block"}}>Name</label>
                            <p className="text-[#415D71] text-[12] leading-5 poppins-regular"> {open?.patient?.name} </p>
                        </div>

                        <div className="">
                            <label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 8, display: "block"}}>Patient Category</label>
                            <p className="text-[#415D71] text-[12] leading-5 poppins-regular">{open?.patient?.category} </p>
                        </div>

                        <div className="">
                            <label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 8, display: "block"}}>Email</label>
                            <p className="text-[#415D71] text-[12] leading-5 poppins-regular">{open?.email}</p>
                        </div>


                        <div className="">
                            <label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 8, display: "block"}}>Contact No</label>
                            <p className="text-[#415D71] text-[12] leading-5 poppins-regular"> {open?.patient?.contactNo}  </p>
                        </div>

                        <div className="">
                            <label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 8, display: "block"}}>Date of Birth</label>
                            <p className="text-[#415D71] text-[12] leading-5 poppins-regular"> {open?.patient?.dateOfBirth}</p>
                        </div>

                        <div className="">
                            <label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 8, display: "block"}}>Age</label>
                            <p className="text-[#415D71] text-[12] leading-5 poppins-regular"> {open?.patient?.age}  </p>
                        </div>
                    </div>

                </div>
            </Modal>
        </>
    )
}

export default UserDetailsModal