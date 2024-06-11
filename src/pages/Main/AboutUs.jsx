import MetaTag from '../../components/MetaTag'
import Heading from '../../components/Heading'
import { Button } from 'antd'
import JoditEditor from 'jodit-react'
import { useRef, useState } from 'react'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAbout } from '../../redux/apiSlice/About/getAboutSlice';
import { updateAbout } from '../../redux/apiSlice/About/updateAboutSlice';


const AboutUs = () => {
    const editor = useRef(null);
    const [content, setContent] = useState();
    const dispatch = useDispatch();
    const {about} = useSelector(state=> state.getAbout);
    const {loading} = useSelector(state=> state.updateAbout);

    useEffect(()=>{
        if(about){
            setContent(about?.content)
        }
    }, [about])

    useEffect(()=>{
        dispatch(getAbout())
    }, [dispatch])

    const handleSubmit=()=>{
        dispatch(updateAbout({content: content})).then((response)=>{
            if(response?.type === "updateAbout/fulfilled"){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "About Us Updated  Successfully",
                    showConfirmButton: false,
                    timer: 1500
                }).then(()=>{
                    dispatch(getAbout())
                })
            }
        })
    }
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 h-[86vh] overflow-auto">
            <MetaTag title={"About Us"} />
            <Heading title={"About Us"} style={"text-left mb-6"} />


            {/* editor  */}
            <div className='editor'>
                <JoditEditor
                    ref={editor}
                    value={content}
                    onChange={newContent => setContent(newContent)} 
                    
                />
            </div>


            <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: 40}}>
                <Button
                    onClick={handleSubmit}
                    style={{
                        background: "#12354E",
                        width: 134,
                        height: 48,
                        border: "none",
                        outline: "none",
                        color: "#FCFCFC",
                        borderRadius: 8,
                    }}
                    className='roboto-regular text-[14px] leading-[17px] flex items-center justify-center'
                >
                    {loading ? "Loading..." : "Save & Change"}  
                </Button>
            </div>
        </div>
    )
}

export default AboutUs