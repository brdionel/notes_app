import classes from "./button.module.css";

const variantClasses = {
    primary: classes.primary,
  };

function Button(props) {
    const { handleClick, text, type, variant, disabled } = props;
    const variantClass = variant ? variantClasses[variant] : "";
    return (
        <button 
            onClick={handleClick} 
            className={`${classes.button} ${variantClass}`}
            type={type}
            disabled={disabled}
        >
            {text}
        </button>
    )
}

export default Button;