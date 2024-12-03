import MetaTag from '../../components/MetaTag'
import Heading from '../../components/Heading'
import { Button } from 'antd'
import JoditEditor from 'jodit-react'
import { useRef, useState } from 'react'
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getTermsAndConditions } from '../../redux/apiSlice/TermsAndCondition/getTermsAndConditionsSlice';
import { updateTermsAndConditions } from '../../redux/apiSlice/TermsAndCondition/updateTermsAndConditionsSlice';


const TermsAndConditions = () => {
    const editor = useRef(null);
    const [content, setContent] = useState();
    const dispatch = useDispatch();
    const {terms} = useSelector(state=> state.getTermsAndConditions);
    const {loading} = useSelector(state=> state.updateTermsAndConditions);

    useEffect(()=>{
        if(terms){
            setContent(terms?.content)
        }
    }, [terms])

    useEffect(()=>{
        dispatch(getTermsAndConditions())
    }, [dispatch])

    const handleSubmit=()=>{
        dispatch(updateTermsAndConditions({content: content})).then((response)=>{
            console.log(response)
            if(response?.type === "updateTermsAndConditions/fulfilled"){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: response?.payload,
                    showConfirmButton: false,
                    timer: 1500
                }).then(()=>{
                    dispatch(getTermsAndConditions())
                })
            }
        })
    }


    return (
        <div className="bg-white shadow-lg rounded-lg p-6 h-[86vh] overflow-auto">
            <MetaTag title={"Terms And Conditions"} />
            <Heading title={"Terms And Conditions"} style={"text-left mb-6"} />


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

export default TermsAndConditions