import { Helmet } from 'react-helmet-async';
// sections
import Login from '../sections/auth/Login';
import SignUp from 'src/sections/auth/SignUp';
import LoginLayout from 'src/layouts/login/LoginLayout';
import { Outlet } from 'react-router';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Login | TimeSync</title>``
      </Helmet>
      <LoginLayout>
        <Login />
      </LoginLayout>
    </>
  );
}
