/* eslint-disable react/prop-types */
import { Helmet } from 'react-helmet'

const MetaTag = ({title}) => {
    return (
        <Helmet>
            <title> {`Star tech - ${title}`}</title>
        </Helmet>
    );
}

export default MetaTag;