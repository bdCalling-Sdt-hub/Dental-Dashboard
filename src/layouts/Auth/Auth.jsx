import { Outlet } from "react-router-dom";
import Banner from "../../assets/banner.png";

const Auth = () => {
    return (
        <div
            style={{
                backgroundImage: `url(${Banner})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                width: "100%",
                height: "100vh",
            }}
            className="
                flex items-center justify-end
            "
        >
            <div className="w-[681px] h-[600px] rounded-lg bg-[#F9F9F9] mr-[60px] flex items-center justify-center">
                <div className="w-[481px] border">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
export default Auth;