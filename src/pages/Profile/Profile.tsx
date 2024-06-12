import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import FormControl from '@mui/material/FormControl/FormControl';
import TextField from '@mui/material/TextField/TextField';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { DialogAnimate } from 'src/components/animate';
import Iconify from 'src/components/iconify';
import ProfileFormEdit from './ProfileFormEdit';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useSettingsContext } from 'src/components/settings';
const Profile = () => {
  const { themeStretch } = useSettingsContext();
  const [EditFormPopup, setEditFormPopup] = useState<boolean>(false);
  const { user } = useAuthContext();
  const [loginUser, serLoginUser] = useState(user);

  function containsHttp(url: any) {
    return url.includes('http');
  }

  return (
    <>
      <Helmet>
        <title> TimeSync | Admin Profile</title>
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
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography variant="h3" component="h1" paragraph>
              Admin Profile
            </Typography>
            <Button
              variant="contained"
              sx={{ height: 1 }}
              onClick={() => {
                setEditFormPopup(true);
              }}
            >
              Edit
            </Button>
          </Box>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              border: '1 solid black',
              margin: 2,
              borderRadius: 5,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Card
              key={loginUser?._id}
              sx={{
                width: '40%',
                padding: '30px',
                height: '100%',
                border: '1 solid black',
                borderRadius: 5,
                margin: 1,
                boxShadow: '1px 2px 4px #BEBEC2',
              }}
            >
              <CardContent>
                {containsHttp(loginUser?.photoURL) ? (
                  <Avatar
                    sx={{ width: 100, height: 100, margin: 'auto' }}
                    alt="User Profile"
                    src={loginUser?.photoURL}
                  />
                ) : (
                  <Avatar
                    sx={{ width: 100, height: 100, margin: 'auto' }}
                    alt="User Profile"
                    src={'http://localhost:3000/' + loginUser?.photoURL}
                  />
                )}

                <Typography variant="h5" component="div" sx={{ mt: 2, textAlign: 'center' }}>
                  {loginUser?.displayName}
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                  {loginUser?.username}
                </Typography>
              </CardContent>
            </Card>

            <Box
              sx={{
                width: '100%',
                padding: 3,
                height: '100%',
                border: '1 solid black',
                borderRadius: 5,
                boxShadow: '1px 2px 4px #BEBEC2',
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                paragraph
                sx={{ marginLeft: '43% !important', marginBottom: '20px !important', fontSize: 20 }}
              >
                Details
              </Typography>
              <FormControl>
                <Grid container spacing={2} mb={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      disabled
                      value={loginUser?.displayName}
                      label="Name"
                      variant="outlined"
                      defaultValue="Name"
                      inputProps={{ style: { color: 'black' } }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      disabled
                      value={loginUser?.username}
                      label="Username"
                      variant="outlined"
                      defaultValue="Username"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      disabled
                      value={loginUser?.email}
                      label="Email ID"
                      variant="outlined"
                      defaultValue="Email ID"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      value={loginUser?.role}
                      disabled
                      label="Role"
                      variant="outlined"
                      defaultValue="Age"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      disabled
                      value={loginUser?.about}
                      label="About"
                      variant="outlined"
                      defaultValue="Gender"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      disabled
                      value={loginUser?.phoneNumber}
                      label="Contact No."
                      variant="outlined"
                      defaultValue="Contact No."
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      disabled
                      value={loginUser?.address}
                      label="Address"
                      variant="outlined"
                      defaultValue="Address"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      disabled
                      value={loginUser?.city}
                      label="City"
                      variant="outlined"
                      defaultValue="City"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      disabled
                      value={loginUser?.state}
                      label="State"
                      variant="outlined"
                      defaultValue="State"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      value={loginUser?.zipCode}
                      disabled
                      label="Zip Code"
                      variant="outlined"
                      defaultValue="Zip Code"
                    />
                  </Grid>

                  {/* <Grid item xs={6}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '50px' }}>
                      <Button
                        variant="soft"
                        component="label"
                        sx={{ borderRadius: '100%', width: "24%", height: '170%', backgroundImage: { userImage } }}
                      >
                        Upload Avatar
                        <input
                          type="file"
                          hidden
                        />
                      </Button>
                    </Box>
                  </Grid> */}
                </Grid>
              </FormControl>
              {/*  */}
              <DialogAnimate open={EditFormPopup} maxWidth="lg">
                <Stack direction="column">
                  <Stack
                    display="flex"
                    flexDirection="row-reverse"
                    // sx={{ background: theme.palette.background.neutral }}
                  >
                    <IconButton onClick={() => setEditFormPopup(false)}>
                      <Iconify icon="iconoir:cancel" width="24" height="24" />
                    </IconButton>
                  </Stack>
                  <Stack>
                    <ProfileFormEdit />
                  </Stack>
                </Stack>
              </DialogAnimate>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default Profile;
