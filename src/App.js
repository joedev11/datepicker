import './App.css';
import Datepicker from './components/Datepicker';

function App() {
  return (
    <div className="App">
      <Datepicker />
      {/* <Datepicker date={new Date()} onSelect={(date) => console.log('date')}/> */}
      {/* <days date={currentDate}/> */}

      {/* Days Component */}
      {/* const days = [0, 1, 2, 3, 4];

      days.map(day => {
        return <span className={currentDate.day === day ? 'bg-red'}>{day}</span>
      }) */}


      {/* <months/>
      <years/> */}
    </div>
  );
}

export default App;
