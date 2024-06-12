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
import { addTeachers } from 'src/services/teachers/teachers.service';
import { getSubjects } from 'src/services/subjects/subjects.service';
import { useSnackbar } from 'src/components/snackbar';

interface State extends SnackbarOrigin {
  open: boolean;
}

const TeachersForm = ({ teacherFormPopup, setTeacherFormPopup }: any) => {
  const { enqueueSnackbar } = useSnackbar();
  const [subjectList, setSubjectList] = useState([]);
  const [studentId, setStudentId] = React.useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [addressData, setAdress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
  });
  const [teacher, setTeachers] = useState({
    name: '',
    username: '',
    email: '',
    age: '',
    subjectId: '',
    phoneno: '',
    gender: '',
    avatar: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
    },
  });

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

    const response = await addTeachers(payload);
    if (response?.status === 201) {
      enqueueSnackbar('Teacher Successfully Created !', { variant: 'success' });
      setTeacherFormPopup(!teacherFormPopup);
    } else {
      enqueueSnackbar('Teacher Not Created !', { variant: 'error' });
    }
  };

  return (
    <>
      <Card sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" paragraph>
          Add Teacher.
        </Typography>
        <FormGroup>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} mb={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  variant="outlined"
                  name="name"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="username"
                  label="Username"
                  variant="outlined"
                  name="username"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="emailId"
                  label="Email ID"
                  variant="outlined"
                  name="email"
                  required
                  typeof="email"
                  type="email"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="number"
                  fullWidth
                  id="age"
                  label="Age"
                  variant="outlined"
                  name="age"
                  required
                  typeof="number"
                />
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <FormControl fullWidth sx={{ zIndex: 100 }}>
                    <InputLabel id="subjectId-label">Teaching Subject</InputLabel>
                    <Select
                      labelId="subjectId-label"
                      id="subjectId"
                      label="Teaching Subject"
                      name="subjectId"
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
                  id="phone Number"
                  label="Contact No."
                  variant="outlined"
                  name="phoneno"
                  required
                  typeof="number"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="address"
                  label="Address"
                  variant="outlined"
                  name="street"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="city"
                  label="City"
                  variant="outlined"
                  name="city"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="state"
                  label="State"
                  variant="outlined"
                  name="state"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="zipCode"
                  label="Zip Code"
                  variant="outlined"
                  name="zip"
                  required
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
                  />

                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ height: '40px', width: '30%', marginLeft: '25px', marginTop: '8px' }}
                  >
                    Add.
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

export default TeachersForm;
