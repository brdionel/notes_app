import { useContext } from "react";
import AppContext from "../../contexts/appContext";

function useHeader() {
  const { mode, handleMode } = useContext(AppContext);

  return {
    mode,
    handleMode,
  };
}

export default useHeader;
