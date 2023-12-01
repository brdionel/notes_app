import classes from "./wrapper.module.css";

function Wrapper({children}) {
    return (
        <div className={classes.container}>
            {children}
        </div>
    )
}

export default Wrapper;