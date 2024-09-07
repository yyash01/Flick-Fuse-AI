import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Skeleton from "./Skeleton";
import { useSelector, useDispatch } from "react-redux";
import MovieList from "./MovieList";
import { clearAiMovieResult } from "../utils/moviesSlice";

export default function MovieResultModal({ onClose }) {
  const dispatch = useDispatch();
  const open = true;
  const { aiMovieNames, aiMovieResult } = useSelector((store) => store.movies);

  const handleModalClose = () => {
    onClose(false);
    dispatch(clearAiMovieResult());
  };

  return (
    <Transition show={open}>
      <Dialog className="relative z-10" onClose={handleModalClose}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10">
          <div className="flex justify-center m-10 h-full items-center">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="w-[70%] h-[80%] overflow-y-scroll scrollbar transform rounded-lg shadow-xl bg-black bg-opacity-90">
                <div className="">
                  {!aiMovieNames ? (
                    <Skeleton />
                  ) : (
                    aiMovieNames.map((movieName, index) => (
                      <MovieList
                        key={movieName}
                        title={movieName}
                        movies={aiMovieResult[index]}
                      />
                    ))
                  )}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
