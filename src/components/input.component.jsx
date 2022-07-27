import './input.styles.css';


export const Input = ({color, change, state}) => {
    return(
        <input name={color}  type={color==='time'? 'number': ''} value={state} placeholder={color} onChange={change}></input>
    )
}