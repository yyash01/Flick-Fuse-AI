import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);

    if (!message) {
      if (!isSignInForm) {
        createNewUser(email.current.value, password.current.value);
      } else {
        signInUser(email.current.value, password.current.value);
      }
    } else {
      setErrorMessage(message);
    }
  };

  const updateUserData = (user) => {
    updateProfile(user, {
      displayName: name.current.value,
    })
      .then(() => {
        const { uid, email, displayName } = auth.currentUser;
        dispatch(
          addUser({
            uid,
            email,
            displayName,
          })
        );
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const createNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        updateUserData(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + " " + errorMessage);
      });
  };

  const signInUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("success : ", user);
        setErrorMessage("");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + " " + errorMessage);
      });
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage("");
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center mx-auto left-0 right-0 px-10 py-10">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 min-w-[50%] bg-white border border-gray-200 rounded-lg shadow">
          <div>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              {isSignInForm ? "Sign in to your account" : "Create your account"}
            </h2>
          </div>

          <div className="mt-10">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              {!isSignInForm && (
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Name
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      ref={name}
                      className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              )}
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    ref={email}
                    className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  />
                </div>
              </div>
              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    ref={password}
                    className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <p className="text-red-500 text-lg font-bold">{errorMessage}</p>
              {/* Submit button */}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleButtonClick}
                >
                  {isSignInForm ? "Sign in" : "Sign Up"}
                </button>
              </div>
            </form>
            <div className="mt-10 text-sm">
              <p
                onClick={toggleSignInForm}
                className="cursor-pointer font-semibold text-indigo-600 hover:text-indigo-400"
              >
                {isSignInForm
                  ? "New to Flick Fuse ? Sign Up"
                  : "Already have an Account? Sign In"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
