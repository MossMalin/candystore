import { useEffect } from 'react';

interface ToastProps {
  message: string;
  duration?: number; // milliseconds
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, duration = 9000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return <div className="toast">{message}</div>;
};

export default Toast;
