import { Helmet } from 'react-helmet-async';

// components
import { useSettingsContext } from '../components/settings';
import { m } from 'framer-motion';

import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Button, Typography } from '@mui/material';
// components
import { MotionContainer, varBounce } from '../components/animate';
// assets
import { PageNotFoundIllustration } from '../assets/illustrations';
// ----------------------------------------------------------------------

export default function Setting() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> TimeSync |  404 Page Not Found</title>
      </Helmet>

      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
          Website currently under maintenance
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
          We are currently working hard on this page!
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <PageNotFoundIllustration
            sx={{
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
        </m.div>

        <Button to="/" component={RouterLink} size="large" variant="contained">
          Go to Home
        </Button>
      </MotionContainer>
    </>
  );
}
