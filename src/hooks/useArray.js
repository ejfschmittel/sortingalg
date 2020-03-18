import {useState, useCallback, useEffect} from "react";

const useArray = (options) => {
    const [array, setArray] = useState([]);

    useEffect(() => {
        const initalArray = getValueArray(options.count, options.steps)
        setArray(initalArray)
    }, [])

    // create an ordered array from 1 to count, incremented by steps
    const getValueArray = (count, steps) => {
        let arr = [];
        for(let i = steps; i <= count; i += steps){
          arr.push(i);
        }
        return arr;
    }
  
    // randomly shuffles the array
    const shuffleArray = useCallback(() => {
      let a = array;
      for (let i = a.length - 1; i > 0; i--) { 
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
      }
      setArray([...a]);
    }, [array])

    // creates new array with given size
    const resizeArray = (count) => {
      const newArray = getValueArray(count, options.steps);
      setArray(newArray)  
    }
  
    return  {
      array,
      setArray,
      shuffleArray,
      resizeArray
    }
}

  
export default useArray