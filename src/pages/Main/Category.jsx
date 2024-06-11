/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import MetaTag from '../../components/MetaTag'
import PageHeader from '../../components/PageHeader'
import CategoryModal from '../../components/Modal/CategoryModal'
import CategoryTableList from '../../components/Category/CategoryTableList'

const Category = () => {
    const [keyword, setKeyword] = useState("")
    const [open, setOpen] = useState(false);
    const [refresh, setRefresh] = useState("");
    const [value, setValue] = useState(null);

    const handleClose=()=>{
        setOpen(false)
    }

    if(refresh){
        setTimeout(()=>{
            setRefresh("")
        }, 1500)
    }
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 h-[86vh] overflow-auto">
            <MetaTag title={"Category"} />
            <PageHeader title={"Category"} buttonName={"Category"} keyword={keyword} setKeyword={setKeyword} setOpen={setOpen} />
            <CategoryTableList keyword={keyword} setValue={setValue} refresh={refresh} />
            <CategoryModal setValue={setValue} value={value} setRefresh={setRefresh} open={open} handleClose={handleClose} setOpen={setOpen} />
        </div>
    )
}

export default Category