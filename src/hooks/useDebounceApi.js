const useDebounceApi = (callback, delay) => {
  let timerId; //place the timerId in the parent function
  return function (...args) {
    //i will invoke the callback function but after a delay
    //so to schedule a function after a delay - i will need setTimeout

    //to cancel the timer we require - clearTimeout
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      callback.apply(this, args);
    }, delay);

    //now there can be multiple timer already running
    //i have to cancel that timer and then set a new timer
  };
};

export default useDebounceApi;
