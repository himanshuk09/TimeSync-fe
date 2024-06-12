import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DialogAnimate } from 'src/components/animate';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  FormControl,
  Grid,
  Stack,
  InputLabel,
  MenuItem,
  Paper,
  IconButton,
  Select,
  SelectChangeEvent,
  Typography,
  CircularProgress,
  makeStyles,
  colors,
  FormControlLabel,
  Switch,
} from '@mui/material';
import TextField from '@mui/material/TextField/TextField';
import { useEffect, useRef, useState } from 'react';
import { useSnackbar } from 'src/components/snackbar';
import { Helmet } from 'react-helmet-async';
import { getClasses } from 'src/services/classes/class.service';
import { useSettingsContext } from 'src/components/settings';
import { getStudents } from 'src/services/students/students.service';
import Iconify from 'src/components/iconify';
import Chart from 'chart.js/auto';
import ReactApexChart from 'react-apexcharts';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SickIcon from '@mui/icons-material/Sick';
import WcIcon from '@mui/icons-material/Wc';
import {
  getAllTimetableByClassId,
  getSavedTimetableClassNames,
} from 'src/services/timetable/timetable.service';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import Image from '../components/image';

import {
  getAllAttendenceData,
  getStudentsByClassIdAndSubjectIdByAttendenceDate,
} from 'src/services/Attendence/attendence.service';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { PieChart } from '@mui/x-charts/PieChart';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
dayjs.extend(customParseFormat);
dayjs.extend(utc);
const Attendence = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { themeStretch } = useSettingsContext();
  const [classId, setClassId] = React.useState('');
  const [subjectId, setSubjectId] = React.useState('');
  const [studentsList, setStudentsList] = useState([]);
  const [selectedDate, setSelectedDate] = useState<any>();
  const [convertedDate, setConvertedDate] = useState<any>();
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [timetableClassNames, setTimetableClassNames] = useState([]);
  const [timetableByClassId, setTimetableByClassId] = useState([]);
  const [dayWiseSubjects, setDayWiseSubjects] = useState([]);
  const [clickedStudent, setClickedStudent] = useState<any>();
  const [allAttendenceData, setAllAttendenceData] = useState([0]);
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();
  const [selectedStartDate, setSelectedStartDate] = useState<any>();
  const [selectedEndDate, setSelectedEndDate] = useState<any>();
  const [selectedStudent, setSelectedStudent] = useState([0]);
  interface result {
    present: number;
    absent: number;
    emergency: number;
    nursing: number;
    total: number;
  }
  const [overAllResult, setOverAllResult] = useState<result>({
    present: 0,
    absent: 0,
    emergency: 0,
    nursing: 0,
    total: 0,
  });
  const [studentId, setStudentId] = useState<any>();
  // OverAll
  const [subjectArray, setSubjectArray] = useState<any>([]);
  const [presentArray, setPresentArray] = useState([0]);
  const [absentArray, setAbsentArray] = useState([0]);
  const [emergencyArray, setEmergencyArray] = useState([0]);
  const [nursingArray, setNursingArray] = useState([0]);
  // StudentWise
  const [studentNameArray, setStudentNameArray] = useState<any>([]);
  const [studentPresentArray, setStudentPresentArray] = useState([0]);
  const [studentAbsentArray, setStudentAbsentArray] = useState([0]);
  const [studentEmergencyArray, setStudentEmergencyArray] = useState([0]);
  const [studentNursingArray, setStudentNursingArray] = useState([0]);
  const [checked, setChecked] = useState(true);
  const [showCard, setShowCard] = useState(false);

  const fetchApi = async () => {
    const students = await getStudents();
    const classesName = await getSavedTimetableClassNames();
    const getAttendenceData = await getAllAttendenceData();
    setStudentsList(students);
    setTimetableClassNames(classesName);
    setAllAttendenceData(getAttendenceData);
  };
  useEffect(() => {
    fetchApi();
  }, [classId, subjectId]);
  const filterStudentsByClassId = (studentsList: any, classID: any) => {
    return studentsList.filter((item: any) => item.classId._id === classID);
  };
  const handleStartDate = (date: any) => {
    setSelectedDate(date);
    const day = dayjs(date).format('dddd');
    if (day == 'Saturday' || day == 'Sunday') {
      enqueueSnackbar('Please select date form Monday to Friday', { variant: 'warning' });
    } else {
      const dayWiseSubjects: any = timetableByClassId.filter((item: any) => item?.day === day);
      setDayWiseSubjects(dayWiseSubjects);
    }
    setSelectedStartDate(date);
    const nextDay = date.add(1, 'day');
    const nextDate: any = dayjs(nextDay).toISOString();
    setStartDate(nextDate);
  };
  const handleEndDate = (date: any) => {
    setSelectedEndDate(date);
    const nextDay = date.add(1, 'day');
    const nextDate: any = dayjs(nextDay).toISOString();
    setEndDate(nextDate);
  };
  const handleClass = async (event: SelectChangeEvent) => {
    setClassId(event.target.value as string);
    const timeatableByClassIdDetails = await getAllTimetableByClassId(event.target.value);
    setTimetableByClassId(timeatableByClassIdDetails);
    const students = filterStudentsByClassId(studentsList, event.target.value);
    setSelectedStudent(students);
  };
  const handleSubjectChange = async (event: SelectChangeEvent) => {
    setSubjectId(event.target.value as string);
  };
  const handleStudentChange = async (event: SelectChangeEvent) => {
    setStudentId(event.target.value as string);
  };
  // filter functions
  function filterDataByDateRangeAndClassIdAndSubjectId(
    data: any,
    startDate: string,
    endDate: string,
    classId: string,
    subjectId: string
  ) {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const filteredData = data.filter((item: any) => {
      const itemDate = new Date(item.attendenceDate);
      return (
        itemDate >= startDateObj &&
        itemDate <= endDateObj &&
        item.classId._id === classId &&
        item.subjectId._id === subjectId
      );
    });
    return filteredData;
  }
  function filterDataByDateRangeAndClassIdAndSubjectIdAndStudentId(
    data: any,
    startDate: string,
    endDate: string,
    classId: string,
    subjectId: string,
    studentId: string
  ) {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const filteredData = data.filter((item: any) => {
      const itemDate = new Date(item.attendenceDate);
      return (
        itemDate >= startDateObj &&
        itemDate <= endDateObj &&
        item.classId._id === classId &&
        item.subjectId._id === subjectId &&
        item.studentId._id === studentId
      );
    });
    return filteredData;
  }
  function filterDataByDateRangeAndClassId(data: any, startDate: any, endDate: any, classId: any) {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const filteredData = data.filter((item: any) => {
      const itemDate = new Date(item.attendenceDate);
      return itemDate >= startDateObj && itemDate <= endDateObj && item.classId._id === classId;
    });
    return filteredData;
  }

  // count and filter
  function countAttendanceTypes(data: any) {
    // Initialize counters for each attendance type
    let presentCount = 0;
    let absentCount = 0;
    let emergencyCount = 0;
    let nursingCount = 0;
    let totalCount = 0;
    // Iterate over the data array and count each attendance type
    data.forEach((item: any) => {
      switch (item.attendenceType) {
        case 'Present':
          presentCount++;
          totalCount++;
          break;
        case 'Absent':
          absentCount++;
          totalCount++;
          break;
        case 'Emergency':
          emergencyCount++;
          totalCount++;
          break;
        case 'Nursing':
          nursingCount++;
          totalCount++;
          break;
        default:
          // Handle any other types if needed
          break;
      }
    });

    // Return counts as an object count
    // return {
    //   present: presentCount,
    //   absent: absentCount,
    //   emergency: emergencyCount,
    //   nursing: nursingCount,
    //   total: totalCount,
    // };
    // Calculate percentages
    const presentPercentage = Math.round((presentCount / totalCount) * 100);
    const absentPercentage = Math.round((absentCount / totalCount) * 100);
    const emergencyPercentage = Math.round((emergencyCount / totalCount) * 100);
    const nursingPercentage = Math.round((nursingCount / totalCount) * 100);

    return {
      present: presentPercentage,
      absent: absentPercentage,
      emergency: emergencyPercentage,
      nursing: nursingPercentage,
      total: 100,
    };
  }
  function filterAndCountAttendanceSubjectWise(data: any) {
    const filteredData: any = {};
    data.forEach((item: any) => {
      // const subjectId = item.subjectId._id;
      const subjectId = item.subjectId.subject;
      if (!filteredData[subjectId]) {
        filteredData[subjectId] = {
          present: 0,
          absent: 0,
          emergency: 0,
          nursing: 0,
          total: 0,
        };
      }
      // Count attendance types
      switch (item.attendenceType) {
        case 'Present':
          filteredData[subjectId].present++;
          filteredData[subjectId].total++;
          break;
        case 'Absent':
          filteredData[subjectId].absent++;
          filteredData[subjectId].total++;
          break;
        case 'Emergency':
          filteredData[subjectId].emergency++;
          filteredData[subjectId].total++;
          break;
        case 'Nursing':
          filteredData[subjectId].nursing++;
          filteredData[subjectId].total++;
          break;
        default:
          break;
      }
    });
    handleOverAllReport(filteredData);
    // return filteredData;
  }
  // function filterAndCountAttendanceStudent(data: any) {
  //   const result: any = {};

  //   // Iterate over the data
  //   data.forEach((item: any) => {
  //     const studentId = item.studentId._id;
  //     // const subjectId = item.subjectId._id;
  //     const subjectId = item.subjectId.subject;
  //     const attendanceType = item.attendenceType;

  //     // Initialize counts if not already present
  //     if (!result[studentId]) {
  //       result[studentId] = {};
  //     }
  //     if (!result[studentId][subjectId]) {
  //       result[studentId][subjectId] = {
  //         present: 0,
  //         absent: 0,
  //         emergency: 0,
  //         nursing: 0,
  //       };
  //     }

  //     // Update counts based on attendance type
  //     switch (attendanceType) {
  //       case 'Present':
  //         result[studentId][subjectId].present++;
  //         break;
  //       case 'Absent':
  //         result[studentId][subjectId].absent++;
  //         break;
  //       case 'Emergency':
  //         result[studentId][subjectId].emergency++;
  //         break;
  //       case 'Nursing':
  //         result[studentId][subjectId].nursing++;
  //         break;
  //       default:
  //         break;
  //     }
  //   });

  //   // Transform the result into the desired format
  //   const formattedResult = [];
  //   for (const studentId in result) {
  //     const studentData: any = { studentId: {} };
  //     studentData.studentId[studentId] = result[studentId];
  //     formattedResult.push(studentData);
  //   }

  //   return formattedResult;
  // }
  function filterAndCountAttendanceStudent(data: any) {
    const result: any = {};

    // Iterate over the data
    data.forEach((item: any) => {
      const studentName = item.studentId.name;
      const subjectName = item.subjectId.subject;
      const attendanceType = item.attendenceType.toLowerCase();

      // Initialize counts if not already present
      if (!result[studentName]) {
        result[studentName] = {
          present: 0,
          absent: 0,
          emergency: 0,
          nursing: 0,
        };
      }

      // Update counts based on attendance type
      switch (attendanceType) {
        case 'present':
          result[studentName][attendanceType]++;
          break;
        case 'absent':
          result[studentName][attendanceType]++;
          break;
        case 'emergency':
          result[studentName][attendanceType]++;
          break;
        case 'nursing':
          result[studentName][attendanceType]++;
          break;
        default:
          break;
      }
    });
    handleStudentsReport(result);
    // return result;
  }
  const handleOverAllReport = (data: any) => {
    // working on report
    const Subjectkeys = Object.keys(data).filter((key) => key);
    const overAllpresentValues = Object.values(data).map((subject: any) => subject?.present);
    const overAllabsentValues = Object.values(data).map((subject: any) => subject?.absent);
    const overAllnursingValues = Object.values(data).map((subject: any) => subject?.nursing);
    const overAllemergencyValues = Object.values(data).map((subject: any) => subject?.emergency);
    setSubjectArray(Subjectkeys);
    setPresentArray(overAllpresentValues);
    setAbsentArray(overAllabsentValues);
    setNursingArray(overAllnursingValues);
    setEmergencyArray(overAllemergencyValues);
  };
  const handleStudentsReport = (data: any) => {
    const studentsName = Object.keys(data).filter((key) => key);
    console.log(studentsName);
    const presentValues = Object.values(data).map((subject: any) => subject?.present);
    const absentValues = Object.values(data).map((subject: any) => subject?.absent);
    const nursingValues = Object.values(data).map((subject: any) => subject?.nursing);
    const emergencyValues = Object.values(data).map((subject: any) => subject?.emergency);
    setStudentNameArray(studentsName);
    setStudentPresentArray(presentValues);
    setStudentAbsentArray(absentValues);
    setStudentEmergencyArray(nursingValues);
    setStudentNursingArray(emergencyValues);
  };
  const cardContain = [
    {
      title: 'Total Students',
      value: studentNameArray.length,
      component: <PeopleAltIcon />,
    },
    {
      title: 'Present',
      value: overAllResult.present,
      component: <InsertEmoticonIcon />,
    },
    {
      title: 'Absent',
      value: overAllResult.absent,
      component: <MoodBadIcon />,
    },
    {
      title: 'Nursing',
      value: overAllResult.nursing,
      component: <SickIcon />,
    },
    {
      title: 'Emergency',
      value: overAllResult.emergency,
      component: <WcIcon />,
    },
  ];
  const onSubmit = (e: any) => {
    e.preventDefault();
    const filteredDataWithClassId = filterDataByDateRangeAndClassId(
      allAttendenceData,
      startDate,
      endDate,
      classId
    );
    // count
    const PresentCount: any = countAttendanceTypes(filteredDataWithClassId);
    console.log(PresentCount);

    if (!Number.isNaN(PresentCount.present)) {
      setOverAllResult(PresentCount);
      setShowCard(true);
    }
    filterAndCountAttendanceSubjectWise(filteredDataWithClassId);
    filterAndCountAttendanceStudent(filteredDataWithClassId);
  };
  const ApexChartOverAll = () => {
    const [chartData, setChartData] = useState<any>({
      series: [
        {
          name: 'Present',
          colors: ['#008ffb'],
          // data: [44, 55, 41, 37, 22, 43, 21],
          data: presentArray,
        },
        {
          name: 'Emergency',
          colors: ['#feb019'],
          data: emergencyArray,
        },
        {
          name: 'Nursing',
          colors: ['#00e396'],
          data: nursingArray,
        },
        {
          name: 'Absent',
          colors: ['#ff4560'],
          data: absentArray,
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
          text: 'Overall Attendence Report',
        },
        xaxis: {
          categories: subjectArray,
        },
        tooltip: {
          y: {
            formatter: function (val: any) {
              return val + '  Students';
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
      // colors: ['#008ffb', '#ff4560', '#00e396', '#feb019'],
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
  const ApexChartStudentwise = () => {
    const [chartData, setChartData] = useState<any>({
      series: [
        {
          name: 'Present',
          colors: ['#008ffb'],
          data: studentPresentArray,
        },

        {
          name: 'Emergency',
          colors: ['#feb019'],

          data: studentEmergencyArray,
        },
        {
          name: 'Nursing',
          colors: ['#00e396'],
          data: studentNursingArray,
        },
        {
          name: 'Absent',
          colors: ['#ff4560'],
          data: studentAbsentArray,
        },
      ],
      options: {
        chart: {
          type: 'bar',
          height: 900,
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
          text: 'Students Attendence Report',
        },
        xaxis: {
          categories: studentNameArray,
        },
        tooltip: {
          y: {
            formatter: function (val: any) {
              return val + ' Lectures';
            },
          },
        },
        fill: {
          opacity: 1,
          height: 12,
          type: 'solid',
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          offsetX: 40,
        },
      },
      colors: ['#008ffb', '#ff4560', '#00e396', '#feb019'],
    });

    return (
      <div>
        <div id="chart">
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={750}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  };
  return timetableClassNames.length === 0 ? (
    <>
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    </>
  ) : (
    <>
      <Helmet>
        <title> TimeSync | Attendance</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Box
          sx={{
            position: 'relative',
            padding: '20px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h3" component="h1" paragraph>
            Attendance Report
          </Typography>
          <Box
            sx={{
              maxWidth: '100%',
              height: '100%',
              border: '1 solid black',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ width: '100%', boxShadow: '1px 2px 3px #ccc', borderRadius: 3 }}>
              <form onSubmit={onSubmit}>
                <FormControl sx={{ width: '100%' }}>
                  <Grid container spacing={3} m={'0.2px'}>
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Classname</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={classId}
                          label="Classname"
                          onChange={handleClass}
                          required
                          name="classId"
                        >
                          {timetableClassNames.map((data: any) => (
                            <MenuItem key={data?.classId?._id} value={data?.classId?._id}>
                              {data?.classId?.classname}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3.2} sx={{ pt: '14px !important' }}>
                      <FormControl fullWidth>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker
                              label="Start Date "
                              name="StartDate"
                              // value={selectedDate}
                              value={selectedStartDate ?? dayjs()}
                              onChange={handleStartDate}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </FormControl>
                      {/* <Picker /> */}
                    </Grid>{' '}
                    <Grid item xs={3.2} sx={{ pt: '14px !important' }}>
                      <FormControl fullWidth>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker
                              label="End Date "
                              name="EndDate"
                              // value={selectedDate}
                              value={selectedEndDate ?? dayjs().add(1, 'day')}
                              onChange={handleEndDate}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </FormControl>
                    </Grid>
                    {/* <Grid item xs={4}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Period Name </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={subjectId}
                          label="Period Name"
                          onChange={handleSubjectChange}
                          required
                          name="subjectId"
                        >
                          {dayWiseSubjects.map((data: any) => (
                            <MenuItem key={data?._id} value={data?.subjectId?._id}>
                              {data?.subjectId?.subject}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>{' '}
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Student Name</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={studentId}
                          label="Student Name"
                          onChange={handleStudentChange}
                          required
                          name="subjectId"
                        >
                          {selectedStudent.map((data: any) => (
                            <MenuItem key={data?._id} value={data?._id}>
                              {data?.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid> */}
                    <Grid item xs={3}>
                      <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="OverAll"
                        onChange={() => {
                          console.log(checked);
                          setChecked(!checked);
                        }}
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <Button
                        variant="contained"
                        size="medium"
                        sx={{ float: 'right', marginRight: 6, marginBottom: 2 }}
                        type="submit"
                      >
                        Get Report
                      </Button>
                    </Grid>
                  </Grid>
                </FormControl>
              </form>
            </Box>
          </Box>
        </Box>
        {showCard ? (
          <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            {cardContain.map((card, index) => (
              <Card sx={{ boxShadow: '1px 2px 3px #ccc', margin: 1 }} key={index}>
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-evenly',
                      flexDirection: 'column',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                      {card.component}
                      <Typography
                        sx={{ fontSize: 18, marginLeft: 1 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {card.title}
                      </Typography>
                    </Box>
                    <Box sx={{ marginLeft: '3ch', fontSize: 23 }}>
                      {card.value}
                      {card.title !== 'Total Students' ? '%' : ''}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          <Box sx={{ width: '44%', height: '56%', ml: '20%' }}>
            <Image
              disabledEffect
              visibleByDefault
              alt="auth"
              // src={illustration || '/assets/illustrations/illustration_dashboard.png'}
              // src={illustration || '/assets/illustrations/new.png'}
              src="/assets/illustrations/analytics.png"
              sx={{ maxWidth: 720 }}
            />
          </Box>
        )}
        <Box
          sx={{
            padding: '2% 10%',
          }}
        >
          {subjectArray.length != 0 && checked ? (
            <ApexChartOverAll />
          ) : studentNameArray.length != 0 ? (
            <ApexChartStudentwise />
          ) : (
            ''
          )}
        </Box>
      </Container>
    </>
  );
};
export default Attendence;
