import {  useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { MapContextProvider } from "../components/Map/MapContext";
export default function Layout({children}){
    const [showMenu, setShowMenu] = useState(false);
        return(
            <MapContextProvider value={showMenu}>
            <div>
                <Navbar showMenu={showMenu} setShowMenu={setShowMenu}/>
            </div>
                {children}
            </MapContextProvider>
        )
}