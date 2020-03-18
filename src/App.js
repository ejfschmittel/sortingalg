import React, {useState, useEffect} from 'react';
import {SORT_ALGORITHMS, getSortingAlgorithm} from "./algorithms"

// components
import Menu from "./components/Menu/Menu.component.jsx";
import SortingDisplay from "./components/SortingDisplay/SortingDisplay.component.jsx"
import IntroModal from "./components/IntroModal/IntroModal.component";

// hooks
import useInterval from "./hooks/useInterval";
import useArray from "./hooks/useArray";
import useEventListener from "./hooks/useEventListener";


import './App.scss'

// max column defualt steps
const MAX_COLUMNS_LARGE = 500;
const MAX_COLUMNS_MEDIUM = 200;
const MAX_COLUMNS_SMALL = 100;


const defaultOptions = {
  sortingAlgorithm: SORT_ALGORITHMS.COCKTAIL_SHAKER_SORT,
  count: 50,
  steps: 1,
  delay: 200, //ms
  max_columns: MAX_COLUMNS_LARGE,
}

const App = () => {
  // options, generator
  const [options, setOptions] = useState(defaultOptions)
  const [generator, setGenerator] = useState(null);

  // env vars
  const [showMenu, setShowMenu] = useState(true); 
  const [isRunning, setIsRunning] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [isSortingRunning, setIsSortingRunning] = useState(false)
 
  // used to wait for columns slider to stop moving (for 500ms) before rerendering
  const [arrayTimeout, setArrayTimeout ] = useState(0)

  // main array can be shuffled, resized and directly set
  const {
    array,
    setArray,
    shuffleArray,
    resizeArray,
  } = useArray(options)



  // set max columns on mount
  useEffect(() => {
    setMaxColumnsByWindowWidth()
  }, [])

  // resize event listener to reevalute max columns
  useEventListener('resize',() => {
    setMaxColumnsByWindowWidth()
  }, [options])

  // sets the max columns base on window size
  const setMaxColumnsByWindowWidth = () => {
    console.log("resize")
    if(window.innerWidth >= 1600){
      updateMaxColumns(MAX_COLUMNS_LARGE)
        
    }else if(window.innerWidth >= 900){
      updateMaxColumns(MAX_COLUMNS_MEDIUM)
        
    }else{
      updateMaxColumns(MAX_COLUMNS_SMALL)
    }
  }


  const updateMaxColumns = (max_size) => {
    if(options.max_columns !== max_size){
      const count = options.count > max_size ? max_size : options.count;
      setOptions({...options, max_columns: max_size, count})
      resizeArray(count);
    }
  }



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
  }, isSortingRunning ? options.delay : null)

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

  // delays array resize until 500ms since last resize 
  // used for slider value to avoid unnecessary resizes
  const delayedArrayResize = (count) => {
    if(arrayTimeout){
      clearTimeout(arrayTimeout)
    }

    setArrayTimeout(setTimeout(() => {
      resizeArray(count)      
    }, 500))
  }

  const startSorting = () => {
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
  }

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
