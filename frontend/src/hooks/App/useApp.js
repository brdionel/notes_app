import { useContext } from "react";
import AppContext from "../../contexts/appContext";

function useApp() {
  const context = useContext(AppContext);

  return context;
}

export default useApp;
