import React, {useState, useEffect, useCallback, useRef} from 'react';
import './scss/main.scss'
import Menu from "./components/menu.component.jsx";
import SortDisplay from "./components/sortDisplay.component.jsx"

import {SORT_ALGORITHMS, getSortingAlgorithm} from "./algorithms"
// show menu
// set menu options


// https://khan4019.github.io/front-end-Interview-Questions/sort.html
// https://usehooks.com/

// build a slider vor the max (500)
const MAX_VALUE = 500;


/*


 // => function animdates in normal loop



*/







function useInterval(callback, delay) {
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


/*
pos says where items gets displayed.
so to scramble the pos needs to be updated

change to object ( for rendering
  value: pos
)

update array = [just the value]
=> update value_array
=> update pos in display object
=> 



*/

// https://stackoverflow.com/questions/53024496/state-not-updating-when-using-react-state-hook-within-setinterval
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
// https://medium.com/@dan_abramov

/*
  on central array,
  () => gets manipulated and updated


*/

// https://github.com/rafeautie/sorting-algorithm-visualizer
// https://github.com/decadentjs/sorting-algorithms/blob/master/src/sorter.js
const initialOptions = {
  sortingAlgorithm: SORT_ALGORITHMS.HEAP_SORT,
  count: 50,
  steps: 1,
  speed: 200, //ms
}


// add max count
const getValueArray = (count, steps) => {
  let arr = [];
  for(let i = steps; i <= count; i += steps){
    arr.push(i);
  }
  return arr;
}

const initialArray = getValueArray(initialOptions.count, initialOptions.steps);


const useArray = (initialArray) => {
  const [array, setArray] = useState(initialArray);
  const [arrayTimeout, setArrayTimeout ] = useState(0)

  // randomly shuffles the array
  const shuffleArray = useCallback(() => {
    let a = array;
    for (let i = a.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    setArray([...a]);
  }, [array])

  /* resizes array: count = new size */
  const resizeArray = (count) => {
    if(arrayTimeout){
      clearTimeout(arrayTimeout)
    }

    setArrayTimeout(setTimeout(() => {
      const newArray = getValueArray(count, initialOptions.steps);
      setArray(newArray)      
    }, 500))
  }

  return  {
    array,
    setArray,
    shuffleArray,
    resizeArray
  }
}



const App = () => {

  const {
    array,
    setArray,
    shuffleArray,
    resizeArray,
  } = useArray(initialArray)

  const [showMenu, setShowMenu] = useState(true); 
  
  const [options, setOptions] = useState(initialOptions)

  const [isRunning, setIsRunning] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [isSortingRunning, setIsSortingRunning] = useState(false)
  const [generator, setGenerator] = useState(null);


  /* main loop */
  useInterval(() => {
   
    if(generator && isRunning){
      const res = generator.next(); 
     
      if(!res.done){
        const newArray = res.value;  
        setArray([...newArray]);
      }else{
        stop();
      }
    }else{
      stop();
    }
    
  }, isSortingRunning ? options.speed : null)


  const stop = () => {
    setIsSortingRunning(false);
    setIsRunning(false);
    setShowIntro(false);
    setGenerator(null);
  }

  const onOptionsChange = (e) => {
    let {name, value} = e.target
   
    if(name === "sortingAlgorithm"){
      value = SORT_ALGORITHMS[value.toUpperCase()]
    }
 
    if(name === "count"){
      stop();
      resizeArray(value);
    } 

    const newObject = {
      ...options,
      [name]: value,
    }

    setOptions({...newObject})
  }

  const onStart = useCallback(() => {
    // hide menu / start intro / set running
    setShowMenu(false);
    setShowIntro(true);
    setIsRunning(true);
    
    // shuffle array
    setTimeout(() => { 
        shuffleArray();        
    }, 1000)

    // start sorting 
    setTimeout(() => {
      // hide intro
      setShowIntro(false);         
      
      // set generator
      const sortingAlgorithm = getSortingAlgorithm(options.sortingAlgorithm.value);
      const generator = sortingAlgorithm.getGenerator(array);
      setGenerator(generator);

      // start interval
      setIsSortingRunning(true);     
    }, 3000)
  })

  return (
    <div className="App">
      <div className="main-container">
        <Menu 
          show={showMenu}
          setShow={setShowMenu} 
          onStart={onStart}   
          onOptionsChange={onOptionsChange}    
          options={options}    
          isRunning={isRunning}
          isShowingIntro={showIntro}
          onStop={stop}
          />
        <div className="content">
          {/* intro */}
 
          <div className={showIntro && isRunning ? "intro intro--show" : "intro"}>
            <h2 className="intro__headline">{options.sortingAlgorithm.display_name}</h2>
            <p className="intro__description">{options.sortingAlgorithm.description}</p>
          </div>

          <SortDisplay items={array} />
          
        </div>
      </div>
    </div>
  );
}

export default App;
