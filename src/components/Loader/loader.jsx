import { ring2 } from "ldrs";
import classes from "./loader.module.css";

const Loader = ({ size = "40" }) => {
  ring2.register();
  return (
    <div className={classes.loaderContainer}>
      <l-ring-2
        size={size}
        stroke="5"
        stroke-length="0.25"
        bg-opacity="0.1"
        speed="0.8"
        color="black"
      ></l-ring-2>
    </div>
  );
};

export default Loader;
