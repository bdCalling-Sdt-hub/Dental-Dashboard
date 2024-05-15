import MetaTag from '../../components/MetaTag'
import Heading from '../../components/Heading'
import { Button } from 'antd'
import JoditEditor from 'jodit-react'
import { useRef, useState } from 'react'
import Swal from 'sweetalert2'

const TermsAndConditions = () => {
    const editor = useRef(null);
    const [content, setContent] = useState();

    const handleSubmit=()=>{
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Terms And Condition Updated Successfully",
            showConfirmButton: false,
            timer: 1500,
            width: 700
        })
    }
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 h-[86vh] overflow-auto">
            <MetaTag title={"Terms And Condition"} />
            <Heading title={"Terms And Condition"} style={"text-left mb-6"} />


            {/* editor  */}
            <div className='editor'>
                <JoditEditor
                    ref={editor}
                    value={content}
                    onChange={newContent => setContent(newContent)} 
                    config={{
                        height: 350
                    }}
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
                    Save & Change
                </Button>
            </div>
        </div>
    )
}

export default TermsAndConditions