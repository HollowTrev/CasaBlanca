import React, { useState, useEffect } from 'react';

const Calendar = () => {
  const [today, setToday] = useState(new Date());
  const [activeDay, setActiveDay] = useState(null);
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [eventsArr, setEventsArr] = useState([]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    getEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    initCalendar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, year]);

  const initCalendar = () => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    // Your existing code for rendering calendar days
  };

  const prevMonth = () => {
    setMonth(prev => {
      let newMonth = prev - 1;
      let newYear = year;
      if (newMonth < 0) {
        newMonth = 11;
        newYear--;
      }
      setYear(newYear);
      return newMonth;
    });
  };

  const nextMonth = () => {
    setMonth(prev => {
      let newMonth = prev + 1;
      let newYear = year;
      if (newMonth > 11) {
        newMonth = 0;
        newYear++;
      }
      setYear(newYear);
      return newMonth;
    });
  };

  const addListner = () => {
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
      day.addEventListener("click", (e) => {
        // Implement logic for handling click event
      });
    });
  };

  const getActiveDay = (date) => {
    const day = new Date(year, month, date);
    const dayName = day.toString().split(" ")[0];
    setActiveDay(dayName);
  };

  const updateEvents = (date) => {
    // Implement logic for updating events
  };

  const getEvents = () => {
    const savedEvents = localStorage.getItem("events");
    if (savedEvents) {
      setEventsArr(JSON.parse(savedEvents));
    }
  };

  return (
    <div className="calendar">
      <div className="date">{months[month]} {year}</div>
      {/* Render calendar days */}
      <div className="days"></div>
      <button className="prev" onClick={prevMonth}>Prev</button>
      <button className="next" onClick={nextMonth}>Next</button>
    </div>
  );
};

export default Calendar;
