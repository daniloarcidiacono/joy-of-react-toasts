import React from 'react';

import Button from '../Button';
import ToastShelf from '../ToastShelf';
import styles from './ToastPlayground.module.css';
import { ToastsContext } from '../ToastProvider/ToastProvider';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  console.log("ToastPlayground()");

  // Toasts handling
  const { addToast, closeToast } = React.useContext(ToastsContext);

  // Focus
  const messageInputRef = React.useRef();

  // New toast
  const [message, setMessage] = React.useState('');
  const [selectedVariant, setSelectedVariant] = React.useState(VARIANT_OPTIONS[0]);

  const popToast = (e) => {
    e.preventDefault();

    addToast({ variant: selectedVariant, message });
    setMessage('');
    setSelectedVariant('notice');

    messageInputRef.current.focus();
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf />      

      <form className={styles.controlsWrapper} onSubmit={popToast}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea 
              id="message" 
              ref={messageInputRef} 
              className={styles.messageInput} 
              value={message} 
              onChange={(e) => setMessage(e.target.value)}
              required 
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {
              VARIANT_OPTIONS.map(variant => 
                <label htmlFor={"variant-"+variant} key={variant}>
                  <input
                    id={"variant-"+variant}
                    type="radio"
                    name="variant"
                    value={variant}
                    checked={selectedVariant === variant}
                    onChange={(e) => setSelectedVariant(e.target.value)}
                  />
                  {variant}
                </label>
              )
            }
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button type="submit">Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
