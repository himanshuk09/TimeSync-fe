// @mui
import { Alert, Tooltip, Stack, Typography, Link, Box } from '@mui/material';
// hooks
import { useAuthContext } from '../../auth/useAuthContext';
// layouts
import LoginLayout from '../../layouts/login';
//

import AuthWithSocial from './AuthWithSocial';
import AuthSignUpForm from './AuthSignUpForm';
import { useNavigate } from 'react-router-dom';
// ----------------------------------------------------------------------

export default function SignUp() {
  const { method } = useAuthContext();
  const navigate = useNavigate();
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Sign Up to TimeSync</Typography>
        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">Already user?</Typography>
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

        {/* logo */}
        <Tooltip title={method} placement="left">
          <Box
            component="img"
            alt={method}
            src={`/assets/icons/auth/ic_${method}.png`}
            sx={{ width: 32, height: 32, position: 'absolute', right: 0 }}
          />
        </Tooltip>
      </Stack>

      {/* <Alert severity="info" sx={{ mb: 3 }}>
        Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
      </Alert> */}

      <AuthSignUpForm />

      <AuthWithSocial />
    </>
  );
}
