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
        const newToasts = currentToasts.map(toast => ({...toast}));
        newToasts.unshift({
          ...newToast,
          id: crypto.randomUUID()
        });

        return newToasts;
      }
    );
  }, []);

  const closeToast = React.useCallback((id) => {
    setToasts(
      currentToasts => {
        return currentToasts
          .map(toast => (toast.id !== id ? {...toast} : null))
          .filter(toast => toast != null);        
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
