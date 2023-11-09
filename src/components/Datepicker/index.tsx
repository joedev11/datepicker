import React from 'react'

const VIEW = ['days', 'months', 'years'];

const Datepicker = ({date, onSelect}) => 
    // const [currentDate, setCurrentDate] = useState(data);
    // const [view, setView] = useState('days')

    // const handleSelectDate = (date) => {
    //     setCurrentDate(date);
    //     onSelect(data);
    // }

    // const renderContent = () => {
    //     switch(view) {
    //         case 'days':
    //             return <Days onSelect={(date) => setCurrentDate(date)} />
    //         case 'months': 
    //             return <Months onSelect={(date) => setCurrentDate(date)}/>
    //     }
    // }

  return (
    <div>
        {/* <Navigation onViewSelect={() => setView('month')} onNext={() => setCurrentDate(currentDate.month + 1)} onPrevious={() => setCurrentDate(currentDate.month - 1)} /> */}
        {/* renderContent */}
    </div>
  )


export default Datepicker