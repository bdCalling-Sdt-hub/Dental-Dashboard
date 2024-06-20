/* eslint-disable react/prop-types */
import Heading from "../Heading";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PatientChart = ({data}) => {

    return (
        <div className='p-4' style={{ width: '100%', height: '312px' }}>
            <Heading title="Patient Overview" style="mb-0" />
            
            <div style={{ width: '100%', marginTop: 25, height: 'calc(100% - 57px)'}}>
                <ResponsiveContainer>
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="user" stroke="#12354E" fill="#E2BCC1" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default PatientChart;
