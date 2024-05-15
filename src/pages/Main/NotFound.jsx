import { Button } from "antd"
import { Link } from "react-router-dom"


const NotFound = () => {
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div className='w-[743px]'>
                <h1 className='text-[#12354E] poppins-semibold text-[96px] leading-[115px]'>404 Not Found</h1>
                <p className='text-[#607888] text-center poppins-regular text-base leading-6'>Your visited page not found. You may go home page.</p>
                <Link to={"/"} style={{display: "flex", width:" 100%", marginTop: 40, alignItems: "center", justifyContent: "center"}} >
                    <Button
                        className="mx-auto rounded-lg w-[173px] h-[40px] bg-[#12354E] text-[#FCFCFC]"
                    >
                        Home
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default NotFound