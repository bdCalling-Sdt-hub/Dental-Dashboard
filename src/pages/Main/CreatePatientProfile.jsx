/* eslint-disable no-unused-vars */
import { Button, Form, Input, Select } from "antd";
import { useState } from "react";
import { RiImageAddLine } from "react-icons/ri";
import { FaRandom } from "react-icons/fa";
import Swal from "sweetalert2";
import MetaTag from "../../components/MetaTag"
import { useDispatch } from "react-redux";
import { createPatient } from "../../redux/apiSlice/Patient/createPatientSlice";
const { Option } = Select;


const CreatePatientProfile = () => {
    const [image, setimage] = useState();
    const [imageURL, setImageURL] = useState();
    const dispatch = useDispatch();
    const [randomPin, setRandomPin] = useState("")
    const [randomPinState, setRandomPinState] = useState("");
    const [randomPasswordState, setRandomPasswordState] = useState("");
    const [randomPassword, setRandomPassword] = useState("");
    const [form] = Form.useForm();

    form.setFieldsValue()

    const handleChange = (e)=>{
        const file = e.target.files[0];
        setimage(file);
        const url = URL.createObjectURL(file);
        setImageURL(url)
    }

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
    const handleGenaratePin=()=>{
        const randomNumber = Math.floor(Math.random() * 900000) + 100000;
        setRandomPinState(true);
        setRandomPin(randomNumber)
    }
    const handleGenaratePassword=()=>{
        const randomNumber = Math.floor(Math.random() * 900000) + 100000;
        setRandomPasswordState(true);
        setRandomPassword(randomNumber)
    }

    const handleSubmit=(values)=>{
        console.log(values)
        const formData = new FormData();

        form.append("image", image)

        Object.keys(values).forEach((key)=>{
            formData.append(key, values[key])
        })

        dispatch(createPatient(formData)).then((response)=>{
            if(response.type === "createPatient/fulfilled"){
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


        /* Swal.fire({
            title: "Congratulations!",
            html: `
                <div className="patient-profile">
                Your patient profile is ready now 
                <br> 
                S.NO: #12339
                <br> 
                Patient name: Patient Mahfud
                <br> 
                Email: Mahfud@gmail.com
                <br>
                <br>
                <h1>Send profile details at your patient email</h1>
            </div>
            `,
            confirmButtonText: 'Send Email',
            customClass: {
                confirmButton: 'custom-send-button',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(result)
            }
        }); */
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <MetaTag title={"Create Patient Profile"}/>
            <h1 className={`text-[#12354E] text-base leading-8 poppins-semibold text-left mb-5 `}>Create Patient Profile</h1>
            <div>
                <input onChange={handleChange} type="file" id="img" style={{display: "none"}} />
                <label 
                    htmlFor="img"
                    style={{
                        backgroundImage: `url(${imageURL})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center" 
                    }}
                    className={`
                        w-[170px] 
                        h-[139px]
                        cursor-pointer  
                        border border-[#929394]  border-dashed
                        flex 
                        flex-col items-center justify-center 
                        rounded-lg 
                    `}
                >
                    <RiImageAddLine color='#607888' size={38} /> 
                    <h3 className="text-[#12354E] text-[14px] leading-5 poppins-light ">Browse Photo</h3>
                </label>
            </div>


            <Form layout="vertical" className="grid grid-cols-12 gap-6 mt-6" onFinish={handleSubmit}>
                <div className="col-span-6">
                    
                    <Form.Item
                        style={{marginBottom: 0}}
                        name={"name"}
                        rules={[
                            {
                                required: true,
                                message: "Enter Patiant Name"
                            }
                        ]}
                        className="col-span-6"
                        label={<label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 8, display: "block"}}>Name</label>}
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
                    
                    <Form.Item
                        className="col-span-6"
                        style={{marginBottom: 0}}
                        name={"category"}
                        rules={[
                            {
                                required: true,
                                message: "Enter Patient Category"
                            }
                        ]}
                        label={<label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 8, display: "block"}}>Patient Category</label>}
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
                </div>


                <div className="col-span-6">
                    
                    <Form.Item
                        style={{marginBottom: 0}}
                        name={"contactNo"}
                        rules={[
                            {
                                required: true,
                                message: "Enter Patient Contact No."
                            }
                        ]}
                        className="col-span-6"
                        label={<label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 8, display: "block"}}>Contact No</label>}
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
                        label={<label htmlFor="" style={{marginBottom: 8, display: "block"}}>Date of Birth</label>}
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
                        label={<label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 8, display: "block"}}>Age</label>}
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
                    
                    <Form.Item
                        style={{marginBottom: 0}}
                        name={"gender"}
                        rules={[
                            {
                                required: true,
                                message: "Enter Patient Gender"
                            }
                        ]}
                        className="col-span-6"
                        label={<label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 8, display: "block"}}>Gender</label>}
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
                   
                    <Form.Item
                        style={{marginBottom: 0}}
                        name={"plan"}
                        rules={[
                            {
                                required: true,
                                message: "Enter Patiant Plan"
                            }
                        ]}
                        className="col-span-6"
                        label={ <label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 8, display: "block"}}>Plan</label>}
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

                <div className="col-span-6">
                    
                    <div className="flex items-center justify-between gap-6">
                        <Form.Item
                            style={{marginBottom: 0, width: "100%"}}
                            name={"pin"}
                            getValueFromEvent={(e)=>e.target.value}
                            label={<label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 8, display: "block"}}>Random Pin number</label>}
                        >
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
                        </Form.Item>
                        <Button
                            onClick={handleGenaratePin}
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
                            Random Pin
                            <FaRandom size={18} color="#12354E" />
                        </Button>
                    </div>
                </div>

                <div className="col-span-6">
                    <div className="flex items-center justify-between gap-6">
                        <Form.Item
                            style={{marginBottom: 0, width: "100%"}}
                            name={"password"}
                            getValueFromEvent={(e)=>e.target.value}
                            label={ <label className="text-[#415D71] text-sm leading-5 poppins-semibold" htmlFor="" style={{marginBottom: 8, display: "block"}}>Random Password</label>}
                        >
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
                        </Form.Item>
                        <Button
                            onClick={handleGenaratePassword}
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
    )
}

export default CreatePatientProfile