import React, { useState, useEffect, useRef } from 'react';

import PropTypes from 'prop-types';

import {
  Typography,
  FormControl,
  Button,
  Box,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  Stack,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from '@mui/material';
import { PATH_DASHBOARD } from 'src/routes/paths';
import generatePDF, { Options } from 'react-to-pdf';
import { getClasses } from 'src/services/classes/class.service';
import { getSubjects } from 'src/services/subjects/subjects.service';
import { getTeacherBySubjectId, getTeachers } from 'src/services/teachers/teachers.service';
import { saveTimetable } from 'src/services/timetable/timetable.service';
import { useNavigate } from 'react-router-dom';
import { getClassSubjectMapping } from 'src/services/classSubjectMapping/classSubjectMapping.service';
import { useSnackbar } from 'src/components/snackbar';
const NewTimeTable: React.FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [className, setClassName] = useState('');
  const [classId, setClassId] = useState('');
  const [subjectList, setSubjectList] = useState([0]);
  const [teacherList, setTeacherList] = useState([]);
  const [classSubjectMap, setClassSubjectMap] = useState([]);
  useEffect(() => {
    fetchApi();
  }, []);
  const fetchApi = async () => {
    const teacherData = await getTeachers();
    const classSubMap = await getClassSubjectMapping();
    setTeacherList(teacherData);
    setClassSubjectMap(classSubMap);
  };
  function filterSubjectsByClassId(targetClassId: any) {
    console.log('targetClassId', targetClassId);

    const filteredSubjects = classSubjectMap
      .filter((subject: any) => subject.classId === targetClassId)
      .map((subject: any) => subject.subjects);
    console.log('filteredSubjects', filteredSubjects);

    setSubjectList(filteredSubjects[0]);
  }
  const handleChangeCLass = async (event: any) => {
    setClassId(event.target.value);
    filterSubjectsByClassId(event.target.value);
  };

  const [timetable, setTimetable] = useState<any>({});
  // const handleChange = (day: any, period: any, type: any, value: any) => {
  //   setTimetable((prevState: any) => ({
  //     ...prevState,
  //     [day]: {
  //       ...prevState[day],
  //       [period]: {
  //         ...prevState[day]?.[period],
  //         [type]: value,
  //       },
  //     },
  //   }));
  // };

  const handleChange = async (day: any, periods: any, type: any, value: any) => {
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

  function extractFieldsFromTimetable(timetable: any) {
    const extractedData: any = [];
    // Iterate over each day
    Object.keys(timetable).forEach((day) => {
      const periods = timetable[day];
      // Iterate over each period
      Object.keys(periods).forEach((period) => {
        const periodData = periods[period];
        // Extract required fields and push to array
        const extractedObject = {
          subjectId: periodData.subjectId,
          day: periodData.day,
          period: periodData.period,
          classId: periodData.classId,
          teacherId: periodData.teacherId,
        };
        extractedData.push(extractedObject);
      });
    });

    return extractedData;
  }
  const SavedTimeTable = async (e: any) => {
    e.preventDefault();
    const extractedData = extractFieldsFromTimetable(timetable);
    console.log(extractedData);

    const response = await saveTimetable(extractedData);
    console.log(response);

    response?.status === 201
      ? enqueueSnackbar('Class Successfully Created !', { variant: 'success' })
      : enqueueSnackbar('Class Not Created !', { variant: 'error' });
  };

  return (
    <>
      <form onSubmit={SavedTimeTable}>
        <Box sx={{ margin: '20px' }}>
          <Typography variant="h3" component="h3" paragraph>
            Timetable
          </Typography>
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
                  {classSubjectMap.map((data: any) => (
                    <MenuItem key={data?.classId} value={data?.classId}>
                      {data?.className}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <Button
                variant="contained"
                size="medium"
                type="submit"
                sx={{ height: '40px', margin: 3 }}
              >
                Save
              </Button>
              <Button
                variant="contained"
                size="medium"
                // onClick={downloadPdf}
                onClick={() => navigate(PATH_DASHBOARD.savedtimetable)}
                sx={{ height: '40px', margin: 3 }}
              >
                Saved Timetable
              </Button>
            </Box>
          </Box>
        </Box>

        <Box className="table-wrap" id="table-block" style={{ margin: '20px' }}>
          <Box sx={{ marginLeft: '40%' }}>
            <Typography variant="h3" component="h3" paragraph>
              {className}
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
                    {periods.map((period, index) =>
                      index != 4 ? (
                        <TableCell
                          align="center"
                          key={`${day}-${period}`}
                          sx={{ borderBottom: '1px solid #ccc' }}
                        >
                          <Typography variant="h6">
                            <FormControl sx={{ minWidth: 100 }} size="small">
                              <InputLabel id={`subject-label-${day}-${index}`}>Subject</InputLabel>
                              <Select
                                labelId={`subject-label-${day}-${index}`}
                                label="Subject"
                                value={timetable[day]?.[period]?.subjectId || ''}
                                // required
                                onChange={(e) =>
                                  handleChange(day, period, 'subjectId', e.target.value)
                                }
                              >
                                {subjectList.map((data: any) => (
                                  <MenuItem key={data?.subjectId} value={data?.subjectId}>
                                    {data?.subjectName}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                            <br /> <br />
                            <FormControl sx={{ minWidth: 100 }} size="small">
                              <InputLabel id={`teacher-label-${day}-${index}`}>Teacher</InputLabel>
                              <Select
                                // required
                                labelId={`teacher-label-${day}-${index}`}
                                label="Teacher"
                                value={timetable[day]?.[period]?.teacherId || ''}
                                onChange={(e) =>
                                  handleChange(day, period, 'teacherId', e.target.value)
                                }
                              >
                                {teacherList.map((data: any) => (
                                  <MenuItem key={data?._id} value={data?._id}>
                                    {data?.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Typography>{' '}
                        </TableCell>
                      ) : (
                        <TableCell
                          align="center"
                          sx={{ color: '#637381', backgroundColor: '#F4F6F8' }}
                        >
                          <Typography variant="h6"></Typography>
                        </TableCell>
                      )
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </form>
    </>
  );
};

export default NewTimeTable;
