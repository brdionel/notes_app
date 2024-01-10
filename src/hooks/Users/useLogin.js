import { useState } from "react";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export function useLogin({
  handleCloseModal,
  login,
  setCurrentUser,
  validateEmail,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);

  const [step, setStep] = useState(0);

  const handlePassword = (value) => {
    setPassword(value);
  };

  const handleEmail = (value) => {
    setEmail(value);
  };

  const handleSubmitEmail = async (emailLogin) => {
    try {
      const rta = await validateEmail({ email: emailLogin });
      if (rta !== undefined) {
        if (rta) {
          setStep(1);
        } else {
          setStep(2);
        }
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const handleSubmit = async (emailLogin, passwordLogin) => {
    try {
      const rta = await login({ email: emailLogin, password: passwordLogin });
      if (!rta) {
        setErrorLogin(true);
        return false;
      } else {
        if (errorLogin) setErrorLogin(false);
        handleCloseModal();
        return rta;
      }
    } catch (error) {
      console.log({ error });
      iziToast.error({
        title: "Error",
        message: "Illegal operation",
      });
    }
  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  return {
    step,
    setStep,
    email,
    password,
    showPassword,
    handlePassword,
    handleEmail,
    handleSubmitEmail,
    handleSubmit,
    handleShowPasswordClick,
    errorLogin,
  };
}
