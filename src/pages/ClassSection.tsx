import {
  Box,
  Button,
  Card,
  CircularProgress,
  FormGroup,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  TablePagination,
  Tooltip,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TextField from '@mui/material/TextField/TextField';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { DialogAnimate } from 'src/components/animate';
import Iconify from 'src/components/iconify';
import { addClass, deleteClass, getClasses, updateClass } from 'src/services/classes/class.service';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSnackbar } from 'src/components/snackbar';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
const ClassSection = () => {
  const [classPage, classPageChange] = useState(0);
  const [classRowPerPage, classRowPerPageChange] = useState(6);
  const [classdata, setClassData] = useState([0]);
  const [cardsUpdates, setCardsUpdates] = useState(true);
  const [deleteFormPopup, setDeleteFormPopup] = useState<boolean>(false);
  const [editFormPopup, setEditFormPopup] = useState<boolean>(false);
  const [deleteClassesID, setDeleteClassesID] = useState();
  const [editClassesDetail, setEditClassesDetail] = useState({
    classname: '',
    classroom: '',
    description: '',
    _id: '',
  });

  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    fetchApi();
  }, [deleteFormPopup, cardsUpdates]);
  const fetchApi = async () => {
    // const getData = await axios.get("http://localhost:3000/students");
    const getData = await getClasses();
    setClassData(getData);
  };

  const handleDeleteClasses = async (id: any) => {
    const payload = id;
    const response = await deleteClass(payload);
    response?.status === 200
      ? enqueueSnackbar('Class Successfully Deleted !', { variant: 'success' })
      : enqueueSnackbar('Unable to delete class !', { variant: 'error' });

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
    const minBrightness = 150; // Adjust this value for desired brightness
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
    // console.log(Object.fromEntries(formData.entries()));
    const data = Object.fromEntries(formData.entries());
    // for (let [key, value] of formData.entries()) {
    //     setStudent((perE) => ({ ...perE, [key]: value }));
    // }
    const payload = {
      ...data,
    };
    const response = await addClass(payload);
    response?.status === 201
      ? enqueueSnackbar('Class Successfully Created !', { variant: 'success' })
      : enqueueSnackbar('Class Not Created !', { variant: 'error' });

    setCardsUpdates(!cardsUpdates);
  };
  const handleUpdate = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const payload = {
      ...data,
    };
    const response = await updateClass(editClassesDetail?._id, payload);
    response?.status === 200
      ? enqueueSnackbar('Class Successfully Updated !', { variant: 'success' })
      : enqueueSnackbar('Unable to update class', { variant: 'error' });
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
        <title> TimeSync | Class</title>
      </Helmet>

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
          Class Section
        </Typography>
        <Box
          sx={{
            maxWidth: '100%',
            margin: 1,
            borderRadius: 5,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Box
            id="main-class-section"
            sx={{
              border: '1 solid black',
              borderRadius: 5,
              boxShadow: '1px 2px 4px #BEBEC2',
              padding: '2%',
              height: '30%',
              margin: 2,
              marginLeft: 1,
            }}
          >
            <Typography variant="h4" component="h1" paragraph>
              Create Class
            </Typography>
            <FormGroup>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  id="classname"
                  label="Class Name"
                  className="text-field"
                  size="medium"
                  variant="outlined"
                  sx={{ margin: 2, width: '90% !important' }}
                  name="classname"
                  required
                />
                <TextField
                  id="classroom"
                  label="Class Room No"
                  className="text-field"
                  size="medium"
                  variant="outlined"
                  sx={{ margin: 2, width: '90% !important' }}
                  name="classroom"
                  required
                />
                <TextField
                  id="description"
                  size="medium"
                  className="text-field"
                  label="Description"
                  rows={2}
                  multiline={true}
                  sx={{ margin: 2, width: '90% !important' }}
                  variant="outlined"
                  name="description"
                  required
                />
                <Button
                  variant="contained"
                  size="medium"
                  sx={{ width: '30%', marginLeft: '30%' }}
                  type="submit"
                  id="submit-btn"
                >
                  Add Class
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
              margin: 0.5,
              boxShadow: '1px 2px 4px #BEBEC2',
            }}
          >
            <Typography variant="h4" component="h1" paragraph>
              Classes
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
                {classdata
                  .slice(classPage * classRowPerPage, classPage * classRowPerPage + classRowPerPage)
                  .map((data: any, index) => (
                    <Box
                      className="card"
                      id="card"
                      sx={{
                        width: '10rem',
                        height: '35%',
                        borderRadius: '20px',
                        // backgroundColor: generateLightColor(),
                        backgroundColor: getRandomColor(),
                        position: 'relative',
                        padding: '0.8rem',
                        border: '2px solid #c3c6ce',
                        transition: ' 0.5s ease- out',
                        overflow: 'visible',
                        margin: '23px 10px 15px 15px',
                        '&:hover': {
                          borderColor: '#008bf8',
                          boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
                        },
                      }}
                      key={data.parentId}
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
                                setEditClassesDetail(data);
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
                                  setDeleteClassesID(data._id);
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

                        <Typography variant="h4" paragraph>
                          {data.classname}
                        </Typography>
                        <Typography paragraph>{data.classroom}</Typography>
                        {/* <Box
                          sx={{
                            transform: 'translate(-50%, 5%)',
                            width: '100%',
                            borderRadius: '1rem',
                            border: 'none',
                            // color: '#fff',
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
                                cursor: 'pointer',
                              },
                            }}
                            onClick={() => {
                              setDeleteFormPopup(true);
                              setDeleteClassesID(data._id);
                            }}
                          />
                          <EditIcon
                            sx={{ color: 'green' }}
                            onClick={() => {
                              setEditFormPopup(true);
                              setEditClassesDetail(data);
                            }}
                          />
                        </Box> */}
                      </Box>
                    </Box>
                  ))}
              </Box>
            </Paper>
            <TablePagination
              rowsPerPageOptions={[5, 7, 8]}
              rowsPerPage={classRowPerPage}
              page={classPage}
              count={classdata.length}
              component="div"
              onPageChange={handlechangepage}
              onRowsPerPageChange={handleRowsPerPage}
            ></TablePagination>
          </Box>
        </Box>
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
                  onClick={() => handleDeleteClasses(deleteClassesID)}
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
      {/* Update Popup */}
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
                  Update Class
                </Typography>
                <FormGroup>
                  <form onSubmit={handleUpdate}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Class Name"
                      className="text-field"
                      size="medium"
                      variant="outlined"
                      defaultValue={editClassesDetail?.classname}
                      sx={{ margin: 2, width: '90% !important' }}
                      name="classname"
                      required
                    />
                    <TextField
                      id="outlined-basic"
                      label="Class Room"
                      className="text-field"
                      size="medium"
                      variant="outlined"
                      defaultValue={editClassesDetail?.classroom}
                      sx={{ margin: 2, width: '90% !important' }}
                      name="classroom"
                      required
                    />
                    <TextField
                      id="outlined-basic"
                      size="medium"
                      className="text-field"
                      defaultValue={editClassesDetail?.description}
                      label="Discription"
                      rows={2}
                      multiline={true}
                      sx={{ margin: 2, width: '90% !important' }}
                      variant="outlined"
                      name="description"
                      required
                    />
                    <Button
                      variant="contained"
                      size="medium"
                      sx={{ width: '20%', marginLeft: '40%' }}
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
      {/* {driverObj.drive()} */}
    </>
  );
};
export default ClassSection;
