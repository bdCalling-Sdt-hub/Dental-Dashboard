/* eslint-disable no-unused-vars */
import { useState } from 'react'
import MetaTag from '../../components/MetaTag'
import PageHeader from '../../components/PageHeader'
import BannerTableList from '../../components/Banner/BannerTableList'
import AddBannerModal from '../../components/Modal/AddBannerModal'

const Banner = () => {
    const [keyword, setKeyword] = useState("")
    const [open, setOpen] = useState(false)
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 h-[86vh] overflow-auto">
            <MetaTag title={"Banner"} />
            <PageHeader title={"Banner"} buttonName={"Banner"} keyword={keyword} setKeyword={setKeyword} setOpen={setOpen} />
            <BannerTableList keyword={keyword}  />

            <AddBannerModal open={open} setOpen={setOpen} />
            
        </div>
    )
}

export default Banner