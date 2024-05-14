import Person from "../../assets/person.png";

const Unread = () => {
    return (
        <div>
            <div className='mt-[14px] grid grid-cols-1 gap-1'>
                    {
                        [...Array(4)].map((item, index)=>{
                            return (
                                <div key={index} className={`flex items-center gap-[10px] bg-[#E7EBED]  rounded-lg p-2`}>
                                    <img src={Person} style={{width: 56, height: 56, borderRadius: "100%", border: "2px solid #92A2AE"}} alt="" />
                                    <div className='w-full'>
                                        <div className='flex items-center justify-between pb-[6px]'>
                                            <h1 className='text-[#12354E] poppins-medium  text-sm leading-5'>Patient Mahfud</h1>
                                            <p className='text-[#8B8B8B] poppins-regular  text-sm leading-5'>3:00 PM</p>
                                        </div>
                                        <p className='text-[#8B8B8B] poppins-regular  text-sm leading-5'>Hello.. Doc?</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
        </div>
    )
}

export default Unread