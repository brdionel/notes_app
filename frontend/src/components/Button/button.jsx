import classes from "./button.module.css";

function Button(props) {
    const { handleClick, text, type } = props;
    
    return (
        <button 
            onClick={handleClick} 
            className={classes.button}
            type={type}
        >
            {text}
        </button>
    )
}

export default Button;