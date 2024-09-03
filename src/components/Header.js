import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GptSearchBar from "./GptSearchBar";
import AuthStateChange from "./AuthStateChange";

const Header = () => {
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log("ERROR : ", error);
      });
  };

  return (
    <div className="sticky bg-white z-50 rounded top-0 backdrop-blur w-full">
      <AuthStateChange />
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
                <p className="truncate font-medium max-w-28 text-cyan-700">
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
