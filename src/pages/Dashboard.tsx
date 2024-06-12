import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TablePagination,
  Typography,
  colors,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BoxProps } from '@mui/material/Box';
import { useSettingsContext } from '../components/settings';
import Image from '../components/image';
import MobileAnalysis from './../assets/dashboard/mobileAnalysis.png';
import Team from './../assets/dashboard/team-working-on-blog-dashboard-optimization.png';
import Dev from './../assets/dashboard/developers-working-on-app-development-4487028-3738435.png';
import BoyGirl from './../assets/dashboard/boy-showing-mobile-app-8158232-6756071.png';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Students } from '../_mock/arrays/StudentsData';
import { Teachers } from '../_mock/arrays/TeacherData';
// table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { String } from 'lodash';
import { getStudents } from 'src/services/students/students.service';
import { getTeachers } from 'src/services/teachers/teachers.service';
import { getEvents } from 'src/services/events/events.service';
import ReactApexChart from 'react-apexcharts';
import { getSavedTimetableClassNames } from 'src/services/timetable/timetable.service';
import { getStudentsByClassId } from 'src/services/Attendence/attendence.service';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) => (theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300'),
        p: 1,
        borderRadius: 2,
        // textAlign: 'center',
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

function createData(
  Sr_No: number,
  Start_Date: number,
  End_Date: number,
  Name: String,
  Type: string
) {
  return { Sr_No, Start_Date, End_Date, Name, Type };
}

const Dashboard = () => {
  const { themeStretch } = useSettingsContext();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [eventData, setEventData] = useState(0);
  const [studentPage, studentPageChange] = useState(0);
  const [studentRowPerPage, studentRowPerPageChange] = useState(5);
  const [teacherPage, teacherPageChange] = useState(0);
  const [teacherRowPerPage, teacherRowPerPageChange] = useState(5);
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const [count, setCount] = useState(0);
  const [attendenceData, setAttendenceData] = useState({
    present: 75,
    absent: 15,
    emergency: 5,
    nursing: 5,
    total: 100,
  });
  const [classId, setClassId] = useState<any>('661517e021b50b585ab718ec');
  const [timetableClassNames, setTimetableClassNames] = useState([]);

  useEffect(() => {
    fetchApi();
  }, []);
  const fetchApi = async () => {
    const student = await getStudents();
    const teacher = await getTeachers();
    const EventData = await getEvents();
    const classesName = await getSavedTimetableClassNames();
    setStudents(student);
    setTeachers(teacher);
    setTimetableClassNames(classesName);
    setEventData(EventData.length);
  };
  const fetchAttendenceData = async () => {
    const attendence = await getStudentsByClassId(classId);
    const attendenceResult = countAttendanceTypes(attendence);
    console.log('inside ClassId');
    setAttendenceData(attendenceResult);
  };
  useEffect(() => {
    fetchAttendenceData();
  }, [classId]);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  //pagination
  const handleStudentchangepage = (event: any, newpage: any) => {
    studentPageChange(newpage);
  };
  const handleStudentRowsPerPage = (event: any) => {
    studentRowPerPageChange(+event.target.value);
    studentPageChange(0);
  };
  const handleTeacherchangepage = (event: any, newpage: any) => {
    teacherPageChange(newpage);
  };
  const handleTeacherRowsPerPage = (event: any) => {
    teacherRowPerPageChange(+event.target.value);
    teacherPageChange(0);
  };
  function countAttendanceTypes(data: any) {
    let presentCount = 0;
    let absentCount = 0;
    let emergencyCount = 0;
    let nursingCount = 0;
    let totalCount = 0;

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
          break;
      }
    });
    return {
      present: presentCount,
      absent: absentCount,
      emergency: emergencyCount,
      nursing: nursingCount,
      total: totalCount,
    };
  }
  const handleClassChange = async (event: any) => {
    setClassId(event.target.value);
  };

  const ApexChart = () => {
    const [chartData, setChartData] = useState<any>({
      series: [
        attendenceData.present,
        attendenceData.absent,
        attendenceData.nursing,
        attendenceData.emergency,
      ],
      options: {
        chart: {
          type: 'donut',
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
        labels: ['Present', 'Absent', 'Nursing', 'Emergency'],
        colors: ['#008ffb', '#ed4059', '#feb019', '#00e396'],
      },
    });

    return (
      <div>
        <div id="chart">
          <ReactApexChart options={chartData.options} series={chartData.series} type="donut" />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  };
  return students.length === 0 || teachers.length === 0 || eventData === 0 ? (
    <>
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    </>
  ) : (
    <>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3">Dashboard</Typography>
        <Box
          sx={{
            display: 'grid',
            gridAutoFlow: 'row',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gridTemplateRows: 'repeat(6, 50px)',
            gap: 2,
            width: '100%',
            height: '700px',
            padding: 2,
            marginTop: 3,
          }}
        >
          <Item
            sx={{
              gridColumn: '1/4',
              gridRow: '1 / 8',
              width: '100%',
              backgroundColor: theme.palette.primary.lighter,
            }}
          >
            <Box
              sx={{
                maxWidth: '100%',
                border: '1 solid black',
                display: 'flex',
                flexDirection: 'rowGap',
                justifyContent: 'space-around',
              }}
            >
              <Box sx={{ paddingTop: 3 }}>
                <Typography
                  variant="h3"
                  sx={{
                    pt: 1,

                    color: (theme) => (theme.palette.mode === 'light' ? 'Black' : 'grey.800'),
                  }}
                >
                  {currentHour < 12
                    ? 'Good morning!'
                    : currentHour >= 12 && currentHour < 18
                    ? 'Good afternoon!'
                    : 'Good evening!'}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    paddingTop: 1,
                    color: (theme) => (theme.palette.mode === 'light' ? 'Black' : 'grey.800'),
                  }}
                >
                  Welcome to TimeSync
                </Typography>
              </Box>
              <Box sx={{ width: '35%', paddingTop: 3 }}>
                <Image disabledEffect src={MobileAnalysis} alt="img" />
              </Box>
            </Box>

            <Box sx={{ width: '100%', paddingLeft: '20px' }}>
              <Box
                sx={{
                  borderColor: 'divider',
                  color: (theme) => (theme.palette.mode === 'light' ? 'Black' : 'grey.800'),
                }}
              >
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
                  <Tab label="Students List" {...a11yProps(0)} />
                  <Tab label="Teachers List" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <Paper>
                  <TableContainer component={Paper} sx={{ mt: 1 }}>
                    <Table sx={{ minWidth: 400 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Avatar</TableCell>
                          <TableCell align="center">Name</TableCell>
                          <TableCell align="center">Username</TableCell>
                          <TableCell align="center">Class Name</TableCell>
                          <TableCell align="center">Address</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {students
                          .slice(
                            studentPage * studentRowPerPage,
                            studentPage * studentRowPerPage + studentRowPerPage
                          )
                          .map((student: any, index) => (
                            <TableRow
                              key={student._id}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell>
                                <Avatar alt="avatar" src={student.avatar} />
                              </TableCell>
                              <TableCell align="center">{student.name}</TableCell>
                              <TableCell align="center">{student.username}</TableCell>
                              <TableCell align="center">{student?.classId?.classname}</TableCell>
                              <TableCell align="center">{student.address.state}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 7, 10]}
                    rowsPerPage={studentRowPerPage}
                    page={studentPage}
                    count={students.length}
                    component="div"
                    onPageChange={handleStudentchangepage}
                    onRowsPerPageChange={handleStudentRowsPerPage}
                  ></TablePagination>
                </Paper>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <Paper>
                  <TableContainer component={Paper} sx={{ mt: 2 }}>
                    <Table sx={{ minWidth: 400 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Avatar</TableCell>
                          <TableCell align="center">Name</TableCell>
                          <TableCell align="center">Username</TableCell>
                          <TableCell align="center">Subject Teaching</TableCell>
                          <TableCell align="center">Address</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {teachers
                          .slice(
                            teacherPage * teacherRowPerPage,
                            teacherPage * teacherRowPerPage + teacherRowPerPage
                          )
                          .map((teacher: any, index) => (
                            <TableRow
                              key={teacher.id}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell align="center">
                                {' '}
                                <Avatar alt="avatar" src={teacher.avatar} />
                              </TableCell>
                              <TableCell align="center">{teacher.name}</TableCell>
                              <TableCell align="center">{teacher.username}</TableCell>
                              <TableCell align="center">{teacher.subjectId.subject}</TableCell>
                              <TableCell align="center">{teacher.address.state}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 7, 10]}
                    rowsPerPage={teacherRowPerPage}
                    page={teacherPage}
                    count={teachers.length}
                    component="div"
                    onPageChange={handleTeacherchangepage}
                    onRowsPerPageChange={handleTeacherRowsPerPage}
                  ></TablePagination>
                </Paper>
              </CustomTabPanel>
            </Box>
          </Item>
          <Item
            sx={{
              gridRow: '1 / 3',
              backgroundColor: theme.palette.primary.lighter,
              width: '100%',
              height: '140px',
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '40%',
                border: '1 solid black',
                backgroundColor: theme.palette.primary.lighter,
                padding: '5%',
              }}
            >
              <Typography
                aria-label="basic tabs"
                sx={{
                  marginBottom: '0.5%',
                  fontWeight: 600,
                  color: (theme) => (theme.palette.mode === 'light' ? 'Black' : 'grey.800'),
                }}
                variant="subtitle1"
              >
                Uncoming Events
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Typography
                  variant="h5"
                  sx={{
                    paddingTop: '20%',
                    fontSize: 50,
                    color: (theme) => (theme.palette.mode === 'light' ? 'Black' : 'grey.800'),
                  }}
                >
                  {eventData}
                </Typography>
                <Box sx={{ paddingLeft: '3%' }}>
                  <Image
                    disabledEffect
                    src={Dev}
                    alt="img"
                    sx={{ maxWidth: '50%', marginLeft: '40%' }}
                  />
                </Box>
              </Box>
            </Box>
          </Item>
          <Item
            sx={{
              gridRow: '1 / 3',
              backgroundColor: theme.palette.primary.lighter,
              width: '100%',
              height: '140px',
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '30%',
                border: '1 solid black',
                backgroundColor: theme.palette.primary.lighter,
                padding: '5%',
              }}
            >
              <Typography
                aria-label="basic tabs"
                sx={{
                  marginBottom: '0.5%',
                  fontWeight: 600,
                  color: (theme) => (theme.palette.mode === 'light' ? 'Black' : 'grey.800'),
                }}
                variant="subtitle1"
              >
                Total Students
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Typography
                  variant="h5"
                  sx={{
                    paddingTop: '20%',
                    fontSize: 50,
                    color: (theme) => (theme.palette.mode === 'light' ? 'Black' : 'grey.800'),
                  }}
                >
                  {students.length}
                </Typography>
                <Box sx={{ paddingLeft: '3%' }}>
                  <Image
                    disabledEffect
                    src={Team}
                    alt="img"
                    sx={{ maxWidth: '44%', marginLeft: '40%' }}
                  />
                </Box>
              </Box>
            </Box>
          </Item>
          <Item
            sx={{
              gridColumn: '4 / 6',
              gridRow: '8/3',
              marginTop: '30px',
              backgroundColor: theme.palette.primary.lighter,
            }}
          >
            <Box sx={{ border: '1 solid black', padding: 1 }}>
              <Typography
                aria-label="basic tabs"
                sx={{
                  marginBottom: '0.5%',
                  fontWeight: 600,
                  color: (theme) => (theme.palette.mode === 'light' ? 'Black' : 'grey.800'),
                }}
              >
                Attendence
              </Typography>
              <Box sx={{ marginBottom: 5 }}>
                <FormControl sx={{ width: '200px' }}>
                  <InputLabel id="demo-simple-select-label">Classname</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={classId}
                    label="Classname"
                    onChange={handleClassChange}
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
              </Box>
              {/* <Image
                disabledEffect
                src={BoyGirl}
                alt="img"
                sx={{ opacity: 0.5, maxWidth: '100%' }}
              /> */}
              <ApexChart />
            </Box>
          </Item>
        </Box>
      </Container>
    </>
  );
};

export default Dashboard;
