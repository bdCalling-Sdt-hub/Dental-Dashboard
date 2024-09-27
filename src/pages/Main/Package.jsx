import { useEffect } from 'react'
import MetaTag from '../../components/MetaTag'
import { Button, Form, Input } from 'antd'
import { FaCircleCheck } from "react-icons/fa6";
import Swal from 'sweetalert2';
import { CiCircleMinus } from 'react-icons/ci';
import { GoPlusCircle } from "react-icons/go";
import { getPackage } from "../../redux/apiSlice/Package/getPackageSlice";
import { updatePackage } from "../../redux/apiSlice/Package/updatePackageSlice";
import { useDispatch, useSelector } from 'react-redux';

const Package = () => {
    const dispatch = useDispatch();
    const { packages } = useSelector(state=> state.getPackage)
    const {loading}  = useSelector(state=> state.updatePackage);
    const [form] = Form.useForm()

    useEffect(()=>{
        dispatch(getPackage());
    }, [dispatch])

    useEffect(()=>{
        if(packages){
            form.setFieldsValue({packageName: packages?.packageName, packageDetails: packages?.packageDetails })
        }
    }, [form, packages])

    const handleSubmit=(values)=>{

        dispatch(updatePackage({id: packages?._id, data:values})).then((response)=>{
            if(response.type === "updatePackage/fulfilled"){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: response?.payload,
                    showConfirmButton: false,
                    timer: 1500
                }).then(()=>{
                    dispatch(getPackage());
                })
            }else{
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: response?.payload,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
        
    }

    
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 h-[86vh] overflow-y-scroll">

            {/* helmet */}
            <MetaTag title={"Manage Perks"}/>
            <h1 className={`text-[#12354E] text-base leading-8 poppins-semibold text-left mb-5 `}>Manage Perk</h1>

            <Form
                onFinish={handleSubmit}
                form={form}
            >
                <label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 8, display: "block"}}>Name</label>
                <Form.Item
                    name={"packageName"}
                >
                    <Input
                        placeholder="Enter Package Name"
                        style={{
                            width: 407,
                            height: 48,
                            border: "1px solid #E7EBED",
                            outline: "none",
                            borderRadius: 8
                        }}
                        className="poppins-regular text-[#6A6A6A] text-[14px] leading-5"
                    />
                </Form.Item>
                
                <div className='w-[407px] custom-input'>
                    <label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 8, display: "block"}}>Package Details</label>
                    
                    <Form.Item
                        
                        style={{ border: "1px solid #E7EBED", borderRadius: 8, padding: " 16px 24px "}}
                    >
                        <Form.List name={"packageDetails"}>
                                    {
                                        (fields, { add, remove }) => (
                                            <>
                                                {
                                                    fields.map((field, index) => {
                                                        return(
                                                        <Form.Item
                                                            required={false}
                                                            key={index}
                                                            className="w-full"
                                                            style={{marginBottom : 0}}
                                                        >
                                                            <div  className='flex items-center mb-2 gap-[30px] w-full'>
                                                                <Form.Item
                                                                    name={field.name}
                                                                    fieldKey={field.fieldKey}
                                                                    validateTrigger={['onChange', 'onBlur']}
                                                                    style={{marginBottom : 0}}
                                                                    className='w-full'
                                                                >
                                                                    <Input
                                                                        style={{
                                                                            width:"100%",
                                                                            height: 40,
                                                                            border: "1px solid #E7EBED",
                                                                            background: "transparent",
                                                                            borderRadius: "none",
                                                                            outline: "none",
                                                                            color: "#415D71",
                                                                        }}
                                                                        placeholder='Enter Package Services'
                                                                        className='roboto-regular text-sm leading-5'
                                                                        prefix={<FaCircleCheck size={20} style={{marginRight: 5}} color='#12354E' />}
                                                                    />
                                                                </Form.Item>
                                                                <div>
                                                                    {
                                                                        fields.length > 0 ? (
                                                                            <CiCircleMinus
                                                                                size={30}
                                                                                className="dynamic-delete-button cursor-pointer text-[#D7263D]"
                                                                                onClick={() => remove(field.name)}
                                                                            />
                                                                        ) 
                                                                        : 
                                                                        null
                                                                    }
                                                                </div>
                                                            </div>
                                                        </Form.Item>
                                                    )})
                                                }

                                                <Form.Item 
                                                    style={{width: "100%", margin: 0, display: "flex", alignItems: "flex-end", justifyContent: "flex-end"}}
                                                >
                                                    <GoPlusCircle
                                                        size={30}
                                                        color='#12354E'
                                                        onClick={() => add()}
                                                    />
                                                </Form.Item>
                                            </>
                                        )
                                    }
                        </Form.List>
                    </Form.Item>
                </div>

                <Form.Item
                    style={{margin: 0}}
                >
                    <Button
                        htmlType='submit'
                        style={{
                            background: "#12354E",
                            width: 171,
                            height: 48,
                            border: "1px solid #E0E0E0",
                            outline: "none",
                            margin: "0 auto",
                            color: "white",
                            borderRadius: 8
                        }}
                        className='roboto-medium-italic text-[14px] leading-[17px]'
                    >
                         {loading ? "Loading..." : "Confirm Package"}
                    </Button>
                </Form.Item>
            </Form>
            
        </div>
    )
}

export default Package