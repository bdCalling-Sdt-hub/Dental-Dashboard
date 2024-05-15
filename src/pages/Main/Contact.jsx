/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import MetaTag from '../../components/MetaTag'
import PageHeader from '../../components/PageHeader'
import ContactTableList from '../../components/Contact/ContactTableList'
import AddContactModal from '../../components/Modal/AddContactModal'

const Contact = () => {
    const [keyword, setKeyword] = useState("")
    const [open, setOpen] = useState(false)
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 h-[86vh] overflow-auto">
            <MetaTag title={"Contact"} />
            <PageHeader title={"Contact"} buttonName={"Contact"} keyword={keyword} setKeyword={setKeyword} setOpen={setOpen} />
            <ContactTableList/>

            <AddContactModal open={open} setOpen={setOpen}  />

        </div>
    )
}

export default Contact