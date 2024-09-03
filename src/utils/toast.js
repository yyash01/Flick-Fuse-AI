import toast from "react-hot-toast";
import labels from "./labels";

const firebaseErrorMessages = {
  "auth/invalid-credential": labels.invalidLogin,
  "auth/email-already-in-use": labels.emailExistAlready,
};

export const notifyFirebaseError = (errorCode) => {
  toast.error(firebaseErrorMessages[errorCode]);
};

export const notifyError = (message) => {
  toast.error(message);
};

export const notifySuccess = (message) => {
  toast.success(message);
};
