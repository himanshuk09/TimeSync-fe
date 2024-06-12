import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config';
//
import {
  Dashboard,
  RoomReservation,
  Page404,
  PageSix,
  PageFour,
  PageFive,
  LoginPage,
  SignUpPage,
  Events,
  Profile,
  UserView,
  UserEdit,
  Maintenance,
  ClassSection,
  Students,
  Subject,
  ClassSectionSubjectMap,
  Teacher,
  Timetable,
  Attendence,
  AttendanceReport,
  Calender,
  Login,
  SignUp,
  SavedTimeTable,
} from './elements';
import Setting from 'src/pages/Setting';
import Home from 'src/pages/Dashboard';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          // index: true,
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        {
          path: 'signup',
          element: (
            <GuestGuard>
              <SignUpPage />
            </GuestGuard>
          ),
        },
      ],
    },

    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'one', element: <Dashboard /> },
        { path: 'classSection', element: <ClassSection /> },
        { path: 'students', element: <Students /> },
        { path: 'subject', element: <Subject /> },
        { path: 'classSubjectMap', element: <ClassSectionSubjectMap /> },
        { path: 'teacher', element: <Teacher /> },
        { path: 'timetable', element: <Timetable /> },
        { path: 'savedtimetable', element: <SavedTimeTable /> },
        { path: 'attendence', element: <Attendence /> },
        { path: 'attendencereport', element: <AttendanceReport /> },
        { path: 'calender', element: <Calender /> },
        { path: 'maintenance', element: <Maintenance /> },
        { path: 'setting', element: <Setting /> },
        {
          path: 'profile',
          element: <Profile />,
          children: [
            { path: '', element: <UserView /> },
            { path: 'edit', element: <UserEdit /> },
          ],
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/four" replace />, index: true },
            { path: 'four', element: <PageFour /> },
            { path: 'five', element: <PageFive /> },
            { path: 'six', element: <PageSix /> },
          ],
        },
      ],
    },
    {
      element: <CompactLayout />,
      children: [{ path: '404', element: <Page404 /> }],
    },
    { path: '*', element: <Navigate to="/404" replace /> },

    {
      path: '/',
      element: (
        <GuestGuard>
          <LoginPage />
        </GuestGuard>
      ),
    },
  ]);
}

// {
//   path: '/login',
//   element: (
//   <GuestGuard>
//     <LoginPage />
//   </GuestGuard>
//   ),
//   children: [
//     // { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
//     {
//       path: '',
//       element: (
//         <Login/>
//       ),
//     },
//     {
//       path: '/signup',
//       element: (
//         <SignUp/>
//       ),
//     },
//   ],
// },

// {
//   path: '/',
//   children: [
//     { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
//     {
//       path: 'login',
//       element: (
//         <GuestGuard>
//           <LoginPage />
//         </GuestGuard>
//       ),
//     },
//   ],
// },
// {
//   path: '/',
//   element: (
//     <GuestGuard>
//       <LoginPage />
//     </GuestGuard>
//   ),
//   children: [
//     { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
//     {
//       path: 'login',
//       element: (
//         <Login />
//       ),
//     },
//     {
//       path: '/signup',
//       element: (
//         <SignUp />
//       ),
//     },
//   ],
// },
