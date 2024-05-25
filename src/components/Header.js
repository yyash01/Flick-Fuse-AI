import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import GptSearchBar from "./GptSearchBar";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log("ERROR : ", error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    //unsubscribe the onAuthStateChange Callback
    return () => unsubscribe();
  }, []);

  return (
    <div className="sticky bg-white z-50 rounded top-0 backdrop-blur w-full">
      <header>
        <nav
          className="flex items-center justify-between p-4 lg:px-8"
          aria-label="Global"
        >
          <div className="flex text-2xl font-medium text-blue-700">
            Flick Fuse
          </div>
          {user && (
            <>
              <GptSearchBar />
              <div className="flex items-center gap-4">
                <p className="font-medium text-cyan-700">
                  👋 Hi, {user.displayName}
                </p>
                <button
                  onClick={handleSignOut}
                  className="rounded-md bg-blue-500 py-1 px-3 font-medium text-white "
                >
                  Sign Out
                </button>
              </div>
            </>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Header;
