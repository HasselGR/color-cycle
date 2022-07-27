import { useRef, useState, useEffect } from 'react';
import { Input } from './components/input.component';
import './App.css';

function App() {
  const intervalRef = useRef(null);

  const [colors, setColors] =useState({
    red:'',
    green:'',
    blue:'',
    incrementRed:'',
    incrementGreen:'',
    incrementBlue:'',
  })
  const [color, setColor] = useState('')
  const [time, setTime] =useState('');
  const [pause, setPause] = useState(true)
  const [intervalID, setIntervalID]=useState(0);

 // useEffect(() => {
  //   if (!pause) {
  //     if (!intervalRef.current) {
  //       intervalRef.current = setInterval(() => {
  //         const newRed = parseInt(colors.red, 16) + parseInt(colors.incrementRed, 16)
  //         const newBlue = parseInt(colors.blue, 16) + parseInt(colors.incrementBlue, 16)
  //         const newGreen = parseInt(colors.green, 16) + parseInt(colors.incrementGreen, 16)
  //         setColors(oldColors => ({
  //           ...oldColors,
  //             red: newRed.toString(16),
  //             blue: newBlue.toString(16),
  //             green: newGreen.toString(16),
  //         }))
  //       }, 250)
  //       setColor(`#${colors.red}${colors.green}${colors.blue}`)
  //     }
  //   } else {
  //     if (intervalRef.current) {
  //       clearInterval(intervalRef.current)
  //       intervalRef.current = null
  //     }
  //   }
  // }, [pause, colors]) 
 //estudiar mejor los array de dependencias




  const handleChange = (event) => {
    if(/^[0-9a-f]+$/.test(event.target.value) && colors[event.target.name].length < 2){
      setColors(oldColors => ({
        ...oldColors,
        [event.target.name]: event.target.value,
      }))
    }else{
      alert('Invalid Character or Length, We are only able to accept hexadecimal symbols')
      return;
    }
  }





  const handleStart = () =>{
    if(intervalID){ 
      clearInterval(intervalID);
      setIntervalID(0);
      console.log('the colors ended like this:', colors)
      return;
    }

    const newInterval = setInterval(() => {
          setColors(oldColors => ({
            ...oldColors,
              red: (parseInt(oldColors.red, 16) + parseInt(oldColors.incrementRed, 16)).toString(16),
              blue: (parseInt(oldColors.blue, 16) + parseInt(oldColors.incrementBlue, 16)).toString(16),
              green: (parseInt(oldColors.green, 16) + parseInt(oldColors.incrementGreen, 16)).toString(16),
          }))
          // console.log(colors.red, colors.green, colors.blue)
          // setColor(`#${colors.red}${colors.green}${colors.blue}`)
          // console.log(color)
        }, 1000)
    setIntervalID(newInterval);
  }
  

 

  const handleNumberChange= (event) =>{
    setTime(event.target.value)
  }

  const handleSubmit= (event) =>{
    event.preventDefault()
    setColor(`#${colors.red}${colors.green}${colors.blue}`)
  }

  return (
    <div>
      <div className="page-container">
        <div className="App">
          <h1>color-cycle</h1>
          <h2>This app draws a box filled with a user specified color and makes small changes over time also based on user input. In other words, from cycles through changes to the originally specified color. These changes allow the user to experience the visual impact different changes to the individual parts of an RGB color specification (e.g. #000000 color code).</h2>
        </div>
        <div style={{backgroundColor: color===''? 'green': color}} className='color-box'>


        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="inputs-container">
            <h1>Input for colors:</h1>  
          <div className='break'/>
            <Input color="red" state={colors.red} change={handleChange}/>
            <Input color="green" state={colors.green} change={handleChange}/>
            <Input color="blue"  state={colors.blue} change={handleChange}/>
          <div className='break'/>
            <h1>Color Increment:</h1>
          <div className='break'/>
            <Input color="incrementRed" state={colors.incrementRed} change={handleChange}/>
            <Input color="incrementGreen" state={colors.incrementGreen} change={handleChange}/>
            <Input color="incrementBlue" state={colors.incrementBlue} change={handleChange}/>
          <div className='break'/>
            <button className="button"type='submit'>Submit Colors</button>
          <div className='break'/>
            <h1>Change Interval:</h1>
          <div className='break'/>
        </form>
            <Input color="interval" state={time} change={handleNumberChange}/>
            <button className='button' onClick={handleStart}>{intervalID===0? 'Start':'Pause' }</button>
      </div>
    </div>
  );
}

export default App;
