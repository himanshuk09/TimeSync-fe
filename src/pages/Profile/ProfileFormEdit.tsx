import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Snackbar,
  SnackbarOrigin,
  Typography,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as Yup from 'yup';
import userImage from '../../_mock/user-icon.jpg';
import Iconify from 'src/components/iconify';
import { useAuthContext } from 'src/auth/useAuthContext';
import { updateUser } from 'src/services/auth/auth.service';
import { useSnackbar } from 'src/components/snackbar';
interface State extends SnackbarOrigin {
  open: boolean;
}

const ProfileFormEdit = () => {
  const { user } = useAuthContext();
  const [loginUser, serLoginUser] = useState(user);
  const [currentData, setCurrentData] = useState<any>(null);
  const [className, setClassName] = React.useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const handleChange = (event: SelectChangeEvent) => {
    setClassName(event.target.value as string);
  };

  const handleSubmitform = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    const response = await updateUser(loginUser?._id, data);
    console.log(response);

    response?.status === 200
      ? enqueueSnackbar('User Successfully Update !', { variant: 'success' })
      : enqueueSnackbar('Unable to update User!', { variant: 'error' });
  };

  return (
    <Card sx={{ p: 2 }}>
      <Typography
        variant="h4"
        component="h1"
        paragraph
        sx={{ marginLeft: '43% !important', marginBottom: '20px !important', fontSize: 20 }}
      >
        Edit Details
      </Typography>
      <form onSubmit={handleSubmitform}>
        <Grid container spacing={1} mb={1}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              name="displayName"
              defaultValue={loginUser?.displayName}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Username"
              variant="outlined"
              name="username"
              defaultValue={loginUser?.username}
              required
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
              defaultValue={loginUser?.email}
            />
          </Grid>
          {/* <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Password"
              variant="outlined"
              name="password"
              required
              defaultValue={loginUser?.password}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid> */}
          {/* <Grid item xs={6}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Role"
                  name="role"
                >
                  <MenuItem value={'admin'}>Admin</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid> */}
          <Grid item xs={6}>
            <TextField
              type="boolean"
              fullWidth
              id="outlined-basic"
              label="Is Public."
              variant="outlined"
              name="isPublic"
              value={'true'}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="text"
              fullWidth
              id="outlined-basic"
              label="About."
              variant="outlined"
              name="about"
              defaultValue={loginUser?.about}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="text"
              fullWidth
              label="Contact No."
              variant="outlined"
              name="phoneNumber"
              defaultValue={loginUser?.phoneNumber}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Address"
              variant="outlined"
              name="address"
              required
              defaultValue={loginUser?.address}
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
              defaultValue={loginUser?.city}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="State"
              variant="outlined"
              name="state"
              defaultValue={loginUser?.state}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Zip Code"
              variant="outlined"
              name="zipCode"
              defaultValue={loginUser?.zipCode}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Country"
              variant="outlined"
              name="country"
              defaultValue={loginUser?.country}
              required
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Add Avatar URL"
              variant="outlined"
              name="photoURL"
              required
              defaultValue={loginUser?.photoURL}
            />
          </Grid>
        </Grid>{' '}
        <Button
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          sx={{
            marginLeft: '45%',
            marginTop: 0.2,
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'text.primary',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            },
          }}
        >
          Update
        </Button>
      </form>
    </Card>
  );
};

export default ProfileFormEdit;
