import React from 'react'

import "./CustomRangeInput.styles.scss"

const CustomRangeInput = React.memo(({value, max, label, name, ...otherProps}) => {   
    return (
      <div className="custom-range-input">
        <label htmlFor={name}>{label}</label>
        <input type="range" {...otherProps} value={value} max={max} name={name} />
      </div>
    )
})

export default CustomRangeInput