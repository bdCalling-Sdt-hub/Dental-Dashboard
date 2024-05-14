import { FaUsers } from 'react-icons/fa'
import UserChart from '../../components/Home/UserChart'
import UserlistTable from '../../components/Home/UserlistTable'

const Home = () => {
    const item = [
        {
            id: 1,
            name: "Total Users",
            total: 520,
            icon: <FaUsers size={40} color='#594A05' />
        },
        {
            id: 1,
            name: "Monthly Progress",
            total: 620,
            icon: <FaUsers size={40} color='#594A05' />
        }
    ]
    return (
        <div>

            {/* over view */}
            <div className='grid grid-cols-2 gap-6 '>
                {
                    item?.map((item, index)=>{
                        return (
                            <div
                                key={index}
                                className='
                                    bg-white
                                    rounded-[10px] 
                                    shadow-lg 
                                    p-6 flex 
                                    items-center 
                                    gap-6
                                '
                            >
                                <div 
                                    className='
                                        w-[71px] 
                                        h-[71px] 
                                        bg-primary 
                                        flex items-center justify-center 
                                        rounded-full
                                    '
                                >
                                    {item?.icon}
                                </div>
                                <div>
                                    <p className='text-[16px] font-normal leading-6 text-[#607888] poppins-regular text-base'>{item?.name}</p>
                                    <h1 
                                        className='
                                            text-[32px] 
                                            text-[#12354E]
                                            poppins-semibold 
                                            leading-[30px]
                                            mt-2
                                        '
                                    >
                                        {item?.total}
                                    </h1>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            {/* User overview by chart */}
            <div className='my-6 shadow-lg border rounded-lg'>
                <UserChart/>
            </div>

            <div className='shadow-lg border rounded-lg p-1'>
                <UserlistTable/>
            </div>
        </div>
    )
}

export default Home