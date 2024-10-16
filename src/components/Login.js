import { useState, useRef } from "react";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import {
  notifyError,
  notifyFirebaseError,
  notifySuccess,
} from "../utils/toast";
import landingLogo from "../assets/img/landing-page.png";
import logoSecond from "../assets/img/landing-page-2.png";
import logoThird from "../assets/img/landing-page-3.png";
import labels from "../utils/labels";
import AuthStateChange from "./AuthStateChange";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
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
      notifyError(message);
    }
  };

  const updateUserData = (user) => {
    updateProfile(user, {
      displayName: name.current.value,
    })
      .then(() => {
        notifySuccess("Account Created Successfully");
        const { uid, email, displayName } = auth.currentUser;
        dispatch(
          addUser({
            uid,
            email,
            displayName,
          })
        );
      })
      .catch((error) => {
        notifyFirebaseError(error.code);
      });
  };

  const createNewUser = (email, password) => {
    if (!name.current.value || !email || !password) {
      notifyError("All Fields are Necessary");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        updateUserData(user);
      })
      .catch((error) => {
        console.log("new user Error", error);
        const errorCode = error.code;
        notifyFirebaseError(errorCode);
      });
  };

  const signInUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("success : ", user);
      })
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        notifyFirebaseError(errorCode);
      });
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div className="h-screen">
      <AuthStateChange />
      <div className="login-body flex items-center h-full">
        <div className="w-1/2 flex items-center justify-center">
          <div className="px-6 py-12 w-[70%]">
            <div>
              <h2 className="text-3xl font-sans font-medium">
                {"Hi there 👋"}
              </h2>
              <h2 className="text-xl font-sans text-gray-500">
                {isSignInForm ? labels.signIn : labels.signUp}
              </h2>
            </div>

            <div className="mt-10">
              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                {!isSignInForm && (
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        FullName
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        ref={name}
                        className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:outline-none"
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
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      ref={email}
                      placeholder="example@domain.com"
                      className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none"
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
                      placeholder="Min 4 characters, atleast 1 digit, 1 lowercase, 1 uppercase"
                      className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:outline-none"
                    />
                  </div>
                </div>
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
              <div className="mt-2 text-sm">
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
        <div className="landing-img w-1/2 relative h-full bg-[#babaee8c]">
          <img
            src={landingLogo}
            alt="landing"
            className="rounded-[10%] absolute top-[120px] w-[280px] left-[50px]"
          ></img>
          <img
            src={logoSecond}
            alt="landing"
            className="rounded-[10%] absolute top-[350px] w-[280px] left-[218px]"
          ></img>
          <img
            src={logoThird}
            alt="landing"
            className="rounded-[10%] absolute top-[120px] w-[280px] left-[354px]"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Login;
