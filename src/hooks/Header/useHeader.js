import { useContext } from "react";
import AppContext from "../../contexts/appContext";

function useHeader() {
  const { mode, toggleMode } = useContext(AppContext);

  return {
    mode,
    toggleMode,
  };
}

export default useHeader;
