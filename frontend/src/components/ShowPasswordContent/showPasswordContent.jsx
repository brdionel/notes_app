import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import classes from "./showPassword.module.css";

const ShowPasswordContent = ({handleShowPasswordClick, showPassword }) => {
  return (
    <span onClick={handleShowPasswordClick} className={classes.show_password_content}>
      {showPassword ? (
        <>
          <AiOutlineEyeInvisible className={classes.show_password_icon} />
          <span>
            Hide
          </span>
        </>
      ) : (
        <>
          <AiOutlineEye className={classes.show_password_icon} />
          <span>
            Show
          </span>
        </>
      )}
    </span>
  );
};

export default ShowPasswordContent;