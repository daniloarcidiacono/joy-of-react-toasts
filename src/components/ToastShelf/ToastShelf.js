import React from 'react';

import Toast from '../Toast';
import styles from './ToastShelf.module.css';
import { ToastsContext } from '../ToastProvider/ToastProvider';

function ToastShelf() {
  const { toasts, closeToast, clearToasts } = React.useContext(ToastsContext);
  console.log("ToastShelf()");

  React.useEffect(() => {
    function handleKeydown(e) {
      if (e.code === 'Escape') {
        clearToasts();
      }
    }
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    }
  }, [clearToasts]);

  return (
    <ol className={styles.wrapper}>
      { toasts.map(toast => 
        <li className={styles.toastWrapper} key={toast.id}>
          <Toast 
            id={toast.id}
            variant={toast.variant} 
            onClose={closeToast}
          >
            {toast.message}
          </Toast>
        </li>
      )}    
    </ol>
  );
}

export default React.memo(ToastShelf);
