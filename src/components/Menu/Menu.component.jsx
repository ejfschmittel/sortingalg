import React, {useState, useMemo, useCallback} from "react";
import {SORT_ALGORITHMS} from "../../algorithms"

import CustomRangeInput from "../CustomRangeInput/CustomRangeInput.component"

import "./Menu.styles.scss"


const SortingAlgorithmSelect = React.memo(({value, onChange}) => {
  return (
    <select name="sortingAlgorithm" onChange={onChange} value={value}>
        {Object.keys(SORT_ALGORITHMS).map(key => {
          const algo = SORT_ALGORITHMS[key]
          return  <option value={algo.value}>{algo.display_name}</option>
        })}
        
    </select>
  )
})


const Menu = React.memo(({isShowingIntro, onStart, onStop, isRunning, show, setShow, onOptionsChange, options: {sortingAlgorithm, count, speed}}) => {
  const toggleShow = useCallback(() => setShow(!show), [show]);


  console.log("rerender menu")

  // slider how many
  // slider how fast

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
                max="500" 
                step="10" 
                onChange={onOptionsChange} 
                name="count"
                label={`columns: ${count}`}
                />

              <CustomRangeInput 
                value={speed} 
                min="0" 
                max="1000" 
                step="10"  
                onChange={onOptionsChange} 
                name="speed"
                label={`delay: ${speed} ms`}
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