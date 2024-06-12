import React, { useEffect, useRef, useState } from 'react';
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
} from '@fullcalendar/core';
import DeleteIcon from '@mui/icons-material/Delete';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { createEventId } from './event-utils';
import listPlugin from '@fullcalendar/list';
import {
  Stack,
  IconButton,
  Card,
  Typography,
  Button,
  Box,
  TextField,
  Grid,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { DialogAnimate } from 'src/components/animate';
import Iconify from 'src/components/iconify';
import { addEvents, deleteEvent, getEvents } from 'src/services/events/events.service';
import { useSnackbar } from 'src/components/snackbar';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { LocalizationProvider, DateTimePicker } from '@mui/lab';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import NewAttendenceReport from '../NewAttendenceReport';
const Calender = () => {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [deleteFormPopup, setDeleteFormPopup] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>();
  const [clicked, setClicked] = useState<any>();
  const [eventsData, setEventsData] = useState<any>([]);
  const [addFormPopup, setAddFormPopup] = useState<boolean>(false);
  const [value, setValue] = useState<any>();
  const lastProcessedEntityRef = useRef(null);
  const [dataAdd, setDataAdd] = useState(false);
  const [fetchData, setFetchData] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    fetchApi();
  }, [fetchData]);
  const fetchApi = async () => {
    const EventData = await getEvents();
    setEventsData(EventData);
  };

  useEffect(() => {
    addData();
  }, [dataAdd]);
  const addData = async () => {
    if (
      currentEvents.length > 0 &&
      currentEvents[currentEvents.length - 1] !== lastProcessedEntityRef.current
    ) {
      const lastEntity = currentEvents[currentEvents.length - 1];
      const response = await addEvents(lastEntity);
      response?.status === 201
        ? enqueueSnackbar('Event Successfully Created !', { variant: 'success' })
        : enqueueSnackbar('Event Not Created !', { variant: 'error' });

      lastProcessedEntityRef.current = lastEntity;
    }
    setFetchData(!fetchData);
  };

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setAddFormPopup(true);
    setSelected(selectInfo);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    setDeleteFormPopup(true);
    setClicked(clickInfo);

    // if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //     clickInfo.event.remove();
    // }
  };

  const handleEvents = async (events: any) => {
    setCurrentEvents(events);
  };

  const DateTimePicker = () => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker />
      </DemoContainer>
    </LocalizationProvider>
  );

  const renderEventContent = (eventContent: EventContentArg) => {
    return (
      <>
        <b>{eventContent.timeText}</b>
        <i>{eventContent.event.title}</i>
      </>
    );
  };

  const renderSidebarEvent = (event: EventApi) => {
    return (
      <li key={event.id}>
        <b>{formatDate(event.start!, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
        <i>{event.title}</i>
      </li>
    );
  };
  const onAdd = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    let title = data.newTitle;
    let calendarApi = selected.view.calendar;
    calendarApi.unselect(); // clear date selection
    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: !selected.allDay,
        backgroundColor: 'brown',
      });
    }

    setDataAdd(!dataAdd);
    setAddFormPopup(false);
  };
  const onDelete = async (e: any) => {
    e.preventDefault();
    clicked.event.remove();
    // console.log(clicked.event.extendedProps._id);
    let eventId = clicked.event.extendedProps._id;
    const response = await deleteEvent(eventId);
    response?.status === 200
      ? enqueueSnackbar('Event Successfully Deleted !', { variant: 'success' })
      : enqueueSnackbar('Unable to delete Event !', { variant: 'error' });
    setDeleteFormPopup(false);
  };

  return (
    <div className="demo-app">
      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          events={eventsData}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
        />
      </div>
      <DialogAnimate open={addFormPopup} maxWidth="sm">
        <Stack direction="column">
          <Stack display="flex" flexDirection="row-reverse">
            <IconButton onClick={() => setAddFormPopup(false)}>
              <Iconify icon="iconoir:cancel" width="24" height="24" />
            </IconButton>
          </Stack>
          <Stack>
            <Card sx={{ p: 3 }}>
              <form onSubmit={onAdd}>
                <Typography variant="h4" component="h1" paragraph>
                  Please enter a new title for your event.
                </Typography>
                <TextField fullWidth variant="outlined" name="newTitle" required focused />
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ marginLeft: 30, marginTop: 5, fontSize: 20 }}
                >
                  Add
                </Button>
              </form>
            </Card>
          </Stack>
        </Stack>
      </DialogAnimate>
      <DialogAnimate open={deleteFormPopup} maxWidth="sm">
        <Stack direction="column">
          <Stack display="flex" flexDirection="row-reverse">
            <IconButton onClick={() => setDeleteFormPopup(false)}>
              <Iconify icon="iconoir:cancel" width="24" height="24" />
            </IconButton>
          </Stack>
          <Stack p={1}>
            <Card sx={{ p: 3 }}>
              <form onSubmit={onDelete}>
                <Typography
                  variant="h4"
                  component="h1"
                  paragraph
                  alignItems="center"
                  sx={{ paddingLeft: 4 }}
                >
                  <ReportProblemIcon sx={{ color: 'red' }} /> Are you sure you want to delete the
                  event
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                  <Button
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    type="submit"
                    color="error"
                    sx={{ height: 45 }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ marginBottom: '20px !important', fontSize: 18 }}
                    onClick={() => setDeleteFormPopup(false)}
                  >
                    Cancel
                  </Button>
                </Box>
              </form>
            </Card>
          </Stack>
        </Stack>
      </DialogAnimate>
    </div>
  );
};

export default Calender;

// initialEvents={INITIAL_EVENTS}
{
  /* <div className='demo-app-sidebar'>
<div className='demo-app-sidebar-section'>
    <h2>Instructions</h2>
    <ul>
        <li>Select dates and you will be prompted to create a new event</li>
        <li>Drag, drop, and resize events</li>
        <li>Click an event to delete it</li>
    </ul>
</div>
<div className='demo-app-sidebar-section'>
    <label>
        <input
            type='checkbox'
            checked={weekendsVisible}
            onChange={handleWeekendsToggle}
        ></input>
        toggle weekends
    </label>
</div>
<div className='demo-app-sidebar-section'>
    <h2>All Events ({currentEvents.length})</h2>
    <ul>
        {currentEvents.map(renderSidebarEvent)}
    </ul>
</div>
</div> */
}
