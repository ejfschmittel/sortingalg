import React from "react"

import '../scss/sort-display.scss';
// use flex order to positon the items??

// {value: "", position: x}

// scrable visualize

// make color in correct order reflex rainbow
// so need function (num) => #255, (num+1) => #256

function getColor(value){
    //value from 0 to 1
    var hue=((100-value)*3.6).toString(10);
    return ["hsl(",hue,",100%,50%)"].join("");
} 



const SortDisplay = ({items, count}) => {
    return (
        <div className="sort-display">
            {/* render values */}
            {items.map(({value, position}) => {
                return <SortItem value={value} position={position} ceil={count}/>
            })}
        </div>
    )
}

const SortItem = ({value, position, ceil}) => {

    // generate color => use memo;

    const h = (value / ceil) * 100

    const color = getColor(value)

    const classes = ceil > 100 ? "sort-display__item sort-display__item--no-border" : "sort-display__item";

    return (
        <div className={classes} style={{order: position, height: `${h}%`, backgroundColor: color}}>
           
        </div>
    )
}

export default SortDisplay