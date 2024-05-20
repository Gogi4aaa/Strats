import { createContext } from "react";

export const SideBarContext = createContext()

export function SideBarContextProvider({value, children}) {
    return(
        <SideBarContext.Provider value={value}>
            {children}
        </SideBarContext.Provider>
    )
}