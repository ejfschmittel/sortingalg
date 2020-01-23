import React from 'react'

import "./IntroModal.styles.scss"

const IntroModal = ({options, showIntro}) => (
    <div className={showIntro ? "intro-modal intro-modal--show" : "intro-modal"}>
      <h2 className="intro-modal__headline">{options.sortingAlgorithm.display_name}</h2>
      <p className="intro-modal__description">{options.sortingAlgorithm.description}</p>
    </div>
)

export default IntroModal