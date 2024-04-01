import { useRef, useState } from "react";
import { Bounce, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const useAlert = () => {
  const [notify, setNotify] = useState(true)

  const handleNotify = (notificationCallback: () => void) => {
    if (notify) {
      notificationCallback()
    }
    setNotify(false)
    if (notify) {
      setTimeout(() => setNotify(true), 2700);
    }
  };

  const errorAlert = (message: string) => {
    handleNotify(() => toast.error(message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    }))
  }

  const successAlert = (message: string) => {
    handleNotify(() => toast.success(message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    }))
  }

  return { successAlert, errorAlert }
}

export default useAlert