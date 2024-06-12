import { Helmet } from 'react-helmet-async';
// sections
import Login from '../sections/auth/Login';
import SignUp from 'src/sections/auth/SignUp';
import LoginLayout from 'src/layouts/login/LoginLayout';
import { Outlet } from 'react-router';
import StudentForm from './students/StudentForm';
import {
  Box,
  Card,
  Typography,
  FormGroup,
  Grid,
  TextField,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Stack,
  Link,
  Tooltip,
  IconButton,
  InputAdornment,
  CardMedia,
  Avatar,
  Alert,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../auth/useAuthContext';
import { signUp, uploadImage } from 'src/services/auth/auth.service';
import { useSnackbar } from 'src/components/snackbar';
import AuthWithSocial from 'src/sections/auth/AuthWithSocial';
import Logo from 'src/components/logo';
import { RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import { LoadingButton } from '@mui/lab';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import login from 'src/layouts/login';
// ----------------------------------------------------------------------
import * as Yup from 'yup';
type FormValuesProps = {
  email: string;
  password: string;
  afterSubmit?: string;
  username: string;
  displayName: string;
  photoURL: string;
  phoneNumber: string;
  country: string;
  address: string;
  state: string;
  city: string;
  zipCode: string;
  about: string;
  isPublic: boolean;
};
export default function SignUpPage() {
  // const imageUrl = '/assets/illustrations/png.svg';
  const [showPassword, setShowPassword] = useState(false);
  const [imageObj, setImageObj] = useState<any>();
  const [showImage, setShowImage] = useState<any>(false);
  const [Image, setImage] = useState<any>();
  const { enqueueSnackbar } = useSnackbar();

  const { login, register } = useAuthContext();
  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    username: Yup.string().required('Password is required'),
    displayName: Yup.string().required('Password is required'),
    photoURL: Yup.string().required('Password is required'),
    phoneNumber: Yup.string().required('Password is required'),
    country: Yup.string().required('Password is required'),
    address: Yup.string().required('Password is required'),
    state: Yup.string().required('Password is required'),
    city: Yup.string().required('Password is required'),
    zipCode: Yup.string().required('Password is required'),
    about: Yup.string().required('Password is required'),
    isPublic: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
    afterSubmit: '',
    username: '',
    displayName: '',
    photoURL: '',
    phoneNumber: '',
    country: '',
    address: '',
    state: '',
    city: '',
    zipCode: '',
    about: '',
    isPublic: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const formImage = new FormData();
    if (file) {
      formImage.append('image', file);
      setImage(formImage);
      setImageObj(file);
      setShowImage(true);
    }
  };
  const handleSubmitform = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const payload = { ...data, photoURL: imageObj?.name };
    try {
      await uploadImage(Image);
      // await register(payload);
      const response = await signUp(payload);
      console.log(response);
      if (response?.status === 201) {
        enqueueSnackbar('Successfully Register please Login   !', { variant: 'success' });
        setTimeout(() => navigate('/auth/login'), 5000);
      } else {
        enqueueSnackbar('Unable to Register !', { variant: 'error' });
      }
    } catch (error) {
      reset();
      setError('afterSubmit', {
        ...error,
        message: 'Please enter complete details..',
      });
    }
  };

  return (
    <>
      <Helmet>
        <title> Signup | TimeSync</title>``
      </Helmet>
      {/* <LoginLayout>
        <SignUp />
      </LoginLayout> */}
      <Stack sx={{ height: '50px' }}>
        <Logo
          sx={{
            zIndex: 9,
            position: 'absolute',
            mt: { xs: 2, md: 2 },
            ml: { xs: 2, md: 2 },
          }}
        />{' '}
      </Stack>
      <Stack sx={{ position: 'relative', marginLeft: '44%' }}>
        {' '}
        <Stack direction="row" sx={{ justifyContent: 'space-between', width: '63%' }} spacing={0.5}>
          <Typography variant="h4">Registration Form</Typography>
          <Stack
            direction="row"
            sx={{ justifyContent: 'inherit', marginLeft: '100px' }}
            spacing={0.5}
          >
            <Typography variant="subtitle2">Already user?</Typography>
            <Link
              style={{ cursor: 'pointer' }}
              variant="subtitle2"
              onClick={() => {
                navigate('/auth/login');
              }}
            >
              Login
            </Link>
          </Stack>
        </Stack>
      </Stack>
      <Card sx={{ p: 2, marginLeft: '20%', marginRight: '20%' }}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <form onSubmit={handleSubmitform}>
          <Grid container spacing="1%" mb={1}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="Full Name"
                label="Full Name"
                variant="outlined"
                name="displayName"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="Username"
                label="Username"
                variant="outlined"
                name="username"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="Email ID"
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
                fullWidth
                id="Password"
                label="Password"
                variant="outlined"
                name="password"
                required
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
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select labelId="demo-simple-select-label" id="role" label="Role" name="role">
                    <MenuItem value={'admin'}>Admin</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="boolean"
                fullWidth
                id="isPublic"
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
                id="About"
                label="About."
                variant="outlined"
                name="about"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="number"
                fullWidth
                id="Contact No"
                label="Contact No."
                variant="outlined"
                name="phoneNumber"
                required
                aria-valuemax={10}
                typeof="number"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="Address"
                label="Address"
                variant="outlined"
                name="address"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth id="City" label="City" variant="outlined" name="city" required />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="State"
                label="State"
                variant="outlined"
                name="state"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="Zip Code"
                label="Zip Code"
                variant="outlined"
                name="zipCode"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="country"
                label="Country"
                variant="outlined"
                name="country"
                required
              />
            </Grid>

            <Grid item xs={6}>
              {/* <TextField
                fullWidth
                id="Add Avatar URL"
                label="Add Avatar URL"
                variant="outlined"
                name="photoURL"
                required
                defaultValue={'https://avatar.iran.liara.run/public/100'}
              /> */}
              <Box
                sx={{
                  marginLeft: '2%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <label htmlFor="upload-button" style={{ height: '2%' }}>
                  <input
                    style={{ display: 'none' }}
                    accept="image/*"
                    id="upload-button"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <Button
                    variant="outlined"
                    component="span"
                    sx={{
                      // textDecoration: 'underline',
                      // padding: '15%',
                      width: '100%',
                      margin: '15px',
                      height: '10% !important',
                    }}
                  >
                    Upload Avatar
                  </Button>
                </label>
                {showImage ? (
                  <Avatar
                    sx={{ width: 100, height: 100, margin: 'auto' }}
                    alt="User Profile"
                    // src={require('../assets/dashboard/boyy.png')}
                    src={URL.createObjectURL(imageObj)}
                  />
                ) : (
                  ''
                )}

                {/* <CardMedia
                       component="img"
                       height="100"
                      image={URL.createObjectURL(imageUrl)}
                       alt="Uploaded image"
                       sx={{ marginTop: '10px' }}
                     /> */}
              </Box>
            </Grid>
          </Grid>{' '}
          {/* <Button variant="contained" type="submit" sx={{ marginLeft: '45%', marginTop: 0.5 }}>
            Register
          </Button> */}
          <LoadingButton
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitSuccessful || isSubmitting}
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
            Signup
          </LoadingButton>
          <AuthWithSocial />
        </form>
      </Card>
    </>
  );
}
