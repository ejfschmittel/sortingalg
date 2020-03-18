import React, {useMemo} from "react"

import './SortingDisplay.styles.scss';


// returns rainbow color based on value compared to other items
function getColor(value, totalItems){
    var hue=((value/totalItems )*360).toString(10);
    return ["hsl(",hue,",100%,50%)"].join("");
} 

const SortDisplay = ({items}) => {

    const itemClasses = useMemo(() => {
        const classes = items.length > 80  ? "sort-display__item sort-display__item--no-border" : "sort-display__item";
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

// single Array Item (Colored Column)
const Item = React.memo(({value, position, totalItems, className}) => {
    const h = useMemo(() => (value / totalItems) * 100, [value, totalItems])
    const color = useMemo(() => getColor(value, totalItems), [value, totalItems])
  
    return (
        <div className={className} style={{order: position, height: `${h}%`, backgroundColor: color}} />
    )  
})


export default SortDisplay