import { Badge } from 'antd';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='bg-white flex items-end justify-end gap-6 py-3 pr-10'>
            <div className='w-10 h-10 shadow-lg rounded-full bg-white p-2'>
                <Link to={"/notification"}>
                    <Badge count={2} color='#E2BCC1'>
                        <IoIosNotificationsOutline size={24} color='#575757' />
                    </Badge>
                </Link>
            </div>
            <div className='flex items-center gap-[10px]'>
                <div className='w-10 h-10 rounded-full bg-[#E0E0E0] p-2 border-[#12354E] border-[2px]'>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="" />
                </div>
                <p className='text-[16px] font-medium leading-6 text-[#575757]'>Nadir Hossain</p>
            </div>
        </div>
    )
}

export default Header