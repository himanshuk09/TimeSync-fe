import { Suspense, lazy, ElementType } from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------
export const SignUpPage = Loadable(lazy(() => import('../pages/SignUpPage')));
export const LoginPage = Loadable(lazy(() => import('../pages/LoginPage')));
export const Dashboard = Loadable(lazy(() => import('../pages/Dashboard')));
export const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
export const ClassSection = Loadable(lazy(() => import('../pages/ClassSection')));
export const Students = Loadable(lazy(() => import('../pages/students/StudentsList')));
export const Subject = Loadable(lazy(() => import('../pages/Subject')));
export const ClassSectionSubjectMap = Loadable(
  lazy(() => import('../pages/ClassSectionSubjectMap'))
);
export const Teacher = Loadable(lazy(() => import('../pages/teachers/TeacherList')));
export const Timetable = Loadable(lazy(() => import('../pages//timetable/Timetable')));
export const Attendence = Loadable(lazy(() => import('../pages/Attendence')));
export const AttendanceReport = Loadable(lazy(() => import('../pages/AttendenceReport')));
export const Calender = Loadable(lazy(() => import('../pages/calender/Calender')));
export const SavedTimeTable = Loadable(lazy(() => import('../pages//timetable/SavedTimetable')));
export const Login = Loadable(lazy(() => import('../sections/auth/Login')));
export const SignUp = Loadable(lazy(() => import('../sections/auth/SignUp')));
export const Page404 = Loadable(lazy(() => import('../pages/Page404')));

export const Test = Loadable(lazy(() => import('../components/Test')));
export const Events = Loadable(lazy(() => import('../pages/Events')));
export const Profile = Loadable(lazy(() => import('../pages/Profile/Profile')));
export const RoomReservation = Loadable(lazy(() => import('../pages/RoomReservation')));
export const Setting = Loadable(lazy(() => import('../pages/Setting')));
export const UserEdit = Loadable(lazy(() => import('../pages/UserEdit')));
export const UserView = Loadable(lazy(() => import('../pages/UserView')));
export const PageFour = Loadable(lazy(() => import('../pages/PageFour')));
export const PageFive = Loadable(lazy(() => import('../pages/PageFive')));
export const PageSix = Loadable(lazy(() => import('../pages/PageSix')));
