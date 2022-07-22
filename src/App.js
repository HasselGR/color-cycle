import { useState } from 'react';
import { Input } from './components/input.component';
import './App.css';

function App() {
  const [colors, setColors] =useState({
    red:'',
    green:'',
    blue:'',
  })
  const [color, setColor] = useState('')


  const handleChange = (event) => {
    
    setColors(oldColors => ({
      ...oldColors,
      [event.target.name]: event.target.value,
    }))
    console.log(colors);
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
         {/* <input name='red' placeholder='Red' onChange={handleChange}/>
         <input name='green' placeholder='Green' onChange={handleChange}/>
         <input name='blue' placeholder='Blue' onChange={handleChange}/> */}
         <Input color="red" change={handleChange}/>
         <Input color="green" change={handleChange}/>
         <Input color="blue"  change={handleChange}/>
         <div className='break'/>
          <h1>Color Increment:</h1>
          <div className='break'/>
         <Input color="Red"/>
         <Input color="Green"/>
         <Input color="Blue"/>
         <div className='break'/>
         <button className="button"type='submit'>Submit Colors</button>
        </form>
      </div>
    </div>
  );
}

export default App;
