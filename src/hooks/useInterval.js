import {useRef, useEffect} from "react"

/*
    hook recommended by dan abramov

    relevant articles.

    https://stackoverflow.com/questions/53024496/state-not-updating-when-using-react-state-hook-within-setinterval
    https://overreacted.io/making-setinterval-declarative-with-react-hooks/
    https://medium.com/@dan_abramov
*/

const useInterval = (callback, delay) => {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

export default useInterval
  