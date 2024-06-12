// @mui
import { useSettingsContext } from '../../components/settings';
import { Helmet } from 'react-helmet-async';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
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
import TeacherForm from './TeacherForm';
import { useState, useEffect } from 'react';
import Iconify from 'src/components/iconify';
import { DialogAnimate } from 'src/components/animate';
import { deleteTeacher, getTeachers } from 'src/services/teachers/teachers.service';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'src/components/snackbar';
import EditIcon from '@mui/icons-material/Edit';
import TeacherEditForm from './TeacherEditForm';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function TeachersList() {
  const { themeStretch } = useSettingsContext();
  const [teachers, setTeachers] = useState([]);
  const [teacherFormPopup, setTeacherFormPopup] = useState<boolean>(false);
  const [teacherPage, teacherPageChange] = useState(0);
  const [teacherRowPerPage, teacherRowPerPageChange] = useState(10);
  const [deleteFormPopup, setDeleteFormPopup] = useState<boolean>(false);
  const [deleteStudentID, setDeleteStudentID] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const [teacherEditFormPopup, setTeacherEditFormPopup] = useState<boolean>(false);
  const [editTeacherDetails, setEditTeacherDetails] = useState();
  useEffect(() => {
    fetchApi();
  }, [deleteFormPopup, teacherFormPopup, teacherEditFormPopup]);
  const fetchApi = async () => {
    // const getData = await axios.get("http://localhost:3000/students");
    const getData = await getTeachers();
    setTeachers(getData);
  };
  const handleDeleteStudents = async (id: any) => {
    const payload = id;
    console.log('payload', payload);
    const response = await deleteTeacher(payload);
    response?.status === 200
      ? enqueueSnackbar('Teacher Successfully Deleted !', { variant: 'success' })
      : enqueueSnackbar('Unable to delete Teacher !', { variant: 'error' });
    setDeleteFormPopup(false);
  };
  //pagination
  const handlechangepage = (event: any, newpage: any) => {
    teacherPageChange(newpage);
  };
  const handleRowsPerPage = (event: any) => {
    teacherRowPerPageChange(+event.target.value);
    teacherPageChange(0);
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
        <title> Teachers || TimeSync</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Box sx={{ p: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography variant="h3" component="h1" paragraph>
            Teachers List
          </Typography>
          <Button
            variant="contained"
            sx={{ height: 40 }}
            onClick={() => {
              setTeacherFormPopup(true);
            }}
          >
            Add Teacher.
          </Button>
        </Box>
        {teachers.length != 0 ? (
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
                    <TableCell align="center">Subject Teaching</TableCell>
                    <TableCell align="center">Contact No.</TableCell>
                    <TableCell align="center">Gender</TableCell>
                    <TableCell align="center">Age</TableCell>
                    <TableCell align="center">Address</TableCell>
                    <TableCell align="center">Action</TableCell>
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
                        key={teacher._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="center" component="th" scope="row">
                          {1 + index}
                        </TableCell>
                        <TableCell align="center">
                          {' '}
                          <Avatar alt="avatar" src={teacher.avatar} />
                        </TableCell>
                        <TableCell align="center">{teacher.name}</TableCell>
                        <TableCell align="center">{teacher.username}</TableCell>
                        <TableCell align="center">{teacher.subjectId.subject}</TableCell>
                        <TableCell align="center">{teacher.phoneno}</TableCell>
                        <TableCell align="center">{teacher.gender}</TableCell>
                        <TableCell align="center">{teacher.age}</TableCell>
                        <TableCell align="center">{teacher.address.state}</TableCell>
                        <TableCell align="center">
                          <Box>
                            <Tooltip title="Action">
                              <IconButton
                                aria-label="more"
                                aria-controls="three-dotted-menu"
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={(event) => handleAnchorClick(teacher._id, event)}
                              >
                                <MoreVertIcon />
                              </IconButton>
                            </Tooltip>
                            <Menu
                              id="three-dotted-menu"
                              anchorEl={anchorEls[teacher._id]}
                              open={Boolean(anchorEls[teacher._id])}
                              onClose={() => handleAnchorClose(teacher._id)}
                              PaperProps={{
                                style: {
                                  boxShadow: 'none', // Remove box shadow
                                },
                              }}
                            >
                              <MenuItem
                                onClick={() => {
                                  setTeacherEditFormPopup(true);
                                  setEditTeacherDetails(teacher);
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
                                  sx={{
                                    color: 'red',
                                    '&:hover': {
                                      cursor: 'pointer',
                                    },
                                  }}
                                  aria-label="delete"
                                  onClick={() => {
                                    setDeleteFormPopup(true);
                                    setDeleteStudentID(teacher._id);
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
              rowsPerPage={teacherRowPerPage}
              page={teacherPage}
              count={teachers.length}
              component="div"
              onPageChange={handlechangepage}
              onRowsPerPageChange={handleRowsPerPage}
            ></TablePagination>
          </Paper>
        ) : (
          ''
        )}

        {/* ..................... */}
        <DialogAnimate open={teacherFormPopup} maxWidth="lg">
          <Stack direction="column">
            <Stack
              display="flex"
              flexDirection="row-reverse"
              // sx={{ background: theme.palette.background.neutral }}
            >
              <IconButton onClick={() => setTeacherFormPopup(false)}>
                <Iconify icon="iconoir:cancel" width="24" height="24" />
              </IconButton>
            </Stack>
            <Stack>
              <TeacherForm setTeacherFormPopup={setTeacherFormPopup} teacherFormPopup />
            </Stack>
          </Stack>
        </DialogAnimate>
        {/* .................... */}
        <DialogAnimate open={deleteFormPopup} maxWidth="sm">
          <Stack direction="column">
            <Stack
              display="flex"
              flexDirection="row-reverse"
              // sx={{ background: theme.palette.background.neutral }}
            >
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
                    color="error"
                    sx={{ height: 45 }}
                    onClick={() => handleDeleteStudents(deleteStudentID)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ marginBottom: '20px !important', fontSize: 20 }}
                    onClick={() => setDeleteFormPopup(false)}
                  >
                    Cancel
                  </Button>
                </Box>
              </Card>
            </Stack>
          </Stack>
        </DialogAnimate>
        <DialogAnimate open={teacherEditFormPopup} maxWidth="lg">
          <Stack direction="column">
            <Stack display="flex" flexDirection="row-reverse">
              <IconButton onClick={() => setTeacherEditFormPopup(false)}>
                <Iconify icon="iconoir:cancel" width="24" height="24" />
              </IconButton>
            </Stack>
            <Stack>
              <TeacherEditForm
                teacherEditFormPopup
                setTeacherEditFormPopup={setTeacherEditFormPopup}
                editTeacherDetails={editTeacherDetails}
              />
            </Stack>
          </Stack>
        </DialogAnimate>
      </Container>
    </>
  );
}
