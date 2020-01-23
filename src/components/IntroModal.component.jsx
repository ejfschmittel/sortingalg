import React from 'react'

const IntroModal = ({options, showIntro}) => (
    <div className={showIntro ? "intro intro--show" : "intro"}>
      <h2 className="intro__headline">{options.sortingAlgorithm.display_name}</h2>
      <p className="intro__description">{options.sortingAlgorithm.description}</p>
    </div>
)

export default IntroModal