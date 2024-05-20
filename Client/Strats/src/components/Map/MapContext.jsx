import { createContext } from "react";

export const MapContext = createContext()
export function MapContextProvider({value, children}) {
    return(
        <MapContext.Provider value={value}>
            {children}
        </MapContext.Provider>
    )
}