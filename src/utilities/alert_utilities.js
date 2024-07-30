import toast from "react-hot-toast";

export const showAlert = (message) => {
  toast(message, {
    style: {
      borderRadius: "10px",
      background: "#e44e4e",
      color: "#fff",
    },
    
  });
};

export const showSuccessAlert = (message) => {
  toast.success(message);
};

export function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    // Clear the existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
