/* eslint-disable no-unused-vars */
import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { FaRandom } from "react-icons/fa";
import Swal from "sweetalert2";
import MetaTag from "../../components/MetaTag"
import { useDispatch, useSelector } from "react-redux";
import { createPatient } from "../../redux/apiSlice/Patient/createPatientSlice";
import { getCategory } from "../../redux/apiSlice/Category/getCategorySlice";
const { Option } = Select;


const CreatePatientProfile = () => {
    const dispatch = useDispatch();
    const [randomPin, setRandomPin] = useState(null)
    const [randomPinState, setRandomPinState] = useState("");
    const [randomPasswordState, setRandomPasswordState] = useState("");
    const [randomPassword, setRandomPassword] = useState(null);
    const [form] = Form.useForm();
    const { categories } = useSelector(state=> state.getCategory)

    useEffect(()=>{
        dispatch(getCategory())
    },[dispatch])

    form.setFieldsValue()

    if(randomPinState){
        setTimeout(()=>{
            setRandomPinState(false)
        }, 1000)
    }

    if(randomPasswordState){
        setTimeout(()=>{
            setRandomPasswordState(false)
        }, 1000)
    }
    const handleGeneratedPin=()=>{
        const randomNumber = Math.floor(Math.random() * 900000) + 100000;
        setRandomPinState(true);
        setRandomPin(randomNumber)
        form.setFieldsValue({ password: randomNumber.toString() });
    }
    const handleGeneratePassword=()=>{
        const randomNumber = Math.floor(Math.random() * 900000) + 100000;
        setRandomPasswordState(true);
        setRandomPassword(randomNumber)
        form.setFieldsValue({ pin: randomNumber.toString() });
    }

    const handleSubmit=(values)=>{
        values.plan = "ss"
        dispatch(createPatient(values)).then((response)=>{
            if(response.type === "createPatient/fulfilled"){
                Swal.fire({
                    title: "Congratulations!",
                    html: `
                        <div className="patient-profile">
                        Your patient profile is ready now 
                        <br> 
                        S.NO: #12339
                        <br> 
                        Patient name: ${values?.name}
                        <br> 
                        Email: ${values?.email}
                        <br>
                        Pin: ${values?.pin}
                        <br>
                        Password: ${values?.password}
                    </div>
                    `,
                    confirmButtonText:'Ok',
                    customClass: {
                        confirmButton: 'custom-send-button',
                    }
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
        <div className="bg-white shadow-lg rounded-lg p-6">
            <MetaTag title={"Create Patient Profile"}/>
            <h1 className={`text-[#12354E] text-base leading-8 poppins-semibold text-left mb-5 `}>Create Patient Profile</h1>


            <Form form={form} 
                layout="vertical" 
                className="grid grid-cols-12 gap-6 mt-6" 
                onFinish={handleSubmit}
            >
                    
                <Form.Item
                    style={{marginBottom: 0}}
                    name={"name"}
                    rules={[
                        {
                            required: true,
                            message: "Enter Patient First Name"
                        }
                    ]}
                    className="col-span-6"
                    label={<label className="text-[#415D71] text-sm block leading-5 poppins-semibold" >First  Name</label>}
                >
                    <Input
                        placeholder="Enter Patient First Name"
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

                <Form.Item
                    style={{marginBottom: 0}}
                    name={"surname"}
                    rules={[
                        {
                            required: true,
                            message: "Enter Surname Name"
                        }
                    ]}
                    className="col-span-6"
                    label={<label className="text-[#415D71] text-sm block leading-5 poppins-semibold" >Surname</label>}
                >
                    <Input
                        placeholder="Enter Surname"
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

                <Form.Item
                        style={{marginBottom: 0}}
                        name={"email"}
                        rules={[
                            {
                                required: true,
                                message: "Enter Patient Email"
                            }
                        ]}
                        className="col-span-6"
                        label={<label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 8, display: "block"}}>Email</label>}
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

                <Form.Item
                        style={{marginBottom: 0}}
                        name={"contactNo"}
                        rules={[
                            {
                                required: true,
                                message: "Enter Contact Number"
                            }
                        ]}
                        className="col-span-6"
                        label={<label className="text-[#415D71] text-sm block leading-5 poppins-semibold"  >Contact Number</label>}
                    >
                        <Input
                            placeholder="Enter Contact Number"
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

                <Form.Item
                        style={{marginBottom: 0}}
                        name={"dateOfBirth"}
                        rules={[
                            {
                                required: true,
                                message: "Enter Patient Date Of Birth"
                            }
                        ]}
                        className="col-span-6"
                        label={<label className="text-[#415D71] text-sm block leading-5 poppins-semibold"  >Date of Birth</label>}
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

                <Form.Item
                        style={{marginBottom: 0}}
                        name={"age"}
                        className="col-span-6"
                        rules={[
                            {
                                required: true,
                                message: "Enter Patient Age"
                            }
                        ]}
                        getValueFromEvent={(e)=>Number(e.target.value)}
                        label={<label className="text-[#415D71] text-sm block leading-5 poppins-semibold" >Age</label>}
                    >
                        <Input
                            type="number"
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

                <Form.Item 
                    className="col-span-6"
                    style={{marginBottom: 0}}
                    name="gender"
                    rules={[
                        {
                            required: true,
                            message: "Enter Patient Gender"
                        }
                    ]}
                    label={<p className="text-[#415D71] text-sm leading-5 poppins-semibold">Gender</p>}
                >
                    <Select
                        style={{
                            width: "100%",
                            height: "42px",
                            border: "1px solid #DCDDDE",
                            borderRadius: "8px",
                            color: "black",
                            outline: "none"
                        }}
                    >
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                    </Select>
                </Form.Item>
                
                <Form.Item
                        className="col-span-6"
                        style={{marginBottom: 0}}
                        name={"category"}
                        rules={[
                            {
                                required: true,
                                message: "Enter Patient Plan"
                            }
                        ]}
                        label={<label className="text-[#415D71] text-sm block leading-5 poppins-semibold"  >Patient Plan</label>}
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
                            placeholder="Select Patient Plan"
                        >
                            {
                                categories?.map((category, index)=>{
                                    return(
                                        <Option key={index} value={category?.categoryName}  >{category?.categoryName}</Option>
                                    )
                                })
                            }
                        </Select>
                </Form.Item>

                <Form.Item
                        style={{
                            marginBottom: 0,
                            width: "100%"
                        }}
                        name={"pin"}
                        className="col-span-6"
                        label={<label className="text-[#415D71] text-sm block leading-5 poppins-semibold" >Random Pin number</label>}
                >
                        <div className="w-full flex items-center  gap-6">
                            <Input
                                type={`${randomPinState ? "text" : "password"}`}
                                placeholder="Enter Patient Random Pin"
                                style={{
                                    width: "100%",
                                    height: 48,
                                    border: "1px solid #E7EBED",
                                    outline: "none",
                                    borderRadius: 8
                                }}
                                value={randomPin}
                                className="poppins-regular text-[#6A6A6A] text-[14px] leading-5"
                            />
                            <Button
                                onClick={handleGeneratedPin}
                                style={{
                                    width: "100%",
                                    height: 48,
                                    border: "1px solid #E7EBED",
                                    outline: "none",
                                    borderRadius: 8,
                                    color: "#12354E",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "4px"
                                }}
                                className="roboto-medium text-sm leading-4"
                            >
                                Random Pin
                                <FaRandom size={18} color="#12354E" />
                            </Button>
                        </div>
                </Form.Item>

                <Form.Item
                    style={{
                        marginBottom: 0,
                        width: "100%"
                    }}
                    className="col-span-6"
                    name={"password"}
                    label={ <label className="text-[#415D71] block text-sm leading-5 poppins-semibold" htmlFor="">Random Password</label>}
                >
                    <div className="w-full flex items-center  gap-6">
                        <Input
                            placeholder="Enter Patient Random Password"
                            type={`${randomPasswordState ? "text" : "password"}`}
                            style={{
                                width: "100%",
                                height: 48,
                                border: "1px solid #E7EBED",
                                outline: "none",
                                borderRadius: 8
                            }}
                            value={randomPassword}
                            className="poppins-regular text-[#6A6A6A] text-[14px] leading-5"
                        />
                        <Button
                            onClick={handleGeneratePassword}
                            style={{
                                width: "60%",
                                height: 48,
                                border: "1px solid #E7EBED",
                                outline: "none",
                                borderRadius: 8,
                                color: "#12354E",
                                }}
                                className="roboto-medium text-sm leading-4 flex items-center justify-center gap-4"
                                >
                            Random Password
                            <FaRandom size={18} color="#12354E" />
                        </Button>
                    </div>
                </Form.Item>
                
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
                        Send  & Change
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default CreatePatientProfile