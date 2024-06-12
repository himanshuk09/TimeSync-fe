// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// locales
import ThemeLocalization from './locales';
// components
import SnackbarProvider from './components/snackbar';
import { ThemeSettings } from './components/settings';
import { MotionLazyContainer } from './components/animate';
import { useEffect } from 'react';
// driver import
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
// ----------------------------------------------------------------------

export default function App() {
  // const myInterval = setInterval(() => {
  //   const token = localStorage.getItem('accessToken');
  //   const status = localStorage.getItem('driverjs');
  //   console.log(status);
  //   if (token && status == null) {
  //     navigationPopup();
  //   }

  //   if (status == 'true') {
  //     clearInterval(myInterval);
  //   }
  // }, 1000);

  // const navigationPopup = () => {
  //   localStorage.setItem('driverjs', 'false');
  //   const token = localStorage.getItem('accessToken');
  //   const status = localStorage.getItem('driverjs');
  //   if (token && status == 'false') {
  //     const driverObj = driver({
  //       // showProgress: true,
  //       overlayColor: 'black',
  //       overlayOpacity: 0.2,
  //       popoverClass: 'driverjs-theme',
  //       steps: [
  //         {
  //           popover: {
  //             title: 'Go For Tours',
  //             description: 'Class Section',
  //             side: 'left',
  //             align: 'start',
  //           },
  //         },
  //         {
  //           element: '#main-class-section',
  //           popover: {
  //             title: 'Class creation block',
  //             description:
  //               'You can use the default class names and override the styles or you can pass a custom class name to the popoverClass option either globally or per step.',
  //             side: 'left',
  //             align: 'start',
  //           },
  //         },
  //         {
  //           element: '#classname',
  //           popover: {
  //             title: 'Class Name TextBox',
  //             description:
  //               'Here you have to type the name of classYou can use the default class names and override the styles or you can pass a custom class name to the popoverClass option either globally or per step.',
  //             side: 'bottom',
  //             align: 'start',
  //           },
  //         },
  //         {
  //           element: '#classroom',
  //           popover: {
  //             title: 'Class Room No',
  //             description:
  //               'Here you have to add the Class room Number You can use the default class names and override the styles or you can pass a custom class name to the popoverClass option either globally or per step.',
  //             side: 'bottom',
  //             align: 'start',
  //           },
  //         },
  //         {
  //           element: '#description',
  //           popover: {
  //             title: 'Description',
  //             description:
  //               'Here you have to add description of that class You can use the default class names and override the styles or you can pass a custom class name to the popoverClass option either globally or per step.',
  //             side: 'top',
  //             align: 'start',
  //           },
  //         },
  //         {
  //           element: '#submit-btn',
  //           popover: {
  //             title: 'Add Button',
  //             description:
  //               'submit button You can use the default class names and override the styles or you can pass a custom class name to the popoverClass option either globally or per step.',
  //             side: 'top',
  //             align: 'end',
  //           },
  //         },
  //         {
  //           element: '#card',
  //           popover: {
  //             title: 'Import the Library',
  //             description: 'It works the same in vanilla JavaScript as well as frameworks.',
  //             side: 'bottom',
  //             align: 'start',
  //           },
  //         },
  //         {
  //           element: '#subject_id',
  //           popover: {
  //             title: 'Subject Menu',
  //             description: 'It works the same in vanilla JavaScript as well as frameworks.',
  //             side: 'bottom',
  //             align: 'start',
  //           },
  //         },
  //       ],
  //     });
  //     driverObj.drive();
  //     localStorage.setItem('driverjs', 'true');
  //     const status = localStorage.getItem('driverjs');
  //     if (status == 'true') {
  //       clearInterval(myInterval);
  //     }
  //   }
  // };

  return (
    <MotionLazyContainer>
      <ThemeProvider>
        <ThemeSettings>
          <ThemeLocalization>
            <SnackbarProvider>
              <Router />
            </SnackbarProvider>
          </ThemeLocalization>
        </ThemeSettings>
      </ThemeProvider>
    </MotionLazyContainer>
  );
}
