import { yupResolver } from '@hookform/resolvers/yup';
import {
  Alert,
  Box,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as Yup from 'yup';
import userImage from '../../_mock/user-icon.jpg';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import axios from 'axios';
import { ClassNames } from '@emotion/react';
import { addTeachers, updateTeacher } from 'src/services/teachers/teachers.service';
import { getSubjects } from 'src/services/subjects/subjects.service';
import { useSnackbar } from 'src/components/snackbar';

interface State extends SnackbarOrigin {
  open: boolean;
}

const TeacherEditForm = ({
  editTeacherDetails,
  teacherEditFormPopup,
  setTeacherEditFormPopup,
}: any) => {
  const { enqueueSnackbar } = useSnackbar();
  const [subjectList, setSubjectList] = useState([]);
  const [editableTeacher, setEditableTeacher] = useState(editTeacherDetails);

  useEffect(() => {
    fetchApi();
  }, []);
  const fetchApi = async () => {
    const Subjects = await getSubjects();
    setSubjectList(Subjects);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(Object.fromEntries(formData.entries()));
    const data = Object.fromEntries(formData.entries());
    // for (let [key, value] of formData.entries()) {
    //     setStudent((perE) => ({ ...perE, [key]: value }));
    // }

    const payload = {
      name: data.name,
      username: data.username,
      email: data.email,
      age: data.age,
      subjectId: data.subjectId,
      phoneno: data.phoneno,
      gender: data.gender,
      avatar: data.avatar,
      address: {
        street: data.street,
        city: data.city,
        state: data.state,
        zip: data.zip,
      },
    };

    const response = await updateTeacher(editableTeacher._id, payload);

    if (response?.status === 200) {
      enqueueSnackbar('Teacher Successfully Update !', { variant: 'success' });
      setTeacherEditFormPopup(!teacherEditFormPopup);
    } else {
      enqueueSnackbar('Unable to update Teacher!', { variant: 'error' });
    }
  };

  return (
    <>
      <Card sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" paragraph>
          Update Teacher Detail
        </Typography>
        <FormGroup>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} mb={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  name="name"
                  required
                  defaultValue={editableTeacher.name}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                  name="username"
                  required
                  defaultValue={editableTeacher.username}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Email ID"
                  variant="outlined"
                  name="email"
                  required
                  typeof="email"
                  type="email"
                  defaultValue={editableTeacher.email}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="number"
                  fullWidth
                  id="outlined-basic"
                  label="Age"
                  variant="outlined"
                  name="age"
                  required
                  typeof="number"
                  defaultValue={editableTeacher.age}
                />
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <FormControl fullWidth sx={{ zIndex: 100 }}>
                    <InputLabel id="demo-simple-select-label">Teaching Subject</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Teaching Subject"
                      name="subjectId"
                      defaultValue={editableTeacher.subjectId._id}
                    >
                      {subjectList.map((subject: any) => (
                        <MenuItem key={subject._id} value={subject._id}>
                          {subject.subject}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Box paddingLeft={5}>
                  <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="gender"
                    defaultValue={editableTeacher.gender}
                  >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                  </RadioGroup>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="number"
                  fullWidth
                  id="outlined-basic"
                  label="Contact No."
                  variant="outlined"
                  name="phoneno"
                  required
                  typeof="number"
                  defaultValue={editableTeacher.phoneno}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Address"
                  variant="outlined"
                  name="street"
                  required
                  defaultValue={editableTeacher.address.street}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="City"
                  variant="outlined"
                  name="city"
                  required
                  defaultValue={editableTeacher.address.city}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="State"
                  variant="outlined"
                  name="state"
                  required
                  defaultValue={editableTeacher.address.state}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Zip Code"
                  variant="outlined"
                  name="zip"
                  required
                  defaultValue={editableTeacher.address.zip}
                />
              </Grid>

              <Grid item xs={6}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    height: '50px',
                  }}
                >
                  {/* <Button
                                    variant="soft"
                                    component="label"
                                    sx={{ borderRadius: '100%', width: "24%", height: '170%', backgroundImage: { userImage } }}
                                >
                                    Upload Avatar
                                    <input
                                        type="file"
                                        hidden
                                    />
                                </Button> */}
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Add Avatar URL"
                    variant="outlined"
                    name="avatar"
                    required
                    defaultValue={editableTeacher.avatar}
                  />

                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ height: '40px', width: '30%', marginLeft: '25px', marginTop: '8px' }}
                  >
                    Update
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </FormGroup>
      </Card>
    </>
  );
};

export default TeacherEditForm;
