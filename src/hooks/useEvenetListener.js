import {useRef, useEffect} from "react"

const useEventListener = (type, callback, callbackDependencies = []) => {
    const savedCallback = useRef();
  
      useEffect(() => {
        window.addEventListener(type, callback);
        return () => {
          window.removeEventListener(type, callback);
        };
      }, [])
    
      // Remember the latest callback.
      useEffect(() => {
        savedCallback.current = callback;
      }, [callback]);
    
      useEffect(() => {
        if (callbackDependencies !== null && callbackDependencies.length !== 0) {
          window.addEventListener(type, callback);
          return () => {
            window.removeEventListener(type, callback);
          };
        }
      }, callbackDependencies);
      
  }

  export default useEventListener;