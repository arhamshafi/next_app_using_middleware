const { createContext, useState, useContext } = require("react");


const AppContext = createContext()

export const AppProvider = ({ children }) => {

    const [ok, setok] = useState("working...!")

    return (
        <AppContext.Provider value={{ ok }} >{children}</AppContext.Provider>
    )
}

export const useTodo = () =>{
    return useContext(AppContext)
}