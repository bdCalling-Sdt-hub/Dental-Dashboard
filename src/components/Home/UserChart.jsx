import { useState } from 'react';
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, } from "antd";
import Heading from "../Heading"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const UserChart = () => {
    const [year, setYear] = useState(new URLSearchParams(window.location.search).get('year') || 2024);

    const items = [
        {
            label: 2023,
            key: "2023",
        },
        {
            label: 2024,
            key: "2024",
        },
        {
            label: 2025,
            key: "2025",
        },
        {
            label: 2026,
            key: "2026",
        }
    ];

    const onClick = ({ key }) => {
        setYear(key);
        const params = new URLSearchParams(window.location.search);
        params.set('year', key);
        window.history.pushState(null, "", `?${params.toString()}`);
    };
    return (
        <div className='p-4' style={{ width: '100%', height: '312px' }}>
            <div className='flex items-center justify-between mb-1'>
                <Heading title="Total Seller" style="mb-0" />
                <Dropdown  menu={{ items, onClick }}>
                    <p style={{ 
                        cursor: "pointer", 
                        color:'#717171', 
                        border: "1px solid #E9E9E9",
                        borderRadius: "4px",
                        padding: "4px 12px"
                    }} 
                    onClick={(e) => e.preventDefault()}
                    >
                        {year}
                        <DownOutlined style={{paddingLeft: "18px"}} color='#717171' />
                    </p>
                </Dropdown>
            </div>
            
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
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="uv" stroke="#12354E" fill="#E2BCC1" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default UserChart