import { useState, useEffect } from 'react';
import { Input } from './components/input.component';
import './App.css';

function App() {
  const dictionary = ['a','b','c','e','d', 'f','A','B','C','D','F','0','1','2','3','4','5','6','7','8','9', 'Backspace'];

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
  const [palette, setPalette] = useState([]);
  const [pattern, setPattern] = useState('increment');

  useEffect(() => {
    setColor(`#${colors.red}${colors.green}${colors.blue}`)
  }, [colors]) 
  
  
  
  const validCharacter = (value) => {
    if (!value.length){
      return true;
    } else{
      return !!dictionary.includes(value.at(-1))
    }
  }


  const handleChange = (event) => {
    if(validCharacter(event.target.value)){
        setColors(oldColors => ({
          ...oldColors,
          [event.target.name]: event.target.value,
        }))
    }else if (event.target.value.length){
      alert('Invalid Character or Length, We are only able to accept hexadecimal symbols')
      return;
    }
  }


  const patternChange = (event) =>{
    setPattern(event.target.value);
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
      if(pattern === 'increment'){
        setColors(oldColors => ({
          ...oldColors,
            red: (parseInt(oldColors.red, 16) + parseInt(oldColors.incrementRed, 16)) > parseInt('ff', 16)? 'ff': (parseInt(oldColors.red, 16) + parseInt(oldColors.incrementRed, 16)).toString(16),
            blue: (parseInt(oldColors.blue, 16) + parseInt(oldColors.incrementBlue, 16)) > parseInt('ff', 16)? 'ff': (parseInt(oldColors.blue, 16) + parseInt(oldColors.incrementBlue, 16)).toString(16),
            green: (parseInt(oldColors.green, 16) + parseInt(oldColors.incrementGreen, 16)) > parseInt('ff', 16)? 'ff': (parseInt(oldColors.green, 16) + parseInt(oldColors.incrementGreen, 16)).toString(16),
        }))
      }
      if(pattern === 'decrement'){
        setColors(oldColors => ({
          ...oldColors,
            red: (parseInt(oldColors.red, 16) - parseInt(oldColors.incrementRed, 16)) < parseInt('00', 16)? '00': (parseInt(oldColors.red, 16) - parseInt(oldColors.incrementRed, 16)).toString(16),
            blue: (parseInt(oldColors.blue, 16) - parseInt(oldColors.incrementBlue, 16)) < parseInt('00', 16)? '00': (parseInt(oldColors.blue, 16) - parseInt(oldColors.incrementBlue, 16)).toString(16),
            green: (parseInt(oldColors.green, 16) - parseInt(oldColors.incrementGreen, 16)) < parseInt('00', 16)? '00': (parseInt(oldColors.green, 16) - parseInt(oldColors.incrementGreen, 16)).toString(16),
        }))
      }
        
      }, time=== '' ? '250': time)
    setIntervalID(newInterval);
  }
  
  const addToPalette = (event) => {
    event.preventDefault();
    setPalette(current => [...current, color])
    console.log(palette)
  }
 

  const handleNumberChange= (event) =>{
    setTime(event.target.value)
  }


  return (
    <div className="page-container">
      <div className="title-container">
        <div className='header-container'>
          <h1>color-cycle</h1>
          <h2>This app draws a box filled with a user specified color and makes small changes over time also based on user input. In other words, from cycles through changes to the originally specified color. These changes allow the user to experience the visual impact different changes to the individual parts of an RGB color specification (e.g. #000000 color code).</h2>
        </div>
        <div className='box-container'>
        <div style={{backgroundColor: color}} className='color-box'/>
        <button className='button-56' onClick={addToPalette}>Add current color to palette</button>
        </div>
      </div>
      <div className='inputs-and-palette-container'>
        <form className="inputs-container">
          <input
            type="radio"
            name="pattern"
            value="increment"
            id="increment"
            checked={pattern === 'increment'}
            onChange={patternChange}
          />
          <label>Increment</label>
          <input
            type="radio"
            name="pattern"
            value="decrement"
            id="decrement"
            onChange={patternChange}
          />
          <label>Decrement</label>
          <div className='break'/>
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
            <button className='button-56' onClick={handleStart}>{intervalID===0? 'Start':'Pause' }</button>
            
        </form>
        <div className='palette-container'>
          <h1>Color Palette: </h1>
          <div className='palette-elements-container'>
            { palette.length === 0 ?
            
            <h2>Your palette will be shown here when you add an element</h2>
              :
              palette.map((element, index) => {
                return (
                  <div key={index} className='palette-element' 
                  onClick={() =>{
                    navigator.clipboard.writeText(`${element};`);
                  }}>
                    <div 
                      style={{backgroundColor: element, width: '45px', height:'45px', marginTop:'15px'}}
                      />
                    <h2>{element}</h2>
                  <button className='button-56' onClick={
                    () => {
                      setColor(element)
                      setColors(oldColors => ({
                        ...oldColors,
                          red: element.slice(1, 3) ,
                          green: element.slice(3, 5),
                          blue: element.slice(5, 7),
                      }))
                    }
                  }> Set Color on Box</button>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
