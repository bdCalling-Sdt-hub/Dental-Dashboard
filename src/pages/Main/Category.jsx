/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import MetaTag from '../../components/MetaTag'
import PageHeader from '../../components/PageHeader'
import AddCategoryModal from '../../components/Modal/AddCategoryModal'
import CategoryTableList from '../../components/Category/CategoryTableList'

const Category = () => {
    const [keyword, setKeyword] = useState("")
    const [open, setOpen] = useState(false)
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 h-[86vh] overflow-auto">
            <MetaTag title={"Category"} />
            <PageHeader title={"Category"} buttonName={"Category"} keyword={keyword} setKeyword={setKeyword} setOpen={setOpen} />
            <CategoryTableList keyword={keyword} />
            <AddCategoryModal open={open} setOpen={setOpen} />
        </div>
    )
}

export default Category