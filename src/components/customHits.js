import React from "react"
import { useHits } from "react-instantsearch"

const CustomHits = props => {
  const { items, results, banner, sendEvent } = useHits(props)
  return <div>CustomHits</div>
}

export default CustomHits
