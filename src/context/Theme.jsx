import {createContext} from 'react';
import {useState} from 'react';

export const ThemeContext = createContext()

export const ThemeProvider = ({children}) => {
    const [activeUser, setActiveUser] = useState(null)

    return (
        <ThemeContext.Provider value={{activeUser, setActiveUser}}>
            {children}
        </ThemeContext.Provider>
    )
}