import React from 'react';

import Toast from '../Toast';
import styles from './ToastShelf.module.css';
import { ToastsContext } from '../ToastProvider/ToastProvider';

function ToastShelf() {
  const { toasts, closeToast } = React.useContext(ToastsContext);
  console.log("ToastShelf()");

  return (
    <ol className={styles.wrapper}
        role="region"
        aria-live="polite"
        aria-label="Notification">
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
