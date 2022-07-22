import './input.styles.css';


export const Input = ({color, change}) => {
    return(
        <input name={color} placeholder={color} onChange={change}></input>
    )
}