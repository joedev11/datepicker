import React, { useState } from 'react';

const Datepicker = (date, OnSelect) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [view, setView] = useState('days')

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateClick = (date) => {
    const selectedYear = new Date().getFullYear();
    const selectedMonth = (new Date().getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so we add 1
    const selectedDay = date.toString().padStart(2, '0');
  
    const formattedDate = `${selectedYear}-${selectedMonth}-${selectedDay}`;
    setSelectedDate(formattedDate);
    setShowCalendar(false);
  };
  
  const formatCurrentMonthAndYear = () => {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let currentMonth = new Date(year, month, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    return <div className="text-sm font-medium">{currentMonth}</div>;
  }

  const renderCalendar = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

    // Calculate how many days from the previous month should be displayed
    const daysBefore = firstDayOfMonth;
    
    // Calculate how many days from the next month should be displayed
    const totalDays = daysBefore + daysInCurrentMonth;
    const daysAfter = 42 - totalDays;

    const days = [];

    // Populate the days from the previous month
    for (let i = daysBefore - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${i}`} className="text-gray-300 mt-2 pt-1 pr-[2px] ">
          {prevMonthDays - i}
        </div>
      );
    }

    // Populate the days of the current month
    for (let i = 0; i < daysInCurrentMonth; i++) {
      const day = i + 1;
      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          className={`day mt-2 rounded-[90%] pt-1 pr-[2px] h-7  ${day === selectedDate ? 'bg-red-600 text-white' : ''}`}>
          {day}
        </div>
      );
    }

    // Populate the days from the next month
    for (let i = 0; i < daysAfter; i++) {
      days.push(
        <div key={`next-${i}`} className="text-gray-300 mt-2 pt-1 pr-[2px] ">
          {i + 1}
        </div>
      );
    }

    return <div className="days grid grid-cols-7 gap-0 text-sm w-[200px] mx-auto">{days}</div>;
  };

  const renderContent = () => {
        switch(view) {
            case 'days':
                return (
                  <div className="border border-gray-900 w-[220px] mx-auto mt-2 p-2">
                    <div className="datepicker-header">
                      <span id="prevMonth" className="prev-month">{'<'}</span>
                      <button id="currentMonth" className="current-month px-8" onViewSelect={()=> setView('months')}>{formatCurrentMonthAndYear()}</button>
                      <span id="nextMonth" className="next-month">{'>'}</span>
                    </div>
                    <ul className="grid grid-cols-7 w-[200px] mx-auto mt-3 font-medium text-sm">
                      <li>Su</li>
                      <li>Mo</li>
                      <li>Tu</li>
                      <li>We</li>
                      <li>Th</li>
                      <li>Fr</li>
                      <li>Sa</li>
                    </ul>
                    <div className="">
                      {renderCalendar()}
                    </div>
                  </div>
                )
            case 'months':
              return (
                  <div className="border border-gray-900 w-[220px] mx-auto mt-2 p-2">
                    <div className="datepicker-header">
                      <span id="prevMonth" className="prev-month">{'<'}</span>
                      <button id="currentMonth" className="current-month px-8" onViewSelect={()=> setView('months')}>{formatCurrentMonthAndYear()}</button>
                      <span id="nextMonth" className="next-month">{'>'}</span>
                    </div>
                    <ul className="grid grid-cols-4 w-[200px] mx-auto mt-3 font-medium text-sm">
                      <li>Jan</li>
                      <li>Feb</li>
                      <li>Mar</li>
                      <li>Apr</li>
                      <li>May</li>
                      <li>Jun</li>
                      <li>Jul</li>
                      <li>Aug</li>
                      <li>Sep</li>
                      <li>Oct</li>
                      <li>Nov</li>
                      <li>Dec</li>
                    </ul>
                  </div>
              )
            case 'years':
              return(
                <div className="border border-gray-900 w-[220px] mx-auto mt-2 p-2">
                  <div className="datepicker-header">
                    <span id="prevMonth" className="prev-month">{'<'}</span>
                    <button id="currentMonth" className="current-month px-8" onViewSelect={()=> setView('months')}>{formatCurrentMonthAndYear()}</button>
                    <span id="nextMonth" className="next-month">{'>'}</span>
                  </div>
                  <ul className="grid grid-cols-4 w-[200px] mx-auto mt-3 font-medium text-sm">
                    <li>Jan</li>
                    <li>Feb</li>
                    <li>Mar</li>
                    <li>Apr</li>
                    <li>May</li>
                    <li>Jun</li>
                    <li>Jul</li>
                    <li>Aug</li>
                    <li>Sep</li>
                    <li>Oct</li>
                    <li>Nov</li>
                    <li>Dec</li>
                  </ul>
                </div>
              )

            default: 
              return (
                <div className="border border-gray-900 w-[220px] mx-auto mt-2 p-2">
                    <div className="datepicker-header">
                      <span id="prevMonth" className="prev-month">{'<'}</span>
                      <button id="currentMonth" className="current-month px-8" onViewSelect={()=> setView('months')}>{formatCurrentMonthAndYear()}</button>
                      <span id="nextMonth" className="next-month">{'>'}</span>
                    </div>
                    <ul className="grid grid-cols-7 w-[200px] mx-auto mt-3 font-medium text-sm">
                      <li>Su</li>
                      <li>Mo</li>
                      <li>Tu</li>
                      <li>We</li>
                      <li>Th</li>
                      <li>Fr</li>
                      <li>Sa</li>
                    </ul>
                    <div className="">
                      {renderCalendar()}
                    </div>
                  </div>
              )
        }
      };

  return (
    <div className="datepicker">
      <div className="input-container border border-gray-800 w-[200px] mx-auto mt-3">
        <input
          type="text"
          value={selectedDate}
          onClick={toggleCalendar}
          readOnly
          className="pl-6 w-full text-sm"
        />
        <div className="calendar-icon absolute -mt-6" onClick={toggleCalendar}>
          &#128197;
        </div>
      </div>
      {showCalendar && (
        <div>
          {renderContent()}
        </div>
      )}
    </div>
  );
};

export default Datepicker;
