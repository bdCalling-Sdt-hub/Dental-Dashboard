/* eslint-disable no-unused-vars */
import { useState } from "react"
import MetaTag from "../../components/MetaTag"
import PageHeader from "../../components/PageHeader"
import OfferSliderTableList from "../../components/OfferSlider/OfferSliderTableList"
import AddOfferSliderModal from "../../components/Modal/AddOfferSliderModal"


const OfferSlider = () => {
    const [keyword, setKeyword] = useState("")
    const [open, setOpen] = useState(false)
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 h-[86vh] overflow-auto">
            <PageHeader title={"Offer Slider"} buttonName={"Slider"} keyword={keyword} setKeyword={setKeyword} setOpen={setOpen} />

            <OfferSliderTableList keyword={keyword} />

            <AddOfferSliderModal open={open} setOpen={setOpen} />

        </div>
    )
}

export default OfferSlider