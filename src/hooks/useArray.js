import {useState, useCallback, useEffect} from "react";

const useArray = (options) => {
    const [array, setArray] = useState([]);
    //const [arrayTimeout, setArrayTimeout ] = useState(0)


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
  
   
    // resizes the array: count = new size
    /*const resizeArray = (count) => {
      if(arrayTimeout){
        clearTimeout(arrayTimeout)
      }
  
      setArrayTimeout(setTimeout(() => {
        const newArray = getValueArray(count, options.steps);
        setArray(newArray)      
      }, 500))
    }*/

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