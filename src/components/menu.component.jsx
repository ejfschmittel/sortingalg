import React, {useState, useMemo, useCallback} from "react";
import {SORT_ALGORITHMS} from "../algorithms"


const CustomRangeInput = React.memo(({value, max, label, name, ...otherProps}) => {
  const displayOffset =  useMemo(() => (value / max) * 100, [value, max]);
  

  return (
    <div className="custom-slider">
      <label for={name}>{label}</label>
      <input type="range" {...otherProps} value={value} max={max} name={name} />
      <div style={{left: `${displayOffset}%`}}>{value}</div>
    </div>
  )
})



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



const Menu2 = React.memo(({isShowingIntro, onStart, onStop, isRunning, show, setShow, onOptionsChange, options: {sortingAlgorithm, count, speed}}) => {
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
                label="columns"
                />

              <CustomRangeInput 
                value={speed} 
                min="0" 
                max="1000" 
                step="10"  
                onChange={onOptionsChange} 
                name="speed"
                label="delay"
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

const Menu = ({onStart, show, setShow, onOptionsChange, options}) => {



    
    const toggleShow = () => setShow(!show);



  // slider how many
  // slider how fast


    return (
        <div className={show ? "menu" : "menu menu--hidden"}>
            <div className="menu__container">
                

              <div className="custom-select">     
                <select name="sortingAlgorithm" onChange={onOptionsChange} value={options.sortingAlgorithm.value}>
                    {Object.keys(SORT_ALGORITHMS).map(key => {
                      const algo = SORT_ALGORITHMS[key]
                      return  <option value={algo.value}>{algo.display_name}</option>
                    })}
                   
                </select>
              </div>

              <CustomRangeInput value={options.count} min="10" max="500" step="10" onChange={onOptionsChange} name="count"/>
              <CustomRangeInput value={options.speed} min="0" max="1000" step="10"  onChange={onOptionsChange} name="speed"/>


            </div>
            <div className="menu__toggle-btn" onClick={toggleShow}>
              {show ? "hide" : "expand"}
            </div>
            <button className="menu__start-btn" onClick={onStart}>
              Start
            </button>
        </div>
    )
}

export default Menu2;