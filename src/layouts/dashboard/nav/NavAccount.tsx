// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
// auth
import { useAuthContext } from '../../../auth/useAuthContext';
// components
import { CustomAvatar } from '../../../components/custom-avatar';
// ...........................
import { useSnackbar } from '../../../components/snackbar';
import { useNavigate } from 'react-router-dom';
// import { PATH_AUTH, PATH_DASHBOARD } from '../../../routes/paths';
import { useState } from 'react';
import { PATH_DASHBOARD } from 'src/routes/paths';
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

export default function NavAccount() {
  const { user } = useAuthContext();
  // ............
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleClosePopover = () => {
    setOpenPopover(null);
  };
  const handleLogout = async () => {
    try {
      navigate(PATH_DASHBOARD.profile);
      handleClosePopover();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };
  function containsHttp(url: any) {
    return url.includes('http');
  }
  return (
    <StyledRoot onClick={handleLogout}>
      {containsHttp(user?.photoURL) ? (
        <CustomAvatar src={user?.photoURL} alt={user?.displayName} name={user?.displayName} />
      ) : (
        <CustomAvatar
          // src={user?.photoURL}
          src={'http://localhost:3000/' + user?.photoURL}
          alt={user?.displayName}
          name={user?.displayName}
        />
      )}
      <Box id="subject_id" sx={{ ml: 2, minWidth: 0 }}>
        <Typography variant="subtitle2" noWrap>
          {user?.displayName}
        </Typography>

        <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
          {user?.role}
        </Typography>
      </Box>
    </StyledRoot>
  );
}
