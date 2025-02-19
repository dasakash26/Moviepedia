import { useAlertStore } from "../stores/alertStore";

export const useToast = () => {
  const { addAlert, removeAlert } = useAlertStore();

  const showToast = (message, type = "info", duration = 3000) => {
    const id = Math.random().toString(36).substring(7);
    addAlert({ id, message, type, duration });
    return id;
  };

  return {
    show: showToast,
    success: (message, duration) => showToast(message, "success", duration),
    error: (message, duration) => showToast(message, "error", duration),
    warning: (message, duration) => showToast(message, "warning", duration),
    info: (message, duration) => showToast(message, "info", duration),
    dismiss: (id) => removeAlert(id),
  };
};
