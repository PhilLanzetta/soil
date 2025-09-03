import React, { createContext, useState, useContext } from "react"

const MyContext = createContext()

export const MyProvider = ({ children }) => {
  const [popUp, setPopUp] = useState(false)
  const [pressPopUp, setPressPopUp] = useState(false)

  return (
    <MyContext.Provider value={{ popUp, setPopUp, pressPopUp, setPressPopUp }}>
      {children}
    </MyContext.Provider>
  )
}

export const useMyContext = () => useContext(MyContext)
