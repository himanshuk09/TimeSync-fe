// @mui
import { useSettingsContext } from '../../components/settings';
import { Helmet } from 'react-helmet-async';
import {
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Paper,
  Stack,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Card,
  CircularProgress,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import StudentForm from './StudentForm';
import { useState, useEffect } from 'react';
import Iconify from 'src/components/iconify';
import { DialogAnimate } from 'src/components/animate';
import { getStudents, deleteStudent } from 'src/services/students/students.service';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'src/components/snackbar';
import EditIcon from '@mui/icons-material/Edit';
import StudentEditForm from './StudentEditForm';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function StudentsList() {
  const { themeStretch } = useSettingsContext();
  const [students, setStudents] = useState([]);
  const [studentFormPopup, setStudentFormPopup] = useState<boolean>(false);
  const [studentPage, studentPageChange] = useState(0);
  const [deleteFormPopup, setDeleteFormPopup] = useState<boolean>(false);
  const [studentRowPerPage, studentRowPerPageChange] = useState(10);
  const [deleteStudentID, setDeleteStudentID] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const [studentEditFormPopup, setStudentEditFormPopup] = useState<boolean>(false);
  const [editStudentDetails, setEditStudentDetails] = useState();
  useEffect(() => {
    fetchApi();
  }, [deleteFormPopup, studentFormPopup, studentEditFormPopup]);
  const fetchApi = async () => {
    const getData = await getStudents();
    setStudents(getData);
  };
  const handleDeleteStudents = async (id: any) => {
    const payload = id;
    const response = await deleteStudent(payload);
    response?.status === 200
      ? enqueueSnackbar('Student Successfully Deleted !', { variant: 'success' })
      : enqueueSnackbar('Unable to delete Student !', { variant: 'error' });
    setDeleteFormPopup(false);
  };
  //pagination
  const handlechangepage = (event: any, newpage: any) => {
    studentPageChange(newpage);
  };
  const handleRowsPerPage = (event: any) => {
    studentRowPerPageChange(+event.target.value);
    studentPageChange(0);
  };
  // new dots
  const [anchorEls, setAnchorEls] = useState<{ [key: string]: HTMLElement | null }>({});
  const open = Boolean(anchorEls);
  const handleAnchorClick = (id: string, event: React.MouseEvent<HTMLElement>) => {
    setAnchorEls((prevAnchorEls) => ({
      ...prevAnchorEls,
      [id]: event.currentTarget,
    }));
  };
  const handleAnchorClose = (id: string) => {
    setAnchorEls((prevAnchorEls) => ({
      ...prevAnchorEls,
      [id]: null,
    }));
  };
  return (
    <>
      <Helmet>
        <title> Students || TimeSync</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Box sx={{ p: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography variant="h3" component="h1" paragraph>
            Students List
          </Typography>
          <Button
            variant="contained"
            sx={{ height: 40 }}
            onClick={() => {
              setStudentFormPopup(true);
            }}
          >
            Add Student.
          </Button>
        </Box>
        {students.length != 0 ? (
          <Paper>
            <TableContainer
              component={Paper}
              sx={{ mt: 2, border: '1px solid #ccc', boxShadow: '1px 2px 5px #ccc' }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Sr_No</TableCell>
                    <TableCell align="center">Avatar</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Username</TableCell>
                    <TableCell align="center">Class Name</TableCell>
                    <TableCell align="center">Contact No.</TableCell>
                    <TableCell align="center">Gender</TableCell>
                    <TableCell align="center">Age</TableCell>
                    <TableCell align="center">Address</TableCell>
                    <TableCell align="center">Actions</TableCell>
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
                        <TableCell align="center" component="th" scope="row">
                          {1 + index}
                        </TableCell>
                        <TableCell align="center">
                          {' '}
                          <Avatar alt="avatar" src={student.avatar} />
                        </TableCell>
                        <TableCell align="center">{student.name}</TableCell>
                        <TableCell align="center">{student.username}</TableCell>
                        <TableCell align="center">{student.classId.classname}</TableCell>
                        <TableCell align="center">{student.phoneno}</TableCell>
                        <TableCell align="center">{student.gender}</TableCell>
                        <TableCell align="center">{student.age}</TableCell>
                        <TableCell align="center">{student.address.state}</TableCell>
                        <TableCell align="center">
                          <Box>
                            <Tooltip title="Action">
                              <IconButton
                                aria-label="more"
                                aria-controls="three-dotted-menu"
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={(event) => handleAnchorClick(student._id, event)}
                              >
                                <MoreVertIcon />
                              </IconButton>
                            </Tooltip>
                            <Menu
                              id="three-dotted-menu"
                              anchorEl={anchorEls[student._id]}
                              open={Boolean(anchorEls[student._id])}
                              onClose={() => handleAnchorClose(student._id)}
                              PaperProps={{
                                style: {
                                  boxShadow: 'none', // Remove box shadow
                                },
                              }}
                            >
                              <MenuItem
                                onClick={() => {
                                  setStudentEditFormPopup(true);
                                  setEditStudentDetails(student);
                                }}
                              >
                                <IconButton
                                  aria-label="edit"
                                  sx={{
                                    marginLeft: 1,
                                    color: 'green',
                                    '&:hover': {
                                      cursor: 'pointer',
                                    },
                                  }}
                                >
                                  <EditIcon />
                                </IconButton>
                                Edit
                              </MenuItem>

                              <MenuItem>
                                <IconButton
                                  aria-label="delete"
                                  onClick={() => {
                                    setDeleteFormPopup(true);
                                    setDeleteStudentID(student._id);
                                  }}
                                  sx={{
                                    color: 'red',
                                    '&:hover': {
                                      cursor: 'pointer',
                                    },
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                                Delete
                              </MenuItem>
                            </Menu>
                          </Box>
                        </TableCell>
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
              onPageChange={handlechangepage}
              onRowsPerPageChange={handleRowsPerPage}
            ></TablePagination>
          </Paper>
        ) : (
          ''
        )}

        {/* ..................... */}
        <DialogAnimate open={studentFormPopup} maxWidth="lg">
          <Stack direction="column">
            <Stack display="flex" flexDirection="row-reverse">
              <IconButton onClick={() => setStudentFormPopup(false)}>
                <Iconify icon="iconoir:cancel" width="24" height="24" />
              </IconButton>
            </Stack>
            <Stack>
              <StudentForm studentFormPopup setStudentFormPopup={setStudentFormPopup} />
            </Stack>
          </Stack>
        </DialogAnimate>
        {/* .................... */}
        <DialogAnimate open={deleteFormPopup} maxWidth="sm">
          <Stack direction="column">
            <Stack display="flex" flexDirection="row-reverse">
              <IconButton onClick={() => setDeleteFormPopup(false)}>
                <Iconify icon="iconoir:cancel" width="24" height="24" />
              </IconButton>
            </Stack>
            <Stack>
              <Card sx={{ p: 3 }}>
                <Typography
                  variant="h4"
                  component="h1"
                  paragraph
                  alignItems="center"
                  sx={{ paddingLeft: 4 }}
                >
                  <ReportProblemIcon sx={{ color: 'red' }} /> Are you sure to delete?
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                  <Button
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    sx={{ height: 45 }}
                    color="error"
                    onClick={() => handleDeleteStudents(deleteStudentID)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ marginBottom: '20px !important', fontSize: 19 }}
                    onClick={() => setDeleteFormPopup(false)}
                  >
                    Cancel
                  </Button>
                </Box>
              </Card>
            </Stack>
          </Stack>
        </DialogAnimate>
        <DialogAnimate open={studentEditFormPopup} maxWidth="lg">
          <Stack direction="column">
            <Stack display="flex" flexDirection="row-reverse">
              <IconButton onClick={() => setStudentEditFormPopup(false)}>
                <Iconify icon="iconoir:cancel" width="24" height="24" />
              </IconButton>
            </Stack>
            <Stack>
              <StudentEditForm
                studentEditFormPopup
                editStudentDetails={editStudentDetails}
                setStudentEditFormPopup={setStudentEditFormPopup}
              />
            </Stack>
          </Stack>
        </DialogAnimate>
      </Container>
    </>
  );
}
