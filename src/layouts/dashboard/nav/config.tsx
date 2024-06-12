// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  test: icon('ic_test'),
  user: icon('ic_user'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  calendar: icon('ic_calendar'),
  booking: icon('ic_booking'),
  time: icon('ic_time'),
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  kanban: icon('ic_kanban'),
  banking: icon('ic_banking'),
  academicyear: icon('building-line'),
  label: icon('ic_label'),
  external: icon('ic_external'),
  lock: icon('ic_lock'),
  class: icon('icon_class'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general v4.0.0',
    items: [
      { title: 'Dashboard', path: PATH_DASHBOARD.one, icon: ICONS.dashboard },
      { title: 'Class Section', path: PATH_DASHBOARD.classSection, icon: ICONS.kanban },
      { title: 'Subjects', path: PATH_DASHBOARD.subject, icon: ICONS.label },
      {
        title: 'Class Subject Mapping',
        path: PATH_DASHBOARD.classSectionSubjectMap,
        icon: ICONS.banking,
      },
      { title: 'Students', path: PATH_DASHBOARD.students, icon: ICONS.user },
      { title: 'Teacher', path: PATH_DASHBOARD.teacher, icon: ICONS.user },
      { title: 'Timetable', path: PATH_DASHBOARD.timetable, icon: ICONS.analytics },
      { title: 'Attendance ', path: PATH_DASHBOARD.attendanceScreen, icon: ICONS.lock },
      {
        title: 'Attendance Report',
        path: PATH_DASHBOARD.attendanceReport,
        icon: ICONS.analytics,
      },
      { title: 'Calender', path: PATH_DASHBOARD.calenderScreen, icon: ICONS.calendar },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'management',
  //   items: [
  //     {
  //       title: 'user',
  //       path: PATH_DASHBOARD.user.root,
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'Four', path: PATH_DASHBOARD.user.four },
  //         { title: 'Five', path: PATH_DASHBOARD.user.five },
  //         { title: 'Six', path: PATH_DASHBOARD.user.six },
  //       ],
  //     },
  //   ],
  // },
];

export default navConfig;
