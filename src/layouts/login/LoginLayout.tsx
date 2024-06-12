// @mui
import { Typography, Stack, Box } from '@mui/material';
// components
import Logo from '../../components/logo';
import Image from '../../components/image';
import userimage from 'src/assets/alessandro-erbetta-mpWPcRT9D1E-unsplash - Copy.jpg';
//
import { StyledRoot, StyledSectionBg, StyledSection, StyledContent } from './styles';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  illustration?: string;
  children: React.ReactNode;
};

export default function LoginLayout({ children, illustration, title }: Props) {
  return (
    <StyledRoot>
      <Logo
        sx={{
          zIndex: 9,
          position: 'absolute',
          mt: { xs: 1.5, md: 5 },
          ml: { xs: 2, md: 5 },
        }}
      />

      <StyledSection sx={{}}>
        {/* <Typography variant="h3" sx={{ mb: 10, maxWidth: 480, textAlign: 'center' }}>
          {title || 'Hi, Welcome back to'}
          {title || ' TimeSync..'}
        </Typography> */}

        <Image
          disabledEffect
          visibleByDefault
          alt="auth"
          // src={illustration || '/assets/illustrations/illustration_dashboard.png'}
          // src={illustration || '/assets/illustrations/new.png'}
          src={illustration || '/assets/illustrations/png.svg'}
          sx={{ maxWidth: 720 }}
        />

        <StyledSectionBg />
      </StyledSection>

      <StyledContent>
        <Stack sx={{ width: 1 }}>{children}</Stack>
      </StyledContent>
    </StyledRoot>
  );
}
