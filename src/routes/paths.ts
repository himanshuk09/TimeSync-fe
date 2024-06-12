// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

// export const PATH_AUTH = {
//   login: '/login',
// };
export const PATH_AUTH = {
  login: '/',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  classSection: path(ROOTS_DASHBOARD, '/classSection'),
  students: path(ROOTS_DASHBOARD, '/students'),
  subject: path(ROOTS_DASHBOARD, '/subject'),
  classSectionSubjectMap: path(ROOTS_DASHBOARD, '/classSubjectMap'),
  teacher: path(ROOTS_DASHBOARD, '/teacher'),
  timetable: path(ROOTS_DASHBOARD, '/timetable'),
  savedtimetable: path(ROOTS_DASHBOARD, '/savedtimetable'),
  attendanceScreen: path(ROOTS_DASHBOARD, '/attendence'),
  attendanceReport: path(ROOTS_DASHBOARD, '/attendencereport'),
  calenderScreen: path(ROOTS_DASHBOARD, '/calender'),
  one: path(ROOTS_DASHBOARD, '/one'),
  setting: path(ROOTS_DASHBOARD, '/setting'),
  profile: path(ROOTS_DASHBOARD, '/profile'),
  userEdit: path(ROOTS_DASHBOARD, '/profile'),
  userView: path(ROOTS_DASHBOARD, '/profile/view'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    four: path(ROOTS_DASHBOARD, '/user/four'),
    five: path(ROOTS_DASHBOARD, '/user/five'),
    six: path(ROOTS_DASHBOARD, '/user/six'),
  },
};
