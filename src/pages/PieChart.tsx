// import * as React from 'react';
// import { PieChart } from '@mui/x-charts/PieChart';

// const data1 = [
//   { label: 'Group A', value: 400 },
//   { label: 'Group B', value: 300 },
//   { label: 'Group C', value: 300 },
//   { label: 'Group D', value: 200 },
// ];
// const data2 = [
//   { label: 'A1', value: 100 },
//   { label: 'A2', value: 300 },
//   { label: 'B1', value: 100 },
//   { label: 'B2', value: 80 },
//   { label: 'B3', value: 40 },
//   { label: 'B4', value: 30 },
//   { label: 'B5', value: 50 },
//   { label: 'C1', value: 100 },
//   { label: 'C2', value: 200 },
//   { label: 'D1', value: 150 },
//   { label: 'D2', value: 50 },
// ];

// export default function TwoLevelPieChart() {
//   return (
//     <PieChart
//       series={[
//         {
//           innerRadius: 0,
//           outerRadius: 80,
//           data: data1,
//         },
//         {
//           innerRadius: 100,
//           outerRadius: 120,
//           data: data2,
//         },
//       ]}
//       width={400}
//       height={300}
//       slotProps={{
//         legend: { hidden: true },
//       }}
//     />
//   );
// }

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { PieChart } from '@mui/x-charts/PieChart';

const data1 = [
    { label: 'Group A', value: 400 },
    { label: 'Group B', value: 300 },
    { label: 'Group C', value: 300 },
    { label: 'Group D', value: 200 },
];
const data2 = [
    { label: '1', value: 100 },
    { label: '2', value: 300 },
    { label: '3', value: 100 },
    { label: '4', value: 80 },
    { label: '5', value: 40 },
    { label: '6', value: 30 },
    { label: '7', value: 50 },
    { label: '8', value: 100 },
    { label: '9', value: 200 },
    { label: '10', value: 150 },
    { label: '11', value: 50 },
];

export default function PieAnimation() {
    const [radius, setRadius] = React.useState(50);
    const [itemNb, setItemNb] = React.useState(5);
    const [skipAnimation, setSkipAnimation] = React.useState(false);

    const handleItemNbChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue !== 'number') {
            return;
        }
        setItemNb(newValue);
    };
    const handleRadius = (event: Event, newValue: number | number[]) => {
        if (typeof newValue !== 'number') {
            return;
        }
        setRadius(newValue);
    };

    return (
        <Box sx={{ width: '33%', height: '20%' }} >
            <div className="row">
                <h4>Overall Attendence</h4>
            </div>
            <PieChart
                height={250}
                series={[
                    { data: data1, outerRadius: radius },
                    {
                        data: data2.slice(0, itemNb),
                        innerRadius: radius,
                        arcLabel: (params) => params.label ?? '',
                    },
                ]}
                // skipAnimation={skipAnimation}
            />
        </Box>
    );
}
