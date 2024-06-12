import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Container,
  FormControl,
  FormGroup,
  Grid,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  OutlinedInput,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import { eventData } from '../_mock/arrays/events';
import { Helmet } from 'react-helmet-async';
import { getSubjects } from 'src/services/subjects/subjects.service';
import { getClasses } from 'src/services/classes/class.service';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import {
  createClassSubjectMapping,
  getClassSubjectMapping,
  deleteClassSubjectMapping,
} from 'src/services/classSubjectMapping/classSubjectMapping.service';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DialogAnimate } from 'src/components/animate';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import { useSnackbar } from 'src/components/snackbar';
import Autocomplete from '@mui/material/Autocomplete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Image from '../components/image';
const Events = () => {
  const [classes, setClasses] = useState([0]);
  const [subjects, setSubjects] = useState([]);
  const [classSubMap, setClassSubMap] = useState([]);
  const [subjectId, setSubjectId] = useState<string[]>(['']);
  const [classId, setClassId] = useState('');
  const [deleteFormPopup, setDeleteFormPopup] = useState<boolean>(false);
  const [assignForm, setAssignForm] = useState<boolean>(false);
  const [deleteClassesID, setDeleteClassesID] = useState();
  const [cardsUpdates, setCardsUpdates] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    fetchApi();
  }, [cardsUpdates]);
  const fetchApi = async () => {
    const Subjects = await getSubjects();
    const Classes = await getClasses();
    const classSubMap = await getClassSubjectMapping();
    setClassSubMap(classSubMap);
    setClasses(Classes);
    setSubjects(Subjects);
  };

  //selector
  const handleChange = (event: SelectChangeEvent) => {
    setClassId(event.target.value as string);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(Object.fromEntries(formData.entries()));
    const data = Object.fromEntries(formData.entries());

    let subjectArray: any = [];
    // console.log(subjectId);

    subjectId.map((item: any) => {
      let id = { id: item?._id };
      subjectArray.push(id);
    });
    if (classId === '' || subjectArray.length === 0) {
      enqueueSnackbar('Please select class or Subjects !', { variant: 'warning' });
      return;
    }
    const payload = {
      classId: classId,
      subjectIds: subjectArray,
    };
    console.log('payload', payload);

    const response = await createClassSubjectMapping(payload);
    response?.status === 201
      ? enqueueSnackbar('Class Subject Successfully Assgined !', { variant: 'success' })
      : enqueueSnackbar('Unable to assgin class subject !', { variant: 'error' });
    setCardsUpdates(!cardsUpdates);
  };
  const handleDeleteClasses = async (id: any) => {
    const payload = id;
    const response = await deleteClassSubjectMapping(payload);
    response?.status === 200
      ? enqueueSnackbar('Class Subject Successfully Deleted !', { variant: 'success' })
      : enqueueSnackbar('Unable to delete class Subject !', { variant: 'error' });
    setCardsUpdates(!cardsUpdates);
    setDeleteFormPopup(false);
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

  return subjects.length === 0 ? (
    <>
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    </>
  ) : (
    <>
      <Helmet>
        <title> TimeSync | Subject</title>
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h3" component="h1" paragraph>
            Class Subject Mapping
          </Typography>
          <Button
            variant="contained"
            sx={{ width: '100px', height: '30px', marginTop: 2 }}
            onClick={() => setAssignForm(!assignForm)}
          >
            Assgin
          </Button>
        </Box>
        {assignForm === true ? (
          <Box>
            <form onSubmit={onSubmit}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Grid container spacing={2} mb={2}>
                  <Grid item xs={4}>
                    <FormGroup>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Class Name</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={classId}
                          label="Class Name"
                          name="classId"
                          onChange={handleChange}
                          required
                        >
                          {classes.map((classes: any) => (
                            <MenuItem key={classes._id} value={classes._id}>
                              {classes.classname}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={4}>
                    <Autocomplete
                      multiple
                      id="subjects"
                      options={subjects}
                      disableCloseOnSelect
                      isOptionEqualToValue={(option, value) => option._id === value._id}
                      getOptionLabel={(option: any) => option?.subject}
                      onChange={(event, value: any) => {
                        // console.log('subject value', event, value);
                        setSubjectId(value as string[]);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} variant="outlined" label="Subjects" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{ marginLeft: 10, width: '100px', height: '30px', marginTop: 1 }}
                      type="submit"
                    >
                      Map
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </Box>
        ) : (
          ''
        )}
        {classSubMap.length == 0 ? (
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
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              marginTop: '20px',
              height: '80vh',
              mt: 2,
              border: '1px solid #ccc',
              boxShadow: '1px 2px 5px #ccc',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            <Table stickyHeader>
              <TableHead sx={{ opacity: 1 }}>
                <TableRow>
                  <TableCell
                    className="table-heading"
                    sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}
                  >
                    Class
                  </TableCell>
                  <TableCell
                    className="table-heading"
                    align="center"
                    sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}
                  >
                    Subjects
                  </TableCell>
                  <TableCell
                    className="table-heading"
                    align="center"
                    sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody
                sx={{
                  minWidth: 400,
                  // height: '350px',
                }}
              >
                {classSubMap.map((row: any, index) => (
                  <TableRow key={index}>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        borderBottom: '1px solid #ccc',
                      }}
                    >
                      {row?.className}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        borderBottom: '1px solid #ccc',
                      }}
                    >
                      {row?.subjects.map((subject: any, i: any) => (
                        <Card
                          key={i}
                          color="primary"
                          sx={{
                            margin: '5px',
                            fontSize: '0.9rem',
                            height: '35px',
                            padding: 2,
                            paddingBottom: '35px',
                            backgroundColor: getRandomColor(),
                            fontWeight: '600',
                          }}
                        >
                          {subject?.subjectName}
                        </Card>
                      ))}
                    </TableCell>
                    <TableCell align="center" sx={{ borderBottom: '1px solid #ccc' }}>
                      <Box>
                        <Tooltip title="Action">
                          <IconButton
                            aria-label="more"
                            aria-controls="three-dotted-menu"
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={(event) => handleAnchorClick(row._id, event)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </Tooltip>
                        <Menu
                          id="three-dotted-menu"
                          anchorEl={anchorEls[row?._id]}
                          open={Boolean(anchorEls[row?._id])}
                          onClose={() => handleAnchorClose(row?._id)}
                          PaperProps={{
                            style: {
                              boxShadow: 'none', // Remove box shadow
                            },
                          }}
                        >
                          <MenuItem onClick={() => {}}>
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
                                setDeleteClassesID(row?.parentId);
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

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
          <Stack p={2}>
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
                  variant="soft"
                  sx={{ marginBottom: '20px !important', color: 'red', fontSize: 20 }}
                  onClick={() => handleDeleteClasses(deleteClassesID)}
                >
                  Delete
                </Button>
                <Button
                  variant="soft"
                  sx={{ marginBottom: '20px !important', fontSize: 20 }}
                  onClick={() => setDeleteFormPopup(false)}
                >
                  Cancle
                </Button>
              </Box>
            </Card>
          </Stack>
        </Stack>
      </DialogAnimate>
    </>
  );
};
export default Events;
