import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div className="grid grid-cols-12 bg-[#FCF8F9]"  style={{backgroundColor:"#F9F9F9"}}>   
            <div className='col-span-2 h-screen overflow-y-auto bg-white px-[25px]'>
                <Sidebar />
            </div>
            <div className="col-span-10 w-full  text-black rounded-md">
                <Header/>
                <div className="h-[calc(100vh-80px)] overflow-y-auto p-6">
                    <Outlet />
                </div>
            </div>
         </div>
    )
}

export default Main