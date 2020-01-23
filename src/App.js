import React, {useState, useCallback, useEffect} from 'react';
import {SORT_ALGORITHMS, getSortingAlgorithm} from "./algorithms"

// components
import Menu from "./components/Menu/Menu.component.jsx";
import SortingDisplay from "./components/SortingDisplay/SortingDisplay.component.jsx"
import IntroModal from "./components/IntroModal/IntroModal.component";

// hooks
import useInterval from "./hooks/useInterval";
import useArray from "./hooks/useArray";

// scss
import './App.scss'


const MAX_VALUE = 500;
// https://github.com/rafeautie/sorting-algorithm-visualizer
// https://github.com/decadentjs/sorting-algorithms/blob/master/src/sorter.js+


const defaultOptions = {
  sortingAlgorithm: SORT_ALGORITHMS.HEAP_SORT,
  count: 50,
  steps: 1,
  speed: 200, //ms
}


const App = () => {
  const [options, setOptions] = useState(defaultOptions)

  const [arrayTimeout, setArrayTimeout ] = useState(0)

  const {
    array,
    setArray,
    shuffleArray,
    resizeArray,
  } = useArray(options)

  useEffect(() => {
    console.log(options.count)
  }, [options])

  const [showMenu, setShowMenu] = useState(true); 

  const [isRunning, setIsRunning] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [isSortingRunning, setIsSortingRunning] = useState(false)
  const [generator, setGenerator] = useState(null);


  // main loop for sorting
  // calls generator sorting function to get next array 
  useInterval(() => {
   
    if(generator && isRunning){
      const res = generator.next(); 
     
      if(!res.done){
        const newArray = res.value;  
        setArray([...newArray]);
      }else{
        stopSorting();
      }
    }else{
      stopSorting();
    }
  }, isSortingRunning ? options.speed : null)

  // on Change function for options
  const onOptionsChange = (e) => {
    let {name, value} = e.target
   
    if(name === "sortingAlgorithm"){
      stopSorting();
      value = SORT_ALGORITHMS[value.toUpperCase()]
    }
 
    if(name === "count"){
      stopSorting();
      delayedArrayResize(value);
    } 

    const newObject = {
      ...options,
      [name]: value,
    }

    setOptions({...newObject})
  }

  const delayedArrayResize = (count) => {
    if(arrayTimeout){
      clearTimeout(arrayTimeout)
    }

    setArrayTimeout(setTimeout(() => {
      resizeArray(count)      
    }, 500))
  }

  const startSorting = useCallback(() => {
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

  // stop sorting and reset
  const stopSorting = () => {
    setIsSortingRunning(false);
    setIsRunning(false);
    setShowIntro(false);
    setGenerator(null);
  }

  return (
    <div className="App">
      <div className="main-container">

        <Menu 
          show={showMenu}
          setShow={setShowMenu} 
          onStart={startSorting}   
          onOptionsChange={onOptionsChange}    
          options={options}    
          isRunning={isRunning}
          isShowingIntro={showIntro}
          onStop={stopSorting}
          />

        <div className="content">

          <IntroModal 
            options={options}
            showIntro={showIntro && isRunning}
            />
 
          <SortingDisplay 
            items={array} 
            /> 

        </div>
      </div>
    </div>
  );
}




export default App;
