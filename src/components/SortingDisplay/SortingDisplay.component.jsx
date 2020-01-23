import React, {useState, useEffect, useRef, useMemo} from "react"

import './SortingDisplay.styles.scss';
// use flex order to positon the items??

// {value: "", position: x}

// scrable visualize

// make color in correct order reflex rainbow
// so need function (num) => #255, (num+1) => #256

function getColor(value, totalItems){
    var hue=((value/totalItems )*360).toString(10);
    return ["hsl(",hue,",100%,50%)"].join("");
} 

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

const SortDisplay = ({items}) => {

    const itemClasses = useMemo(() => {
        const classes = items.length > 100 ? "sort-display__item sort-display__item--no-border" : "sort-display__item";
        return classes;
    },[items])

    return (
        <div className="sort-display">
            {/* render values */}
            {items.map((value, index) => {
                return <Item className={itemClasses} key={index} value={value} position={index} totalItems={items.length}/>
            })}    
        </div>
    )
}

// update on height change

// update on position change

// https://stackoverflow.com/questions/54551949/react-hooks-how-do-i-implement-shouldcomponentupdate


const Item = React.memo(({value, position, totalItems, className}) => {
    /*const prevPosition = usePrevious(position);
    const [pos, setPos] = useState(prevPosition ? prevPosition : position)

    // generate color => use memo;
    useEffect(() => {
        if(prevPosition && prevPosition !== position){
            // animate update

            
            setPos(position);
            
            
        }else{
            // normal update
            setPos(position);
        }
        // check on change 
    }, [position])*/

    const h = useMemo(() => (value / totalItems) * 100, [value, totalItems])

    const color = useMemo(() => getColor(value, totalItems), [value, totalItems])

  
    return (
        <div className={className} style={{order: position, height: `${h}%`, backgroundColor: color}} />
    )  
})


export default SortDisplay