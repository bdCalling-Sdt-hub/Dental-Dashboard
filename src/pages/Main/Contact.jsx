/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import MetaTag from '../../components/MetaTag'
import ContactTableList from '../../components/Contact/ContactTableList'
import Heading from '../../components/Heading'

const Contact = () => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 h-[86vh] overflow-auto">
            <MetaTag title={"Contact"} />
            <Heading title="Contact" style={"mb-6"} />
            <ContactTableList/>
        </div>
    )
}

export default Contact