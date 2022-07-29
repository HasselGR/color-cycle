import { useState, useEffect } from 'react';
import { Input } from './components/input.component';
import './App.css';

function App() {

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
  const [intervalID, setIntervalID]=useState(0);
  const [palette, setPalette] = useState([ ]);

  useEffect(() => {
    setColor(`#${colors.red}${colors.green}${colors.blue}`)
  }, [colors]) 
  

  const handleKeydown = (event) => {
    if (event.key === ' '){
      console.log(color)
    }
  }

  useEffect(() =>{
    document.addEventListener('keydown',handleKeydown, true);
  },[handleKeydown])





  const handleChange = (event) => {
    const regex = /^[0-9a-fA-F\b]+$/;
    if(regex.test(event.target.value) && colors[event.target.name].length < 2){
      setColors(oldColors => ({
        ...oldColors,
        [event.target.name]: event.target.value,
      }))
    }else{
      alert('Invalid Character or Length, We are only able to accept hexadecimal symbols')
      return;
    }
  }





  const handleStart = (event) =>{
    event.preventDefault()
    if(intervalID){ 
      clearInterval(intervalID);
      setIntervalID(0);
      console.log('the colors ended like this:', colors)
      return;
    }

    const newInterval = setInterval(() => {
        setColors(oldColors => ({
          ...oldColors,
            red: (parseInt(oldColors.red, 16) + parseInt(oldColors.incrementRed, 16)) > parseInt('ff', 16)? 'ff': (parseInt(oldColors.red, 16) + parseInt(oldColors.incrementRed, 16)).toString(16),
            blue: (parseInt(oldColors.blue, 16) + parseInt(oldColors.incrementBlue, 16)) > parseInt('ff', 16)? 'ff': (parseInt(oldColors.blue, 16) + parseInt(oldColors.incrementBlue, 16)).toString(16),
            green: (parseInt(oldColors.green, 16) + parseInt(oldColors.incrementGreen, 16)) > parseInt('ff', 16)? 'ff': (parseInt(oldColors.green, 16) + parseInt(oldColors.incrementGreen, 16)).toString(16),
        }))
        
      }, time=== '' ? '250': time)
    setIntervalID(newInterval);
  }
  
 

  const handleNumberChange= (event) =>{
    setTime(event.target.value)
  }


  return (
    <div class="page-container">
      <div className="title-container">
        <div className='header-container'>
          <h1>color-cycle</h1>
          <h2>This app draws a box filled with a user specified color and makes small changes over time also based on user input. In other words, from cycles through changes to the originally specified color. These changes allow the user to experience the visual impact different changes to the individual parts of an RGB color specification (e.g. #000000 color code).</h2>
        </div>
        <div style={{backgroundColor: color}} className='color-box'>


        </div>
      </div>
      <div>
        <form className="inputs-container">
            <h1>Input for colors:</h1>  
          <div className='break'/>
            <Input active={intervalID} color="red" state={colors.red} change={handleChange}/>
            <Input active={intervalID} color="green" state={colors.green} change={handleChange}/>
            <Input active={intervalID} color="blue"  state={colors.blue} change={handleChange}/>
          <div className='break'/>
            <h1>Color Increment:</h1>
          <div className='break'/>
            <Input active={intervalID} color="incrementRed" state={colors.incrementRed} change={handleChange}/>
            <Input active={intervalID} color="incrementGreen" state={colors.incrementGreen} change={handleChange}/>
            <Input active={intervalID} color="incrementBlue" state={colors.incrementBlue} change={handleChange}/>
          <div className='break'/>
            <h1>Change Interval:</h1>
          <div className='break'/>
            <Input active={intervalID} color="interval" state={time} change={handleNumberChange}/>
            <button className='button' onClick={handleStart}>{intervalID===0? 'Start':'Pause' }</button>
        </form>
      </div>
    </div>
  );
}

export default App;
