import React, { useState, useEffect, useRef } from 'react';

import {
  Typography,
  FormControl,
  Button,
  Box,
  InputLabel,
  MenuItem,
  Select,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  TextField,
  Card,
  IconButton,
  Stack,
} from '@mui/material';
import { PATH_DASHBOARD } from 'src/routes/paths';
import generatePDF, { Options } from 'react-to-pdf';
import { getClasses, getClassById } from 'src/services/classes/class.service';
import { getSubjects } from 'src/services/subjects/subjects.service';
import { getTeachers } from 'src/services/teachers/teachers.service';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'src/components/snackbar';
import {
  getAllTimetableDetails,
  getAllTimetableByClassId,
  getSavedTimetableClassNames,
  deleteCompleteTimetableByClassId,
} from 'src/services/timetable/timetable.service';
import { DialogAnimate } from 'src/components/animate';
import Iconify from 'src/components/iconify';
const SavedTimetable: React.FC = () => {
  const navigate = useNavigate();
  const [deleteFormPopup, setDeleteFormPopup] = useState<boolean>(false);
  const timeTableForm = useRef<HTMLFormElement>(null);
  const [className, setClassName] = useState<any>();
  const [classId, setClassId] = useState('');
  const [classList, setClassList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [allTimetableDetails, setAllTimetableDetails] = useState([]);
  const [timetableByClassId, setTimetableByClassId] = useState([]);
  const [timetableClassNames, setTimetableClassNames] = useState([]);
  const [show, setShow] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    fetchApi();
  }, [classId]);
  const fetchApi = async () => {
    const classesData = await getClasses();
    const subData = await getSubjects();
    const teacherData = await getTeachers();
    const allTimetableData = await getAllTimetableDetails();
    const timeatableByClassIdDetails = await getAllTimetableByClassId(classId);
    const classData = await getClassById(classId);
    const classesName = await getSavedTimetableClassNames();
    setClassList(classesData);
    setSubjectList(subData);
    setTeacherList(teacherData);
    setAllTimetableDetails(allTimetableData);
    setTimetableByClassId(timeatableByClassIdDetails);
    setTimetableClassNames(classesName);
    setClassName(classData);
  };

  function filterByDayAndPeriod(data: any, day: any, period: any) {
    return data.filter((item: any) => item.day === day && item.period === period);
  }

  const showTimeTable = (e: any) => {
    const filteredData = filterByDayAndPeriod(timetableByClassId, 'Monday', 'P1');
    e.preventDefault();
    setShow(timetableByClassId);
  };

  const handleChangeCLass = async (event: any) => {
    setClassId(event.target.value);
  };
  const handleDeleteClasses = async () => {
    const response = await deleteCompleteTimetableByClassId(classId);
    console.log(response);
    response?.status === 200
      ? enqueueSnackbar('Timetable Deleted !', { variant: 'success' })
      : enqueueSnackbar('Unable to delete timetable !', { variant: 'error' });

    setDeleteFormPopup(false);
  };
  //pdf
  const options: Options = {
    filename: `${className?.data?.classname}-timetable.pdf`,
    page: {
      margin: 20,
    },
  };
  const getTargetElement = () => document.getElementById('table-block');
  const downloadPdf = () => generatePDF(getTargetElement, options);

  const [timetable, setTimetable] = useState<any>({});

  const handleChange = (day: any, periods: any, type: any, value: any) => {
    setTimetable((prevState: any) => ({
      ...prevState,
      [day]: {
        ...prevState[day],
        [periods]: {
          ...prevState[day]?.[periods],
          [type]: value,
          day: day,
          period: periods,
          classId: classId,
        },
      },
    }));
  };
  const periods = ['P1', 'P2', 'P3', 'P4', 'BREAK', 'P5', 'P6', 'P7'];
  const header = ['DAY', 'P1', 'P2', 'P3', 'P4', 'BREAK', 'P5', 'P6', 'P7'];
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return classList.length === 0 ||
    subjectList.length === 0 ||
    teacherList.length === 0 ||
    timetableClassNames.length === 0 ? (
    <>
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
        "No Timetable found..."
      </Box>
    </>
  ) : (
    <>
      <Box sx={{ margin: '20px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography variant="h3" component="h3" paragraph>
            Saved Timetable
          </Typography>{' '}
          <Button
            variant="contained"
            size="medium"
            onClick={() => navigate(PATH_DASHBOARD.timetable)}
            sx={{ height: '40px', margin: 3 }}
          >
            Create Timetable
          </Button>
        </Box>
        <form onSubmit={showTimeTable}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Box>
              <FormControl variant="outlined" sx={{ m: 1, width: '300px' }}>
                <InputLabel id="demo-simple-select-standard-label">Select Class</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="Select Class"
                  required
                  value={classId}
                  onChange={handleChangeCLass}
                >
                  {timetableClassNames.map((data: any) => (
                    <MenuItem key={data?.classId?._id} value={data?.classId?._id}>
                      {data?.classId?.classname}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
              {' '}
              <Button
                variant="contained"
                size="medium"
                type="submit"
                // onClick={showTimeTable}
                sx={{ height: '40px', margin: 1 }}
              >
                Show TimeTable
              </Button>
              <Button
                variant="contained"
                size="medium"
                onClick={downloadPdf}
                sx={{ height: '40px', margin: 1 }}
              >
                Generate PDF
              </Button>
              <Button
                size="medium"
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => setDeleteFormPopup(true)}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
      <Box className="table-wrap" id="table-block" style={{ margin: '20px' }}>
        <Box sx={{ marginLeft: '40%' }}>
          <Typography variant="h4" component="h4" paragraph>
            {className?.data?.classname} Timetable
          </Typography>
        </Box>

        {/* .... */}
        <TableContainer
          component={Paper}
          sx={{ mt: 2, border: '1px solid #ccc', boxShadow: '1px 2px 5px #ccc' }}
        >
          <Table sx={{ minWidth: '100%' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {header.map((period: any) => (
                  <TableCell align="center" key={period}>
                    <Typography variant="h6">{period}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {daysOfWeek.map((day) => (
                <TableRow key={day}>
                  <TableCell align="center" sx={{ color: '#637381', backgroundColor: '#F4F6F8' }}>
                    <Typography variant="h6">{day}</Typography>
                  </TableCell>
                  {periods.map((period, index) => {
                    const data = filterByDayAndPeriod(show, day, period);
                    return index != 4 ? (
                      <TableCell
                        align="center"
                        key={`${day}-${period}`}
                        sx={{ borderBottom: '1px solid #ccc' }}
                      >
                        <Typography>
                          <TextField
                            label="Subject"
                            variant="outlined"
                            value={data.length === 0 ? '------' : data[0]?.subjectId.subject}
                          />
                          <br /> <br />
                          <TextField
                            label="Teacher"
                            variant="outlined"
                            value={data.length === 0 ? '------' : data[0]?.teacherId?.name}
                          />
                        </Typography>
                      </TableCell>
                    ) : (
                      <TableCell
                        align="center"
                        sx={{ color: '#637381', backgroundColor: '#F4F6F8' }}
                      >
                        <Typography variant="h6"></Typography>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {/* delete Popup */}
      <DialogAnimate open={deleteFormPopup} maxWidth="sm">
        <Stack direction="column">
          <Stack display="flex" flexDirection="row-reverse">
            <IconButton onClick={() => setDeleteFormPopup(false)}>
              <Iconify icon="iconoir:cancel" width="24" height="24" />
            </IconButton>
          </Stack>
          <Stack>
            <Card sx={{ p: 3 }}>
              <Typography variant="h4" component="h1" paragraph>
                Want to delete?
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  color="error"
                  sx={{ height: 45 }}
                  onClick={() => handleDeleteClasses()}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  sx={{ marginBottom: '20px !important', fontSize: 18 }}
                  onClick={() => setDeleteFormPopup(false)}
                >
                  Cancel
                </Button>
              </Box>
            </Card>
          </Stack>
        </Stack>
      </DialogAnimate>
    </>
  );
};

export default SavedTimetable;
