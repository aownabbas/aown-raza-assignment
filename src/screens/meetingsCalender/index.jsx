import React, { useState } from 'react';
import {
    format, addMonths, subMonths, startOfWeek, addDays, isSameMonth, isSameDay,
} from 'date-fns';
import {
    Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Typography,
} from '@mui/material';
import { ChevronLeft, ChevronRight, CopyAll } from '@mui/icons-material';
import './style.css';
import LinkPopup from '../../components/popup';
import { LoginStatus } from '../../redux/slices/registerSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const MeetingsCalenger = () => {
    // states
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [linkPopup, setLinkPopup] = useState(false);
    const [meetingLink, setMeetingLink] = useState('');

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const handlePreviousMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };

    const handleDateClick = (day) => {
        setSelectedDate(day);
        generateMeetingLink(day);
        setLinkPopup(true);
    };

    const generateMeetingLink = (day) => {
        const formattedDate = format(day, 'yyyy-MM-dd');
        const formattedTime = format(new Date(), 'HH:mm');
        const link = `https://meeting.app/schedule?date=${formattedDate}&time=${formattedTime}`;
        setMeetingLink(link);
    };

    // header
    const renderHeader = () => (
        <div className="calendar-header">
            <IconButton onClick={handlePreviousMonth}>
                <ChevronLeft />
            </IconButton>
            <Typography variant="h5">
                {format(currentDate, 'MMMM yyyy')}
            </Typography>
            <IconButton onClick={handleNextMonth}>
                <ChevronRight />
            </IconButton>
        </div>
    );

    const renderDaysOfWeek = () => (
        <div className="days-of-week">
            {daysOfWeek.map((day, index) => (
                <div className="day-header" key={index}>
                    {day}
                </div>
            ))}
        </div>
    );

    // calender cells
    const renderCells = () => {
        const monthStart = startOfWeek(currentDate, { weekStartsOn: 0 });
        const monthEnd = addDays(monthStart, 42); // To cover 6 rows
        const dateFormat = 'd';
        let days = [];
        let day = monthStart;

        while (day <= monthEnd) {
            days.push(
                <div
                    key={day}
                    className={`calendar-cell ${!isSameMonth(day, currentDate) ? 'disabled' : ''} ${isSameDay(day, selectedDate) ? 'selected' : ''}`}
                    onClick={() => handleDateClick(day)}
                >
                    <button>
                        {format(day, dateFormat)}
                    </button>
                </div>,
            );
            day = addDays(day, 1);
        }

        return <div className="calendar-grid">{days}</div>;
    };

    // logout
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(LoginStatus(false));
        localStorage.setItem('login_status', JSON.stringify(false));
        navigate('/login');
    };

    return (<div className='main-container'>
        <div className="calendar-container">
            <div className="calendar">
                {renderHeader()}
                {renderDaysOfWeek()}
                {renderCells()}
            </div>

            {/* Popup Modal for Meeting Link */}
            <LinkPopup linkPopup={linkPopup} setLinkPopup={setLinkPopup} meetingLink={meetingLink} />
        </div>
        <div className='logout-container'>
            <button className="logout-btn" onClick={handleLogout}>
                {' '}
                Logout
            </button>
        </div>
    </div>
    );
};

export default MeetingsCalenger;
