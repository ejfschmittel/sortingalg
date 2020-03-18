import React, {useCallback} from "react";
import {SORT_ALGORITHMS} from "../../algorithms"

import CustomRangeInput from "../CustomRangeInput/CustomRangeInput.component"

import "./Menu.styles.scss"


const SortingAlgorithmSelect = React.memo(({value, onChange}) => {
  return (
    <select name="sortingAlgorithm" onChange={onChange} value={value}>
        {Object.keys(SORT_ALGORITHMS).map(key => {
          const algo = SORT_ALGORITHMS[key]
          return  <option key={key} value={algo.value}>{algo.display_name}</option>
        })}
        
    </select>
  )
})


const Menu = React.memo(({isShowingIntro, onStart, onStop, isRunning, show, setShow, onOptionsChange, options: {sortingAlgorithm, count, delay, max_columns}}) => {
  const toggleShow = useCallback(() => setShow(!show), [show, setShow]);

    // start / stop button click handler
    const onClick = () => {
      if(isRunning){
        onStop();
      }else{
        onStart();
      }
    }

    return (
        <div className={show ? "menu" : "menu menu--hidden"}>
            <div className="menu__container">
                

              <div className="custom-select">     
                <SortingAlgorithmSelect 
                  onChange={onOptionsChange}
                  value={sortingAlgorithm.value}
                />
              </div>

              <CustomRangeInput 
                value={count} 
                min="10" 
                max={max_columns}
                step="10" 
                onChange={onOptionsChange} 
                name="count"
                label={`columns: ${count}`}
                />

              <CustomRangeInput 
                value={delay} 
                min="0" 
                max="1000" 
                step="10"  
                onChange={onOptionsChange} 
                name="delay"
                label={`delay: ${delay} ms`}
                />


            </div>
            <div className="menu__toggle-btn" onClick={toggleShow}>
              {show ? "hide" : "expand"}
            </div>
            <button className={isShowingIntro ? "menu__start-btn menu__start-btn--hide" : "menu__start-btn"} onClick={onClick}>
              {!isRunning ? "Start" : "Stop"}
            </button>
        </div>
    )
})

export default Menu;