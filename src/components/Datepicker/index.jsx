import React, { useState } from 'react';

const Datepicker = (date, OnSelect) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [view, setView] = useState('days')
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateClick = (date) => {
    const selectedYear = new Date().getFullYear();
    const selectedMonth = (new Date().getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so we add 1
    const selectedDay = date.toString().padStart(2, '0');
  
    const formattedDate = `${selectedYear}-${selectedMonth}-${selectedDay}`;
    setSelectedDate(formattedDate);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  
  const formatCurrentMonthAndYear = () => {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    date = new Date(year, month, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    return <div className="text-sm font-medium">{date}</div>;
  }

  const formatCurrentYear = () => {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    date = new Date(year, month, 1).toLocaleDateString('en-US', { year: 'numeric' });
    return <div className="text-sm font-medium">{date}</div>;
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
      const day = (i + 1).toString();
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
                      <button id="prevMonth" className="prev-month" onClick={() => prevMonth()}>{'<'}</button>
                      <button id="currentMonth" className="px-8 current-month" onClick={() => setView('months')}>{formatCurrentMonthAndYear()}</button>
                      <button id="nextMonth" className="next-month">{'>'}</button>
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
                      <button id="currentMonth" className="px-[65px] current-month font-medium" onViewSelect={()=> setView('years')}>{formatCurrentYear()}</button>
                      <span id="nextMonth" className="next-month">{'>'}</span>
                    </div>
                    <ul className="grid grid-cols-4 w-[200px] mx-auto mt-3 font-medium text-sm">
                      <li className="mt-2 mb-8">Jan</li>
                      <li className="mt-2 mb-8">Feb</li>
                      <li className="mt-2 mb-8">Mar</li>
                      <li className="mt-2 mb-8">Apr</li>
                      <li className="mt-2 mb-8">May</li>
                      <li className="mt-2 mb-8">Jun</li>
                      <li className="mt-2 mb-8">Jul</li>
                      <li className="mt-2 mb-8">Aug</li>
                      <li className="mt-2 mb-8">Sep</li>
                      <li className="mt-2 mb-8">Oct</li>
                      <li className="mt-2 mb-8">Nov</li>
                      <li className="mt-2 mb-8">Dec</li>
                    </ul>
                  </div>
              )
            case 'years':

              return(
                <div className="border border-gray-900 w-[220px] mx-auto mt-2 p-2">
                  <div className="datepicker-header">
                    <span id="prevYear" className="prev-year">{'<'}</span>
                    <button id="currentYear" className="px-8 current-year" onViewSelect={()=> setView('days')}></button>
                    <span id="nextYear" className="next-year">{'>'}</span>
                  </div>
                  <ul className="grid grid-cols-4 w-[200px] mx-auto mt-3 font-medium text-sm">
                  </ul>
                </div>
              )

            default: 
              return (
                <div className="border border-gray-900 w-[220px] mx-auto mt-2 p-2">
                    <div className="datepicker-header">
                      <span id="prevMonth" className="prev-month">{'<'}</span>
                      <button id="currentMonth" className="px-8 current-month" onViewSelect={()=> setView('months')}>{formatCurrentMonthAndYear()}</button>
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
          className="w-full pl-6 text-sm"
        />
        <div className="absolute -mt-6 calendar-icon" onClick={toggleCalendar}>
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
