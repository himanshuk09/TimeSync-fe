import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography } from '@mui/material';
// components
import { useSettingsContext } from '../components/settings';

import { Button, MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl/FormControl';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import Select from '@mui/material/Select/Select';
import TextField from '@mui/material/TextField/TextField';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { useState, useEffect } from 'react';
import { eventData } from '../_mock/arrays/events';

const Events = () => {
  const [age, setAge] = useState('');
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
  const [events, setEvents] = useState(eventData);

  return (
    <>
      <Helmet>
        <title> TimeSync | Events</title>
      </Helmet>

      <section className="main">
        {/* <div className="main-top">
          <h1>Events</h1>
          <i className="fas fa-user-cog"></i>
        </div> */}
        <Typography variant="h3" component="h1" paragraph>
          Events
        </Typography>
        <div className=" event-type-box">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Event Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Event Type"
              onChange={(event) => setAge(event.target.value)}
            >
              <MenuItem value={10}>Storts</MenuItem>
              <MenuItem value={20}>Antaragni</MenuItem>
              <MenuItem value={30}>Ganesh Chaturthi</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="main-bottom">
          <div className="main-block">
            <div className="dummy-div">
              <TextField
                id="outlined-basic"
                label="Event Title"
                className="text-field"
                size="medium"
                variant="outlined"
              />
            </div>
            <div className="dummy-div dummy">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']}>
                  <DatePicker
                    label="Start Date"
                    value={value}
                    className="date-picker"
                    onChange={(newValue: any) => setValue(newValue)}
                  />
                  <DatePicker
                    label="End Date"
                    value={value}
                    className="date-picker end-date"
                    onChange={(newValue: any) => setValue(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <TextField
              id="outlined-basic"
              size="medium"
              className="text-field"
              label="Discription"
              rows={4}
              multiline={true}
              variant="outlined"
            />
            <Button variant="contained" className="add-btn button" size="small">
              Add Event
            </Button>
          </div>
          <div className=" right-block">
            <div className="main-top">
              <h3>Events</h3>
            </div>
            <div className="card-container">
              {/* {
                events.map((event) => (<div key={event.serial_no} className="card">
                  <h5>{event.event_title}</h5>
                  <p>{event.start_date}</p>
                </div>))
              } */}
              {events.map((event) => (
                <div key={event.serial_no} className="card">
                  <div className="card-details">
                    <p className="text-title">{event.event_title}</p>
                    <p className="text-body">{event.start_date}</p>
                  </div>
                  <button className="card-button">{event.event_title}</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Events;
