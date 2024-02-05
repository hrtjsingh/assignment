import React from 'react'
import Row from '../Common/Row';
import { calculateYearsAgo } from '../../utils/utils';

const Card = ({ data }) => {

    return (
        <div className='card'>
            <div className='card-img' style={{ backgroundImage: `url(${data?.image})` }}>
                <div className='card-info'>
                    <h5>
                        {data?.name}
                    </h5>
                    <p>id: {data?.id} created {calculateYearsAgo(data?.created)} years ago</p>
                </div>
            </div>
            <div className='card-content'>
                <Row label="status" value={data?.status} />
                <Row label="species" value={data?.species} />
                <Row label="gender" value={data?.gender} />
                <Row label="origin" value={data?.origin?.name} />
                <Row label="last location" value={data?.location?.name} />
            </div>
        </div >
    )
}

export default Card