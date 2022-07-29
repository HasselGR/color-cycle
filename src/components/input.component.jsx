import './input.styles.css';


export const Input = ({color, change, state, active}) => {
    return(
        <input name={color} disabled={active? true : false} type={color==='interval'? 'number': ''} value={state} placeholder={color.charAt(0).toUpperCase() + color.slice(1)} onChange={change}></input>
    )
}