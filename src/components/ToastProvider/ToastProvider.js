import React from "react";
import { useKeypress } from "../../hooks/use-keypress";

export const ToastsContext = React.createContext();

export function ToastProvider({ children }) {
  console.log("ToastProvider()");

  // Added toasts
  const [toasts, setToasts] = React.useState([]);

  // Callbacks for toasts
  const addToast = React.useCallback((newToast) => {
    setToasts(
      currentToasts => {
        return [
          {
            ...newToast,
            id: crypto.randomUUID()
          },
          ...currentToasts
        ];
      }
    );
  }, []);

  const closeToast = React.useCallback((id) => {
    setToasts(
      currentToasts => {
        return currentToasts.filter(toast => toast.id !== id);        
      }
    );
  }, []);

  const clearToasts = React.useCallback((id) => {
    setToasts([]);
  }, []);

  useKeypress('Escape', clearToasts);
  
  const context = {
    toasts,
    addToast,
    closeToast,
    clearToasts
  };
  
  return (
    <ToastsContext.Provider value={context}>
      {children}
    </ToastsContext.Provider>
  );
}

export default ToastProvider;
