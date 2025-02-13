import { useContext, useCallback, useState } from "react";
import { UserContext } from "../../contexts/userContext";
import {
  loginService,
  registerService,
  validateEmail as validateEmailService,
} from "../../services/users";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import useApp from "../App/useApp";
import { setToken } from "../../services/notes";
import useNotes from "../Notes/useNotes";

export const useUser = () => {
  const { setCurrentUser, currentUser } = useContext(UserContext);
  const { handleCloseModal } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(0);
  const { clearNotes } = useNotes();
  const [loading, setLoading] = useState(false);

  const handlePassword = (value) => {
    setPassword(value);
  };

  const handleEmail = (value) => {
    setEmail(value);
  };

  const handleSubmitEmail = async (emailLogin) => {
    try {
      setLoading(true);
      const response = await validateEmailService(emailLogin);
      setLoading(false);
      if (response.data !== undefined) {
        if (!response.data.error) {
          setStep(1);
        } else {
          setStep(2);
        }
      }
    } catch (error) {
      setLoading(false);
      iziToast.error({
        title: "Error",
        message: error.response ? error.response.data.message : "Ha ocurrido un error, refresca la página por favor",
        position: "topRight",
      });
    }
  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const register = async (email, password) => {
    try {
      setLoading(true);
      const rtaRegister = await registerService(email, password);
      setLoading(false);
      if (rtaRegister.data?.success) {
        const user = rtaRegister.data.data;
        setCurrentUser(user);
        setToken(user.token);
        handleCloseModal();
        iziToast.success({
          title: "OK",
          message: "Successfully created user!",
          position: "topRight",
        });
      }
    } catch (error) {
      console.log({ error });
      setLoading(false);
      iziToast.error({
        title: "Error",
        message: error.response.data.message,
        position: "topRight",
      });
    }
  };

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.setItem("TAKING_NOTES_currentUser", null);
    setToken(null);
    clearNotes();
  }, [setCurrentUser, clearNotes]);

  const handleSubmitLogin = async (emailLogin, passwordLogin) => {
    try {
      setLoading(true);
      const rta = await loginService(emailLogin, passwordLogin);
      setLoading(false);
      if (rta.data?.success) {
        const user = rta.data.data;
        setCurrentUser(user);
        setToken(user.token);
        localStorage.setItem("TAKING_NOTES_currentUser", JSON.stringify(user));
        handleCloseModal();
        return user;
      }
    } catch (error) {
      console.log({ error });
      setLoading(false);
      iziToast.error({
        title: "Error",
        message: error.response.data.message,
        position: "topRight",
      });
    }
  };

  return {
    logout,
    register,
    isLogged: Boolean(currentUser),
    currentUser,
    handleSubmitEmail,
    setCurrentUser,
    step,
    setStep,
    email,
    password,
    showPassword,
    handlePassword,
    handleEmail,
    handleSubmit: handleSubmitLogin,
    handleShowPasswordClick,
    loading
  };
};
