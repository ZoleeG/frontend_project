import {createContext} from 'react';
import {useState} from 'react';

export const UserContext = createContext()

export default function UserProvider ({children}) {
    const [activeUser, setActiveUser] = useState()

    return (
        <UserContext.Provider value={{activeUser, setActiveUser}}>
            {children}
        </UserContext.Provider>
    )
}