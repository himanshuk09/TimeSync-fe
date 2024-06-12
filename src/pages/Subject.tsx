import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  FormGroup,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Snackbar,
  Stack,
  TablePagination,
  Tooltip,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TextField from '@mui/material/TextField/TextField';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  getSubjects,
  addSubjects,
  deleteSubject,
  updateSubject,
} from 'src/services/subjects/subjects.service';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DialogAnimate } from 'src/components/animate';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import { useSettingsContext } from 'src/components/settings';
const Subjects = () => {
  const { themeStretch } = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();
  const [classPage, classPageChange] = useState(0);
  const [classRowPerPage, classRowPerPageChange] = useState(6);
  const [cardsUpdates, setCardsUpdates] = useState(true);
  const [subjectData, setSubjectData] = useState([0]);
  const [deleteFormPopup, setDeleteFormPopup] = useState<boolean>(false);
  const [deleteClassesID, setDeleteSubjectID] = useState();
  const [editFormPopup, setEditFormPopup] = useState<boolean>(false);
  const [editSubjectDetail, setEditSubjectDetail] = useState({
    subject: '',
    description: '',
    _id: '',
  });
  const [subject, setSubject] = useState({
    subject: '',
    description: '',
  });
  useEffect(() => {
    fetchApi();
  }, [cardsUpdates, deleteFormPopup]);
  const fetchApi = async () => {
    const getData = await getSubjects();
    setSubjectData(getData);
  };
  const submitData = async (e: any) => {
    e.preventDefault();
    const payload = {
      ...subject,
    };
    const postApi = await addSubjects(payload);
    setCardsUpdates(cardsUpdates === true ? false : true);
  };
  const handleDeleteClasses = async (id: any) => {
    const payload = id;
    const response = await deleteSubject(payload);
    response?.status === 200
      ? enqueueSnackbar('Subject Successfully Deleted !', { variant: 'success' })
      : enqueueSnackbar('Unable to delete Subject !', { variant: 'error' });
    setDeleteFormPopup(false);
  };

  //pagination
  const handlechangepage = (event: any, newpage: any) => {
    classPageChange(newpage);
  };
  const handleRowsPerPage = (event: any) => {
    classRowPerPageChange(+event.target.value);
    classPageChange(0);
  };
  // random color
  function generateLightColor() {
    const minBrightness = 200; // Adjust this value for desired brightness
    const randomRed = Math.floor(Math.random() * (255 - minBrightness) + minBrightness);
    const randomGreen = Math.floor(Math.random() * (255 - minBrightness) + minBrightness);
    const randomBlue = Math.floor(Math.random() * (255 - minBrightness) + minBrightness);
    return 'rgb(' + randomRed + ',' + randomGreen + ',' + randomBlue + ')';
  }
  const colors = [
    '#ffb8ac',
    '#ff93ea',
    '#7fd0fb',
    '#4befda',
    '#ff91ae',
    '#ffcba0',
    '#7eeb9a',
    '#ffd778',
    '#feb7ab',
  ];

  function getRandomColor() {
    if (colors.length > 0) {
      const randomIndex = Math.floor(Math.random() * colors.length);
      return colors[randomIndex];
    } else {
      return generateLightColor();
    }
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(Object.fromEntries(formData.entries()));
    const data = Object.fromEntries(formData.entries());
    const payload = {
      ...data,
    };
    const response = await addSubjects(payload);
    response?.status === 201
      ? enqueueSnackbar('Subject Successfully Created !', { variant: 'success' })
      : enqueueSnackbar('Subject Not Created !', { variant: 'error' });

    setCardsUpdates(cardsUpdates === true ? false : true);
  };
  const handleUpdate = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(Object.fromEntries(formData.entries()));
    const data = Object.fromEntries(formData.entries());
    const payload = {
      ...data,
    };
    const response = await updateSubject(editSubjectDetail?._id, payload);
    response?.status === 200
      ? enqueueSnackbar('Subject Successfully Updated !', { variant: 'success' })
      : enqueueSnackbar('Unable to update Subject', { variant: 'error' });
    setEditFormPopup(false);
    setCardsUpdates(cardsUpdates === true ? false : true);
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
        <title> TimeSync | Subject</title>
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
            Subject Section
          </Typography>
          <Box
            sx={{
              maxWidth: '100%',
              border: '1 solid black',
              margin: 1,
              borderRadius: 5,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                padding: '2%',
                height: '30%',
                margin: 2,
                marginLeft: 1,
                border: '1 solid black',
                borderRadius: 5,

                boxShadow: '1px 2px 4px #BEBEC2',
              }}
            >
              <Typography variant="h4" component="h1" paragraph>
                Create Subject
              </Typography>
              <FormGroup>
                <form onSubmit={handleSubmit}>
                  <TextField
                    id="outlined-basic"
                    label="Subject Name"
                    className="text-field"
                    size="medium"
                    variant="outlined"
                    sx={{ margin: 2, width: '90% !important' }}
                    name="subject"
                    required
                  />

                  <TextField
                    fullWidth
                    id="outlined-basic"
                    size="medium"
                    className="text-field"
                    label="Description"
                    rows={4}
                    multiline={true}
                    sx={{ margin: 2, width: '90% !important' }}
                    variant="outlined"
                    name="description"
                    required
                  />
                  <Button variant="contained" size="large" sx={{ marginLeft: '28%' }} type="submit">
                    Add Subject
                  </Button>
                </form>
              </FormGroup>
            </Box>
            <Box
              sx={{
                width: '90vw',
                padding: 3,
                height: '100%',
                border: '1 solid black',
                borderRadius: 5,
                margin: 2,
                boxShadow: '1px 2px 4px #BEBEC2',
              }}
            >
              <Typography variant="h4" component="h1" paragraph>
                Subjects
              </Typography>
              <Paper>
                <Box
                  className="container"
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    width: '100%',
                    height: '95%',
                  }}
                >
                  {subjectData
                    .slice(
                      classPage * classRowPerPage,
                      classPage * classRowPerPage + classRowPerPage
                    )
                    .map((data: any) => (
                      <Box
                        className="card"
                        sx={{
                          width: '11rem',
                          height: '30%',
                          borderRadius: '20px',
                          backgroundColor: getRandomColor(),
                          position: 'relative',
                          padding: '0.8rem',
                          border: '2px solid #c3c6ce',
                          transition: ' 0.5s ease- out',
                          overflow: 'visible',
                          margin: '23px 10px 15px 15px',
                          '&:hover': {
                            borderColor: '#008bf8',
                            boxShadow: '0 4px 18px 0 rgba(0, 0, 0, 0.25)',
                          },
                        }}
                        key={data?._id}
                      >
                        <Box
                          className="cardDetails"
                          sx={{
                            color: 'black',
                            height: '100%',
                            gap: '.1rem',
                            display: 'grid',
                            placeContent: 'center',
                          }}
                        >
                          <Box sx={{ pl: 10 }}>
                            <Tooltip title="Action">
                              <IconButton
                                aria-label="more"
                                aria-controls="three-dotted-menu"
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={(event) => handleAnchorClick(data._id, event)}
                              >
                                <MoreVertIcon />
                              </IconButton>
                            </Tooltip>
                            <Menu
                              id="three-dotted-menu"
                              anchorEl={anchorEls[data._id]}
                              open={Boolean(anchorEls[data._id])}
                              onClose={() => handleAnchorClose(data._id)}
                              PaperProps={{
                                style: {
                                  boxShadow: 'none', // Remove box shadow
                                },
                              }}
                            >
                              <MenuItem
                                onClick={() => {
                                  setEditFormPopup(true);
                                  setEditSubjectDetail(data);
                                }}
                              >
                                <IconButton aria-label="edit">
                                  <EditIcon
                                    sx={{
                                      marginLeft: 1,
                                      color: 'green',
                                      '&:hover': {
                                        cursor: 'pointer',
                                      },
                                    }}
                                  />
                                </IconButton>
                                Edit
                              </MenuItem>

                              <MenuItem>
                                <IconButton
                                  aria-label="delete"
                                  onClick={() => {
                                    setDeleteFormPopup(true);
                                    setDeleteSubjectID(data?._id);
                                  }}
                                >
                                  <DeleteIcon
                                    sx={{
                                      color: 'red',
                                      '&:hover': {
                                        cursor: 'pointer',
                                      },
                                    }}
                                  />
                                </IconButton>
                                Delete
                              </MenuItem>
                            </Menu>
                          </Box>
                          <Typography variant="h6" paragraph>
                            {data?.subject}
                          </Typography>
                          {/* <Box
                            sx={{
                              transform: 'translate(-50%, 5%)',
                              width: '100%',
                              borderRadius: '1rem',
                              border: 'none',
                              color: '#fff',
                              fontSize: '1rem',
                              padding: '.5rem 1rem',
                              position: 'absolute',
                              left: '50%',
                              bottom: 0,
                              opacity: 0,
                              transition: '0.3s ease-out',
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              '&:hover': {
                                transform: 'translate(-50 %, 50 %)',
                                opacity: 1,
                              },
                            }}
                          >
                            <DeleteIcon
                              sx={{
                                color: 'red',
                                '&:hover': {
                                  color: 'red',
                                  cursor: 'pointer',
                                },
                              }}
                              onClick={() => {
                                setDeleteFormPopup(true);
                                setDeleteSubjectID(data?._id);
                              }}
                            />
                            <EditIcon
                              sx={{
                                color: 'green',
                              }}
                              onClick={() => {
                                setEditFormPopup(true);
                                setEditSubjectDetail(data);
                              }}
                            />
                          </Box> */}
                        </Box>
                      </Box>
                    ))}
                </Box>
              </Paper>
              <TablePagination
                rowsPerPageOptions={[5, 7, 9]}
                rowsPerPage={classRowPerPage}
                page={classPage}
                count={subjectData.length}
                component="div"
                onPageChange={handlechangepage}
                onRowsPerPageChange={handleRowsPerPage}
              ></TablePagination>
            </Box>
          </Box>
        </Box>
      </Container>
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
              <Typography variant="h4" component="h1" paragraph>
                Want to delete?
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  color="error"
                  sx={{ height: 45 }}
                  onClick={() => handleDeleteClasses(deleteClassesID)}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  sx={{ marginBottom: '20px !important', fontSize: 18 }}
                  onClick={() => setDeleteFormPopup(false)}
                >
                  Cancle
                </Button>
              </Box>
            </Card>
          </Stack>
        </Stack>
      </DialogAnimate>{' '}
      <DialogAnimate open={editFormPopup} maxWidth="sm">
        <Stack direction="column">
          <Stack display="flex" flexDirection="row-reverse">
            <IconButton onClick={() => setEditFormPopup(false)}>
              <Iconify icon="iconoir:cancel" width="24" height="24" />
            </IconButton>
          </Stack>
          <Stack>
            <Card>
              <Box sx={{ margin: 1, padding: 1 }}>
                <Typography variant="h4" component="h1" paragraph>
                  Update Subject
                </Typography>
                <FormGroup>
                  <form onSubmit={handleUpdate}>
                    <TextField
                      id="outlined-basic"
                      label="Subject Name"
                      className="text-field"
                      size="medium"
                      variant="outlined"
                      sx={{ margin: 2, width: '90% !important' }}
                      name="subject"
                      required
                      defaultValue={editSubjectDetail?.subject}
                    />

                    <TextField
                      fullWidth
                      id="outlined-basic"
                      size="medium"
                      className="text-field"
                      label="Discription"
                      rows={4}
                      multiline={true}
                      sx={{ margin: 2, width: '90% !important' }}
                      variant="outlined"
                      name="description"
                      required
                      defaultValue={editSubjectDetail?.description}
                    />
                    <Button
                      variant="contained"
                      size="large"
                      sx={{ marginLeft: '28%' }}
                      type="submit"
                    >
                      Update
                    </Button>
                  </form>
                </FormGroup>
              </Box>
            </Card>
          </Stack>
        </Stack>
      </DialogAnimate>
    </>
  );
};
export default Subjects;
