import { Badge } from 'antd';
import { useContext } from 'react';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { UserContext } from '../../provider/User';
import { ImageConfig } from '../../redux/api/baseApi';

const Header = () => {
    const {user} = useContext(UserContext);

    const src = user?.admin?.profile?.startsWith("https") ? user?.admin?.profile : `${ImageConfig}/${user?.admin?.profile}`
    return (
        <div className='bg-white flex items-end justify-end gap-6 py-3 pr-10'>
            <div className='w-10 h-10 shadow-lg rounded-full bg-white p-2'>
                <Link to={"/notification"}>
                    <Badge count={2} color='#E2BCC1'>
                        <IoIosNotificationsOutline size={24} color='#575757' />
                    </Badge>
                </Link>
            </div>

            <Link to={"/profile"}>
                <div className='flex items-center gap-[10px]' >
                    <img className='border-[#12354E] border-[3px]' src={src} style={{width: 40, height: 40, borderRadius: "100%"}} alt="" />
                    <p className='text-[16px] font-medium leading-6 text-[#575757]'>{user?.admin?.name}</p>
                </div>
            </Link>
        </div>
    )
}

export default Header