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
} from '@mui/material';
import TextField from '@mui/material/TextField/TextField';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'src/components/snackbar';
import { Helmet } from 'react-helmet-async';
import { getClasses } from 'src/services/classes/class.service';
import { useSettingsContext } from 'src/components/settings';
import { getStudents } from 'src/services/students/students.service';
import Iconify from 'src/components/iconify';
import {
  getAllTimetableByClassId,
  getSavedTimetableClassNames,
} from 'src/services/timetable/timetable.service';
import {
  getAllAttendenceData,
  getStudentsByClassId,
  getStudentsByClassIdAndSubjectId,
  getStudentsByClassIdAndSubjectIdByAttendenceDate,
  noteAttendence,
  updateStudentAttendece,
} from 'src/services/Attendence/attendence.service';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import theme from 'src/theme';
import Image from '../components/image';
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
  const [studentFormPopup, setStudentFormPopup] = useState<boolean>(false);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [timetableClassNames, setTimetableClassNames] = useState([]);
  const [timetableByClassId, setTimetableByClassId] = useState([]);
  const [dayWiseSubjects, setDayWiseSubjects] = useState([]);
  const [clickedStudent, setClickedStudent] = useState<any>();
  const [allAttendenceData, setAllAttendenceData] = useState([0]);

  const fetchApi = async () => {
    const students = await getStudents();
    const classesName = await getSavedTimetableClassNames();
    setStudentsList(students);
    setTimetableClassNames(classesName);
  };
  useEffect(() => {
    fetchApi();
  }, [classId, subjectId]);

  const fetchStudents = async () => {
    const AttendStudents = await getStudentsByClassIdAndSubjectIdByAttendenceDate(
      classId,
      subjectId,
      convertedDate
    );
    console.log('inside');
    console.log(AttendStudents);

    setFilteredStudents(AttendStudents);
  };

  const handleDateChange = (date: any) => {
    setSelectedDate(date);

    const nextDay = date.add(1, 'day');
    const nextDate: any = dayjs(nextDay).toISOString();
    // const nextDate: any = dayjs(nextDay).set('hour', 0).set('minute', 0).toISOString();
    console.log(nextDate);
    setConvertedDate(nextDate);

    const day = dayjs(date).format('dddd');
    console.log(day);
    if (day == 'Saturday' || day == 'Sunday') {
      enqueueSnackbar('Please select date form Monday to Friday', { variant: 'warning' });
    } else {
      const dayWiseSubjects: any = timetableByClassId.filter((item: any) => item?.day === day);
      setDayWiseSubjects(dayWiseSubjects);
    }
  };
  const handleChange = async (event: SelectChangeEvent) => {
    setClassId(event.target.value as string);
    const timeatableByClassIdDetails = await getAllTimetableByClassId(event.target.value);
    setTimetableByClassId(timeatableByClassIdDetails);
  };
  const handleSubjectChange = async (event: SelectChangeEvent) => {
    setSubjectId(event.target.value as string);
  };

  const filterStudentsByClassId = (studentsList: any, classID: any) => {
    return studentsList
      .filter((item: any) => item.classId._id === classID)
      .map((item: any) => item._id);
  };
  const Picker = () => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker
          label="Select Date "
          name="attendenceDate"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
  const addAttendence = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const filterData = filterStudentsByClassId(studentsList, classId);
    const payload: any = [];
    //add one date to save exactly selected date
    const nextDay = selectedDate?.add(1, 'day');
    const nestDate1: any = dayjs(nextDay).toISOString();
    filterData.map((student: any) => {
      payload.push({
        classId: data?.classId,
        subjectId: data?.subjectId,
        attendenceDate: nestDate1,
        attendenceType: 'Present',
        reason: 'present',
        studentId: student,
      });
    });
    console.log(payload);

    const response = await noteAttendence(payload);

    if (response?.status === 201) {
      enqueueSnackbar('Attendence Noted !', { variant: 'success' });
      fetchStudents();
    } else {
      if (response?.status === 200) {
        enqueueSnackbar('Attendence Already Noted !', { variant: 'warning' });
        fetchStudents();
      } else {
        enqueueSnackbar('Unable to note attendence !', { variant: 'error' });
      }
    }
  };

  const handleUpdateAttendence = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target instanceof HTMLButtonElement) {
      const textFieldValue =
        event.currentTarget.querySelector<HTMLInputElement>('input[type="text"]')?.value;
      //   if (textFieldValue) {
      //     const updatedPayload = {
      //       attendenceType: event.target.textContent,
      //       reason: textFieldValue,
      //     };

      //     const response = await updateStudentAttendece(clickedStudent?._id, updatedPayload);
      //     if (response?.status === 200) {
      //       enqueueSnackbar('Attendence Updated !', { variant: 'success' });
      //       fetchStudents();
      //     } else {
      //       enqueueSnackbar('Unable to update attendence !', { variant: 'error' });
      //     }
      //     setStudentFormPopup(false);
      //   } else {
      //     enqueueSnackbar('Please Enter Reason!', { variant: 'error' });
      //   }
      // }

      const updatedPayload = {
        attendenceType: event.target.textContent,
        reason: textFieldValue,
      };

      const response = await updateStudentAttendece(clickedStudent?._id, updatedPayload);
      if (response?.status === 200) {
        enqueueSnackbar('Attendence Updated !', { variant: 'success' });
        fetchStudents();
      } else {
        enqueueSnackbar('Unable to update attendence !', { variant: 'error' });
      }
      setStudentFormPopup(false);
    } else {
      enqueueSnackbar('Please Enter Reason!', { variant: 'error' });
    }
  };
  return timetableClassNames.length === 0 ? (
    <>
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
        "No data found..."
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
            Attendance
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
              <form onSubmit={addAttendence}>
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
                          onChange={handleChange}
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
                    <Grid item xs={3.2} sx={{ pt: '25px !important' }}>
                      <FormControl fullWidth>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            sx={{ height: '1.9em !important' }}
                            label="Select Date "
                            name="attendenceDate"
                            // value={selectedDate}
                            value={selectedDate ?? dayjs()}
                            onChange={handleDateChange}
                          />
                        </LocalizationProvider>
                      </FormControl>
                      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']} sx={{ width: '270px' }}>
                          <DateTimePicker
                            label="Select Date "
                            name="attendenceDate"
                            // value={selectedDate}
                            value={selectedDate ?? dayjs()}
                            onChange={handleDateChange}
                          />
                        </DemoContainer>
                      </LocalizationProvider> */}
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Subject Name</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={subjectId}
                          label="Subject Name"
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
                    </Grid>
                  </Grid>
                </FormControl>
                <Box>
                  <Button
                    variant="contained"
                    size="medium"
                    sx={{ float: 'right', marginRight: 6, marginBottom: 2, marginTop: 3 }}
                    type="submit"
                  >
                    Note Attendence
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
          {filteredStudents.length === 0 ? (
            <Box sx={{ width: '44%', height: '56%', ml: '20%' }}>
              <Image
                disabledEffect
                visibleByDefault
                alt="auth"
                // src={illustration || '/assets/illustrations/illustration_dashboard.png'}
                // src={illustration || '/assets/illustrations/new.png'}
                src="/assets/illustrations/online-attendance-form.png"
                sx={{ maxWidth: 720 }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                padding: 3,
              }}
            >
              {filteredStudents.map((student: any) => (
                <Card
                  key={student?._id}
                  sx={{
                    maxWidth: 345,
                    margin: 1,
                    boxShadow: '1px 2px 10px #ccc',
                    '&:hover': {
                      transition: 'all 0.2s ease-out',
                      boxShadow: '0px 4px 8px rgba(38, 38, 38, 0.2)',
                      top: '-4px',
                      border: '1px solid #cccccc',
                      backgroundColor: '#e9e1e1',
                    },
                  }}
                >
                  <CardContent>
                    <Avatar
                      sx={{ width: 100, height: 100, margin: 'auto' }}
                      alt="User Profile"
                      // src={require('../assets/dashboard/boyy.png')}
                      src={student?.studentId?.avatar}
                    />
                    <Typography variant="h5" component="div" sx={{ mt: 2, textAlign: 'center' }}>
                      {student?.studentId?.name}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                      {student?.studentId?.username}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center' }}>
                    {student?.attendenceType === 'Present' ? (
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => {
                          setStudentFormPopup(true);
                          setClickedStudent(student);
                        }}
                      >
                        Present
                      </Button>
                    ) : student?.attendenceType === 'Absent' ? (
                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={() => {
                          setStudentFormPopup(true);
                          setClickedStudent(student);
                        }}
                      >
                        Absent
                      </Button>
                    ) : student?.attendenceType === 'Nursing' ? (
                      <Button
                        size="small"
                        variant="contained"
                        color="warning"
                        onClick={() => {
                          setStudentFormPopup(true);
                          setClickedStudent(student);
                        }}
                      >
                        Nursing
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        variant="contained"
                        color="info"
                        onClick={() => {
                          setStudentFormPopup(true);
                          setClickedStudent(student);
                        }}
                      >
                        Emergency
                      </Button>
                    )}
                  </CardActions>
                </Card>
              ))}
            </Box>
          )}
        </Box>
      </Container>
      <DialogAnimate open={studentFormPopup} maxWidth="xs">
        <Stack direction="column">
          <Stack
            display="flex"
            flexDirection="row-reverse"
            // sx={{ background: theme.palette.background.neutral }}
          >
            <IconButton onClick={() => setStudentFormPopup(false)}>
              <Iconify icon="iconoir:cancel" width="24" height="24" />
            </IconButton>
          </Stack>
          <Stack>
            <Card sx={{ maxWidth: '100%', margin: 1 }} onClick={handleUpdateAttendence}>
              <CardContent>
                <Avatar
                  sx={{ width: 100, height: 100, margin: 'auto' }}
                  alt="User Profile"
                  src={clickedStudent?.studentId?.avatar}
                />
                <Typography variant="h5" component="div" sx={{ mt: 2, textAlign: 'center' }}>
                  {clickedStudent?.studentId?.name}
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                  {clickedStudent?.studentId?.username}
                </Typography>
                <br />
                <TextField
                  fullWidth
                  type="text"
                  id="my-text"
                  label="Reason"
                  variant="outlined"
                  name="reason"
                  required
                />
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}
                >
                  <Button size="small" variant="contained">
                    Present
                  </Button>
                  <Button size="small" variant="contained" color="error">
                    Absent
                  </Button>
                  <Button size="small" variant="contained" color="warning">
                    Nursing
                  </Button>
                  <Button size="small" variant="contained" color="info">
                    Emergency
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Stack>
        </Stack>
      </DialogAnimate>
    </>
  );
};
export default Attendence;

// {
//   "classId": "661517e021b50b585ab718ec",
//   "attendenceDate": "04/03/2024",
//   "subjectId": "6614d4c69e3bb1cabd64d44f",
//   "attendenceType": "Present",
//   "reason": "present",
//   "studentId": "66151b0121b50b585ab71945"
// }
