/* eslint-disable react/prop-types */
import { Button, Form, Input, Modal, Select } from "antd"
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { ImageConfig } from "../../redux/api/baseApi";
import { updatePatient } from "../../redux/apiSlice/Patient/updatePatientSlice.js"
import Swal from 'sweetalert2';
const { Option } = Select;


const PatientEditModal = ({editModal, setEditModal}) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState(null)

    useEffect(()=>{
        if(editModal){
            form.setFieldsValue(editModal);
            setImageUrl(`${ImageConfig}${editModal?.image}`)
        }
    }, [form, editModal])

    const handleSubmit=(values)=>{
        const formData = new FormData();

        Object.key(values).forEach(element => {
            formData.append(element, values[element])
        });
        
        dispatch(updatePatient({id: editModal?._id, data: formData})).then((response)=>{
            if(response.type === "updatePatient/fulfilled"){
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: response?.payload,
                    showConfirmButton: false,
                    timer: 1500
                }).then(()=>{
                    // form.
                })
            }
        })
    }
    return (
        <>
            <Modal
                centered 
                title={false}
                open={editModal} 
                onOk={()=>setEditModal(false)} 
                onCancel={()=>setEditModal(false)} 
                footer={false}
                closeIcon={false}
                width={736}
            >
                <div className="">
                    <header className="w-full relative h-[238px] flex items-center justify-center bg-[#12354E] rounded-lg">
                        <img src={imageUrl} style={{width: 144, height: 144, borderRadius: "100%", border: "2px solid white"}} alt="" />
                        <IoClose onClick={()=>setEditModal(false)} className="cursor-pointer absolute top-4 right-4" size={25} color="white" />
                    </header>

                    <Form className="grid grid-cols-12 gap-6 mt-6 px-2" form={form} onFinish={handleSubmit}>
                        <div className="col-span-6">
                            <label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 8, display: "block"}}>Name</label>
                            <Form.Item
                                style={{marginBottom: 0}}
                                name={"name"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Enter Patiant Name"
                                    }
                                ]}
                            >
                                <Input
                                    placeholder="Enter Patient Name"
                                    style={{
                                        width: "100%",
                                        height: 48,
                                        border: "1px solid #E7EBED",
                                        outline: "none",
                                        borderRadius: 8
                                    }}
                                    className="poppins-regular text-[#6A6A6A] text-[14px] leading-5"
                                />
                            </Form.Item>
                        </div>

                        <div className="col-span-6">
                            <label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 8, display: "block"}}>Patient Category</label>
                            <Form.Item
                                style={{marginBottom: 0}}
                                name={"category"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Enter Patient Category"
                                    }
                                ]}
                            >
                                <Select
                                    style={{
                                        width: "100%",
                                        height: 48,
                                        border: "1px solid #E7EBED",
                                        outline: "none",
                                        borderRadius: 8
                                    }}
                                    className="poppins-regular text-[#6A6A6A] text-[14px] leading-5"
                                    defaultValue={"Gum"}
                                >
                                    <Option value="gum">Gum</Option>
                                    <Option value="cavities">Cavities</Option>
                                </Select>
                            </Form.Item>
                        </div>

                        <div className="col-span-6">
                            <label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 8, display: "block"}}>Email</label>
                            <Form.Item
                                style={{marginBottom: 0}}
                                name={"Email"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Enter Patient Email"
                                    }
                                ]}
                            >
                                <Input
                                    placeholder="Enter Patient Email"
                                    style={{
                                        width: "100%",
                                        height: 48,
                                        border: "1px solid #E7EBED",
                                        outline: "none",
                                        borderRadius: 8
                                    }}
                                    className="poppins-regular text-[#6A6A6A] text-[14px] leading-5"
                                />
                            </Form.Item>
                        </div>


                        <div className="col-span-6">
                            <label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 8, display: "block"}}>Contact No</label>
                            <Form.Item
                                style={{marginBottom: 0}}
                                name={"contact_no"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Enter Patient Contact No."
                                    }
                                ]}
                            >
                                <Input
                                    placeholder="Enter Patient Contact No."
                                    style={{
                                        width: "100%",
                                        height: 48,
                                        border: "1px solid #E7EBED",
                                        outline: "none",
                                        borderRadius: 8
                                    }}
                                    className="poppins-regular text-[#6A6A6A] text-[14px] leading-5"
                                />
                            </Form.Item>
                        </div>

                        <div className="col-span-6">
                            <label htmlFor="" style={{marginBottom: 8, display: "block"}}>Date of Birth</label>
                            <Form.Item
                                style={{marginBottom: 0}}
                                name={"date_of_birth"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Enter Patient Date Of Birth"
                                    }
                                ]}
                            >
                                <Input
                                    placeholder="Enter Patient Date Of Birth"
                                    style={{
                                        width: "100%",
                                        height: 48,
                                        border: "1px solid #E7EBED",
                                        outline: "none",
                                        borderRadius: 8
                                    }}
                                    className="poppins-regular text-[#6A6A6A] text-[14px] leading-5"
                                />
                            </Form.Item>
                        </div>

                        <div className="col-span-6">
                            <label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 8, display: "block"}}>Age</label>
                            <Form.Item
                                style={{marginBottom: 0}}
                                name={"age"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Enter Patient Age"
                                    }
                                ]}
                            >
                                <Input
                                    placeholder="Enter Patient Age"
                                    style={{
                                        width: "100%",
                                        height: 48,
                                        border: "1px solid #E7EBED",
                                        outline: "none",
                                        borderRadius: 8
                                    }}
                                    className="poppins-regular text-[#6A6A6A] text-[14px] leading-5"
                                />
                            </Form.Item>
                        </div>

                        <div className="col-span-6">
                            <label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 8, display: "block"}}>Gender</label>
                            <Form.Item
                                style={{marginBottom: 0}}
                                name={"gender"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Enter Patient Gender"
                                    }
                                ]}
                            >
                                <Select
                                    style={{
                                        width: "100%",
                                        height: 48,
                                        border: "1px solid #E7EBED",
                                        outline: "none",
                                        borderRadius: 8
                                    }}
                                    className="poppins-regular text-[#6A6A6A] text-[14px] leading-5"
                                    defaultValue={"Male"}
                                >
                                    <Option value="male">Male</Option>
                                    <Option value="female">Female</Option>
                                </Select>
                            </Form.Item>
                        </div>

                        <div className="col-span-6">
                            <label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 8, display: "block"}}>Plan</label>
                            <Form.Item
                                style={{marginBottom: 0}}
                                name={"name"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Enter Patiant Plan"
                                    }
                                ]}
                            >
                                <Input
                                    placeholder="Enter Patient Plan"
                                    style={{
                                        width: "100%",
                                        height: 48,
                                        border: "1px solid #E7EBED",
                                        outline: "none",
                                        borderRadius: 8
                                    }}
                                    className="poppins-regular text-[#6A6A6A] text-[14px] leading-5"
                                />
                            </Form.Item>
                        </div>
                        
                        <Form.Item className="col-span-12" style={{display: "flex", width: "100%", marginBottom: 0, alignItems: "center", justifyContent: "center"}}>
                            <Button
                                htmlType='submit'
                                style={{
                                    background: "#12354E",
                                    width: 163,
                                    height: 48,
                                    border: "1px solid #E0E0E0",
                                    outline: "none",
                                    margin: "0 auto",
                                    color: "white",
                                    borderRadius: 8
                                }}
                                className='roboto-medium-italic text-[14px] leading-[17px]'
                            >
                                Sand  & Change
                            </Button>
                        </Form.Item>


                    </Form>

                </div>
            </Modal>
        </>
    )
}

export default PatientEditModal