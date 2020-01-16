import React, {useState} from 'react';
import './scss/main.scss'
import Menu from "./components/menu.component.jsx";
import SortDisplay from "./components/sortDisplay.component.jsx"
// show menu
// set menu options
const SORT_ALGORITHMS = {
  HEAP_SORT: {
    display_name: "Heap Sort",
    value: "heap_sort",
    description: "heap sort. A sorting algorithm that works by first organizing the data to be sorted into a special type of binary tree called a heap. The heap itself has, by definition, the largest value at the top of the tree, so the heap sort algorithm must also reverse the order."
  }
}


// build a slider vor the max (500)
const MAX_VALUE = 500;

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


const initialOptions = {
  sortingAlogrithm: SORT_ALGORITHMS.HEAP_SORT,
  count: 100,
  steps: 1,
  speed: 500, //ms
}

// add max count 
const getValueArray = (count, steps) => {
  let arr = [];
  for(let i = steps; i <= count; i += steps){
    arr.push(i);
  }
  return arr.map((value, idx) => ({value, position: idx}));
}

const initialArray = getValueArray(initialOptions.count, initialOptions.steps);

function shuffle(a) {
  console.log(a)
  for (let i = a.length - 1; i > 0; i--) {
    
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  console.log(a)
  return a;
}
shuffle(initialArray)





function App() {
  const [show, setShow] = useState(true); 
  const [isRunning, setIsRunning] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [options, setOptions] = useState(initialOptions)

  const [values, setValues] = useState(initialArray);

  const onStart = () => {
    setShow(false);
    setShowIntro(true);
    setIsRunning(true);
    setTimeout(() => {
      setShowIntro(false);
      // start 
    }, 3000)
  }

  const o = 4;

  return (
    <div className="App">
      <div className="main-container">
        <Menu 
          show={show}
          setShow={setShow} 
          onStart={onStart}           
          />
        <div className="content">
          {/* intro */}
          <div className={showIntro && isRunning ? "intro intro--show" : "intro"}>
            <h2 className="intro__headline">{options.sortingAlogrithm.display_name}</h2>
            <p className="intro__description">{options.sortingAlogrithm.description}</p>
          </div>

 

          <SortDisplay items={values} count={options.count}/>
          
        </div>
      </div>
    </div>
  );
}

export default App;
