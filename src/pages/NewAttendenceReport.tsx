import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
//import { Button, Typography, Container, InputLabel, Box, Select, MenuItem } from '@mui/material';
// components
import Page from '../components/Page';
import ReactApexChart from 'react-apexcharts';
import { Helmet } from 'react-helmet-async';
// @mui
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
// components
import { useSettingsContext } from '../components/settings';

import React, { useState } from 'react';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import SickIcon from '@mui/icons-material/Sick';
import WcIcon from '@mui/icons-material/Wc';

// ----------------------------------------------------------------------

export default function PageFour() {
  const { themeStretch } = useSettingsContext();
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  const ApexChart = () => {
    const [chartData, setChartData] = useState<any>({
      series: [
        {
          name: 'Present',
          colors: ['#008ffb'],
          data: [44, 55, 41, 37, 22, 43, 21],
        },
        {
          name: 'Absent',
          colors: ['#ed4059'],
          data: [53, 32, 33, 52, 13, 43, 32],
        },
        {
          name: 'Nursing',
          colors: ['#008ffb'],
          data: [12, 17, 11, 9, 15, 11, 20],
        },
        {
          name: 'Emergency',
          colors: ['#008ffb'],
          data: [9, 7, 5, 8, 6, 9, 4],
        },
      ],

      options: {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          stackType: '100%',
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        stroke: {
          width: 1,
          colors: ['#fff'],
        },
        title: {
          text: 'Subject Wise Attendence.',
        },
        xaxis: {
          categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
        },
        tooltip: {
          y: {
            formatter: function (val: any) {
              return val + 'K';
            },
          },
        },
        fill: {
          opacity: 1,
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          offsetX: 40,
        },
      },
      colors: ['#008ffb', '#ed4059', '#feb019', '#00e396'],
    });

    return (
      <div>
        <div id="chart">
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={350}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  };
  return (
    <>
      <Box>
        {' '}
        <Typography sx={{ fontSize: 30 }} variant="h3" component="h1">
          Attendance Report
        </Typography>
      </Box>
      <Paper>
        <Box sx={{ boxShadow: '1px 2px 6px #ccc', borderRadius: 1, marginBottom: '4%' }}>
          <Box
            sx={{
              display: 'flex',
              direction: 'flex-wrap',
              justifyContent: 'space-between',
              marginBottom: '4%',
              marginTop: '2%',
            }}
          >
            <Box sx={{ marginTop: '3%', width: '20%' }}>
              <FormControl sx={{ m: 1, minWidth: 200, marginLeft: '7ch' }}>
                <InputLabel id="demo-simple-select-label" sx={{ width: '50%' }}>
                  Class
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                marginRight: '8%',
                marginTop: '3%',
              }}
            >
              <Box sx={{ marginRight: '30%', display: 'flex', justifyContent: 'space-around' }}>
                <TextField
                  margin="dense"
                  label="Start Date"
                  type="date"
                  // fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
              <Box sx={{ width: '100%' }}>
                <TextField
                  margin="dense"
                  label="End Date"
                  type="date"
                  // fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
            </Box>
            <Button
              variant="contained"
              sx={{ width: '15%', height: '6ch', marginTop: '3%', marginRight: '7ch' }}
            >
              click me{' '}
            </Button>
          </Box>
          <Box sx={{ display: 'flex', direction: 'flex-wrap', justifyContent: 'space-around' }}>
            <Box sx={{ marginBottom: '4%' }}>
              <Card sx={{ height: '80%', width: '100%', background: '#f5fffa' }}>
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-evenly',
                      flexDirection: 'column',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                      <PeopleAltIcon />
                      <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                        Total student
                      </Typography>
                    </Box>
                    <Box sx={{ marginLeft: '3ch', fontSize: 20 }}>1000</Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            <Box sx={{ marginBottom: '4%' }}>
              <Card sx={{ height: '80%', width: '100%', background: '#f5fffa' }}>
                <CardContent>
                  <Box sx={{ flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                      <InsertEmoticonIcon />
                      <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                        Present
                      </Typography>
                    </Box>
                    <Box sx={{ marginLeft: '2ch', fontSize: 20 }}>600</Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            <Box sx={{ marginBottom: '4%' }}>
              <Card sx={{ height: '80%', width: '100%', background: '#f5fffa' }}>
                <CardContent>
                  <Box sx={{ flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                      <MoodBadIcon />
                      <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                        Absent
                      </Typography>
                    </Box>
                    <Box sx={{ marginLeft: '2ch', fontSize: 20 }}>200</Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            <Box sx={{ marginBottom: '4%' }}>
              <Card sx={{ height: '80%', width: '100%', background: '#f5fffa' }}>
                <CardContent>
                  <Box sx={{ flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                      <SickIcon />
                      <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                        Nursing
                      </Typography>
                    </Box>
                    <Box sx={{ marginLeft: '3ch', fontSize: 20 }}>100</Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            <Box sx={{ marginBottom: '4%' }}>
              <Card sx={{ height: '80%', width: '100%', background: '#f5fffa' }}>
                <CardContent>
                  <Box sx={{ flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                      <WcIcon />
                      <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                        Emergency
                      </Typography>
                    </Box>
                    <Box sx={{ marginLeft: '3ch', fontSize: 20 }}>100</Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>{' '}
        </Box>
        <Box sx={{ boxShadow: '1px 2px 6px #ccc', borderRadius: 1, marginTop: '1%' }}>
          <Box>
            <ApexChart />
          </Box>
        </Box>
      </Paper>
    </>
  );
}
