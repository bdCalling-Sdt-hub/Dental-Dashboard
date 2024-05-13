/* eslint-disable react/prop-types */

const Heading = ({title, style
}) => {
    return (
        <h1 className={`text-[#262727] text-2xl leading-8 poppins-semibold text-center ${style}`}>{title}</h1>
    )
}

export default Heading