import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';
import { Grid, Typography, Paper, IconButton, Box, Button } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import './style.css';
import { CartSlice } from '../../redux/slices/cartSlice';
import { LoginStatus } from '../../redux/slices/registerSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const MeetingsCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [events, setEvents] = useState([
    { date: new Date(), label: 'Team Meeting', time: '8:00 AM - 10:00 AM', color: '#f28b82' },
    { date: addDays(new Date(), 2), label: 'Roadmap Planning', time: '1:00 PM - 2:00 PM', color: '#aecbfa' },
  ]);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // For navigating between months
  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  // Rendering header
  const renderHeader = () => (
    <div className="calendar-header">
      <IconButton onClick={handlePreviousMonth}>
        <ChevronLeft />
      </IconButton>
      <Typography variant="h5">{format(currentDate, 'MMMM yyyy')}</Typography>
      <IconButton onClick={handleNextMonth}>
        <ChevronRight />
      </IconButton>
    </div>
  );

  // Rendering days of the week (Sun, Mon, etc.)
  const renderDaysOfWeek = () => (
    <Grid container spacing={1} className="days-of-week">
      {daysOfWeek.map((day) => (
        <Grid item xs key={day}>
          <Typography align="center" variant="body2" fontWeight="bold">
            {day}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );

  // Rendering calendar cells
  const renderCells = () => {
    const startWeekDate = startOfWeek(currentDate, { weekStartsOn: 0 }); // Sunday as the start of the week
    const days = [];
    let day = startWeekDate;

    for (let i = 0; i < 42; i++) {
      const todayEvents = events.filter((event) => isSameDay(event.date, day));
      const isSelected = selectedDate && isSameDay(day, selectedDate);

      days.push(
        <Grid
          item
          xs={11 / 7}
          key={i}
          className={`calendar-cell ${!isSameMonth(day, currentDate) ? 'disabled' : ''} ${
            isSelected ? 'selected' : ''
          }`}
          onClick={() => setSelectedDate(day)}
        >
          <Box className="date-number">{format(day, 'd')}</Box>
          {todayEvents.map((event, idx) => (
            <Paper key={idx} elevation={2} className="event-card" style={{ backgroundColor: event.color }}>
              <Typography variant="body2" fontWeight="bold">
                {event.label}
              </Typography>
              <Typography variant="caption">{event.time}</Typography>
            </Paper>
          ))}
        </Grid>,
      );
      day = addDays(day, 1); // Move to the next day
    }

    return (
      <Grid container spacing={1} className="calendar-grid">
        {days}
      </Grid>
    );
  };

  // Handle scheduling meeting
  const handleScheduleMeeting = () => {
    const newEvent = {
      date: startDate.toDate(),
      label: 'Weekly Meeting',
      time: `${startDate.format('h:mm A')} - ${endDate.format('h:mm A')}`,
      color: '#34a853',
    };
    setEvents([...events, newEvent]);
    setSelectedDate(startDate.toDate());
    alert('Meeting scheduled successfully');
  };

  // logout
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(CartSlice());
    navigate('/login');
    dispatch(LoginStatus(false));
    localStorage.setItem('login_status', JSON.stringify(false));
  };

  return (
    <div className="main-container">
      <div className="calendar-wrapper">
        <div className="sidebar">
          <div className="datepicker-container">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Start Date & Time"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                renderInput={(params) => <input {...params} />}
              />
              <DateTimePicker
                label="End Date & Time"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                renderInput={(params) => <input {...params} />}
              />
            </LocalizationProvider>
          </div>
          <Button variant="contained" color="primary" onClick={handleScheduleMeeting} className="meetings-button">
            Schedule Meeting
          </Button>

          {/* Logout button */}
          <button className="logout-btn" onClick={handleLogout}>
            {' '}
            Logout
          </button>
        </div>
        <div className="calendar-container">
          {renderHeader()}
          {renderDaysOfWeek()}
          {renderCells()}
        </div>
      </div>
    </div>
  );
};

export default MeetingsCalendar;
